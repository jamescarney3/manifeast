const DEBOUNCE_TIMEOUT = 500;


// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Callable = (...args: [any]) => any; // debounce shouldn't care about args/return

export const debounce = <T extends Callable>(cb: T, timeout = DEBOUNCE_TIMEOUT): T => {
  let timer;
  return ((...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      cb(...args);
    }, timeout);
  }) as T;
};


export default { debounce };
