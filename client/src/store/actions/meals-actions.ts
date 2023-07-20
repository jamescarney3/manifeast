import { mealsActionTypes } from 'store/action-types';
import { Meal } from 'types/models';
import { Action } from 'types/store';


export const addMeal = (meal: Meal): Action<Meal> => {
  return { type: mealsActionTypes.ADD_MEAL, data: meal };
};

export const addMeals = (meals: Array<Meal>): Action<Array<Meal>> => {
  return { type: mealsActionTypes.ADD_MEALS, data: meals };
};

export const removeMeal = (id: number): Action<Meal> => {
  return { type: mealsActionTypes.REMOVE_MEAL, data: { id } };
};


export default { addMeal, addMeals, removeMeal };
