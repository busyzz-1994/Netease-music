/*
 * @Author: busyzz
 * @Date: 2020-07-15 14:43:23
 * @Description:
 */
import api from 'api';
//types
export const RANK_LIST = 'rank/list';

//creaters
export const changeRankList = (list) => {
  return {
    type: RANK_LIST,
    payload: list,
  };
};
export const getRankList = () => {
  return async (dispatch) => {
    let data = await api.getTopList();
    dispatch(changeRankList(data.list));
  };
};
