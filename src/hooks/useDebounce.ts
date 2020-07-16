/*
 * @Author: busyzz
 * @Date: 2020-07-14 11:19:33
 * @Description:
 */
import { useRef, useCallback } from 'react';
type noop = (...args: any[]) => any;
export default <T extends noop>(fn: T, delay: number = 500) => {
  const fnRef = useRef<T>(fn);
  fnRef.current = fn;
  const timerRef = useRef<any>();
  return useCallback(
    (...args) => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      timerRef.current = setTimeout(() => {
        fnRef.current(...args);
      }, delay);
    },
    [fnRef, delay]
  );
};
