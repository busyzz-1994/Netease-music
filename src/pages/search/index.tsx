/*
 * @Author: busyzz
 * @Date: 2020-07-16 09:53:39
 * @Description:
 */
import React, {
  FC,
  memo,
  useState,
  useEffect,
  useCallback,
  ChangeEvent,
  useRef,
} from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getSuggestList } from 'stores/actionCreaters/search';
import {
  changeMiniPlayerStatus,
  changeCurrentSong,
  changePlayerStatus,
} from 'stores/actionCreaters/player';
import { RootState } from 'stores';
import styles from './index.module.scss';
import { CSSTransition } from 'react-transition-group';
import { getHotList } from 'stores/actionCreaters/search';
import { HotItem } from 'models';
import { useDebounce } from 'hooks';
import BScroll from 'components/BScroll';
import { getName } from 'utils';
import api from 'api';
import MusicNote, { MusicNoteProps } from 'components/MusicNote';
import { Song } from 'models';
import { ReactComponent as Left } from 'assets/icon/left.svg';
import { ReactComponent as CloseIcon } from 'assets/icon/close.svg';
const noop = () => {};
//搜索栏
interface SearchBarProps {
  onBack?: () => any;
  value?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onClean?: () => void;
}
const SearchBar: FC<SearchBarProps> = memo(
  ({ onBack, value, onChange, onClean }) => {
    return (
      <div className={styles['search']}>
        <div onClick={onBack} className={styles['search-back']}>
          <Left className={styles['search-back-icon']} />
        </div>
        <div className={styles['search-box']}>
          <input
            value={value}
            onChange={onChange}
            placeholder="输入歌曲、歌手名称"
          />
        </div>
        <div onClick={onClean} className={styles['search-icon']}>
          <CloseIcon className={styles['search-icon-btn']} />
        </div>
      </div>
    );
  }
);
SearchBar.defaultProps = {
  onBack: noop,
};
//热门搜索板块
interface HotSearchProps {
  list: HotItem[];
  onClick?: (value?: string) => any;
}
const HotSearch: FC<HotSearchProps> = memo(({ list, onClick }) => {
  return (
    <div className={styles.hot}>
      <div className={styles['hot-title']}>热门搜索</div>
      <div className={styles['hot-list']}>
        {list.map((item) => {
          return (
            <div
              onClick={() => onClick(item.first)}
              key={item.first}
              className={styles['hot-item']}
            >
              {item.first}
            </div>
          );
        })}
      </div>
    </div>
  );
});
interface SearchProps {}
const Search: FC<SearchProps> = () => {
  const [show, setShow] = useState(false);
  const [showHot, setShowHot] = useState(true);
  const [searchValue, setSearchValue] = useState('');
  const MusicNoteRef = useRef<MusicNoteProps>();
  const { hotList, artists, songsList } = useSelector(
    (state: RootState) => state.search
  );
  const dispath = useDispatch();
  const history = useHistory();
  //设置进场动画
  useEffect(() => {
    if (hotList.length === 0) {
      dispath(getHotList());
    }
    setShow(true);
  }, [dispath, hotList.length]);
  //点击返回
  const onBack = useCallback(() => {
    setShow(false);
  }, []);
  //输入input
  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    setSearchValue(val);
  }, []);
  //选中热门搜索
  const onHotClick = useCallback((val) => {
    setSearchValue(val);
  }, []);
  //点击搜索
  const onSearch = useDebounce(() => {
    dispath(getSuggestList(searchValue));
    if (searchValue) {
      setShowHot(false);
    }
  });
  //清楚输入内容
  const onClean = useCallback(() => {
    setSearchValue('');
  }, []);
  //搜索输入框变化时，发起请求
  useEffect(() => {
    if (searchValue) {
      onSearch();
    } else {
      setShowHot(true);
    }
  }, [searchValue, dispath, onSearch]);
  //选择歌曲
  const selectSong = async (e, song?: Song) => {
    const x = e.clientX,
      y = e.clientY;
    const result = await api.getDetailSong({ ids: song.id });
    const currentSong = result.songs[0];
    MusicNoteRef.current.startAnimate({ x, y });
    dispath(changeMiniPlayerStatus(true));
    dispath(changePlayerStatus(true));
    dispath(changeCurrentSong(currentSong));
  };
  //相关的歌手
  const renderArtists = () => {
    return (
      <div className={styles.artists}>
        <div className={styles['artists-title']}>相关歌手</div>
        {artists.map((singer) => {
          return (
            <div
              onClick={() => history.push(`/singers/${singer.id}`)}
              key={singer.id}
              className={styles['artists-info']}
            >
              <div className={styles['artists-img']}>
                <img src={singer.picUrl} alt={singer.name} />
              </div>
              <div className={styles['artists-text']}>
                <div>歌手：{singer.name}</div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };
  //搜索出来的歌曲
  const renderSongs = () => {
    return (
      <div className={styles.songs}>
        {songsList.map((song) => {
          return (
            <div
              key={song.id}
              onClick={(e) => selectSong(e, song)}
              className={styles['songs-item']}
            >
              <div className={styles['songs-item-name']}>{song.name}</div>
              <div className={styles['songs-item-sub']}>
                {getName(song.artists)} - {song.album.name}
              </div>
            </div>
          );
        })}
      </div>
    );
  };
  //搜索出来的内容
  const renderSearchContent = () => {
    return (
      <BScroll refresh={true}>
        <div className={styles['search-content']}>
          {renderArtists()}
          {renderSongs()}
        </div>
      </BScroll>
    );
  };
  return (
    <CSSTransition
      timeout={300}
      in={show}
      classNames="search-slide"
      unmountOnExit
      appear
      onExited={() => history.goBack()}
    >
      <div className={styles.container}>
        <SearchBar
          onClean={onClean}
          onChange={onChange}
          value={searchValue}
          onBack={onBack}
        />
        <div className={styles.content}>
          {showHot ? (
            <HotSearch onClick={onHotClick} list={hotList} />
          ) : (
            renderSearchContent()
          )}
        </div>
        <MusicNote ref={MusicNoteRef} />
      </div>
    </CSSTransition>
  );
};
export default memo(Search);
