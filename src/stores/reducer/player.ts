import product from 'immer';
import * as ActionTypes from '../actionCreaters/player';
import { Song } from 'models';
export type PlayType = 'loop' | 'single';
type playerStateTypes = {
  //是否显示底部播放器
  showMiniPlayer: boolean;
  //是否显示播放详情页
  showDetailPlayer: boolean;
  //是否显示播放列表
  showPlayerList: boolean;
  //播放状态
  playStatus: 'runing' | 'paused';
  //当前的歌曲
  currentSong: Song;
  //歌词
  lyric: string;
  //播放类型
  playType: PlayType;
  //播放列表内容
  playList: Song[];
};
const SongInstance: Song = {
  name: '雨爱(完整版）（翻自 杨丞琳）',
  id: 1447448875,
  // "pst": 0,
  // "t": 0,
  ar: [
    {
      id: 12609062,
      name: '灏灏灏仔',
      // "tns": [],
      // "alias": []
    },
  ],
  // "alia": [],
  // "pop": 100,
  // "st": 0,
  // "rt": "",
  // "fee": 0,
  // "v": 3,
  // "crbt": null,
  // "cf": "",
  al: {
    id: 89274580,
    name: '雨爱（完整版）',
    picUrl:
      'http://p2.music.126.net/iKtYH8QZCcN2AFRMjyf7jg==/109951164980576398.jpg',
    // "tns": [],
    // "pic_str": "109951164980576398",
    // "pic": 109951164980576400
  },
  // "dt": 261549,
  // "h": {
  //   "br": 320000,
  //   "fid": 0,
  //   "size": 10464697,
  //   "vd": -43206
  // },
  // "m": {
  //   "br": 192000,
  //   "fid": 0,
  //   "size": 6278835,
  //   "vd": -40618
  // },
  // "l": {
  //   "br": 128000,
  //   "fid": 0,
  //   "size": 4185905,
  //   "vd": -39120
  // },
  // "a": null,
  // "cd": "01",
  // "no": 1,
  // "rtUrl": null,
  // "ftype": 0,
  // "rtUrls": [],
  // "djId": 0,
  // "copyright": 0,
  // "s_id": 0,
  // "mark": 128,
  // "originCoverType": 0,
  // "noCopyrightRcmd": null,
  // "rtype": 0,
  // "rurl": null,
  // "mst": 9,
  // "cp": 0,
  // "mv": 0,
  // "publishTime": 0
  artists: '',
  album: { name: 'xxx' },
};
const playerState: playerStateTypes = {
  showMiniPlayer: false,
  showDetailPlayer: false,
  showPlayerList: false,
  playStatus: 'paused',
  currentSong: SongInstance || new Song(),
  playList: [],
  lyric: '',
  playType: 'loop',
};
export default (state = playerState, action) => {
  return product(state, (draft) => {
    switch (action.type) {
      case ActionTypes.SHOW_MINIPALYER:
        draft.showMiniPlayer = true;
        break;
      case ActionTypes.HIDE_MINIPALYER:
        draft.showMiniPlayer = false;
        break;
      case ActionTypes.SHOW_DETAILPALYER:
        draft.showDetailPlayer = true;
        break;
      case ActionTypes.HIDE_DETAILPALYER:
        draft.showDetailPlayer = false;
        break;
      case ActionTypes.PALYER_ON:
        draft.playStatus = 'runing';
        break;
      case ActionTypes.PALYER_OFF:
        draft.playStatus = 'paused';
        break;
      case ActionTypes.CHANGE_CURRENT_SONG:
        draft.currentSong = action.payload;
        break;
      case ActionTypes.SAVE_LYRIC:
        draft.lyric = action.payload;
        break;
      case ActionTypes.CHANGE_PLAY_TYPE:
        draft.playType = action.payload;
        break;
      case ActionTypes.CHANGE_PLAYER_LIST:
        draft.showPlayerList = action.payload;
        break;
      case ActionTypes.CHANGE_PLAYER_CONTENT:
        draft.playList = action.payload;
        break;
      case ActionTypes.DEL_PLAYER_CONTENT:
        let delId = action.payload;
        if (delId === 'all') {
          draft.playList = [];
          draft.showMiniPlayer = false;
          draft.showDetailPlayer = false;
          draft.showPlayerList = false;
          draft.playStatus = 'paused';
        } else {
          let currentIndex = -1;
          draft.playList = draft.playList.filter((item, index) => {
            if (item.id === delId) {
              currentIndex = index;
            }
            return item.id !== delId;
          });
          if (delId === draft.currentSong.id) {
            if (draft.playList.length - 1 === currentIndex) {
              currentIndex = 0;
            }
            draft.currentSong = draft.playList[currentIndex];
          }
        }
        break;
    }
  });
};
