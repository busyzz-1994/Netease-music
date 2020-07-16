import React, { FC, memo } from 'react';
import styles from './index.module.scss';
interface LoadingMoreProps {
  //是否显示loading
  show: boolean;
  //是否已经是最后一条
  isEnd?: boolean;
}
const LoadingMore: FC<LoadingMoreProps> = ({ show, isEnd }) => {
  const loading = show && (
    <div className={styles.container}>
      <div className={styles.loading}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div>加载中...</div>
    </div>
  );
  const end = isEnd ? (
    <div className={styles.container}>
      <div>没有更多了</div>
    </div>
  ) : (
    loading
  );
  return end;
};

export default memo(LoadingMore);
