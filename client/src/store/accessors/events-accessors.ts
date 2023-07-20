import { Event } from 'types/models';
import { StoreState } from 'types/store';


export const findEvent = (state: StoreState) => (id: number | string): Event => {
  const idEvent = state.events.byIds[id];
  return idEvent || state.events.allIds
    .map((searchId) => state.events.byIds[searchId])
    .find((event) => event.editToken === id);
};

export const getAllEvents = (state) => (): Array<Event> => {
  const { byIds, allIds } = state.events;
  return allIds.map((id) => byIds[id]);
};


export default { findEvent, getAllEvents };
