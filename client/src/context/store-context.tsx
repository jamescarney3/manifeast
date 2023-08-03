import { createContext, useMemo, useReducer } from 'react';

import { userStateReducer } from 'store/reducers';
import eventsReducer, { eventsInitialState } from 'store/reducers/events-reducer';
import mealsReducer, { mealsInitialState } from 'store/reducers/meals-reducer';
import componentsReducer, { componentsInitialState } from 'store/reducers/components-reducer';
import { userActions, eventsActions, mealsActions, componentsActions } from 'store/actions';
import { userAccessors, eventsAccessors, mealsAccessors, componentsAccessors } from 'store/accessors';


export const userInitialState = {};

const StoreContext = createContext({});

export const StoreContextProvider = ({ children }) => {
  const [userState, userDispatch] = useReducer(userStateReducer, userInitialState);
  const [eventsState, eventsDispatch] = useReducer(eventsReducer, eventsInitialState);
  const [mealsState, mealsDispatch] = useReducer(mealsReducer, mealsInitialState);
  const [componentsState, componentsDispatch] = useReducer(componentsReducer, componentsInitialState);

  const state = { user: userState, events: eventsState, meals: mealsState, components: componentsState };
  const dispatch = (action): void => {
    [userDispatch, eventsDispatch, mealsDispatch, componentsDispatch].forEach((d) => d(action));
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
    ...bindActionCreators(mealsActions),
    ...bindActionCreators(componentsActions),
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
    ...bindAccessors(mealsAccessors),
    ...bindAccessors(componentsAccessors),
  }), [userAccessors, state]);

  return (
    <StoreContext.Provider value={{ ...accessors, ...actions }}>{ children }</StoreContext.Provider>
  );
};


export default StoreContext;
