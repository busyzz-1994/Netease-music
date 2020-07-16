import React, { memo, FC, CSSProperties } from 'react';
import styles from './index.module.scss';
import { ReactComponent as Left } from 'assets/icon/left.svg';
interface IProps {
  onBack?: () => void;
  title?: string;
  style?: CSSProperties;
  ismarquee?: boolean;
}
const Header: FC<IProps> = ({ onBack, title, style, ismarquee }) => {
  const relTitle = title ? title : '返回';
  return (
    <div style={style} className={styles.container}>
      <div className={styles.back} onClick={onBack}>
        <Left className={styles.backIcon} />
        {ismarquee ? (
          <div>{relTitle}</div>
        ) : (
          <span className={styles.backText}>{relTitle}</span>
        )}
      </div>
    </div>
  );
};
const noop = () => {};
Header.defaultProps = {
  onBack: noop,
  ismarquee: false,
};
export default memo(Header);
