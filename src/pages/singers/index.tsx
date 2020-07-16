import React, { FC, useEffect, useRef, memo, useCallback } from 'react';
import styles from './index.module.scss';
import BScroll, { BScrollInstanceProps } from 'components/BScroll';
import {
  changeSingerListSearch,
  getSingerList,
  cleanSingerList,
  toggleSingerListEnd,
} from 'stores/actionCreaters/singer';
import { useDispatch, useSelector } from 'react-redux';
import { SearchListType, categoryTypes, alphaTypes } from 'config';
import { RootState } from 'stores';
import classNames from 'classnames';
import LazyLoad, { forceCheck } from 'react-lazyload';
import singerPlaceholder from 'assets/images/singer.png';
import { useThrottleFn } from 'hooks';
import LoadingMore from 'components/LoadingMore';
import { useHistory } from 'react-router-dom';
import { renderRoutes, RouteConfig } from 'react-router-config';
import MiniPlayerGasket from 'components/MiniPlayerGasket';
interface SearchItemProps {
  list?: SearchListType;
  title?: string;
  onChange?: (value: string) => void;
  activeKey?: string;
}
const SearchItem: FC<SearchItemProps> = memo(
  ({ title, list, onChange, activeKey }) => {
    const barRef = useRef<HTMLDivElement>();
    useEffect(() => {
      const bar = barRef.current;
      const child = bar.querySelectorAll('span');
      let width = 0;
      for (let i = 0; i < child.length; i++) {
        width += child[i].offsetWidth;
      }
      barRef.current.style.width = `${width}px`;
    }, []);
    return (
      <BScroll direction="horizental">
        <div ref={barRef} className={styles['search-bar']}>
          <span>{title}</span>
          {list.map((item) => {
            return (
              <span
                className={classNames({
                  [styles.active]: item.key === activeKey,
                })}
                onClick={() => onChange(item.key)}
                key={item.key}
              >
                {item.name}
              </span>
            );
          })}
        </div>
      </BScroll>
    );
  }
);
const noop = () => {};
SearchItem.defaultProps = {
  onChange: noop,
};
interface SingersProps extends RouteConfig {}
const Singers: FC<SingersProps> = ({ route }) => {
  const {
    singerList,
    showLoading,
    isEnd,
    searchValue: { cat, initial },
  } = useSelector((state: RootState) => state.singer);
  const dispatch = useDispatch();
  const history = useHistory();
  const BScrollRef = useRef<BScrollInstanceProps>();
  useEffect(() => {
    dispatch(getSingerList());
  }, [dispatch]);
  const onCategoryChange = (v) => {
    if (v !== cat) {
      dispatch(cleanSingerList());
      dispatch(toggleSingerListEnd(false));
      dispatch(changeSingerListSearch({ cat: v }));
      dispatch(getSingerList());
      BScrollRef.current.getScroll().scrollTo(0, 0);
    }
  };
  const onAlphaTypesChange = (v) => {
    if (v !== initial) {
      dispatch(cleanSingerList());
      dispatch(toggleSingerListEnd(false));
      dispatch(changeSingerListSearch({ initial: v }));
      dispatch(getSingerList());
      BScrollRef.current.getScroll().scrollTo(0, 0);
    }
  };
  const onPullUp = useCallback(() => {
    dispatch(getSingerList());
  }, [dispatch]);
  return (
    <div>
      <div className={styles.search}>
        <SearchItem
          onChange={onCategoryChange}
          title="分类(默认热门):"
          list={categoryTypes}
          activeKey={cat}
        />
        <SearchItem
          onChange={onAlphaTypesChange}
          title="首字母:"
          list={alphaTypes}
          activeKey={initial}
        />
      </div>
      <div className={styles.content}>
        <BScroll
          onPullUp={onPullUp}
          ref={BScrollRef}
          onScroll={useThrottleFn(forceCheck)}
        >
          <div>
            {singerList.map((item) => {
              return (
                <div
                  onClick={() => history.push(`/singers/${item.id}`)}
                  className={styles['singer-item']}
                  key={item.id}
                >
                  <div className={styles['singer-item-img']}>
                    <LazyLoad
                      placeholder={
                        <img
                          width="100%"
                          height="100%"
                          src={singerPlaceholder}
                          alt="music"
                        />
                      }
                    >
                      <img src={item.picUrl + '?param=300x300'} alt="music" />
                    </LazyLoad>
                  </div>
                  <div className={styles['singer-item-text']}>{item.name}</div>
                </div>
              );
            })}
            <LoadingMore isEnd={isEnd} show={showLoading} />
            <MiniPlayerGasket />
          </div>
        </BScroll>
      </div>
      {renderRoutes(route.routes)}
    </div>
  );
};
export default memo(Singers);
