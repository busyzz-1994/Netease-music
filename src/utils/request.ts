/*
 * @Author: busyzz
 * @Date: 2019-05-27 15:34:42
 * @Description:
 */
import { stringify } from 'qs';
// const baseUrl = 'http://172.182.10.109:3300';
let baseUrl = 'http://192.168.1.6:3300';
if (process.env.NODE_ENV === 'production') {
  baseUrl = 'http://47.105.201.71/:3300';
}
//@ts-ignore
const noop = (_) => _;

const config = {
  $urlGetter: noop,
  $tokenGetter: noop,
  $beforeHook: noop,
  $afterHook: noop,
  $dataHook: noop,
  $errorHook: noop,
  $tokenInvalid: noop,
  url(func) {
    this.$urlGetter = func;
    return this;
  },
  token(func) {
    this.$tokenGetter = func;
    return this;
  },
  before(func) {
    this.$beforeHook = func;
    return this;
  },
  after(func) {
    this.$afterHook = func;
    return this;
  },
  data(func) {
    this.$dataHook = func;
    return this;
  },
  error(func) {
    this.$errorHook = func;
    return this;
  },
  tokenInvalid(func) {
    this.$tokenInvalid = func;
    return this;
  },
};
interface Option {
  withCredentials?: boolean;
  method?: string;
}
function checkStatus(response, isBlob) {
  if (response.status >= 200 && response.status < 300) {
    const currentUrl = response.url;
    const p = isBlob ? response.blob() : response.json();
    return p.then((resp) => {
      if (process.env.NODE_ENV === 'development') {
        console.log(currentUrl, resp);
      }
      return new Promise((resolve) => {
        isBlob
          ? resolve({
              code: 10000,
              data: resp,
            })
          : resolve(resp);
      });
    });
  } else {
    return Promise.resolve({
      data: null,
      code: response.status,
      message: 'error',
    });
  }
}

function request_fetch(
  url,
  params = null,
  options: Option = {},
  isBlob = false
) {
  let { method = 'GET' } = options;
  url = baseUrl + url;

  // @ts-ignore
  config.$beforeHook(url, params, options);
  let targetUrl = config.$urlGetter(url);
  let o = {
    credentials: 'same-origin',
    method,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
    mode: 'cors',
  };
  if (method === 'POST') {
    o.headers['Content-Type'] = 'application/json;charset=UTF-8';
    //@ts-ignore;
    o.body = JSON.stringify(params);
  }

  if (method === 'GET' && params && JSON.stringify(params) !== '{}') {
    targetUrl += `?${stringify(params)}`;
  }

  //@ts-ignore
  return fetch(targetUrl, o)
    .then((res) => checkStatus(res, isBlob))
    .catch((e) => {
      return Promise.resolve({
        data: null,
        code: 0,
        message: 'error',
      });
    });
}
let request = request_fetch;

export { config };
export default request;
