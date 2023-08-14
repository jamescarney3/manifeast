import { expect } from 'chai';
import { useFakeTimers, spy } from 'sinon';

import { debounce } from 'utils/lang-utils';


describe('lang utils module', () => {

  describe('debounce', () => {
    let clock;
    // consider this part of the spec and implement in util module rather than
    // importing from the util module since the util module should not share it
    // with anything else that is meant to call debounce
    const DEBOUNCE_TIMEOUT = 500;

    beforeEach(() => {
      clock = useFakeTimers();
    });

    afterEach(() => {
      clock.restore();
    });

    it('calls its callback with arbitrary args after default debounce timeout', () => {
      const cb = spy();
      const debouncedIncrementFoo = debounce(cb);
      const args = [1, 2, 3, 'foo', 'bar', true];

      debouncedIncrementFoo(...args);
      clock.tick(DEBOUNCE_TIMEOUT / 2);
      expect(cb.called).to.be.false;
      clock.tick(DEBOUNCE_TIMEOUT / 2);
      expect(cb.calledOnceWith(...args)).to.be.true;
    });

    it('debounces multiple calls to callback', () => {
      const cb = spy();
      const debouncedIncrementFoo = debounce(cb);
      const [firstArg, secondArg, thirdArg] = [1, 2, 3]; // arbitrary values

      debouncedIncrementFoo(firstArg);
      debouncedIncrementFoo(secondArg);
      debouncedIncrementFoo(thirdArg);

      clock.tick(DEBOUNCE_TIMEOUT + 10);
      expect(cb.calledWith(firstArg)).to.be.false;
      expect(cb.calledWith(secondArg)).to.be.false;
      expect(cb.calledOnceWith(thirdArg)).to.be.true;
    });
  });
});
