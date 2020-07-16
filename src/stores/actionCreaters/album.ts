import api from 'api';
//types
export const ALBUDETAIL = 'home/album/albumDetail';

//creaters
export const changeAlbumDetail = (detail) => {
  return {
    type: ALBUDETAIL,
    payload: detail,
  };
};
export const getAlbumDetail = ({ id }: { id: string }) => {
  return async (dispatch) => {
    let data = await api.getAlbumDetail({ id });
    dispatch(changeAlbumDetail(data.playlist));
  };
};
