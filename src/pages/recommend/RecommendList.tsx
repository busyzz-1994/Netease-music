import React, { FC, memo, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { Recommend } from 'models';
import { playCountChange } from 'utils';
import LazyLoad from 'react-lazyload';
import styles from './index.module.scss';
import musicPlaceholder from 'assets/images/music.png';
interface RecommendItemProps {
  item: Recommend;
}
const RecommendItem: FC<RecommendItemProps> = memo(({ item }) => {
  let history = useHistory();
  let { picUrl, playCount, name, id } = item;
  const toAlbum = useCallback(() => {
    history.push(`/recommend/${id}`);
  }, [id, history]);
  return (
    <div className={styles.item}>
      <div className={styles.box} onClick={toAlbum}>
        <div className={styles.content}>
          <div className={styles['item-mask']}></div>
          <div className={styles['item-title']}>
            {playCountChange(playCount)}
          </div>
          <LazyLoad
            placeholder={
              <img
                width="100%"
                height="100%"
                src={musicPlaceholder}
                alt="music"
              />
            }
          >
            <img src={picUrl + '?param=300x300'} alt={name} />
          </LazyLoad>
        </div>
      </div>
      <div className={styles.name}>{name}</div>
    </div>
  );
});

interface RecommendListProps {
  recommendList: Array<Recommend>;
}
const RecommendList: FC<RecommendListProps> = ({ recommendList }) => {
  return (
    <div className={styles['recommendList-container']}>
      <div className={styles.title}>推荐歌单</div>
      <div className={styles.list}>
        {recommendList.map((item) => (
          <RecommendItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};
export default memo(RecommendList);
