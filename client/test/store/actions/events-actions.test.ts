import { expect } from 'chai';

import { addEvent, addEvents } from 'store/actions/events-actions';
import { eventsActionTypes } from 'store/action-types';
import { Event } from 'types/models';




describe('events actions module', () => {
  describe('addEvent', () => {
    it('returns an add event action for given event', () => {
      const fooEvent = {} as unknown as Event;

      const action = addEvent(fooEvent);

      expect(action.type).to.equal(eventsActionTypes.ADD_EVENT);
      expect(action.data).to.equal(fooEvent);
    });
  });

  describe('addEvents', () => {
    it('returns an add events action for given array of users', () => {
      const fooEvent = {} as unknown as Event;
      const barEvent = {} as unknown as Event;

      const action = addEvents([fooEvent, barEvent]);

      expect(action.type).to.equal(eventsActionTypes.ADD_EVENTS);
      expect(action.data.includes(fooEvent)).to.be.true;
      expect(action.data.includes(barEvent)).to.be.true;
    });
  });
});
