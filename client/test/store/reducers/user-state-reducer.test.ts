import { expect } from 'chai';

import userStateReducer from 'store/reducers/user-state-reducer';
import { userActionTypes, sharedActionTypes } from 'store/action-types';


describe('user state reducer', () => {
  it('processes login actions', () => {
    const oldState = {};
    const user = { id: 1, email: 'foo@bar.com' };
    const action = { type: userActionTypes.LOGIN, data: user };

    const newState = userStateReducer(oldState, action);

    expect(newState.id).to.equal(user.id);
    expect(newState.email).to.equal(user.email);
  });

  it('processes logout actions', () => {
    const oldState = { id: 1, email: 'foo@bar.com' };
    const action = { type: sharedActionTypes.LOGOUT };

    const newState = userStateReducer(oldState, action);

    expect(newState.id).not.to.exist;
    expect(newState.email).not.to.exist;
  });

  it('ignores other actions', () => {
    const oldState = { id: 1, email: 'foo@bar.com' };
    const action = { type: 'another/action', data: { foo: 'bar' } };

    const newState = userStateReducer(oldState, action);

    expect(oldState).to.equal(newState);
  });
});
