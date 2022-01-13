import React from 'react'
import { useState, useCallback } from 'react';
import { DatePicker, Button, Modal } from '@shopify/polaris';
import moment from 'moment';

function DateModal({ selectedDates, setSelectedDates }) {
  const [active, setActive] = useState(false);
  const [tempDates, setTempDates] = useState(selectedDates);

  const handleChange = useCallback(
    () => {
      setActive(!active);
      setTempDates(selectedDates);
      setDate({ month: selectedDates.start.getMonth(), year: selectedDates.start.getFullYear() });
    },
    [active, selectedDates],
  );

  const handleDateChange = useCallback(
    () => {
      setSelectedDates(tempDates);
      setDate({ month: tempDates.start.getMonth(), year: tempDates.start.getFullYear() });
      setActive(!active);
    },
    [active, setSelectedDates, tempDates],
  );

  const activator = <Button onClick={handleChange}>Select a Date Range</Button>;

  const [{ month, year }, setDate] = useState({ month: selectedDates.start.getMonth(), year: selectedDates.start.getFullYear() });

  const handleMonthChange = useCallback(
    (month, year) => setDate({ month, year }),
    [],
  );

  return (
    <div>
      <Modal
        activator={activator}
        open={active}
        onClose={handleChange}
        title="Select a date range"
        primaryAction={{
          content: 'Confirm',
          onAction: handleDateChange,
        }}
      >
        <Modal.Section>
          <DatePicker
            month={month}
            year={year}
            onChange={setTempDates}
            onMonthChange={handleMonthChange}
            selected={tempDates}
            allowRange
            disableDatesAfter={new Date(moment().format('ddd MMM DD YYYY'))}
          />
        </Modal.Section>
      </Modal>
    </div>
  );
}

export default DateModal