import { Component } from 'types/models';
import { StoreState } from 'types/store';


export const findComponentsByMealId = (state: StoreState) => (mealId: number): Array<Component> => {
  return state.components.allIds
    .map((componentId) => state.components.byIds[componentId])
    .filter((component) => component.mealId === mealId);
};

export default { findComponentsByMealId };
