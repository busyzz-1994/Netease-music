/*
 * @Author: busyzz
 * @Date: 2020-07-16 11:15:42
 * @Description:
 */
import api from 'api';
//types
export const HOT_LIST = 'search/hot-list';
export const SEARCH_ALBUMS_ARTISTS = 'search/albums-artists';
export const SEARCH_SONGS_LIST = 'search/songs-list';
//creaters
export const changeHotList = (list) => {
  return {
    type: HOT_LIST,
    payload: list,
  };
};
export const changeAlbumsArtists = (albumsArtists) => {
  return {
    type: SEARCH_ALBUMS_ARTISTS,
    payload: albumsArtists,
  };
};
export const changeSongs = (songsList) => {
  return {
    type: SEARCH_SONGS_LIST,
    payload: songsList,
  };
};
export const getHotList = () => {
  return async (dispatch) => {
    let data = await api.getSearchHot();
    dispatch(changeHotList(data.result.hots));
  };
};

export const getSuggestList = (keywords) => {
  return async (dispatch) => {
    let data = await api.getSuggestListRequest({ keywords });
    let songs = await api.getResultSongsListRequest({ keywords });
    let albumsArtists = {
      albums: [],
      artists: [],
    };
    if (data.result && data.result.albums) {
      albumsArtists.albums = data.result.albums;
    }
    if (data.result && data.result.artists) {
      albumsArtists.artists = data.result.artists;
    }
    let songList = [];
    if (songs.result && songs.result.songs) {
      songList = songs.result.songs;
    }
    dispatch(changeAlbumsArtists(albumsArtists));
    dispatch(changeSongs(songList));
  };
};
