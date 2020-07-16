import React, {
  FC,
  Fragment,
  memo,
  useState,
  useEffect,
  useCallback,
  useRef,
} from 'react';
import MiniPlayer from './MiniPlayer';
import PlayerDetail from './PlayerDetail';
import PlayerList from './List';
import { useSelector, useDispatch } from 'react-redux';
import { changeCurrentSong } from 'stores/actionCreaters/player';
import { RootState } from 'stores';
import { getSongUrlById } from 'utils/index';
interface PlayerProps {}
const Player: FC<PlayerProps> = () => {
  const [duration, setDuration] = useState(0);
  const [process, setProcess] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const { currentSong, playStatus, playList, playType } = useSelector(
    (state: RootState) => state.player
  );
  const audioRef = useRef<HTMLAudioElement>();
  const dispatch = useDispatch();
  //切换歌曲后，重新设置src
  useEffect(() => {
    if (!currentSong) return;
    const songSrc = getSongUrlById(currentSong.id);
    audioRef.current.src = songSrc;
    audioRef.current.autoplay = true;
    audioRef.current.playbackRate = 1;
  }, [currentSong]);
  //切换播放状态
  useEffect(() => {
    if (playStatus === 'runing') {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [playStatus]);
  //播放中的回调
  const onTimeUpdate = (e) => {
    const currentTime = e.target.currentTime;
    if (duration > 0) {
      const process = currentTime / duration;
      setCurrentTime(currentTime);
      setProcess(process);
    }
  };
  //可以播放滚动回调
  const onCanPlay = (e) => {
    setDuration(e.target.duration);
  };
  //播放一首歌 结束后的回调
  const onEnded = () => {
    if (playType === 'loop') {
      if (playList.length) {
        const currentSongId = currentSong.id;
        let targetIndex = 0;
        const playListLen = playList.length;
        const currentSongIndex = playList.findIndex(
          (item) => item.id === currentSongId
        );
        if (currentSongIndex === playListLen - 1) {
          targetIndex = 0;
        } else {
          targetIndex = currentSongIndex + 1;
        }
        dispatch(changeCurrentSong(playList[targetIndex]));
      } else {
        audioRef.current.play();
      }
    } else {
      audioRef.current.play();
    }
  };
  //移动进度条事件
  const onMove = useCallback((process) => {
    audioRef.current.currentTime = audioRef.current.duration * process;
  }, []);
  return (
    <Fragment>
      <PlayerDetail
        duration={duration}
        process={process}
        currentTime={currentTime}
        onMove={onMove}
      />
      <MiniPlayer process={process} />
      <PlayerList />
      <audio
        onEnded={onEnded}
        onCanPlay={onCanPlay}
        onTimeUpdate={onTimeUpdate}
        ref={audioRef}
      />
    </Fragment>
  );
};
export default memo(Player);
