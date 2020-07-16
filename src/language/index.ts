import preval from 'preval.macro';
import zh_CN from './zh-CN.json';

const language: typeof zh_CN = preval`module.exports =JSON.parse(require('fs').readFileSync(__dirname + '/' + process.env.REACT_APP_LANGUAGE + '.json', 'utf8'))`;

if (process.env.NODE_ENV === 'development') {
  console.log('language', language);
}

/**
 * 备用的多语言支持
 */
export default language;
