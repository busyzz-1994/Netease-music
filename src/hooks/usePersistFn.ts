/*
 * @Author: busyzz
 * @Date: 2020-07-16 15:09:17
 * @Description:
 */
import { useCallback, useRef } from 'react';
type noop = (...args: any[]) => any;
export default <T extends noop>(fn: T) => {
  const ref = useRef<any>();
  ref.current = fn;
  const persistFn = useCallback((...args) => ref.current(...args), [ref]);
  return persistFn;
};
