import { createContext, useMemo, useReducer } from 'react';

import { userStateReducer } from 'store/reducers';
import eventsReducer, { eventsInitialState } from 'store/reducers/events-reducer';
import { userActions, eventsActions } from 'store/actions';
import { userAccessors, eventsAccessors } from 'store/accessors';


export const userInitialState = {};

const StoreContext = createContext();

export const StoreContextProvider = ({ children }) => {
  const [userState, userDispatch] = useReducer(userStateReducer, userInitialState);
  const [eventsState, eventsDispatch] = useReducer(eventsReducer, eventsInitialState);

  const state = { user: userState, events: eventsState };
  const dispatch = (action): void => {
    [userDispatch, eventsDispatch].forEach((d) => d(action));
  };

  const bindActionCreators = (actions) => {
    return Object.keys(actions).reduce((boundActionCreators, key) => {
      return {
        ...boundActionCreators,
        [key]: (...args) => dispatch(actions[key](...args)),
      };
    }, {});
  };

  const actions = useMemo(() => ({
    ...bindActionCreators(userActions),
    ...bindActionCreators(eventsActions),
  }), [userActions]);

  const bindAccessors = (accessors) => {
    return Object.keys(accessors).reduce((boundAccessors, key) => {
      return {
        ...boundAccessors,
        [key]: (...args) => accessors[key](state)(...args),
      };
    }, {});
  };

  const accessors = useMemo(() => ({
    ...bindAccessors(userAccessors),
    ...bindAccessors(eventsAccessors),
  }), [userAccessors, state]);

  return (
    <StoreContext.Provider value={{ ...accessors, ...actions }}>{ children }</StoreContext.Provider>
  );
};


export default StoreContext;
