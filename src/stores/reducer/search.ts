/*
 * @Author: busyzz
 * @Date: 2020-07-16 11:10:09
 * @Description:
 */

/*
 * @Author: busyzz
 * @Date: 2020-07-15 14:36:01
 * @Description:
 */
import product from 'immer';
import { HotItem, Album, Singer, Song } from 'models';
import * as actionType from '../actionCreaters/search';
interface SearchState {
  hotList: HotItem[];
  albums: Album[];
  artists: Singer[];
  songsList: Song[];
}
// 推荐
const initialState: SearchState = {
  hotList: [],
  albums: [],
  artists: [],
  songsList: [],
};
export default (state = initialState, action) => {
  return product(state, (draft) => {
    switch (action.type) {
      case actionType.HOT_LIST:
        draft.hotList = action.payload;
        break;
      case actionType.SEARCH_ALBUMS_ARTISTS:
        draft.albums = action.payload.albums;
        draft.artists = action.payload.artists;
        break;
      case actionType.SEARCH_SONGS_LIST:
        draft.songsList = action.payload;
        break;
    }
  });
};
