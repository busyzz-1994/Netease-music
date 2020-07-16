import React, { FC, memo, useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  changeDetailPlayerStatus,
  changePlayerStatus,
  changePlayerType,
  getLyric,
  changePlayerList,
  changeCurrentSong,
} from 'stores/actionCreaters/player';
import { RootState } from 'stores';
import { CSSTransition } from 'react-transition-group';
import styles from './index.module.scss';
import { getName, secToString } from 'utils';
import { ReactComponent as ArrowDownIcon } from 'assets/icon/arrowdown.svg';
import classNames from 'classnames';
import LyricParser from 'utils/lyric-parser';
//icon
import { ReactComponent as MusicList } from 'assets/icon/music-list.svg';
import { ReactComponent as MusicNext } from 'assets/icon/music-next.svg';
import { ReactComponent as MusicPrev } from 'assets/icon/music-prev.svg';
import { ReactComponent as MusicPaused } from 'assets/icon/music-paused.svg';
import { ReactComponent as MusicPlaying } from 'assets/icon/music-playing.svg';
import { ReactComponent as MusicLoop } from 'assets/icon/loop.svg';
import { ReactComponent as MusicSingle } from 'assets/icon/single.svg';
interface PlayerDetailProps {
  currentTime: number;
  process: number;
  duration: number;
  onMove: (process: number) => void;
}
const PlayerDetail: FC<PlayerDetailProps> = ({
  currentTime,
  process,
  duration,
  onMove,
}) => {
  const {
    showDetailPlayer,
    playStatus,
    currentSong,
    lyric,
    playType,
    playList,
  } = useSelector((state: RootState) => state.player);
  const { name, ar, al, album, artists } = currentSong;
  const containerRef = useRef<HTMLDivElement>();
  const barRef = useRef<HTMLDivElement>();
  const dotRef = useRef<HTMLDivElement>();
  const barMaskRef = useRef<HTMLDivElement>();
  const [moveLock, setMoveLock] = useState(false);
  const [barRect, setBarRect] = useState<Partial<ClientRect>>({
    top: 0,
    width: 0,
    left: 0,
  });
  const lyricParserInstance = useRef<LyricParser>();
  const [currentLyric, setCurrentLyric] = useState('');
  const dispatch = useDispatch();
  const closePlayerDetail = () => {
    dispatch(changeDetailPlayerStatus(false));
  };
  const onChangePlayerStatus = () => {
    const status = playStatus !== 'runing';
    dispatch(changePlayerStatus(status));
  };
  const onChangePlayType = (type) => {
    dispatch(changePlayerType(type));
  };
  //获取歌词
  useEffect(() => {
    dispatch(getLyric(currentSong.id));
  }, [currentSong.id, dispatch]);
  //解析歌词
  useEffect(() => {
    lyricParserInstance.current = new LyricParser(lyric);
  }, [lyric]);
  //设置当前的歌词
  useEffect(() => {
    if (lyricParserInstance.current) {
      let currentLyric = lyricParserInstance.current.getCurrentLyric(
        currentTime * 1000
      );
      setCurrentLyric(currentLyric);
    }
  }, [currentTime]);
  //计算bar的宽度和位置
  const computedBar = () => {
    const barRect = barRef.current.getBoundingClientRect();
    setBarRect(barRect);
  };
  //打开歌曲列表
  const openPlayerList = () => {
    dispatch(changePlayerList(true));
  };
  //切换歌曲
  const onChangeSong = (handle: 'next' | 'prev') => {
    if (playList.length) {
      const currentSongId = currentSong.id;
      let targetIndex = 0;
      const playListLen = playList.length;
      const currentSongIndex = playList.findIndex(
        (item) => item.id === currentSongId
      );
      if (handle === 'next') {
        if (currentSongIndex === playListLen - 1) {
          targetIndex = 0;
        } else {
          targetIndex = currentSongIndex + 1;
        }
      } else {
        if (currentSongIndex === 0) {
          targetIndex = playListLen - 1;
        } else {
          targetIndex = currentSongIndex - 1;
        }
      }
      dispatch(changeCurrentSong(playList[targetIndex]));
    }
  };
  //监听进度条滑动事件
  useEffect(() => {
    let process = 0;
    const move = (e: TouchEvent) => {
      const clientX = e.changedTouches[0].clientX;
      const { left, right, width } = barRect;
      if (clientX <= left) {
        process = 0;
      } else if (clientX >= right) {
        process = 1;
      } else {
        const diff = clientX - left;
        process = diff / width;
      }
      setMoveLock(true);
      barMaskRef.current.style.width = `${process * 100}%`;
      dotRef.current.style.left = `${process * width - 15}px`;
    };
    const func = () => {
      document.body.addEventListener('touchmove', move);
    };
    const end = () => {
      setMoveLock(false);
      onMove(process);
    };
    const onClickBar = (e: MouseEvent) => {
      const pageX = e.pageX;
      const { left, width } = barRect;
      const diffX = pageX - left;
      onMove(diffX / width);
    };
    const dotDom = dotRef.current;
    dotDom.addEventListener('touchstart', func);
    dotDom.addEventListener('touchend', end);
    dotDom.addEventListener('click', onClickBar);
    return () => {
      dotDom.removeEventListener('touchstart', func);
      dotDom.removeEventListener('touchend', end);
      dotDom.removeEventListener('click', onClickBar);
      document.body.removeEventListener('touchmove', move);
    };
  }, [barRect, onMove]);

  const dotStyle: React.CSSProperties = {
    left: `${process * barRect.width - 15}px`,
  };
  const iconStyle: React.CSSProperties = {
    height: 40,
    width: 40,
  };
  return (
    <CSSTransition
      onEnter={() => (containerRef.current.style.display = 'block')}
      onEntered={computedBar}
      onExited={() => (containerRef.current.style.display = 'none')}
      classNames={'rotate'}
      timeout={300}
      in={showDetailPlayer}
    >
      <div ref={containerRef} className={styles.container}>
        {/* background */}
        <div
          className={styles.background}
          style={{ backgroundImage: `url(${al.picUrl})` }}
        ></div>
        <div className={styles.backgroundMask}></div>
        {/* header */}
        <div className={styles.header}>
          <div onClick={closePlayerDetail} className={styles.iconWrapper}>
            <div className={styles.icon}>
              <ArrowDownIcon />
            </div>
          </div>
          <div className={styles.info}>
            <div className={styles.title}>{name}</div>
            <div className={styles.subTitle}>
              {ar ? getName(ar) : getName(artists)} -{' '}
              {al ? al.name : album.name}
            </div>
          </div>
        </div>
        {/* content */}
        <div className={styles.content}>
          {/* content 图片 */}
          <div className={styles['content-pic']}>
            <div
              className={classNames(styles['content-pic-needle'], {
                [styles.paused]: playStatus === 'paused',
              })}
            ></div>
            <div
              className={styles['content-pic-disc']}
              onClick={onChangePlayerStatus}
            >
              <img
                className={classNames({
                  [styles.paused]: playStatus === 'paused',
                })}
                src={al.picUrl}
                alt="-"
              />
            </div>
            <div className={styles['content-pic-lyric']}>{currentLyric}</div>
          </div>
        </div>
        {/* bottom */}
        <div className={styles['handler']}>
          <div className={styles['progress-wrapper']}>
            <div className={styles['progress-time']}>
              {secToString(currentTime)}
            </div>
            <div className={styles['progress']}>
              <div ref={barRef} className={styles['progress-bar']}>
                <div className={styles['progress-bar-bg']}></div>
                <div
                  ref={barMaskRef}
                  style={
                    moveLock
                      ? {}
                      : {
                          width: `${process * 100}%`,
                        }
                  }
                  className={styles['progress-bar-mask']}
                ></div>
                <div
                  ref={dotRef}
                  style={moveLock ? {} : dotStyle}
                  className={styles['progress-bar-dot']}
                >
                  <div className={styles['progress-bar-btn']}></div>
                </div>
              </div>
            </div>
            <div className={styles['progress-time']}>
              {secToString(duration)}
            </div>
          </div>
          <div className={styles['btn-container']}>
            <div>
              {playType === 'loop' ? (
                <MusicLoop
                  onClick={() => onChangePlayType('single')}
                  style={iconStyle}
                />
              ) : (
                <MusicSingle
                  onClick={() => onChangePlayType('loop')}
                  style={iconStyle}
                />
              )}
            </div>
            <div>
              <MusicPrev
                onClick={() => onChangeSong('prev')}
                style={iconStyle}
              />
            </div>
            <div onClick={onChangePlayerStatus}>
              {playStatus === 'paused' ? (
                <MusicPaused style={iconStyle} />
              ) : (
                <MusicPlaying style={iconStyle} />
              )}
            </div>
            <div>
              <MusicNext
                onClick={() => onChangeSong('next')}
                style={iconStyle}
              />
            </div>
            <div>
              <MusicList style={iconStyle} onClick={openPlayerList} />
            </div>
          </div>
        </div>
      </div>
    </CSSTransition>
  );
};
export default memo(PlayerDetail);
