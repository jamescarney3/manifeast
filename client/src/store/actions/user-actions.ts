import { userActionTypes, sharedActionTypes } from 'store/action-types';
import { User } from 'types/models';
import { Action } from 'types/store';


export const signIn = (user: User): Action<User> => {
  return { type: userActionTypes.LOGIN, data: user };
};

export const signOut = (): Action => {
  return { type: sharedActionTypes.LOGOUT };
};


export default { signIn, signOut };
