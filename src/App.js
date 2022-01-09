import React from 'react';
import { useState, useEffect } from 'react';
import '@shopify/polaris/build/esm/styles.css';
import en from '@shopify/polaris/locales/en.json';
import { AppProvider, Page, Layout, Card } from '@shopify/polaris';
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

  useEffect(() => {
    console.log(selectedDates);
  }, [selectedDates]);

  return (
    <AppProvider i18n={en}>
      <Page title="Spacestagram" subtitle="Brought to you by NASA's Astronomy Photo of the Day (APOD) API">
        <Layout sectioned>
          <Layout.Section>
            <DateModal selectedDates={selectedDates} setSelectedDates={setSelectedDates}
            />
          </Layout.Section>
          <Layout.Section>
            <Photo />
          </Layout.Section>
        </Layout>
      </Page>
    </AppProvider>
  );
}

export default App;
