技术栈

- 前端框架和 UI 组件采用 VUE + Element UI 
  - VUE 技术栈主要包括：
    - Vue Router -- vue 官方的路由
    - Vuex -- Vue.js 状态管理模式
    - Sass -- CSS扩展语言
- 后端服务采用 Django + Django REST framework



目录结构

    ├── build                      # 构建相关
    ├── mock                       # 项目 mock 模拟数据
    ├── public                     # 静态资源
    │   │── favicon.ico            # favicon 图标
    │   └── index.html             # html 模板
    ├── src                        # 源代码
    │   ├── api                    # 数据 API 请求
    │   ├── assets                 # 主题、字体等静态资源
    │   ├── components             # 全局公用组件
    │   ├── directive              # 全局指令
    │   ├── filters                # 全局 filter
    │   ├── icons                  # 项目 svg 图标
    │   ├── layout                 # 全局 layout
    │   ├── router                 # 路由
    │   ├── store                  # 全局 store 管理
    │   ├── styles                 # 全局样式
    │   ├── utils                  # 全局公用方法
    │   ├── vendor                 # 公用 vendor
    │   ├── views                  # 页面 view
    │   ├── App.vue                # 入口页面
    │   ├── main.js                # 入口文件(加载组件、初始化等)
    │   └── permission.js          # 权限管理
    ├── tests                      # 单元测试
    ├── .env.xxx                   # 环境变量配置
    ├── .eslintrc.js               # eslint 配置项
    ├── .babelrc                   # babel-loader 配置
    ├── .travis.yml                # 自动化 CI 配置
    ├── vue.config.js              # vue-cli 配置
    ├── postcss.config.js          # postcss 配置
    └── package.json               # package.json



环境搭建

    # 安装依赖
    npm install
    
    # 本地开发 启动项目
    npm run dev

启动完成后，会自动打开浏览器访问  http://localhost:9527



本地构建

    # 预览发布环境效果
    npm run preview
    
    # 预览发布环境效果 + 静态资源分析
    npm run preview -- --report
    
    # 代码格式检查
    npm run lint
    
    # 代码格式检查并自动修复
    npm run lint -- --fix

线上构建

    # 打包正式环境
    npm run build:prod
    
    # 打包预发布环境
    npm run build:stage

浏览器支持

现代浏览器，以及 IE10+



代码风格

1. Component 组件

所有的 Component 文件都是以大写开头(index.vue 除外) -- 官方推荐

例如：

    @/components/BackToTop/index.vue
    @/views/example/components/Button.vue

JS 文件

所有的 .js 文件都遵循横线连接

例如：

    @/utils/open-window.js
    @/views/svg-icons/require-icons.js
    @/components/MarkdownEditor/default-options.js

Views 视图

在 views 文件下，代表"页面"的 .vue 文件/文件夹都使用横线连接

例如：

    @/views/svg-icons/index.vue
    @/views/svg-icons/require-icons.js

使用横线连接来命名 views 主要是出于以下几个考虑：

- views 下的 .vue 文件代表"页面"，与"组件" Component (大写开头)区分
- views 下的 .vue 文件与路由配置一一对应，页面的 url 也都是横线连接
