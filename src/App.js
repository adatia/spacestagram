import React from 'react';
import { useState, useEffect } from 'react';
import '@shopify/polaris/build/esm/styles.css';
import en from '@shopify/polaris/locales/en.json';
import { AppProvider, Page, Layout, Spinner, DisplayText } from '@shopify/polaris';
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
  console.log(posts.length);

  const getResults = async () => {
    const startDate = selectedDates.start.getFullYear() + '-' + (selectedDates.start.getMonth() + 1) + '-' + selectedDates.start.getDate();
    const endDate = selectedDates.end.getFullYear() + '-' + (selectedDates.end.getMonth() + 1) + '-' + selectedDates.end.getDate();

    const url = `https://api.nasa.gov/planetary/apod?start_date=${startDate}&end_date=${endDate}&api_key=${API_KEY}`;

    const res = await axios.get(url);

    if (res?.data) {
      const results = res.data.map((item) => {
        return {
          title: item.title,
          date: item.date,
          description: item.explanation,
          imageUrl: item.url,
          image: item.media_type === 'image'
        }
      });

      setPosts(results);
    };
  }

  useEffect(() => {
    getResults();
  }, [selectedDates]);

  return (
    <AppProvider i18n={en}>
      <Page title="Spacestagram" subtitle="Brought to you by NASA's Astronomy Photo of the Day (APOD) API">
        <Layout sectioned>
          <Layout.Section>
            <DateModal selectedDates={selectedDates} setSelectedDates={setSelectedDates}
            />
          </Layout.Section>
          {posts.length === 0 ?
            (<Layout.Section>
              <DisplayText size="extraLarge">Loading...</DisplayText>
              <Spinner size="large" />
            </Layout.Section>) : null}
          <Layout.Section>
            {posts.map((post) => {
              if (post.image) {
                return <Photo post={post} />;
              }
            })}
          </Layout.Section>
        </Layout>
      </Page>
    </AppProvider>
  );
}

export default App;
