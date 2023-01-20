# EventEmitter
Node.js 中任何对象发出的事件都是 EventEmitter 类的实例，就像 http 模块。
```javascript
const events = require("events");
const eventEmitter = new events.EventEmitter();
const eventListener = function(){  
    console.log("event triggered");
}
eventEmitter.on("emitted", eventListener);
eventEmitter.emit("emitted");

```
# 流
Stream 流是从源读取或写入数据并将其传输到连续流目标的管道。

- 可读
- 可写的
- 可读写
- 先写入，再读出来

每个流也是一个 EventEmitter。这意味着流对象可以在[流上没有数据]、[流上有可用数据]或[流中的数据在程序刷新时]发出事件。

# Q
### readFile 和 createReadStream 函数有什么区别?
- readFile 函数**异步**读取文件的**全部内容**，并存储在**内存**中，然后再传递给用户。
- createReadStream 使用一个**可读的流，逐块读取文件**，而不是全部存储在内存中。

与 readFile 相比，createReadStream 使用**更少的内存**和**更快的速度**来优化文件读取操作。

如果文件相当大，用户不必等待很长时间直到读取整个内容，因为读取时会先向用户发送小块内容。
### 单线程与多线程网络后端相比有哪些好处
我们的应用程序在生产过程中不会突然遇到意外的竞争条件。

它们可以毫不延迟地在一个时刻收到的大量用户请求提供服务。相比之下，当流量较大时，**多线程后端必须等待线程池中的线程释放**，才能为用户请求提供服务。利用 Node.js 的非阻塞特性，用户请求**不会在单个线程上挂起太长时间**（只有在操作不是 CPU 密集型时）。