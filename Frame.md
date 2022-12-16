# vue
是js框架

## 绑定
单向绑定 v-bind:
双向绑定 v-model@
事件绑定 v-on:click="methods"


TODO
computed: 像data，预处理的data。要加this就能读取到data里的数据
watch

## **组件间通信**
### 父子组件通信
**1. props/$emit**
- `props`: 从 父组件接受数据
- `$emit`: 向父组件传送数据

```javascript
// Father.vue -->
  <Child :FatherMsg="data"  @ListenChild="ListenChild"></Child>
//
import Child from './Child';
export default {
    data() {
        return {
            data: 'I am your father',
            ChildMsg: '',
        }
    },
    components: {
        Child
    },
    methods: {
        ListenChild(data) {
            console.log("子组件传递过来的值：" , data);
            this.ChildMsg = data;
        }
    }
}
//
```
```javascript
// Child.vue -->
 <button @click="send">子组件将值传递给父组件</button>
export default {
    data() {
        return {
            data: 'I am your children',
        }
    },
    props: ['FatherMsg'],
    methods: {
      send() {
        this.$emit('ListenChild', this.data);
      }
    }
}

```

**2. ref**
父组件调用子组件中的事件方法
```javascript
// Child.vue -->
export default {
    methods: {
    childFun() {
      console.log('我是子组件的方法 childFun');
      this.msg = '我的方法被调用了'
    },
  },
}

```
```javascript
// Father.vue -->
    <Child ref="child" />
//
import Child from './Child';
export default {
    components: {
        Child
    },
    methods: {
        handleClick() {
            this.$refs.child.childFun();
        },
    },

}
//
```
除此之外，父组件还可以通过ref来引用和访问子组件。同样的，还可以使用$parent、$children、$root等 API 来分别获取父实例、子实例和根实例。
**3. $parent / $child**

this.$children 是一个数组类型，它包含所有子组件对象。父访问子

this.$parent 子访问父
### 祖孙$attrs/ $listeners
`$attrs`
1. 包含了父作用域中不被 prop 所识别 (且获取) 的特性绑定 (class 和 style 除外);
2. 当一个组件没有声明任何 prop 时，这里会包含所有父作用域的绑定 (class 和 style 除外)，并且可以通过 v-bind=“$attrs” 传入内部组件。通常配合 interitAttrs 选项一起使用。
`$listeners`
1. 包含了父作用域中的 (不含 .native 修饰器的) v-on 事件监听器。
2. 它可以通过 v-on=“$listeners” 传入内部组件。
简单来说：`$attrs` 与`$listeners`是两个对象，`$attrs `里存放的是父组件中绑定的非 Props 属性，`$listeners` 里存放的是父组件中绑定的非原生事件

```javascript
    //爷组件
    <div id="app">
      <Home :msg="msg"></Home>
    </div>
    //父组件(父组件的操作最简单，但不做就会传不过去)

    <div class="home">
      <Sun v-bind="$attrs"></Sun>
    </div>
    //孙组件

    <div class="sun">
      {{ msg }}
    </div>
    //props直接接受 
    props:{ msg:String, }

//
```
```javascript
    //爷组件
    <div id="app">
      <Home @setVal="setVal">></Home>
    </div>
    methods:{ setVal(val){ this.msg = val; } }
    //父组件(父组件的操作最简单，但不做就会传不过去)

    <div class="home">
      <Sun v-on="$listeners"></Sun>
    </div>

    //孙组件
    <div class="sun">
      <button @click="toVal">点我</button>
    </div>
    methods:{ toVal(){ this.$emit("setVal",this.msg) } }
```
### 兄弟组件
通过eventBus来做中间的桥梁，传输方通过中间组件调用 emit 传数据，接收方通过on 接受数据，两者之间的自定义属性名保持一致。
```javascript
// 传输方组件调用方式
import Bus from '@/EventBus.js'
Bus.$emit('pass-value', this.say);

// 接收方接受参数
import Bus from '@/EventBus.js'

created() {
  Bus.$on('pass-value', val => {
     this.sibilingValue = val;
  })
}
```
### 全局事件管理
### vuex
![](./img/2022-12-15-20-06-23.png)

1. **State** 数据
- 读取时最好在computed中
- Vuex 通过 Vue 的插件系统将 store 实例从根组件中“注入”到所有的子组件里。
  - 子组件能通过 `this.$store.state` 访问到
  - 也可以使用`mapState`
    ``` javascript
    // 在单独构建的版本中辅助函数为 Vuex.mapState
    import { mapState } from 'vuex'

    export default {
      // ...
      computed: mapState({
        // 箭头函数可使代码更简练
        count: state => state.count,

        // 传字符串参数 'count'等同于 `state => state.count`
        countAlias: 'count',

        // 为了能够使用 `this` 获取局部状态，必须使用常规函数
        countPlusLocalState(state) {
          return state.count +  this.localCount
        }
      })
    }
    ```
    与局部计算属性混合使用时用对象展开运算符
    ``` javascript
        computed: {
          localComputed () { /* ... */ },
          // 使用对象展开运算符将此对象混入到外部对象中
          ...mapState({
            // ...
          })
        }
    ```
2. **Getter** 查询数据
- Getter 接受 `state` 作为其第一个参数，也可以接受其他 `getters` 作为第二个参数
- Getter 会暴露为 store.getters 对象，你可以以属性的形式访问这些值
    ```javascript
    const store = createStore({
      state: {
        todos: [
          { id: 1, text: '...', done: true },
          { id: 2, text: '...', done: false }
        ]
      },
      getters: {
        doneTodos (state) {
          return state.todos.filter(todo => todo.done)
        }
      }
    }) 
    ```
- 你也可以通过让 getter 返回一个函数，来实现给 getter 传参。在你对 store 里的数组进行查询时非常有用。
    ```javascript
    getters: {
      // ...
      getTodoById: (state) => (id) => {
        return state.todos.find(todo => todo.id === id)
      }
    }

    store.getters.getTodoById(2) // -> { id: 2, text: '...', done: false }
    ```
- mapGetters 辅助函数仅仅是将 store 中的 getter 映射到局部计算属性：
  ```javascript
    import { mapGetters } from 'vuex'

    export default {
    // ...
    computed: {
    // 使用对象展开运算符将 getter 混入 computed 对象中
        ...mapGetters([
        'anotherGetter',
        //如果你想将一个 getter 属性另取一个名字
        doneCount: 'doneTodosCount', 
        // ...
        ])
    }
    }
  ```
3. **Mutations** 改动State的方法
- 每个 mutation 都有一个字符串的事件类型 (type)和一个回调函数 (handler)。接受 state 作为第一个参数
- 不能直接调用一个 mutation 处理函数。需要以相应的 type 调用 store.commit 方法
- 一条重要的原则就是要记住 mutation 必须是**同步函数**。
- 可以向 store.commit 传入额外的参数，即 mutation 的载荷（**payload**）：
    ```javascript
    mutations: {
    increment (state, n) {
        state.count += n
    }
    }

    store.commit('increment', 10)

    //在大多数情况下，载荷应该是一个对象，这样可以包含多个字段并且记录的 mutation 会更易读：

    mutations: {
    increment (state, payload) {
        state.count += payload.amount
    }
    }

    store.commit('increment', {
    amount: 10
    })

    //另一种方式是直接使用包含 type 属性的对象
    store.commit({
    type: 'increment',
    amount: 10
    })

    //在组件中提交 Mutation
    // 1. this.$store.commit('xxx') 提交 mutation
    // 2.使用 mapMutations 辅助函数将组件中的 methods 映射为 store.commit 调用（需要在根节点注入 store）。

    import { mapMutations } from 'vuex'

    export default {
    // ...
    methods: {
        ...mapMutations([
        'increment', 
        // 将 `this.increment()` 映射为 `this.$store.commit('increment')`

        // `mapMutations` 也支持载荷：
        'incrementBy' 
        // 将 `this.incrementBy(amount)` 映射为 `this.$store.commit('incrementBy', amount)`
        ]),
        ...mapMutations({
        add: 'increment' 
        // 将 `this.add()` 映射为 `this.$store.commit('increment')`
        })
    }
    }
    ```
4. **Actions** 组件调用Mutations操作数据的动作
- Action **提交的是 mutation**，而不是直接变更状态。
- Action 可以包含任意**异步操作**。
    ```javascript
    const store = createStore({
      state: {
        count: 0
      },
      mutations: {
        increment (state) {
          state.count++
        }
      },
      actions: {
        increment (context) {
          context.commit('increment')
        }
      }
    })

    //实践中，我们会经常用到 ES2015 的参数解构来简化代码（特别是我  们需要调用 commit 很多次的时候）：

    actions: {
      increment ({ commit }) {
        commit('increment')
      }
    }

    // Action 通过 store.dispatch 方法触发：我们可以在 action   内部执行异步操作
    actions: {
      incrementAsync ({ commit }) {
        setTimeout(() => {
          commit('increment')
        }, 1000)
      }
    }

    // 以载荷形式分发
    store.dispatch('incrementAsync', {
      amount: 10
    })

    // 以对象形式分发
    store.dispatch({
      type: 'incrementAsync',
      amount: 10
    })


    //组件中
    import { mapActions } from 'vuex'

    export default {
      // ...
      methods: {
        ...mapActions([
          'increment', 
          // 将 `this.increment()` 映射为 `this.$store. dispatch('increment')`

          // `mapActions` 也支持载荷：
          'incrementBy' 
          // 将 `this.incrementBy(amount)` 映射为 `this.    $store.dispatch('incrementBy', amount)`
        ]),
        ...mapActions({
          add: 'increment' 
          // 将 `this.add()` 映射为 `this.$store.dispatch   ('increment')`
        })
      }
    }

    // 假设 getData() 和 getOtherData() 返回的是 Promise

    actions: {
      async actionA ({ commit }) {
        commit('gotData', await getData())
      },
      async actionB ({ dispatch, commit }) {
        await dispatch('actionA') // 等待 actionA 完成
        commit('gotOtherData', await getOtherData())
      }
    }
    ```
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

