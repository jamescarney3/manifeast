import { Event, User } from 'types/models';

export interface Action<P = void> {
  type: string;
  data?: P;
}

export type NormalizedStoreResource<ResourceType> = {
  allIds: Array<number>,
  byIds: { [key: number]: ResourceType },
}

export type EventsState = NormalizedStoreResource<Event>;

export type StoreState = {
  user: User,
  events: EventsState,
};
