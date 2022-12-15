# js
## 基本数据类型
- String
- Number
- Boolean
- Object
- Null: 一种特殊的Object = 0 = false
- Undefined: 未定义/未初始化 = NaN = false
- Symbol(ES6): ~~唯一的姐~~ 唯一的值 就算参数一样也是两个东西，可以用description输出参数
- BigInt(ES10)
### 类型判断
- typeof: Number/String/Boolean/undefined/Object/Symbol 
  - 不能判断（Array, Error, null）-> Object
- instanceof: 判断数据是否是某个对象实例。是不是原型链上的
- Object.prototype.toString.call()

## 创建变量
### var/ let /const
- var: 有**变量提升**
- let: 不能重复定义，可以修改值
- const: 不能重复定义，不能修改值（除了数组和对象）

### 变量提升/ 函数提升
```Javascript
   console.log(a) // undefined
   var a = 1
   console.log(a) //1
```
实际运行顺序

```Javascript
   var a
   console.log(a) // undefined
   a = 1
   console.log(a) //1
```
声明自动上提 = 变量提升

函数也一样

变量提升 > 函数提升

## ==和===的区别
- `==` **值**相等。会先做类型转换，之后再判断值大小
- `===` **值**和**类型**都相等。
## 执行机制
 javascript是一门**单线程**语言，任务分为同步和异步

 ![](./img/2022-12-09-15-16-54.png)

- 当指定的事情完成时，Event Table会将这个函数移入Event Queue。
- 主线程内的任务执行完毕为空，会去Event Queue读取对应的函数，进入主线程执行。
- 上述过程会不断重复，也就是常说的Event Loop(事件循环)。

```javascript
let data = [];
$.ajax({
    url:www.javascript.com,
    data:data,
    success:() => {
        console.log('发送成功!');
    }
})
console.log('代码执行结束');
```

- ajax进入Event Table， 注册回调函数`success`
- 执行`console.log('代码执行结束')`。
- ajax事件完成后，`success`进入**Event Queue**
- 主线程从**Event Queue**读取回调函数`success`并执行。

### 回调函数
函数 B 作为参数（函数引用）传递到另一个函数 A 中，并且这个函数 A 执行函数 B。我们就说函数 B 叫做回调函数。

当一个函数作为参数传入另一个参数中，并且它不会立即执行，只有当满足一定条件后该函数才可以执行，这种函数就称为回调函数。

**回调地狱：**
- 回调地狱就是为是实现代码顺序执行而出现的一种操作，它会造成我们的代码可读性非常差，后期不好维护
- 回调函数中嵌套回调函数的情况就叫做回调地狱

**解决方式：**
- promise
- async/await
### setTimeout
**异步** 可以延时执行
```javascript
setTimeout(() => {
    task()
},3000)

sleep(10000000)
```

此时task的时间远远超过三秒：
  - task() -> 进入Event Table 并注册，开始计时
  - 执行sleep()
  - 3s结束，task()进入Event Queue， 但要等sleep先完成
  - sleep()执行完，task()进入主线程执行

>**setTimeout(fn,0)**的含义是，指定某个任务在主线程最早可得的空闲时间执行，意思就是不用再等多少秒了，只要主线程执行栈内的同步任务全部执行完成，栈为空就马上执行

### setInterval
和`setTimeout`很像，不过`setInterval`这个是**循环执行**

`setInterval(fn,ms)`来说，我们已经知道不是每过ms秒会执行一次fn，而是每过ms秒，会有fn进入**Event Queue**。

如果`fn`执行时间超过了延迟时间`ms`，那么就完全看不出来有时间间隔了

### Promise(ES6)
所谓Promise对象，简单说就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果。

Promise 本身是同步的立即执行函数， 当在 executor 中执行 resolve 或者 reject 的时候, 此时是异步操作， 会先执行 then/catch 等，当主栈完成后，才会去调用 resolve/reject 中存放的方法执行。

**特点：**
  - 对象的状态不受外界影响。
    - 有三种状态：`pending`（进行中）、`fulfilled`（已成功）和`rejected`（已失败）
    - 只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态
  - 一旦状态改变，就不会再变，任何时候都可以得到这个结果。
    - `pending`->`fulfilled`
    - `pending`->`rejected`
    - 只要这两种情况发生，状态就凝固了，不会再变了，会一直保持这个结果，这时就称为 resolved（已定型）

**缺点：**
  - 无法中途取消
  - 如果不设置回调函数，内部的错误不会反应到外部
  - 当处于pending状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）。

### 宏任务/微任务
- macro-task(宏任务)：包括**整体代码**script，setTimeout，setInterval
- micro-task(微任务)：Promise，process.nextTick

![](./img/2022-12-09-16-07-15.png)

### async/await
```javascript
async function testAsync(){
   await getJSON();  
   console.log('数据拿到了');
}
```
1. `await` 后面的代码放在 async 创建的那个 `Promise` 里面去执行;
2. `await` 下面的代码放到前一个 创建的 Promise 对象的 `.then` 里面去执行。

```javascript
async function test() {
    let a = 2
    let c = 1
    await getContent()
    let d = 3
    await getPromise()
    let e = 4
    await getAsyncContent()
    return 2
}
相当于
function test() {
    return Promise.resolve().then(() => {
        let a = 2
        let c = 1
        return getContent()
    })
        .then(() => {
            let d = 3
            return getPromise()
        })
        .then(() => {
            let e = 4
            return getAsyncContent()
        })
        .then(() => {
            return 2
        })
}
```
[好文](https://juejin.cn/post/7122071393495154701)

## this
**全局使用时：**
- this 总是指称为窗口（在 Node.js 中，全局对象是 global 。）
- 严格模式中：普通函数中的 this 绑定到 undefined 
  
![](./img/2022-12-13-13-42-22.png)

**在函数中：**
函数可以大致分为在全局中声明的**一般函数**和在**对象中声明的方法**。
- **一般函数**：指向窗口[窗口对象中的函数]
- **对象中声明的方法**：所有函数都在对象内部。this 指的是当前正在执行该函数的对象

**总结：**
- 在函数中/单独 ->全局对象
- 在对象中的函数中 ->对象
- this 指的是当前正在执行该函数的对象

### call()/apply()/bind()
- 第一个参数都是 this 要指向的对象
- 都是改变 this 指向的；
- 都可以利用后续参数传参；

**call()**和**apply()**相似，都会**直接调用**
```javascript
var example = function (a, b, c) {
  return a + b + c;
};
example(1, 2, 3);
example.call(null, 1, 2, 3);//一次放置
example.apply(null, [1, 2, 3]); //两个参数，第二个是数组
```

  - 当你想应用多个参数，但你想将它们作为**变量**而不是常量应用时，可以使用`apply()`。


**bind()**只改变函数指向的this，并**没有调用**
- 你定义了this然后复制那个函数来创建一个新函数并返回它

### 总结
this指向优先级
![](./img/2022-12-13-13-54-44.png)

