/*
 * @Author: busyzz
 * @Date: 2020-07-13 17:59:09
 * @Description:
 */
import product from 'immer';
import { Singer, Song } from 'models';
import * as actionType from '../actionCreaters/singer';
interface SingerState {
  //查询条件
  searchValue: {
    //分类
    cat: string;
    //首字母
    initial: string;
  };
  //跳过的数量
  offset: number;
  //歌手列表
  singerList: Singer[];
  //加载loading效果
  showLoading: boolean;
  //是否已经是最后一条
  isEnd: boolean;
  //详情显示的歌手
  detailSinger: Singer;
  //当前歌手的热门歌曲
  detailSingerHotSongs: Song[];
}
// 推荐
const initialState: SingerState = {
  searchValue: {
    cat: '',
    initial: '',
  },
  offset: 0,
  singerList: [],
  showLoading: false,
  isEnd: false,
  detailSinger: new Singer(),
  detailSingerHotSongs: [],
};
export default (state = initialState, action) => {
  return product(state, (draft) => {
    switch (action.type) {
      case actionType.SINGER_LIST:
        draft.singerList = action.payload;
        break;
      case actionType.SINGER_LIST_SEARCH:
        draft.searchValue = {
          ...draft.searchValue,
          ...action.payload,
        };
        break;
      case actionType.SINGER_LIST_END:
        draft.isEnd = action.payload;
        break;
      case actionType.SINGER_LIST_CLEAN:
        draft.singerList = [];
        break;
      case actionType.SINGER_LIST_LOADING:
        draft.showLoading = action.payload;
        break;
      case actionType.SINGER_DETAIL:
        draft.detailSinger = action.payload.artist;
        draft.detailSingerHotSongs = action.payload.hotSongs;
        break;
    }
  });
};
