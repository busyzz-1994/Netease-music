<!--
 * @Author: busyzz
 * @Date: 2020-03-04 11:25:00
 * @Description:
-->

## 用法

```shell
git clone git@github.com:540548050/blog-music.git
yarn install
//下载子模块
git submodule update --init --recursive
cd NeteaseCloudMusicApi
yarn install
//退出到根目录
cd ../
yarn start
```

## 包含功能

- redux
- immer
- react-router
- react-hooks
- typescript
- sass
- css-module

### 开发设置

- `setupProxy.js` 修改后端代理
- 运行时修改后端 `apiServer` http://localhost:3000//settings?apiServer=https://api.bdfint.cn

### 项目结构

```
Project
|   .editorconfig
|   .env // 项目环境变量
|   .gitignore
|   .prettierrc
|   Dockerfile // Docker 构建配置
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
    |
    |
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
