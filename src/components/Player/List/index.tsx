import React, { FC, memo, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  changePlayerList,
  delPlayerContent,
  changeMiniPlayerStatus,
  changePlayerStatus,
  changeCurrentSong,
  changePlayerType,
} from 'stores/actionCreaters/player';
import { RootState } from 'stores';
import styles from './index.module.scss';
import Confirm, { ConfirmInstanceProps } from 'components/Confirm';
import { CSSTransition } from 'react-transition-group';

import { getName } from 'utils';
import BScroll from 'components/BScroll';
import { ReactComponent as MusicLoop } from 'assets/icon/loop.svg';
import { ReactComponent as MusicSingle } from 'assets/icon/single.svg';
import { ReactComponent as MusicDel } from 'assets/icon/del.svg';

interface PlayerListProps {}
const PlayerList: FC<PlayerListProps> = () => {
  const [canTouch, setCanTouch] = useState(true);
  const [startY, setStartY] = useState(0);
  const [distance, setDistance] = useState(0);
  const playerListWrapperRef = useRef<HTMLDivElement>();
  const playerListRef = useRef<HTMLDivElement>();
  const delListConfirm = useRef<ConfirmInstanceProps>();
  const { showPlayerList, playType, playList, currentSong } = useSelector(
    (state: RootState) => state.player
  );
  const dispath = useDispatch();
  const onClosePlayerList = () => {
    dispath(changePlayerList(false));
  };
  const onListClick = (e) => {
    e.stopPropagation();
  };
  const onChangeSong = (song) => {
    dispath(changeMiniPlayerStatus(true));
    dispath(changePlayerStatus(true));
    dispath(changeCurrentSong(song));
  };
  const onDelPlayListItem = (id: number | 'all') => {
    dispath(delPlayerContent(id));
  };
  const showConfirm = () => {
    delListConfirm.current.show();
  };
  const onChangePlayType = (mode: 'single' | 'loop') => {
    dispath(changePlayerType(mode));
  };
  const onTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!canTouch) return;
    const startY = e.targetTouches[0].pageY;
    setStartY(startY);
  };
  const onTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!canTouch) return;
    const endY = e.targetTouches[0].pageY;
    const dis = endY - startY;
    setDistance(dis);
    if (dis > 0) {
      playerListRef.current.style.transform = `translate3d(0, ${distance}px, 0)`;
    }
  };
  const onTouchEnd = () => {
    if (distance > 150) {
      dispath(changePlayerList(false));
    } else {
      playerListRef.current.style.transform = `translate3d(0, 0, 0)`;
    }
  };
  const onScroll = (posi) => {
    let canTouch = posi.y >= 0;
    setCanTouch(canTouch);
  };
  const iconStyle: React.CSSProperties = {
    width: 20,
    height: 20,
  };
  return (
    <CSSTransition
      classNames={'playerList-fade'}
      in={showPlayerList}
      timeout={300}
      onEnter={() => {
        playerListWrapperRef.current.style.display = 'flex';
        playerListRef.current.style.transform = `translate3d(0, 100%, 0)`;
      }}
      onEntering={() => {
        playerListRef.current.style.transform = `translate3d(0, 0, 0)`;
      }}
      onExiting={() => {
        playerListRef.current.style.transform = `translate3d(0, 100%, 0)`;
      }}
      onExited={() => {
        playerListWrapperRef.current.style.display = 'none';
      }}
    >
      <div
        ref={playerListWrapperRef}
        className={styles['background']}
        onClick={onClosePlayerList}
      >
        <div
          ref={playerListRef}
          onClick={onListClick}
          className={styles['container']}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div className={styles['header']}>
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

            <div>{playType === 'loop' ? '列表循环' : '单曲循环'}</div>
            <div>
              <MusicDel onClick={() => showConfirm()} style={iconStyle} />
            </div>
          </div>
          <div className={styles['body']}>
            <BScroll onScroll={onScroll}>
              <div>
                {playList.map((song) => {
                  const { id, ar, al, album, artists } = song;
                  return (
                    <div
                      onClick={() => onChangeSong(song)}
                      key={id}
                      className={styles['item']}
                    >
                      {currentSong.id === id && (
                        <div className={styles['item-active']}></div>
                      )}
                      <div className={styles['item-text']}>
                        {ar ? getName(ar) : getName(artists)} -{' '}
                        {al ? al.name : album.name}
                      </div>
                      <div className={styles['item-del']}>
                        <MusicDel
                          onClick={(e) => {
                            e.stopPropagation();
                            onDelPlayListItem(id);
                          }}
                          style={iconStyle}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </BScroll>
          </div>
        </div>
        <Confirm
          onConfirm={() => onDelPlayListItem('all')}
          content={'是否清空播放列表？'}
          ref={delListConfirm}
        />
      </div>
    </CSSTransition>
  );
};
export default memo(PlayerList);
