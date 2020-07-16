import React, { FC, memo, useEffect } from 'react';
import styles from './index.module.scss';
import BScroll from 'components/BScroll';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'stores';
import { getRankList } from 'stores/actionCreaters/rank';
import { filterIndex } from 'utils';
import { useHistory } from 'react-router-dom';
import { Album } from 'models';
interface ImgItemProps {
  album: Album;
  style?: React.CSSProperties;
  onClick?: (album?: Album) => any;
}
const ImgItem: FC<ImgItemProps> = ({ album, style, onClick }) => {
  const handleClick = () => {
    if (onClick) {
      onClick(album);
    }
  };
  return (
    <div
      style={style}
      onClick={handleClick}
      className={styles['official-item-img-wrapper']}
    >
      <img src={album.coverImgUrl} alt="" />
      <div className="decorate"></div>
      <div className={styles['official-item-img-text']}>
        {album.updateFrequency}
      </div>
    </div>
  );
};
interface ListItemProps {
  album: Album;
  style?: React.CSSProperties;
}
const ListItem: FC<ListItemProps> = memo(({ album, style }) => {
  const history = useHistory();
  const onChangeAlbum = (id) => {
    history.push(`/recommend/${id}`);
  };
  return (
    <div
      onClick={() => onChangeAlbum(album.id)}
      className={styles['official-item']}
      style={style}
    >
      <ImgItem album={album} />
      <div className={styles['official-song-list']}>
        {album.tracks.map((song, index) => {
          return (
            <div key={index} className={styles['official-song']}>
              {index + 1}. {song.first} - {song.second}
            </div>
          );
        })}
      </div>
    </div>
  );
});
const Rank = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { rankList } = useSelector((state: RootState) => state.rank);
  useEffect(() => {
    if (rankList.length === 0) {
      dispatch(getRankList());
    }
  }, [rankList.length, dispatch]);
  let globalStartIndex = filterIndex(rankList);
  let officialList = rankList.slice(0, globalStartIndex);
  let globalList = rankList.slice(globalStartIndex + 1);
  const onChangeAlbum = (id) => {
    history.push(`/recommend/${id}`);
  };
  return (
    <div className={styles.container}>
      <BScroll>
        <div>
          {/* 官方排行 */}
          <div className={styles.official}>
            <div className={styles['official-title']}>官方榜</div>
            <div className={styles['official-content']}>
              {officialList.map((item, index) => {
                return <ListItem key={index} album={item} />;
              })}
            </div>
          </div>
          <div className={styles.global}>
            <div className={styles['global-title']}>全球</div>
            <div className={styles['global-content']}>
              {globalList.map((item, index) => {
                return (
                  <ImgItem
                    style={{
                      width: '32vw',
                      height: '32vw',
                      marginBottom: 6,
                    }}
                    key={index}
                    album={item}
                    onClick={(album) => onChangeAlbum(album.id)}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </BScroll>
    </div>
  );
};

export default memo(Rank);
