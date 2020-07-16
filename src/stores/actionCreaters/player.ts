/*
 * @Author: busyzz
 * @Date: 2020-06-05 11:24:03
 * @Description:
 */
import api from 'api';
import { Song } from 'models';
import { PlayType } from '../reducer/player';
//types
//开启/关闭 底部播放器
export const SHOW_MINIPALYER = 'player/showMiniPlayer';
export const HIDE_MINIPALYER = 'player/hideMiniPlayer';
export const SHOW_DETAILPALYER = 'player/showDetailPlayer';
export const HIDE_DETAILPALYER = 'player/hideDetailPlayer';
//开启/关闭 播放器
export const PALYER_ON = 'player/ON';
export const PALYER_OFF = 'player/OFF';
//切换歌曲
export const CHANGE_CURRENT_SONG = 'player/currentSong';
//获取歌词
export const SAVE_LYRIC = 'player/lyric';
//切换播放类型
export const CHANGE_PLAY_TYPE = 'player/playType';
//切换播放列表是否显示
export const CHANGE_PLAYER_LIST = 'player/playerList';
export const CHANGE_PLAYER_CONTENT = 'player/playerListContent';
export const DEL_PLAYER_CONTENT = 'player/playerDelContent';
//actionCreaters
//切换底部播放器知否显示
export const changeMiniPlayerStatus = (status: boolean = true) => {
  return {
    type: status ? SHOW_MINIPALYER : HIDE_MINIPALYER,
  };
};
export const changeDetailPlayerStatus = (status: boolean = true) => {
  return {
    type: status ? SHOW_DETAILPALYER : HIDE_DETAILPALYER,
  };
};
//开始 暂停播放
export const changePlayerStatus = (status: boolean = true) => {
  return {
    type: status ? PALYER_ON : PALYER_OFF,
  };
};
export const changePlayerType = (type: PlayType) => {
  return {
    type: CHANGE_PLAY_TYPE,
    payload: type,
  };
};
//切换当前的歌曲
export const changeCurrentSong = (song: Song | null) => {
  return {
    type: CHANGE_CURRENT_SONG,
    payload: song,
  };
};
//切换播放列表状态
export const changePlayerList = (status: boolean) => {
  return {
    type: CHANGE_PLAYER_LIST,
    payload: status,
  };
};
//切换播放列表内容
export const changePlayerContent = (tracks: Song[]) => {
  return {
    type: CHANGE_PLAYER_CONTENT,
    payload: tracks,
  };
};
//删除播放列表的内容
export const delPlayerContent = (id: number | 'all') => {
  return {
    type: DEL_PLAYER_CONTENT,
    payload: id,
  };
};
//获取歌词
export const getLyric = (id) => {
  return async (dispatch) => {
    const data = await api.getLyric({ id });
    let lyric = (data.lrc && data.lrc.lyric) || '';
    dispatch({
      type: SAVE_LYRIC,
      payload: lyric,
    });
  };
};
