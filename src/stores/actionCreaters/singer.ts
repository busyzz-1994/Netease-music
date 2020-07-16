/*
 * @Author: busyzz
 * @Date: 2020-07-13 17:59:45
 * @Description:
 */
import api from 'api';
//types
export const SINGER_LIST = 'singer/list';
export const SINGER_LIST_SEARCH = 'singer/list-search';
export const SINGER_LIST_CLEAN = 'singer/list-clean';
export const SINGER_LIST_LOADING = 'singer/list-loading';
export const SINGER_LIST_END = 'singer/list-end';
export const SINGER_DETAIL = 'singer/detail';
//creaters
export const changeSingerListSearch = (searchValue) => {
  return {
    type: SINGER_LIST_SEARCH,
    payload: searchValue,
  };
};
export const changeSingerList = (artists) => {
  return {
    type: SINGER_LIST,
    payload: artists,
  };
};
export const cleanSingerList = () => {
  return {
    type: SINGER_LIST_CLEAN,
  };
};
export const toggleSingerListLoading = (status: boolean) => {
  return {
    type: SINGER_LIST_LOADING,
    payload: status,
  };
};
export const toggleSingerListEnd = (status: boolean) => {
  return {
    type: SINGER_LIST_END,
    payload: status,
  };
};
export const setSingerDetail = (detial) => {
  return {
    type: SINGER_DETAIL,
    payload: detial,
  };
};
export const getSingerList = () => {
  return async (dispatch, getState) => {
    let state = getState();
    const { searchValue, singerList } = state.singer;
    const offset = singerList.length;
    dispatch(toggleSingerListLoading(true));
    let data = await api.getSingerListRequest({
      ...searchValue,
      offset,
    });
    const list = [...singerList, ...data.artists];
    dispatch(toggleSingerListLoading(false));
    dispatch(toggleSingerListEnd(!data.more));
    dispatch(changeSingerList(list));
  };
};
export const getSingerDetail = (id) => {
  return async (dispatch) => {
    let data = await api.getSinger({ id });
    dispatch(setSingerDetail(data));
  };
};
