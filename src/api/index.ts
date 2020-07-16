/*
 * @Author: busyzz
 * @Date: 2020-03-04 11:25:00
 * @Description:
 */
import request from 'utils/request';

export default {
  getBannerList() {
    return request('/banner');
  },
  getDetailSong(options) {
    return request('/song/detail', options);
  },
  getRrcommendList() {
    return request('/personalized');
  },
  getAlbumDetail(options: { id: string }) {
    return request('/playlist/detail', options);
  },
  getLyric(options: { id: string }) {
    return request('/lyric', options);
  },
  getSingerListRequest(options) {
    return request('/artist/list', options);
  },
  getSinger(options) {
    return request('/artists', options);
  },
  getTopList() {
    return request('/toplist/detail');
  },
  getSearchHot() {
    return request('/search/hot');
  },
  getSuggestListRequest(options) {
    return request('/search/suggest', options);
  },
  getResultSongsListRequest(options) {
    return request('/search', options);
  },
};
