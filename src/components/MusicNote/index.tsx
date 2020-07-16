import React, {
  memo,
  useImperativeHandle,
  useRef,
  useEffect,
  useMemo,
  forwardRef,
} from 'react';
import ReactDOM from 'react-dom';
import { prefixStyle, getTransitionEndName } from 'utils/index';
import { ReactComponent as MusicIcon } from 'assets/icon/musicNote.svg';
import styles from './index.module.scss';
type Position = { x: number; y: number };
export interface MusicNoteProps {
  startAnimate?: ({ x, y }: Position) => void;
}
const MusicNote = forwardRef<MusicNoteProps>((props, ref) => {
  const iconsRef = useRef<Array<HTMLDivElement>>();
  iconsRef.current = [];
  const transitionName = useMemo(() => prefixStyle('transform'), []);
  useEffect(() => {
    iconsRef.current.forEach((dom) => {
      let transitionEndName = getTransitionEndName();
      dom.addEventListener(transitionEndName, function () {
        this.setAttribute('runing', 'false');
        this.style.top = 0;
        this.style.left = 0;
        this.style.display = 'none';
        this.style[transitionName] = 'translate3d(0, 0, 0)';
        const icon = dom.querySelector('div');
        icon.style[transitionName] = 'translate3d(0, 0, 0)';
      });
    });
  }, [iconsRef, transitionName]);
  const startAnimate = ({ x, y }: Position) => {
    for (let i = 0; i < iconsRef.current.length; i++) {
      let dom = iconsRef.current[i];
      const runing = dom.getAttribute('runing');
      console.log('target', { x, y });
      if (runing === 'false' || runing === null) {
        dom.style.left = x + 'px';
        dom.style.top = y + 'px';
        console.log('dsdsdoooo');
        dom.style.display = 'inline-block';
        console.log(dom.style.top);
        setTimeout(() => {
          dom.setAttribute('runing', 'true');
          dom.style[transitionName] = 'translate3d(0, 1000px, 0)';
          const icon = dom.querySelector('div');
          icon.style[transitionName] = 'translate3d(-30px, 0, 0)';
        }, 20);
        break;
      }
    }
  };
  useImperativeHandle(ref, () => ({
    startAnimate,
  }));
  const ele = (
    <div>
      {[1, 2, 3].map((item) => {
        return (
          <div
            key={item}
            ref={(node) => {
              iconsRef.current.push(node);
            }}
            className={styles['music-box']}
          >
            <div className={styles['music-icon']}>
              <MusicIcon style={{ width: 24 }} />
            </div>
          </div>
        );
      })}
    </div>
  );
  return ReactDOM.createPortal(ele, document.body);
});
export default memo(MusicNote);
