import React, {
  useState,
  useRef,
  useEffect,
  useImperativeHandle,
  memo,
  forwardRef,
} from 'react';
import BScroll from 'better-scroll';
import styles from './index.module.scss';
import { useDebounce } from 'hooks';
export type ScrollPosistion = {
  x?: number;
  y?: number;
};
interface BScrollProps {
  direction?: 'horizental' | 'vertical';
  click?: boolean;
  bounceTop?: boolean;
  bounceBottom?: boolean;
  refresh?: boolean;
  children: React.ReactElement;
  onScroll?: (position?: ScrollPosistion) => void;
  onPullUp?: () => void;
}
export interface BScrollInstanceProps {
  getScroll?: () => BScroll;
}
const BScrollComponent = forwardRef<BScrollInstanceProps, BScrollProps>(
  (
    {
      direction,
      click,
      bounceTop,
      bounceBottom,
      children,
      refresh,
      onScroll,
      onPullUp,
    },
    ref
  ) => {
    const [scroll, setScroll] = useState(null);
    const scrollRef = useRef();
    const scrollContaninerRef = useRef();
    const debouncePullUp = useDebounce(onPullUp, 300);
    useEffect(() => {
      const scroll = new BScroll(scrollContaninerRef.current, {
        scrollX: direction === 'horizental',
        scrollY: direction === 'vertical',
        probeType: 3,
        click: click,
        bounce: {
          top: bounceTop,
          bottom: bounceBottom,
        },
      });
      setScroll(scroll);
      scrollRef.current = scroll;
      return () => {
        setScroll(null);
      };
    }, [bounceTop, bounceBottom, click, direction]);
    //监听滚动事件
    useEffect(() => {
      if (!scroll || !onScroll) return;
      scroll.on('scroll', onScroll);
      return () => {
        scroll.off('scroll', onScroll);
      };
    }, [scroll, onScroll]);
    useEffect(() => {
      if (refresh && scroll) {
        scroll.refresh();
      }
    });
    //监听滑动到最底部,上拉事件
    useEffect(() => {
      if (!scroll || !onPullUp) return;
      const onPullUpDebounce = () => {
        //是否滑动到底部
        if (scroll.y <= scroll.maxScrollY + 100) {
          debouncePullUp();
        }
      };
      scroll.on('scrollEnd', onPullUpDebounce);
      return () => {
        scroll.off('scrollEnd', onPullUpDebounce);
      };
    }, [scroll, onPullUp, debouncePullUp]);
    useImperativeHandle(ref, () => ({
      getScroll() {
        return scrollRef.current;
      },
    }));
    return (
      <div ref={scrollContaninerRef} className={styles.container}>
        {children}
      </div>
    );
  }
);
const noop = () => {};
BScrollComponent.defaultProps = {
  direction: 'vertical',
  click: true,
  bounceTop: true,
  bounceBottom: true,
  refresh: true,
  onScroll: noop,
};
export default memo(BScrollComponent);
