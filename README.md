
## 技术栈
- 前端框架和 UI 组件采用 [VUE](https://cn.vuejs.org/) + [Element UI ](https://element.eleme.cn/#/zh-CN)
	- VUE 技术栈主要包括：
	  - [Vue Router](https://router.vuejs.org/) -- vue 官方的路由
	  - [Vuex](https://vuex.vuejs.org/) -- Vue.js 状态管理模式
	  - [Sass](https://www.sass-china.com/) -- CSS扩展语言
- 后端服务采用 [Django](https://www.djangoproject.com/) + [Django REST framework](https://www.django-rest-framework.org/)



## 目录结构

```bash
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
```



## 环境搭建

```bash
# 安装依赖
npm install

# 本地开发 启动项目
npm run dev
```

启动完成后，会自动打开浏览器访问  http://localhost:9527



## 本地构建

```bash
# 预览发布环境效果
npm run preview

# 预览发布环境效果 + 静态资源分析
npm run preview -- --report

# 代码格式检查
npm run lint

# 代码格式检查并自动修复
npm run lint -- --fix
```

## 线上构建
```bash
# 打包正式环境
npm run build:prod

# 打包预发布环境
npm run build:stage
```

## 浏览器支持

现代浏览器，以及 IE10+



## 代码风格

### 1. Component 组件
所有的 Component 文件都是以大写开头(index.vue 除外) -- [官方推荐](https://cn.vuejs.org/v2/style-guide/index.html#%E5%8D%95%E6%96%87%E4%BB%B6%E7%BB%84%E4%BB%B6%E6%96%87%E4%BB%B6%E7%9A%84%E5%A4%A7%E5%B0%8F%E5%86%99-%E5%BC%BA%E7%83%88%E6%8E%A8%E8%8D%90)


> 例如：
```vue
@/components/BackToTop/index.vue
@/views/example/components/Button.vue
```

### JS 文件
所有的 .js 文件都遵循横线连接

> 例如：
```vue
@/utils/open-window.js
@/views/svg-icons/require-icons.js
@/components/MarkdownEditor/default-options.js
```

### Views 视图
在 views 文件下，代表"页面"的 .vue 文件/文件夹都使用横线连接

> 例如：
```vue
@/views/svg-icons/index.vue
@/views/svg-icons/require-icons.js
```

> 使用横线连接来命名 views 主要是出于以下几个考虑：
- views 下的 .vue 文件代表"页面"，与"组件" Component (大写开头)区分
- views 下的 .vue 文件与路由配置一一对应，页面的 url 也都是横线连接
