import React, { FC, memo, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Album, Song } from 'models';
import {
  changeMiniPlayerStatus,
  changeCurrentSong,
  changePlayerStatus,
  changePlayerContent,
} from 'stores/actionCreaters/player';
import styles from './index.module.scss';
import classNames from 'classnames';
import { getName } from 'utils';
import { ReactComponent as PlusIcon } from 'assets/icon/plus.svg';
import { ReactComponent as PlayIcon } from 'assets/icon/video.svg';
import MusicNote, { MusicNoteProps } from 'components/MusicNote';
interface SongsListProps {
  tracks: Album['tracks'];
}
const SongsList: FC<SongsListProps> = ({ tracks }) => {
  const MusicNoteRef = useRef<MusicNoteProps>();
  const dispath = useDispatch();
  const selectSong = (e, song?: Song) => {
    const x = e.clientX,
      y = e.clientY;
    MusicNoteRef.current.startAnimate({ x, y });
    dispath(changeMiniPlayerStatus(true));
    dispath(changePlayerStatus(true));
    dispath(changeCurrentSong(song));
    dispath(changePlayerContent(tracks));
  };
  return (
    <div className={styles.container}>
      <div className={styles['play-all']}>
        <div
          className={styles['player']}
          onClick={(e) => selectSong(e, tracks[0])}
        >
          <PlayIcon style={{ width: 20 }} />
          <div>播放全部</div>
          <div className={styles.subtext}>(共{tracks.length}首)</div>
        </div>
        <div className={styles.collect}>
          <PlusIcon className={styles.icon} />
          <span>{`收藏(2)万`}</span>
        </div>
      </div>
      {tracks.map((song, index) => {
        const { id, name, ar, al, album, artists } = song;
        return (
          <div
            onClick={(e) => selectSong(e, song)}
            key={id}
            className={styles['item']}
          >
            <div className={styles['item-index']}>{index + 1}</div>
            <div className={styles['item-info']}>
              <div className={styles['item-name']}>{name}</div>
              <div
                className={classNames(styles['item-sub'], styles['subtext'])}
              >
                {ar ? getName(ar) : getName(artists)} -{' '}
                {al ? al.name : album.name}
              </div>
            </div>
          </div>
        );
      })}
      <MusicNote ref={MusicNoteRef} />
    </div>
  );
};
export default memo(SongsList);
