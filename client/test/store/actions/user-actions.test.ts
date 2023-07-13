import { expect } from 'chai';

import { signIn, signOut } from 'store/actions/user-actions';
import { userActionTypes, sharedActionTypes } from 'store/action-types';


const user = { id: 1, email: 'foo@bar.com' };

describe('user actions module', () => {
  describe('signIn', () => {
    it('returns sign in action for given user', () => {
      const action = signIn(user);
      expect(action.type).to.equal(userActionTypes.LOGIN);
      expect(action.data).to.equal(user);
    });
  });

  describe('signIn', () => {
    it('returns a sign out action', () => {
      const action = signOut();
      expect(action.type).to.equal(sharedActionTypes.LOGOUT);
    });
  });
});
