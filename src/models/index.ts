/*
 * @Author: busyzz
 * @Date: 2020-06-01 09:51:03
 * @Description:
 */
export class Banner {
  imageUrl: string = '';
  targetId: number = 0;
}

export class Recommend {
  picUrl: string = '';
  name: string = '';
  id: number = 0;
  playCount: number = 0;
}
export class Song {
  name: string = '';
  id: number;
  first?: string;
  second?: string;
  al: { id: number; name: string; picUrl: string } = {
    id: 0,
    name: '',
    picUrl: '',
  };
  ar: Array<{ id: number; name: string }> = [];
  artists: string = '';
  album: { name: string } = { name: '' };
}
export class Album {
  coverImgUrl: string = '';
  backgroundCoverUrl: string = '';
  subscribedCount: number = 0;
  name: string = '';
  id: number;
  updateFrequency: string;
  creator: {
    avatarUrl: string;
    nickname: string;
  } = { avatarUrl: '', nickname: '' };
  tracks: Array<Song> = [];
}

export class Singer {
  img1v1Id: number;
  topicPerson: number;
  alias: any[];
  picId: number;
  musicSize: number;
  albumSize: number;
  briefDesc: string;
  followed: boolean;
  img1v1Url: string;
  trans: string;
  picUrl: string;
  name: string;
  id: number;
  accountId: number;
  picId_str: string;
  img1v1Id_str: string;
}
//热门搜索的元素
export class HotItem {
  first: string;
  second: number;
  third: any;
  iconType: number;
}
