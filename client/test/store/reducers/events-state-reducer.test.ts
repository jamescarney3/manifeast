import { expect } from 'chai';

import eventsStateReducer, { eventsInitialState } from 'store/reducers/events-reducer';
import { eventsActionTypes, sharedActionTypes } from 'store/action-types';
import { Action } from 'types/store';
import { Event } from 'types/models';


describe('events state reducer', () => {
  it('processes add event actions', () => {
    const oldState = eventsInitialState;
    const event = { id: 1 } as unknown as Event;

    const action = { type: eventsActionTypes.ADD_EVENT, data: event };

    const newState = eventsStateReducer(oldState, action);

    expect(newState.allIds).to.include(event.id);
    expect(newState.byIds[event.id]).to.equal(event);
  });

  it('processes add events actions', () => {
    const oldState = eventsInitialState;
    const fooEvent = { id: 1 } as unknown as Event;
    const barEvent = { id: 2 } as unknown as Event;

    const action = { type: eventsActionTypes.ADD_EVENTS, data: [fooEvent, barEvent] };

    const newState = eventsStateReducer(oldState, action);

    expect(newState.allIds).to.include(fooEvent.id);
    expect(newState.allIds).to.include(barEvent.id);
    expect(newState.byIds[fooEvent.id]).to.equal(fooEvent);
    expect(newState.byIds[barEvent.id]).to.equal(barEvent);
  });

  it('processes logout actions', () => {
    const oldState = {
      allIds: [1],
      byIds: { [1]: { id: 1 } as unknown as Event },
    };
    const action = { type: sharedActionTypes.LOGOUT };

    const newState = eventsStateReducer(oldState, action);

    expect(newState.allIds).to.be.empty;
    expect(newState.byIds).to.be.empty;
  });

  it('ignores other actions', () => {
    const oldState = eventsInitialState;
    const action = { type: 'another/action', data: { foo: 'bar' } } as unknown as Action<Event>;

    const newState = eventsStateReducer(oldState, action);

    expect(oldState).to.equal(newState);
  });
});
