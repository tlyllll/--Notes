# 变量

常用的基本数据类型有 5 个：number / string / boolean / undefined / null。
```typescript
let age : number; 
//let 是 TS 的关键字，用来声明变量
//: number 用来指定变量 age 为数值类型。声明变量的时候要指定变量的类型。
//分号可选
//也可以直接赋值
let age : number = 18; 
```
# class、interface、type
## type
类型别名 用于给类型起一个新名字
```typescript
type Second = number; // 基本类型
let timeInSecond: number = 10;
let time: Second = 10;  // time的类型其实就是number类型
type userOjb = {name:string} // 对象
type getName = ()=>string  // 函数
type data = [number,string] // 元组
type numOrFun = Second | getName  // 联合类型
```
## class
基本写法：
- 注意用member的话要加this
```typescript
class Greeter {
  greeting: string;
 
  constructor(message: string) {
    this.greeting = message;
  }
 
  greet() {
    return "Hello, " + this.greeting;
  }
}
 
let greeter = new Greeter("world");
```
### 继承写法
```typescript
class Animal {
  name: string;
  constructor(theName: string) {
    this.name = theName;
  }
  move(distanceInMeters: number = 0) {
    console.log(`${this.name} moved ${distanceInMeters}m.`);
  }
}
 
class Snake extends Animal {
  constructor(name: string) {
    super(name);
  }
  move(distanceInMeters = 5) {
    console.log("Slithering...");
    super.move(distanceInMeters);
  }
}
 
class Horse extends Animal {
  constructor(name: string) {
    super(name); //这将执行基类的构造函数
  }
  move(distanceInMeters = 45) {
    console.log("Galloping...");
    super.move(distanceInMeters);
  }
}
 
let sam = new Snake("Sammy the Python");
let tom: Animal = new Horse("Tommy the Palomino");
 
sam.move();
tom.move(34);

// Slithering...
// Sammy the Python moved 5m.
// Galloping...
// Tommy the Palomino moved 34m.
constructor(private name: string) { }//把声明和赋值合并至一处。
```

### Public, private, protected, readonly
默认是public
private: 不能在声明它的类的外部访问
protected: protected成员在派生类中仍然可以访问
readonly: 将属性设置为只读的, 必须在声明时或构造函数里被初始化。
### getters/setters

```typescript
let passCode = "secret passCode";

class Employee {
    private _fullName: string;

    get fullName(): string {
        return this._fullName;
    }

    set fullName(newName: string) {
        if (passCode && passCode == "secret passCode") {
            this._fullName = newName;
        }
        else {
            console.log("Error: Unauthorized update of employee!");
        }
    }
}

let employee = new Employee();
let employee : Employee;

employee.fullName = "Bob Smith";
if (employee.fullName) {
    alert(employee.fullName);
}
```
只带有get不带有set的存取器自动被推断为readonly。
### 抽象类
```typescript
abstract class Department {

    constructor(public name: string) {
    }

    printName(): void {
        console.log('Department name: ' + this.name);
    }

    abstract printMeeting(): void; // 必须在派生类中实现
}

class AccountingDepartment extends Department {

    constructor() {
        super('Accounting and Auditing'); // 在派生类的构造函数中必须调用 super()
    }

    printMeeting(): void {
        console.log('The Accounting Department meets each Monday at 10am.');
    }

    generateReports(): void {
        console.log('Generating accounting reports...');
    }
}

let department: Department; // 允许创建一个对抽象类型的引用
department = new Department(); // 错误: 不能创建一个抽象类的实例
department = new AccountingDepartment(); // 允许对一个抽象子类进行实例化和赋值
department.printName();
department.printMeeting();
department.generateReports(); // 错误: 方法在声明的抽象类中不存在
```

## interface
接口可以包含方法和属性。但是，所有方法都必须是抽象方法。

如果在实现**类**声明语句之后声明接口，则该类**必须实现**指定的接口。这样做的好处是保持实现接口的类的一致性。

接口类似于类，它们可以有属性和方法，但不能直接创建实例。

```ts
interface ITodo {
  id: number;
  content: string;
  completed: boolean;
}

class Todo implements ITodo {
  constructor (
    public id: number,
    public content: string,
    public completed: boolean
  ) { }
}

const todo = new Todo(1, 'Typescript', false);

console.log(todo);

interface IPerson {
  name: string;
  sayHello(): void;
}


class Person implements IPerson {
  constructor(public name: string) {}

  sayHello() {
    console.log(`Hello ${this.name}`);
  }
}

function greeter(person: IPerson): void {
  person.sayHello();
}

const me = new Person('Lee');
greeter(me); // Hello Lee
```

可以用作变量类型 
```ts
interface Todo {
  id: number;
  content: string;
  completed: boolean;
}

let todo: Todo;
todo = { id: 1, content: 'typescript', completed: false };
```

# 装饰器
装饰器是一种特殊类型的**声明**，它能够被附加到**类声明**、**方法**、**属性**或者**参数**上，


若要启用实验性的装饰器特性，必须`tsconfig.json`里启用`experimentalDecorators`编译器选项

常见的装饰器有: 类装饰器、属性装饰器、方法装饰器、参数装饰器

## 装饰器的写法: 
### 普通装饰器(无法传参）
装饰器使用 `@expression` 这种形式，expression求值后必须为一个函数，它会在运行时被调用，被装饰的声明信息做为参数传入
```ts
function sealed(target) {
    // do something with "target" ...
}
@sealed
```
### 装饰器工厂(可以传参)
如果我们要定制一个修饰器如何应用到一个声明上
```ts
function color(value: string) { // 这是一个装饰器工厂
    return function (target) { //  这是装饰器
        // do something with "target" and "value"...
    }
}
```

## 顺序
类中不同声明上的装饰器将按以下规定的顺序应用：

- 参数装饰器，然后依次是方法装饰器，访问符装饰器，或属性装饰器应用到每个实例成员。
- 参数装饰器，然后依次是方法装饰器，访问符装饰器，或属性装饰器应用到每个静态成员。
- 参数装饰器应用到构造函数。
- 类装饰器应用到类。

## 类装饰器

1. 类装饰器的表达式将在运行时作为函数调用，被装饰类的**构造函数**将作为它的唯一**参数**。
2. 如果类装饰器**返回**一个构造函数, 它会使用提供的构造函数来**替换**类之前的声明。
```ts
function decorateClass<T extends { new (...args: any[]): {} }>(constructor: T){
  return class B extends constructor{
    name = 'B'
  }
}
@decorateClass
class A {
  name = 'A'
  constructor() {
  }
}
console.log(new A().name)  // 输出 B
```
## 函数装饰器
1. 方法装饰器的表达式将在运行时作为函数调用，带有以下三个参数:
- target: 
  - 装饰静态成员时为类的构造函数，
  - 装饰实例成员时为类的原型对象。
- key: 被装饰的方法名。
- descriptor: 成员的属性描述符 即 Object.getOwnPropertyDescriptor(target,key)。

```ts
function decorateMethod(target: any,key: string,descriptor: PropertyDescriptor){
  console.log('target === A',target === A)  // 是否类的构造函数
  console.log('target === A.prototype',target === A.prototype) // 是否类的原型对象
  console.log('key',key) // 方法名
  console.log('descriptor',descriptor)  // 成员的属性描述符 Object.getOwnPropertyDescriptor
}
class A {
  @decorateMethod  // 输出 true false 'staticMethod'  Object.getOwnPropertyDescriptor(A,'sayStatic')
  static staticMethod(){
  }
  @decorateMethod  // 输出 false true 'instanceMethod'  Object.getOwnPropertyDescriptor(A.prototype,'sayInstance')
  instanceMethod(){
  }
}
```

2. 如果方法装饰器返回一个值，它会被用作方法的**属性描述符**。
```ts
function decorateMethod(target: any,key: string,descriptor: PropertyDescriptor){
  return{
    value: function(...args: any[]){
        var result = descriptor.value.apply(this, args) * 2;
        return result;
    }
  }
}
class A {
  sum1(x: number,y: number){
      return x + y
  }

  @decorateMethod
  sum2(x: number,y: number){
    return x + y
  }
}
console.log(new A().sum1(1,2))  // 输出3
console.log(new A().sum2(1,2))  // 输出6
```
# 类型断言
TypeScript 允许你覆盖它的推断，并且能以你任何你想要的方式分析它，这种机制被称为「类型断言」。
```ts
const foo = {};
foo.bar = 123; // Error: 'bar' 属性不存在于 ‘{}’
foo.bas = 'hello'; // Error: 'bas' 属性不存在于 '{}'

//这里的代码发出了错误警告，因为 foo 的类型推断为 {}，即没有属性的对象。因此，你不能在它的属性上添加 bar 或 bas，你可以通过类型断言来避免此问题：
interface Foo {
  bar: number;
  bas: string;
}

const foo = {} as Foo;
foo.bar = 123;
foo.bas = 'hello';
```
