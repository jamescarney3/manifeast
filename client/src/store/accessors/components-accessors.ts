import { Component } from 'types/models';
import { StoreState } from 'types/store';

import { findEvent } from 'store/accessors/events-accessors';


export const findComponentsByMealId = (state: StoreState) => (mealId: number): Array<Component> => {
  return state.components.allIds
    .map((componentId) => state.components.byIds[componentId])
    .filter((component) => component.mealId === mealId);
};

export const findComponentsByEventId = (state: StoreState) => (eventId: number | string): Array<Component> => {
  // account for lookups by edit token
  const event = findEvent(state)(eventId);
  return state.components.allIds
    .map((componentId) => state.components.byIds[componentId])
    .filter((component) => component.eventId === event.id);
};


export default { findComponentsByMealId, findComponentsByEventId };
