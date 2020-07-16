/*
 * @Author: busyzz
 * @Date: 2020-07-15 14:36:01
 * @Description:
 */
import product from 'immer';
import { Album } from 'models';
import * as actionType from '../actionCreaters/rank';
interface RankState {
  rankList: Album[];
}
// 推荐
const initialState: RankState = {
  rankList: [],
};
export default (state = initialState, action) => {
  return product(state, (draft) => {
    switch (action.type) {
      case actionType.RANK_LIST:
        draft.rankList = action.payload;
        break;
    }
  });
};
