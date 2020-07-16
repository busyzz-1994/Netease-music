import React, {
  memo,
  useState,
  forwardRef,
  useRef,
  useImperativeHandle,
} from 'react';
import styles from './index.module.scss';
import { CSSTransition } from 'react-transition-group';
import classNames from 'classnames';
interface ConfirmProps {
  onConfirm?: () => void;
  onCancel?: () => void;
  content?: string;
  onConfirmText?: string;
  onCancelText?: string;
}
export interface ConfirmInstanceProps {
  show?: () => void;
  hide?: () => void;
}
const Confirm = forwardRef<ConfirmInstanceProps, ConfirmProps>((props, ref) => {
  const [show, setShow] = useState(false);
  const backgroundRef = useRef<HTMLDivElement>();
  const confirmRef = useRef<HTMLDivElement>();
  const { onConfirm, onCancel, onCancelText, onConfirmText, content } = props;
  const handle = (status: boolean) => {
    if (status) {
      onConfirm();
    } else {
      onCancel();
    }
    setShow(false);
  };
  useImperativeHandle(ref, () => ({
    show() {
      setShow(true);
    },
    hide() {
      setShow(false);
    },
  }));
  return (
    <CSSTransition
      timeout={300}
      classNames={'playerList-fade'}
      in={show}
      appear={true}
      onEnter={() => {
        backgroundRef.current.style.display = 'block';
      }}
      onExited={() => {
        backgroundRef.current.style.display = 'none';
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        ref={backgroundRef}
        className={styles.background}
      >
        <div>
          <div
            ref={confirmRef}
            className={classNames(styles.confirm, 'confirm-zoom')}
          >
            <div className={styles.content}>{content}</div>
            <div className={styles.handle}>
              <div onClick={() => handle(false)} className={styles.cancel}>
                {onCancelText}
              </div>
              <div onClick={() => handle(true)} className={styles.ok}>
                {onConfirmText}
              </div>
            </div>
          </div>
        </div>
      </div>
    </CSSTransition>
  );
});
const noop = () => {};
Confirm.defaultProps = {
  onCancel: noop,
  onConfirm: noop,
  onConfirmText: '确认',
  onCancelText: '取消',
  content: '',
};
export default memo(Confirm);
