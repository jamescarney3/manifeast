import { expect } from 'chai';

import { findEvent, getAllEvents } from 'store/accessors/events-accessors';
import { StoreState } from 'types/store';


describe('events accessors module', () => {
  const state = {
    events: {
      allIds: [1, 2, 3],
      byIds: {
        [1]: { id: 1, editToken: 'foo-token-123' },
        [2]: { id: 2, editToken: 'bar-token-456' },
        [3]: { id: 3, editToken: 'baz-token-789' },
      },
    },
  } as unknown as StoreState;

  describe('findEvent', () => {
    it('returns an event matching a given id', () => {
      const event = findEvent(state)(1);
      expect(event.id).to.equal(1);
    });

    it('returns an event matching a given edit token', () => {
      const event = findEvent(state)('bar-token-456');
      expect(event.id).to.equal(2);
    });

    it('returns undefined given a nonexistent id', () => {
      const event = findEvent(state)(4);
      expect(event).not.to.exist;
    });
  });

  describe('getAllEvents', () => {
    it('returns all events', () => {
      const events = getAllEvents(state)();
      expect(events.map((e) => e.id)).to.include(1);
      expect(events.map((e) => e.id)).to.include(2);
      expect(events.map((e) => e.id)).to.include(3);
    });
  });
});
