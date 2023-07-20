import { eventsActionTypes, sharedActionTypes } from 'store/action-types';
import { storeUtils } from 'utils';

import { Event } from 'types/models';
import { Action, NormalizedStoreResource } from 'types/store';


// named export becuase this needs to get passed directly to useReducer
export const eventsInitialState: NormalizedStoreResource<Event> = {
  allIds: [],
  byIds: {},
};

const reducer = (
  state: NormalizedStoreResource<Event>,
  action: Action<Array<Event> | Event>,
) => {
  const { type, data } = action;
  switch(type) {
    case eventsActionTypes.ADD_EVENTS: {
      const events = (data as Array<Event>).map((event) => {
        return storeUtils.normalizeResource(event, 'meals');
      });
      return storeUtils.mergeResources<Event>(state, events);
    }
    case eventsActionTypes.ADD_EVENT: {
      const event = storeUtils.normalizeResource(data, 'meals');
      return storeUtils.mergeResource<Event>(state, event as Event);
    }
    case sharedActionTypes.LOGOUT: {
      return eventsInitialState;
    }
    default: {
      return state;
    }
  }
};


export default reducer;
