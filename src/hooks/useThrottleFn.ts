import { useRef, useCallback } from 'react';
type noop = (...args: any[]) => any;
export default <T extends noop>(fn: T, delay: number = 500) => {
  const fnRef = useRef(fn);
  fnRef.current = fn;
  const timeRef = useRef<any>();
  return useCallback(
    (...args) => {
      if (!timeRef.current) {
        timeRef.current = Date.now();
        return fnRef.current(...args);
      } else {
        let currentTime = Date.now();
        let diff = currentTime - timeRef.current;
        if (diff >= delay) {
          timeRef.current = currentTime;
          return fnRef.current(...args);
        }
      }
    },
    [delay]
  );
};
