import React, { FC, memo, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'stores';
import styles from './index.module.scss';
import { ReactComponent as MusicListIcon } from 'assets/icon/musiclist.svg';
import { ReactComponent as MusicPlayingIcon } from 'assets/icon/play.svg';
import { ReactComponent as MusicPausedIcon } from 'assets/icon/pause.svg';
import {
  changePlayerStatus,
  changeDetailPlayerStatus,
  changePlayerList,
} from 'stores/actionCreaters/player';
import { getName } from 'utils';
import classNames from 'classnames';
import ProcessCircle from 'components/ProcessCircle';
interface PlayerProps {
  process?: number;
}
const Player: FC<PlayerProps> = ({ process }) => {
  const { showMiniPlayer, playStatus, currentSong } = useSelector(
    (state: RootState) => state.player
  );
  const dispatch = useDispatch();
  const miniPlayerRef = useRef<HTMLDivElement>();
  const { name, ar, al, album, artists } = currentSong;
  const onPaused = () => {
    dispatch(changePlayerStatus(false));
  };
  const onRecover = () => {
    dispatch(changePlayerStatus(true));
  };
  const openDetailPlayer = () => {
    dispatch(changeDetailPlayerStatus(true));
  };
  const openPlayerList = () => {
    dispatch(changePlayerList(true));
  };
  return (
    <CSSTransition
      classNames={'mini-player'}
      in={showMiniPlayer}
      timeout={300}
      onEnter={() => {
        miniPlayerRef.current.style.display = 'flex';
      }}
      onExited={() => {
        miniPlayerRef.current.style.display = 'none';
      }}
    >
      <div ref={miniPlayerRef} className={styles.container}>
        <div className={styles.icon}>
          <div className={styles.imgWrapper}>
            <img
              className={classNames({
                [styles.paused]: playStatus !== 'runing',
              })}
              src={al.picUrl}
              alt="-"
            />
          </div>
        </div>
        <div onClick={openDetailPlayer} className={styles.text}>
          <div className={styles.name}>{name}</div>
          <div className={styles.desc}>
            {ar ? getName(ar) : getName(artists)} - {al ? al.name : album.name}
          </div>
        </div>
        <div className={styles.control}>
          <ProcessCircle radius={34} percent={process}>
            {playStatus === 'runing' ? (
              <MusicPausedIcon onClick={onPaused} />
            ) : (
              <MusicPlayingIcon onClick={onRecover} />
            )}
          </ProcessCircle>
        </div>
        <div className={styles.list}>
          <MusicListIcon onClick={openPlayerList} />
        </div>
      </div>
    </CSSTransition>
  );
};

export default memo(Player);
