# js
## 原型链
![](./img/2022-12-17-11-28-33.png)
1. js分为**函数对象**和**普通对象**，每个对象都有`__proto__`属性，但是只有函数对象才有`prototype`属性
2. Object、Function都是js内置的函数, 类似的还有我们常用到的Array、RegExp、Date、Boolean、Number、String

- 属性__proto__是一个对象, 它有两个属性，constructor和__proto__
```javascript
{
    __proto__:{
        constructor,
        __proto__
    }
}
```
- 原型对象prototype有一个默认的constructor属性，用于记录实例是由哪个构造函数创建；
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
JavaScript 的执行分为：解释和执行两个阶段

**解释阶段：**
    - 词法分析
    - 语法分析
    - 作用域规则确定

**执行阶段**：
    - 创建执行上下文
    - 执行函数代码
    - 垃圾回收

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
**执行上下文**最明显的就是 this 的指向是**执行时**确定的

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
### 普通函数和箭头函数
最大的区别在于 this 的指向问题：
- 箭头函数没有自己的 this

- 箭头函数**不能用 new**来创建构造函数的实例，普通函数可以（
  - 因为箭头函数创建的时候程序不会为它创建 construct 方法，也就是没有构造能力，用完就丢掉了，
  - 不像普通函数重复利用，因此也不需要构造函数原型，也就是不会自动生成 prototype 属性）

- 程序**不会**给箭头函数**创建 arguments 对象**

- 箭头函数中的 this 指向的是**紧紧包裹箭头函数的那个对象**（**定义时**决定的）。
  - 普通函数中的 this 是动态的，

- 箭头函数不能通过 bind、call、apply 来改变 this 的值，但依然可以调用这几个方法（只是 this 的值不受这几个方法控制）

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

## scope作用域
ES6 之前 JavaScript 没有块级作用域,只有全局作用域和函数作用域

执行上下文在运行时确定，随时可能改变；作用域在定义时就确定，并且不会改变。


### **全局作用域和函数作用域**
在代码中任何地方都能访问到的对象拥有**全局作用域**，一般来说以下几种情形拥有全局作用域：
- 最外层函数 
- 在最外层函数外面定义的变量拥有全局作用域

        ```javascript
        var outVariable = "我是最外层变量"; //最外层变量
        function outFun() {
            //最外层函数
            var inVariable = "内层变量";
            function innerFun() {
                //内层函数
                console.log(inVariable);
            }
            innerFun();
        }
        console.log(outVariable); //我是最外层变量
        outFun(); //内层变量
        console.log(inVariable); //inVariable is not defined
        innerFun(); //innerFun is not defined
        ```
- 所有**末定义直接赋值**的变量**自动声明为拥有全局作用域**

        ```javascript
        unction outFun2() {
            variable = "未定义直接赋值的变量";
            var inVariable2 = "内层变量2";
        }
        outFun2(); //要先执行这个函数，否则根本不知道里面是啥
        console.log(variable); //未定义直接赋值的变量
        console.log(inVariable2); //inVariable2 is not defined
        ```

- 所有 window 对象的属性拥有全局作用域

**函数作用域**,是指声明在函数内部的变量，和全局作用域相反，局部作用域一般只在固定的代码片段内可访问到，最常见的例如函数内部。

作用域是分层的，内层作用域可以访问外层作用域的变量，反之则不行。我们看个例子，用泡泡来比喻作用域可能好理解一点：
![](./img/2022-12-15-16-02-33.png)

块语句（大括号“｛｝”中间的语句不像函数，它们不会创建一个新的作用域。
- if
- switch 条件语句
- for 和 while 循环语句

### 块级作用域
块级作用域可通过新增命令 `let` 和 `const` 声明

所声明的变量在指定块的**作用域外无法**被访问

**创建：**
- 在一个函数内部
- 在一个代码块（由一对花括号`{}`包裹）内部(if/switch)

因为`let` 和 `const`没有变量提升+花括号`{}`内是块级作用域

```javascript
function getValue(condition) {
    if (condition) {
        let value = "blue";
        return value;
    } else {
        // value 在此处不可用
        return null;
    }
    // value 在此处不可用
}
```

### 闭包
能在外部访问到内部信息


### 作用域链
自由变量 = 当前作用域没有定义的变量

作用域链 = 自由变量向上级作用域一层一层寻找的路

```javascript
var x = 10;
function fn() {
    console.log(x);
}
function show(f) {
    var x = 20(function() {
        f(); //10，而不是20
    })();
}
show(fn);
```
在 fn 函数中，取自由变量 x 的值时，要到哪个作用域中取？
- 要到**创建** fn 函数的那个作用域中取，无论 fn 函数将在哪里调用。

### 延长作用域
**1. try...catch**

对 catch 语句来说，会创建一个新的变量对象，其中包含的是被抛出的错误对象的声明。

**2. with**

对 with 语句来说，会将指定的对象添加到作用域链中。

```javascript
function buildUrl() {
    var qs = "?debug=true"; 
    with(location){
        var url = href + qs;
        //这里的href可以在location里查找
    }
    return url;
}
```

## 防抖
- 只执行最后一次。防抖是规定时间内发生抖动时不执行后续操作。
- 函数防抖就是法师发技能的时候要读条，技能读条没完再按技能就会重新读条。
```javascript
function myDebounce(fn,wait = 1000){
    //创建一个标记 用来放定时器的返回值
    let timeout = null;
    return function(){
        // 每当用户输入的时候把钱一个setTimeout clear掉
        clearTimeout(timeout);
        timeout = setTimeout(()=>{
            // 然后又创建一个新的setTimeout
            // 这样就能保证输入字符后的interval间隔内如果还有字符输入的话
            // 就不会执行fn
            fn.apply(this, arguments);
        }, 500);
    }
}
```
## 节流
- 控制执行次数。
  - e.g. 滚动条拉到合适的位置了，过 5ms，再进行改变。
- 函数节流就是fps游戏的射速，就算一直按着鼠标射击，也只会在规定射速内射出子弹。

```javascript
function throttle(fn,delay){
    //创建一个标记 用来放定时器的返回值
    let timer = null;
    return function(){
        if(!timer) {
            timer = setTimeout(()=>{
                fn.apply(this, arguments);
                timer = null;
            }, delay);
        }
    }
}
```

## 数组操作

### for
1. for..of(ES6):
   - 循环用来**遍历数组**
   - 允许遍历获得**键值**
   - 只遍历当前对象 ；
   - 返回数组下标对应的属性值
   - 对于普通对象，没有部署原生的 `iterator` 接口，直接使用 for...of 会报错
     - 只要有 iterator 接口的数据结构,都可以使用 for of循环。
       - 数组 Array
       - Map
       - Set
       - String
       - arguments对象
       - Nodelist对象, 就是获取的dom列表集合

1. for..in(ES5):
   - 适用于**遍历对象**而产生的，不适用于遍历数组。
   - 只能获得对象的**键名**，不能获得键值
   - 会遍历整个对象的原型链；
   - 返回数组中所有可枚举的属性名；

2. forEach
   - 无法中途跳出，`break` 命令或 `return` 命令都不能奏效

### 常见操作

|  方法   | 参数/使用 [可选] | 作用  |
|  ----  | ----  | ----  |
| `shift`  | - |**删除**原数组**第一项**，并**返回**删除元素的**值**；如果数组为空则返回 `undefined` |
| `unshift`  | (`要添加的东西`) |将**参数添加**到原数组**开头**，并返回**数组的长度** |
| `pop`  | - |**删除**原数组**最后一项**，并**返回**删除元素的**值**；如果数组为空则返回 undefined|
| `push`  | (`要添加的东西`) |将**参数添加**到原数组**末尾**，并返回数组的**长度** |
| `concat`  | `c = a.concat(b);` | 合并两个数组，如果是使用ES6语法也可以用扩展运算符 `…` 来代替 |
| `splice`  | (`start,[deleteCount],[val1,val2,…]`) |从**start位置**开始**删除deleteCount项**，并从**该位置起插入**。**原数组改变** |
| `reverse`  | - |将数组反序 |
| `sort`  | (`function`) |按指定的参数对数组进行**排序** |
| `join`  | (`separator`) |将**数组**的元素**组起一个字符串**，以 **separator 为分隔符**，省略的话则用**默认用逗号**为分隔符 |
| `slice`  | (`start,[end]`) |规定从何处开始选取，该参数为负数，则表示从原数组中的倒数第几个元素开始提取.[start,end) **原数组不改变** |
| `map()`  | 实例如下 | map 作用是映射调用此方法的数组。按照原始数组元素顺序依次处理元素。不会改变原始数组，返回新数组，长度和原始数组一致 |
``` javascript
Array.map((item,index,arr)=>{
 //item => 数组的每一项
 //index => 数组每一项的索引
 //arr => 原数组
})
实例：
let arr = [1,2,3]
let newArr = arr.map((item,index,arr)=>{
         return item+1
})
//newArr = [2,3,4]
```

## 字符串
