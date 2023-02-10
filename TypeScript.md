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