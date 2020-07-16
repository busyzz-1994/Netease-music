/*
 * @Author: busyzz
 * @Date: 2020-05-29 09:55:50
 * @Description:
 */
import { combineReducers } from 'redux';
import recommend from './recommend';
import album from './album';
import player from './player';
import singer from './singer';
import rank from './rank';
import search from './search';
export default combineReducers({
  recommend,
  album,
  player,
  singer,
  rank,
  search,
});
