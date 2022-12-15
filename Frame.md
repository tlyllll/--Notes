# vue
是js框架

## 绑定
单向绑定 v-bind:
双向绑定 v-model@
事件绑定 v-on:click="methods"

TODO
computed: 像data，预处理的data。要加this就能读取到data里的数据
watch
props: 从 父组件接受数据
$emit: 向父组件传送数据

## 生命周期

TODO

**组件生命周期**
**Vue2.x：**
beforeCreate
created
beforeMount
mounted
beforeUpdate
updated
beforeDestroy
destroyed
activated
deactivated
errorCaptured
**Vue3.x：**
setup
onBeforeMount
onMounted
onBeforeUpdate
onUpdate
onBeforeUnmout
onUnmounted
onActivated
onDeactivated
onErrorCaptured
onRenderTriggered
onRenderTracked
**指令生命周期**
**Vue2.x：**
bind
inserted
update
componentUpdated
unbind
**Vue3.x：**
beforeMount
mounted
beforeUpdate
updated
beforeUnmount
unmounted

## 文件目录
```
project
└───src
│   │   app.vue    // 主页面
│   │   main.js    // 主入口
|   |   router.js  // 所有路由
│   │
│   |____assets    // css、image、svg等资源
│   |   |____css   // 所有sass资源
|   |   |    |  reset.scss       // 兼容各浏览器
|   |   |    |  global.scss      // 全局css
|   |   |    |  variable.scss    // sass变量和function等
│   |   |____img   // image图标库
|   |   |____svg   // svg图标库
|   |
|   |____components    // 组件
│   |   |____common    // common自注册组件
│   |        |____base // 原子组件(如果是引入第三方，该文件夹可省略)
│   |        |   ...   // 业务公用组件
│   |   |____entity    // entity页面组件
│   |   |____about     // about页面组件
|   |
|   |____pages     // UI层(原则：轻page，重component)
|   |   |____entity
|   |   |    |  list.vue      // 列表页
|   |   |    |  create.vue    // 新增页
|   |   |    |  edit.vue      // 修改页
|   |   | main.vue
|   |
|   |____plugins   // 自己或第三方插件
|   |   | index.js       // 插件入口文件
|   |   | directives.js  // 所有Vue指令
|   |   | filters.js  // 所有Vue过滤
|   |
|   |____server    // 接口层
|   |   | index.js   // 所有接口
|   |   | http.js  // axios二次封装
|   |
|   |____store     // vuex数据
|   |   | index.js
|   |
|   |____utils     // 工具层
|   |   | config.js// 配置文件，包括常量配置
|
└───public         // 公用文件，不经过webpack处理
│   │   favicon.ico
│   │   index.html
│   vue.config.js  // vue-cli3主配置
│   babel.config.js// babel配置
│   .eslintrc.js   // eslint配置
│   .prettierrc.js // perttier配置
│   package.json   // npm配置
│   README.md      // 项目说明

```

### SFC 单文件组件结构
## 双向绑定

