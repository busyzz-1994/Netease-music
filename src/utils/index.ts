/*
 * @Author: busyzz
 * @Date: 2020-06-01 21:18:36
 * @Description:
 */
export const playCountChange = (playCount: number): string | number => {
  if (playCount < 10000) return playCount;
  return (playCount / 10000).toFixed(1) + '万';
};
//处理歌手列表拼接歌手名字
export const getName = (list) => {
  let str = '';
  list.map((item, index) => {
    str += index === 0 ? item.name : '/' + item.name;
    return item;
  });
  return str;
};
// 给css3相关属性增加浏览器前缀，处理浏览器兼容性问题
let element = document.createElement('div');
let elementStyle = element.style;
let vendor = (() => {
  //首先通过transition属性判断是何种浏览器
  let transformNames = {
    webkit: 'webkitTransform',
    Moz: 'MozTransform',
    O: 'OTransfrom',
    ms: 'msTransform',
    standard: 'Transform',
  };
  for (let key in transformNames) {
    if (elementStyle[transformNames[key]] !== undefined) {
      return key;
    }
  }
  return false;
})();

export const prefixStyle = (style) => {
  if (vendor === false) {
    return false;
  }
  if (vendor === 'standard') {
    return style;
  }
  return vendor + style.charAt(0).toUpperCase() + style.substr(1);
};

export const getTransitionEndName = ():
  | 'transitionend'
  | 'webkitTransitionEnd' => {
  let cssTransition = ['transition', 'webkitTransition'];
  let transitionEnd = {
    transition: 'transitionend',
    webkitTransition: 'webkitTransitionEnd',
  };
  for (let i = 0; i < cssTransition.length; i++) {
    if (element.style[cssTransition[i]] !== undefined) {
      return transitionEnd[cssTransition[i]];
    }
  }
  return undefined;
};
export const getSongUrlById = (id) => {
  return `https://music.163.com/song/media/outer/url?id=${id}.mp3`;
};
export const isEmptyObject = (obj) => !obj || Object.keys(obj).length === 0;

export const secToString = (time: number) => {
  let minString: number | string = '00';
  let secString: number | string = '00';
  let sec = Math.round(time % 60);
  secString = sec > 9 ? sec : '0' + sec;
  let min = Math.floor(time / 60);
  minString = min > 9 ? min : '0' + min;
  return minString + ':' + secString;
};
export const filterIndex = (rankList) => {
  for (let i = 0; i < rankList.length - 1; i++) {
    if (rankList[i].tracks.length && !rankList[i + 1].tracks.length) {
      return i + 1;
    }
  }
};
