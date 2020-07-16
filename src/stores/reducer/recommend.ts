import product from 'immer';
import { Banner, Recommend } from 'models';
import * as actionType from '../actionCreaters/recommend';
interface RecommendState {
  bannerList: Array<Banner>;
  recommendList: Array<Recommend>;
}
// 推荐
const initialState: RecommendState = {
  bannerList: [],
  recommendList: [],
};
export default (state = initialState, action) => {
  return product(state, (draft) => {
    switch (action.type) {
      case actionType.BANNERLIST:
        draft.bannerList = action.payload;
        break;
      case actionType.RECOMMENDLIST:
        draft.recommendList = action.payload;
        break;
    }
  });
};
