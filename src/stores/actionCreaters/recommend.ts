import api from 'api';
//types
export const BANNERLIST = 'home/recommend/BANNERLIST';
export const RECOMMENDLIST = 'home/recommend/RECOMMENDLIST';
//creaters
export const changeBannerList = (banners) => {
  return {
    type: BANNERLIST,
    payload: banners,
  };
};
export const changeRecommendList = (recommends) => {
  return {
    type: RECOMMENDLIST,
    payload: recommends,
  };
};
export const getBannerList = () => {
  return async (dispatch) => {
    let data = await api.getBannerList();
    dispatch(changeBannerList(data.banners));
  };
};
export const getRecommendList = () => {
  return async (dispatch) => {
    let data = await api.getRrcommendList();
    dispatch(changeRecommendList(data.result));
  };
};
