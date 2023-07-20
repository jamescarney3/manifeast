import { Event, Meal } from 'types/models';
import { StoreState } from 'types/store';

import { findEvent } from 'store/accessors/events-accessors';


export const findMealsByEventId = (state: StoreState) => (id: number | string): Array<Meal> => {
  const event: Event = findEvent(state)(id);
  return state.meals.allIds
    .map((mealId) => state.meals.byIds[mealId])
    .filter((meal) => meal.eventId === event.id);
};

export const findMeal = (state: StoreState) => (id: number) => {
  return state.meals.byIds[id];
};


export default { findMealsByEventId, findMeal };
