import { eventsActionTypes, sharedActionTypes } from 'store/action-types';
import { storeUtils } from 'utils';

import { Event } from 'types/models';
import { Action, NormalizedStoreResource } from 'types/store';


// named export becuase this needs to get passed directly to useReducer
export const eventsInitialState: NormalizedStoreResource<Event> = {
  allIds: [],
  byIds: {},
};

const newReducer = (
  state: NormalizedStoreResource<Event>,
  action: Action<Array<Event> | Event>,
) => {
  const { type, data } = action;
  switch(type) {
    case eventsActionTypes.ADD_EVENTS:
      return storeUtils.mergeResources<Event>(state, data as Array<Event>);
    case eventsActionTypes.ADD_EVENT:
      return storeUtils.mergeResource<Event>(state, data as Event);
    case sharedActionTypes.LOGOUT:
      return eventsInitialState;
    default:
      return state;
  }
};


export default newReducer;
