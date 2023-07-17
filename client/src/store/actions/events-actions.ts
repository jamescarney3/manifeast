import { eventsActionTypes } from 'store/action-types';
import { Event } from 'types/models';
import { Action } from 'types/store';


export const addEvent = (event: Event): Action<Event> => {
  return { type: eventsActionTypes.ADD_EVENT, data: event };
};

export const addEvents = (events: Array<Event>): Action<Array<Event>> => {
  return { type: eventsActionTypes.ADD_EVENTS, data: events };
};


export default { addEvent, addEvents };
