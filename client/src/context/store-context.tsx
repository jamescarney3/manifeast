import { createContext, useMemo, useReducer } from 'react';

import { userStateReducer } from 'store/reducers';
import { userActions } from 'store/actions';
import { userAccessors } from 'store/accessors';


export const userInitialState = {};

const StoreContext = createContext();

export const StoreContextProvider = ({ children }) => {
  const [userState, userDispatch] = useReducer(userStateReducer, userInitialState);

  const state = { user: userState };
  const dispatch = (action): void => {
    [userDispatch].forEach((d) => d(action));
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
  }), [userAccessors, state]);

  return (
    <StoreContext.Provider value={{ ...accessors, ...actions }}>{ children }</StoreContext.Provider>
  );
};


export default StoreContext;
