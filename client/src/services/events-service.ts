import kyClient from 'services/base';
import { Event } from 'types/models';

// gotta coerce dates here somehow
const createEvent = (startDate, endDate, title?: string, description?: string): Promise<Event> => {
  return new Promise<Event>((resolve, reject) => {
    const data = { event: { startDate, endDate, title, description } };
    kyClient.post('events', { json: data }).json()
      .then((event) => resolve(event))
      .catch((error) => error.response.json())
      .then((messages) => reject(messages));
  });
};

const fetchEvent = (id: number): Promise<Event> => {
  return new Promise<Event>((resolve, reject) => {
    kyClient.get('events/' + id).json()
    .then((event) => resolve(event))
    .catch((error) => error.response.json())
    .then((messages) => reject(messages));
  });
};

const fetchEvents = (): Promise<Array<Event>> => {
  return new Promise<Array<Event>>((resolve, reject) => {
    kyClient.get('events').json()
      .then((events) => resolve(events))
      .catch((error) => error.response.json())
      .then((messages) => reject(messages));
  });
};


export default { createEvent, fetchEvent, fetchEvents };
