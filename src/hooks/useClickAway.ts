/*
 * @Author: busyzz
 * @Date: 2020-07-10 11:10:09
 * @Description:
 */
import { useEffect, useRef, MutableRefObject } from 'react';
type Fn = (event: Event) => void;
const useClickAway = <T extends HTMLElement = HTMLDivElement>(
  onClickAway: Fn
): MutableRefObject<T> => {
  const ref = useRef<T>();
  useEffect(() => {
    const handler = (event) => {
      const el = ref.current;
      if (!el || el.contains(event.target)) {
        return;
      }
      onClickAway(event);
    };
    document.addEventListener('click', handler);
    return () => {
      document.removeEventListener('click', handler);
    };
  }, [onClickAway]);
  return ref;
};

export default useClickAway;
