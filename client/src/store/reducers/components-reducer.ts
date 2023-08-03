import { componentsActionTypes, sharedActionTypes } from 'store/action-types';
import { storeUtils } from 'utils';

import { Component } from 'types/models';
import { Action, NormalizedStoreResource } from 'types/store';
import { Meal } from 'types/models';


// named export becuase this needs to get passed directly to useReducer
export const componentsInitialState: NormalizedStoreResource<Meal> = {
  allIds: [],
  byIds: {},
};

const reducer = (
  state: NormalizedStoreResource<Component>,
  action: Action<Array<Component> | Component>,
): NormalizedStoreResource<Component> => {
  const { type, data } = action;
  switch(type) {
    case componentsActionTypes.ADD_COMPONENTS: {
      const components = data;
      return storeUtils.mergeResources<Component>(state, components as Array<Component>);
    }
    case componentsActionTypes.ADD_COMPONENT: {
      const component = data;
      return storeUtils.mergeResource<Component>(state, component as Component);
    }
    case componentsActionTypes.UPDATE_COMPONENT: {
      const component = data;
      return storeUtils.updateResource<Component>(state, component);
    }
    case componentsActionTypes.REMOVE_COMPONENT: {
      const { id } = data;
      return storeUtils.removeResource<Component>(state, id);
    }
    case sharedActionTypes.LOGOUT: {
      return componentsInitialState;
    }
    default: {
      return state;
    }
  }
};


export default reducer;
