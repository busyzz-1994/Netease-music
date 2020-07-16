const path = require('path');

process.env.NODE_ENV = 'development';
require('react-scripts/config/env');

console.log(
  process.env.GITHUB_USER,
  process.env.GITHUB_PWD,
  process.env.REACT_APP_ICONFONT_PROJECT_ID
);

const getIconfontSvg = require('get-iconfont-svg');

// getIconfontSvg(
//   process.env.GITHUB_USER,
//   process.env.GITHUB_PWD,
//   process.env.REACT_APP_ICONFONT_PROJECT_ID,
//   path.resolve('./src/assets/iconfont.ts')
// );
getIconfontSvg.getSVG(
  process.env.GITHUB_USER,
  process.env.GITHUB_PWD,
  process.env.REACT_APP_ICONFONT_PROJECT_ID,
  path.resolve('./src/assets/icon/')
);
