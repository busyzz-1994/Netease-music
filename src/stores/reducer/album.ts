import product from 'immer';
import { Album } from 'models';
import * as actionType from '../actionCreaters/album';
interface AlbumState {
  albumDetail: Album;
}
// 推荐
const initialState: AlbumState = {
  albumDetail: new Album(),
};
export default (state = initialState, action) => {
  return product(state, (draft) => {
    switch (action.type) {
      case actionType.ALBUDETAIL:
        draft.albumDetail = action.payload;
        break;
    }
  });
};
