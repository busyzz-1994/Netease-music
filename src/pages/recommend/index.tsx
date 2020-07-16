import React, { FC, useEffect, useMemo, memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { renderRoutes, RouteConfig } from 'react-router-config';
import { RootState } from 'stores';
import {
  getBannerList,
  getRecommendList,
} from 'stores/actionCreaters/recommend';
import BScroll from 'components/BScroll';
import styles from './index.module.scss';
import Slider from './Slider';
import RecommendList from './RecommendList';
import { forceCheck } from 'react-lazyload';
import { useThrottleFn } from 'hooks';
import MiniPlayerGasket from 'components/MiniPlayerGasket';
interface RecommendProps extends RouteConfig {}
const Recommend: FC<RecommendProps> = ({ route }) => {
  const { bannerList, recommendList } = useSelector(
    (state: RootState) => state.recommend
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (!bannerList.length) {
      dispatch(getBannerList());
    }
    if (!recommendList.length) {
      dispatch(getRecommendList());
    }
  }, [bannerList.length, recommendList.length, dispatch]);
  const BScrollChild = useMemo(
    () => (
      <div>
        <Slider bannerList={bannerList} />
        <RecommendList recommendList={recommendList} />
        <MiniPlayerGasket />
      </div>
    ),
    [bannerList, recommendList]
  );
  return (
    <div className={styles.container}>
      <BScroll onScroll={useThrottleFn(forceCheck)}>{BScrollChild}</BScroll>
      {renderRoutes(route.routes)}
    </div>
  );
};
export default memo(Recommend);
