import React, {
  memo,
  FC,
  useState,
  useEffect,
  useCallback,
  CSSProperties,
  useRef,
  useMemo,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './index.module.scss';
import { CSSTransition } from 'react-transition-group';
import { useHistory, useParams } from 'react-router-dom';
import { RootState } from 'stores';
import { getSingerDetail } from 'stores/actionCreaters/singer';
import Header from 'components/Header';
import BScorll, {
  ScrollPosistion,
  BScrollInstanceProps,
} from 'components/BScroll';
import MiniPlayerGasket from 'components/MiniPlayerGasket';
import { themeColor } from 'config/ui';
import SongsList from 'components/SongsList';
import { prefixStyle } from 'utils';
interface SingerDetailProps {}
const Singer: FC<SingerDetailProps> = () => {
  const [showStatus, setShowStatus] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  const imgWrapperRef = useRef<HTMLDivElement>();
  const songListWrapperRef = useRef<HTMLDivElement>();
  const collectRef = useRef<HTMLDivElement>();
  const bscrollRef = useRef<BScrollInstanceProps>();
  const { detailSinger, detailSingerHotSongs } = useSelector(
    (state: RootState) => state.singer
  );
  const dispath = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const { picUrl } = detailSinger;
  const goBack = useCallback(() => {
    setShowStatus(false);
  }, [setShowStatus]);
  const onScroll = useCallback((posi: ScrollPosistion) => {
    const posY = posi.y;
    const imgWrapperHeight = imgWrapperRef.current.offsetHeight;
    const percent = Math.abs(posY / imgWrapperHeight);
    //向上滑动
    if (posY < 0) {
      collectRef.current.style.top = `${imgWrapperHeight - 50 + posY}px`;
      collectRef.current.style.opacity = `${1 - Math.abs(posY / 100)}`;
    } else {
      imgWrapperRef.current.style[prefixStyle('transform')] = `scale(${
        1 + percent
      })`;
      collectRef.current.style.top = `${imgWrapperHeight - 50 + posY}px`;
    }
    if (posY < -100) {
      collectRef.current.style.display = 'none';
    } else {
      collectRef.current.style.display = 'block';
    }
    setScrollY(posY);
  }, []);
  useEffect(() => {
    //获取专辑详情
    dispath(getSingerDetail(id));
  }, [id, dispath]);
  //计算songList-wrapper的位置
  useEffect(() => {
    let top = imgWrapperRef.current.offsetHeight;
    songListWrapperRef.current.style.top = `${top}px`;
    collectRef.current.style.top = `${top - 50}px`;
    bscrollRef.current.getScroll().refresh();
  }, []);
  const HeaderStyle: CSSProperties = {
    opacity: Math.abs(scrollY / 140),
    backgroundColor: themeColor,
  };
  const BScrollChild = useMemo(
    () => (
      <div>
        <SongsList tracks={detailSingerHotSongs} />
        <MiniPlayerGasket />
      </div>
    ),
    [detailSingerHotSongs]
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
          title={detailSinger.name}
          style={scrollY < 0 ? HeaderStyle : {}}
          onBack={goBack}
        />
        <div
          style={{ backgroundImage: `url(${picUrl})` }}
          className={styles['img-wrapper']}
          ref={imgWrapperRef}
        >
          <div className={styles['img-filter']}></div>
        </div>
        <div ref={collectRef} className={styles['collect-button']}>
          收藏
        </div>
        <div ref={songListWrapperRef} className={styles['songList-wrapper']}>
          <BScorll ref={bscrollRef} bounceTop={true} onScroll={onScroll}>
            {BScrollChild}
          </BScorll>
        </div>
      </div>
    </CSSTransition>
  );
};
export default memo(Singer);
