# react-boilerplate

大数金科项目前端初始化模版

## 用法

```shell
git clone git@gitlab.bdfint.com:fed/templates/react-boilerplate.git --depth=1
cd react-boilerplate
yarn install
yarn start # 打开浏览器访问 http://localhost:3000
```

| 环境       | 地址                                            | 发布规则              |
| ---------- | ----------------------------------------------- | --------------------- |
| dev        | http://react-boilerplate.stable-dev.bdfint.cn/  | `dev` 分支自动发布    |
| test       | http://react-boilerplate.stable-test.bdfint.cn/ | `master` 分支自动发布 |
| production | https://react-boilerplate.zsteel.cc/            | **手动发布**          |

## 说明

## 包含功能

- mobx
- react-router
- typescript
- http-proxy-middleware
- sass
- css-module
- jest

### 浏览器支持

IE 9+

### 运行

dev

```sh
yarn start
```

单元测试（Unit Test）

```sh
yarn test
```

集成测试（Integration Test）

这部分测试代码可以考虑适当交给测试人员编写，需要学习
[expect-puppeteer](https://github.com/smooth-code/jest-puppeteer/blob/master/packages/expect-puppeteer/README.md#api)
或
[puppeteer page](https://pptr.dev/#?product=Puppeteer&version=master&show=api-class-page)

```sh
yarn test:integration
```

### 开发设置

- `setupProxy.js` 修改后端代理
- 运行时修改后端 `apiServer` http://localhost:3000//settings?apiServer=https://api.bdfint.cn

### 项目结构

```
Project
|   .editorconfig
|   .env // 项目环境变量
|   .gitignore
|   .gitlab-ci.yml // gitlab-ci 配置
|   .prettierrc
|   Dockerfile // Docker 构建配置
|   nginx.conf // 项目运行 Nginx 配置（Dockerfile 会用到）
|   package.json
|   README.md
|   tsconfig.extends.json
|   tsconfig.json
|   yarn.lock
|
+---helm // 项目配置目里
+---integration // 集成测试目录
|   |   .eslintrc.js
|   |   jest.config.js
|   |
|   \---__tests__ // 集成测试用例（puppeteer）
|           app.test.js
|
+---public
|       favicon.ico
|       index.html
|       manifest.json
|
+---scripts // node.js 工具/方法
|       iconfont.js // 从 iconfont.cn 抓取图标 SVG
|
\---src
    |   App.css
    |   App.test.js // *.test.js 都是单元测试用例
    |   App.tsx
    |   index.ts
    |   serviceWorker.js
    |   setupProxy.js  // 开发环境代理配置
    |   startup.tsx
    |
    +---api // 所有用到的服务端接口都在这里按照模块声明
    |       index.ts
    |       user.ts
    |
    +---components // 通用组件
    |   |   Iconfont.tsx
    |   |   Image.tsx
    |   |
    |   \---Container
    |           index.tsx
    |
    +---language // 多语言支持（备用）
    |       index.ts
    |       zh-CN.json
    |
    +---modules // 通用模块
    |   \---Header
    |           index.jsx
    |
    +---pages // 页面
    |   +---Demo
    |   |   |   index.module.scss // 带 .module 后缀的自动识别为 css-module
    |   |   |   index.tsx
    |   |   |
    |   |   \---images
    |   |           logo.png
    |   |           logo.webp
    |   |
    |   \---Settings
    |           index.tsx
    |
    +---stores // 全局数据
    |       Settings.ts
    |       User.ts
    |
    \---utils // 通用工具/方法
            localStorage.js
            request.ts
```

### 已知问题

- `ESLint` 对 `TypeScript` 语法支持不完善 `keyof` 会报错

```js
Exclude<keyof FormProps, 'onReset' | 'onSubmit'>
```

- 一些库和功能在使用 `TypeScript` 时出现类型冲突，如 `@withRouter`

- node-sass 依赖环境

<https://github.com/sass/node-sass/releases>

| NodeJS  | Minimum node-sass version | Node Module |
| ------- | ------------------------- | ----------- |
| Node 12 | 4.12+                     | 72          |
| Node 11 | 4.10+                     | 67          |
| Node 10 | 4.9+                      | 64          |
| Node 8  | 4.5.3+                    | 57          |
