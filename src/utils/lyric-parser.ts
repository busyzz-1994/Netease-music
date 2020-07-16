/*
 * @Author: busyzz
 * @Date: 2020-06-29 11:17:51
 * @Description:
 */
class LyricParser {
  lyric: string;
  lyricList: Array<{ time: number; lyric: string }>;
  constructor(lyric) {
    this.lyric = lyric;
    this.lyricList = [];
    this._parse();
  }
  _parse() {
    if (this.lyric) {
      let timeExp = /\[(\d{2,}):(\d{2})\.(\d{2,3})\](.*)/g;
      const lyricList = this.lyric.split('\n');
      this.lyricList = lyricList
        .map((line) => {
          const result = timeExp.exec(line);
          timeExp.lastIndex = 0;
          if (result) {
            let min = result[1],
              sec = result[2],
              msec = result[3],
              lyric = result[4];
            let time =
              Number(min) * 60 * 1000 + Number(sec) * 1000 + Number(msec);
            return {
              time,
              lyric,
            };
          } else {
            return null;
          }
        })
        .filter((v) => v);
    }
  }
  getCurrentLyric(currentTime) {
    let index = this.lyricList.findIndex((item) => {
      if (item.time > currentTime) {
        return true;
      } else {
        return false;
      }
    });
    if (index > 0) {
      return this.lyricList[index - 1].lyric;
    } else {
      return '';
    }
  }
}

export default LyricParser;
