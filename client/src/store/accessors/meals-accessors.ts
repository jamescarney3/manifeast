import { Meal } from 'types/models';
import { StoreState } from 'types/store';


export const findMealsByEventId = (state: StoreState) => (eventId: number | string): Array<Meal> => {
  return state.meals.allIds
    .map((mealId) => state.meals.byIds[mealId])
    .filter((meal) => meal.eventId === eventId);
};

export const findMeal = (state: StoreState) => (id: number) => {
  return state.meals.byIds[id];
};


export default { findMealsByEventId, findMeal };
