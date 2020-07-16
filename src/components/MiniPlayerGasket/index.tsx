import React, { FC, memo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'stores';
import styles from './index.module.scss';
interface Props {}
const MiniPlayerGasket: FC<Props> = () => {
  const { showMiniPlayer } = useSelector((state: RootState) => state.player);
  return showMiniPlayer && <div className={styles.container}></div>;
};
export default memo(MiniPlayerGasket);
