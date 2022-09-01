/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import { DesktopDateTimePicker } from '@mui/x-date-pickers';

interface EventFormProps {
  handleSubmitData: (data: { [key: string]: string | number }) => void;
}
const EventForm: React.FC<EventFormProps> = ({ handleSubmitData }) => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [locationName, setLocationName] = useState('');
  const [locationUrl, setLocationUrl] = useState('');
  const [ticketsUrl, setTicketsUrl] = useState('');

  useEffect(() => {
    if (title.length && date && locationName.length) {
      handleSubmitData({
        Title: title,
        LocationName: locationName,
        Date: date,
        LocationUrl: locationUrl,
        TicketsUrl: ticketsUrl,
      });
    } else {
      handleSubmitData({});
    }
  }, [title, date, locationName, locationUrl, ticketsUrl]);

  return (
    <>
      <TextField
        autoFocus={true}
        margin="dense"
        id="title"
        label="Title"
        type="text"
        fullWidth={true}
        value={title}
        onChange={event => setTitle(event.target.value)}
        variant="standard"
        required={true}
      />

      <DesktopDateTimePicker
        label="Date"
        value={date}
        onChange={(value: any) => setDate(value)}
        renderInput={(params: any) => (
          <TextField {...params} variant="standard" required={true} autoFocus={false} margin="dense" fullWidth={true} />
        )}
      />
      <TextField
        autoFocus={true}
        margin="dense"
        id="location-name"
        label="Location Name"
        type="text"
        fullWidth={true}
        value={locationName}
        onChange={event => setLocationName(event.target.value)}
        variant="standard"
        required={true}
      />
      <TextField
        autoFocus={true}
        margin="dense"
        id="location-url"
        label="Location URL"
        type="text"
        fullWidth={true}
        value={locationUrl}
        onChange={event => setLocationUrl(event.target.value)}
        variant="standard"
        required={true}
      />
      <TextField
        autoFocus={true}
        margin="dense"
        id="ticket-url"
        label="Tickets URL"
        type="text"
        fullWidth={true}
        value={ticketsUrl}
        onChange={event => setTicketsUrl(event.target.value)}
        variant="standard"
        required={true}
      />
    </>
  );
};

export default EventForm;
