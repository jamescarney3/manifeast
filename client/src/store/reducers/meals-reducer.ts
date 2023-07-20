import { mealsActionTypes, sharedActionTypes } from 'store/action-types';
import { storeUtils } from 'utils';

import { Meal } from 'types/models';
import { Action, NormalizedStoreResource } from 'types/store';


// named export becuase this needs to get passed directly to useReducer
export const mealsInitialState: NormalizedStoreResource<Meal> = {
  allIds: [],
  byIds: {},
};

const reducer = (
  state: NormalizedStoreResource<Meal>,
  action: Action<Array<Meal> | Meal>,
) => {
  const { type, data } = action;
  switch(type) {
    case mealsActionTypes.ADD_MEALS: {
      const meals = (data as Array<Meal>).map((meal) => {
        return storeUtils.normalizeResource(meal, 'components');
      });
      return storeUtils.mergeResources<Meal>(state, meals as Array<Meal>);
    }
    case mealsActionTypes.ADD_MEAL: {
      const meal = storeUtils.normalizeResource(data, 'components');
      return storeUtils.mergeResource<Meal>(state, meal as Meal);
    }
    case mealsActionTypes.REMOVE_MEAL: {
      const { id } = data;
      return storeUtils.removeResource<Meal>(state, id);
    }
    case sharedActionTypes.LOGOUT: {
      return mealsInitialState;
    }
    default: {
      return state;
    }
  }
};


export default reducer;
