import React, {
  memo,
  FC,
  useState,
  useEffect,
  useCallback,
  CSSProperties,
  useMemo,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './index.module.scss';
import { CSSTransition } from 'react-transition-group';
import { useHistory, useParams } from 'react-router-dom';
import { RootState } from 'stores';
import { getAlbumDetail } from 'stores/actionCreaters/album';
import Header from 'components/Header';
import AlbumDetail from 'components/AlbumDetail';
import BScorll, { ScrollPosistion } from 'components/BScroll';
import MiniPlayerGasket from 'components/MiniPlayerGasket';
import { themeColor } from 'config/ui';
interface AlbumProps {}
const Album: FC<AlbumProps> = () => {
  const [showStatus, setShowStatus] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  const { albumDetail } = useSelector((state: RootState) => state.album);
  const dispath = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const goBack = useCallback(() => {
    setShowStatus(false);
  }, [setShowStatus]);
  const onScroll = useCallback((posi: ScrollPosistion) => {
    setScrollY(posi.y);
  }, []);
  useEffect(() => {
    //获取专辑详情
    dispath(getAlbumDetail({ id }));
  }, [id, dispath]);
  const HeaderStyle: CSSProperties = {
    opacity: Math.abs(scrollY / 140),
    backgroundColor: themeColor,
  };
  const BScrollChild = useMemo(
    () => (
      <div>
        <AlbumDetail detail={albumDetail} />
        <MiniPlayerGasket />
      </div>
    ),
    [albumDetail]
  );
  return (
    <CSSTransition
      appear
      in={showStatus}
      timeout={300}
      onExited={() => history.goBack()}
      classNames="rotate"
      unmountOnExit
    >
      <div className={styles.container}>
        <Header
          title={scrollY < -50 ? albumDetail.name : ''}
          style={scrollY < 0 ? HeaderStyle : {}}
          ismarquee={scrollY < -50}
          onBack={goBack}
        />
        <BScorll bounceTop={false} onScroll={onScroll}>
          {BScrollChild}
        </BScorll>
      </div>
    </CSSTransition>
  );
};
export default memo(Album);
