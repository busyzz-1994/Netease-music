import React, { memo, FC } from 'react';
import styles from './index.module.scss';
import { Album } from 'models';
import { playCountChange } from 'utils';
import { ReactComponent as ZanIcon } from 'assets/icon/star.svg';
import { ReactComponent as CommentIcon } from 'assets/icon/pinglun.svg';
import { ReactComponent as PlusIcon } from 'assets/icon/plus.svg';
import { ReactComponent as MoreIcon } from 'assets/icon/more1.svg';
import SongsList from 'components/SongsList';
interface AlbumDetailProps {
  detail: Album;
}
const AlbumDetail: FC<AlbumDetailProps> = ({ detail }) => {
  const {
    coverImgUrl,
    subscribedCount,
    name,
    creator: { avatarUrl, nickname },
    tracks,
  } = detail;
  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <div
          className={styles.background}
          style={{ backgroundImage: `url(${coverImgUrl})` }}
        >
          <div></div>
        </div>
        <div className={styles['info-wrapper']}>
          <div className={styles['img-wrapper']}>
            <div className={'decorate'}></div>
            <img src={coverImgUrl} alt="-" />
            <div className={styles['play-count']}>
              {playCountChange(subscribedCount)}
            </div>
          </div>
          <div className={styles['desc-wrapper']}>
            <div>{name}</div>
            <div className={styles['person']}>
              <img src={avatarUrl} alt="--" />
              <span>{nickname}</span>
            </div>
          </div>
        </div>
        <div className={styles.handle}>
          <div className={styles['handle-item']}>
            <div>
              <CommentIcon className={styles['handle-icon']} />
            </div>
            <div>评论</div>
          </div>
          <div className={styles['handle-item']}>
            <div>
              <ZanIcon className={styles['handle-icon']} />
            </div>
            <div>点赞</div>
          </div>
          <div className={styles['handle-item']}>
            <div>
              <PlusIcon className={styles['handle-icon']} />
            </div>
            <div>收藏</div>
          </div>
          <div className={styles['handle-item']}>
            <div>
              <MoreIcon className={styles['handle-icon']} />
            </div>
            <div>更多</div>
          </div>
        </div>
      </div>
      <SongsList tracks={tracks} />
    </div>
  );
};
export default memo(AlbumDetail);
