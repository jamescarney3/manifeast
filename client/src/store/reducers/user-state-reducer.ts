import { userActionTypes, sharedActionTypes } from 'store/action-types';

import { User } from 'types/models';


type UserState = Record<string, never> | User;

const reducer = (state, action): UserState => {
  const { type, data = {} } = action;
  switch (type) {
    case userActionTypes.LOGIN:
      return { ...state, ...data };
    case sharedActionTypes.LOGOUT:
      return {};
    default:
      return state;
  }
};

export default reducer;
