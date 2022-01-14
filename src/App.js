import React from 'react';
import { useState, useEffect } from 'react';
import '@shopify/polaris/build/esm/styles.css';
import en from '@shopify/polaris/locales/en.json';
import { AppProvider, Page, Layout, Spinner, Button } from '@shopify/polaris';
import DateModal from './components/DateModal/DateModal';
import Photo from './components/Photo/Photo';
import axios from 'axios';
import moment from 'moment';

function App() {
  const API_KEY = "fpJa8lCPaOjDFZcMdet9pXz3ohhkZ6ONlYDPmQvc";
  const [selectedDates, setSelectedDates] = useState({
    start: new Date(moment().subtract(1, 'months').format('ddd MMM DD YYYY')),
    end: new Date(moment().format('ddd MMM DD YYYY')),
  });
  const [posts, setPosts] = useState([]);
  const [focusedPhoto, setFocusedPhoto] = useState('');
  const [addedDates, setAddedDates] = useState({
    startDate: moment().subtract(1, 'months').format('YYYY-MM-DD'),
    endDate: moment().format('YYYY-MM-DD'),
  });
  const [loading, setLoading] = useState(false);
  const [firstLoad, setFirstLoad] = useState(true);

  const getResults = async () => {
    const startDate = selectedDates.start.getFullYear() + '-' + (selectedDates.start.getMonth() + 1) + '-' + selectedDates.start.getDate();
    const endDate = selectedDates.end.getFullYear() + '-' + (selectedDates.end.getMonth() + 1) + '-' + selectedDates.end.getDate();

    const url = `https://api.nasa.gov/planetary/apod?start_date=${startDate}&end_date=${endDate}&api_key=${API_KEY}`;

    const res = await axios.get(url);

    if (res?.data) {
      const results = res.data.reverse().map((item) => {
        return {
          title: item.title,
          date: item.date,
          description: item.explanation,
          imageUrl: item.url,
          image: item.media_type === 'image'
        }
      });

      setPosts(results);
      setAddedDates({
        startDate: moment(selectedDates.start).format('YYYY-MM-DD'),
        endDate: moment(selectedDates.end).format('YYYY-MM-DD'),
      })
      setFirstLoad(false);
    };
  }

  useEffect(() => {
    setFirstLoad(true);
    setPosts([]);
    getResults();
  }, [selectedDates]);

  const incrementDate = () => {
    setLoading(true);
    setAddedDates({
      startDate: moment(addedDates.startDate).subtract(1, 'days').subtract(1, 'months').format('YYYY-MM-DD'),
      endDate: moment(addedDates.startDate).subtract(1, 'days').format('YYYY-MM-DD'),
    });
  }

  const loadMore = async () => {
    const url = `https://api.nasa.gov/planetary/apod?start_date=${addedDates.startDate}&end_date=${addedDates.endDate}&api_key=${API_KEY}`;

    const res = await axios.get(url);

    if (res?.data) {
      const results = res.data.reverse().map((item) => {
        return {
          title: item.title,
          date: item.date,
          description: item.explanation,
          imageUrl: item.url,
          image: item.media_type === 'image'
        }
      });

      const concatResults = posts.concat(results);
      setPosts(concatResults);
      setLoading(false);
    };
  }

  useEffect(() => {
    if (!firstLoad) {
      loadMore();
    }
  }, [addedDates]);

  return (
    <AppProvider i18n={en}>
      <Page title="Spacestagram" subtitle="Brought to you by NASA's Astronomy Photo of the Day (APOD) API">
        <Layout sectioned>
          <Layout.Section>
            {posts.length === 0 ?
              (<div style={{ 'display': 'flex', 'justifyContent': 'center' }}>
                <Spinner size="large" />
              </div>) :
              (<DateModal loading={loading} selectedDates={selectedDates} setSelectedDates={setSelectedDates}
              />)
            }
          </Layout.Section>
          <Layout.Section>
            <Layout>
              {posts.map((post) => {
                if (post.image) {
                  return (
                    <Layout.Section oneThird>
                      <Photo post={post} focusedPhoto={focusedPhoto} setFocusedPhoto={setFocusedPhoto} />
                    </Layout.Section>
                  );
                }
              })}
            </Layout>
          </Layout.Section>
          <Layout.Section>
            {posts.length === 0 ? null :
              (<div style={{ 'display': 'flex', 'justifyContent': 'center' }}>
                <Button primary loading={loading} onClick={incrementDate}>Load more</Button>
              </div>)}
          </Layout.Section>
        </Layout>
      </Page>
    </AppProvider>
  );
}

export default App;
