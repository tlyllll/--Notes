# 内存管理
TODO 
## c++ 内存分区模型
不同区域存放的数据，赋予不同的生命周期

**4区**
1. 代码区： 函数体的二进制代码，由操作系统进行管理的【共享、只读】
2. 全局区：存放全局变量和静态变量以及常量
3. 栈区：由编译器自动分配释放, 存放函数的参数值,局部变量等
4. 堆区：由程序员分配和释放,若程序员不释放,程序结束时由操作系统回收

- 运行前只有代码区+全局区
- 运行后有栈区和堆区

**5区**
1. 栈
2. 堆 malloc
3. 自由存储 new 【可能是堆可能是静态存储区】
4. 全局/静态
5. 常量
## 虚拟内存
- 虚拟内存是计算机系统内存管理的一种技术，使得应用程序认为它拥有连续可用的内存
- 实现进程地址空间隔离
- 虚拟内存和物理内存的映射通过页表(page table)来实现
## 内存泄漏
程序结束时，在堆上分配的没有释放的内存会造成泄漏吗？
- 内存泄漏是在在程序运行中有内存没有被使用到
- 对于现代操作系统，泄露的内存会被操作系统自动释放，叫**内存自动回收。**

那为什么程序员要手动释放内存呢？

- 原因1：如果程序存在**内存泄漏**，但恰好运行的操作系统可以帮你自动释放，那么短时间运行没问题。但是，如果移植到另一个没有内存自动回收功能的操作系统，怎么办？
- 原因2：大多数程序是服务端的守护进程，是一直运行的，如果存在内存泄漏，那么经过长时间的累计，会造成严重问题，程序会崩溃，操作系统的性能和稳定性也会受到很大影响。
## 堆&栈
堆和栈是ram中实际存在的两个区域
明确地说，我们计算机上的每个程序/进程都有自己的堆栈/堆 
每个线程在被创建时都会创建自己的堆栈。 
而堆在所有线程之间共享
当我们启动程序时，程序被加载到RAM中，因此程序的STACk和HEAP都在RAM中。

栈STACK通常是一个预定义大小的内存区域，不能更改大小，通常为2兆字节左右

堆HEAP也是一个预定义默认值的区域，但是它的大小在应用程序运行期间可能会改变。

一个元素在HEAP和STACK中的内存分配是完全不同的。


```c++
#include <iostream>
#include <string>

struct Vector3{
	float x, y, z;
	Vector3() : x(10), y(11), z(12){}
};

int main(){

	int value = 5; // in the STACK

	int* hvalue = new int; // in the HEAP (new allocates in the HEAP)
	*hvalue = 5;
	delete hvalue;

	int array[5]; // STACK
	array[0]=1;array[1]=2;array[2]=3;array[3]=4;array[4]=5;
	int* harray = new int[5]; // HEAP
	harray[0]=1;harray[1]=2;harray[2]=3;harray[3]=4;harray[4]=5;
	delete[] harray;

	Vector3 vector;
	Vector3* hvector = new Vector3();
	delete hvector;
```
### Stack 栈
- 在STACK中，数据是连续分配的。例如，array由5个整数组成, 每个整数由4个字节组成。
- 因为STACk的内存分配是连续的然后有了第一个字节的内存地址，如果指针移动4个字节，就可以找到数组的第二个元素。 
- 在STACK中，一个东西被分配到另一个上面，**内存分配非常快**: 
- 它只是一个CPU指令。我们移动4字节的堆栈指针，然后返回地址堆栈指针的。
- 在堆栈中，当作用域结束时，用于该作用域的堆栈内存被释放
### HEAP 堆
- 对于HEAP，我们使用`new`，但是对于调用`new`的智能指针，我们使用`make_unique`或`make_shared`。 
- 如果使用`new`，则需要**手动**释放内存。 
1. new关键字只调用函数`malloc`。为了分配内存，`malloc`调用操作系统函数。 
2. malloc有一个可用内存空闲列表，用于分配内存，当您请求内存分配时，malloc去检查是否有足够的内存
3. 如果有，然后将指针返回到那个内存。然后，malloc重写空闲列表内存分配，记录已经被拿走了多少内存，有多少已经被分配了 
4. 使用完后要delete它，又要重新更改空闲列表
- 你用过的地方不再是free的了。如果您请求的内存分配大小大于可用的大小 
- Malloc向操作系统请求更多的内存，**这需要更多的时间**。

时间的不同主要是因为分配的方式。

## ELF文件
操作系统在加载 ELF 文件时会将按照标准**依次**读取每个段中的内容，并将其加载到内存中，同时为该进程分配栈空间，并将 **pc 寄存器**指向代码段的**起始位置**，然后启动进程。

>只读代码段

  【段头表】

  【.init section】

  【.text section】代码段。通常存放已编译程序的机器代码，一般操作系统加载后，这部分是只读的。不允许修改，但是可以执行.编译后的二进制文件存放在这里。

  【.rodata section】只读数据段。此段的数据不可修改，存放程序中会使用的常量。比如程序中的常量字符串 \texttt{"aasdasdaaasdasd"}"aasdasdaaasdasd"。

  ---
> 读写（数据）

  【.data section】数据段。主要用于存放已初始化的全局变量、常量、静态变量。全局变量和静态变量被分配到同一块 全局静态区域中 

  【.bss section】bss 段。该段主要存储未初始化全局变量，仅是占位符，不占据任何实际磁盘空间。目标文件格式区分初始化和非初始化是为了空间效率。

---
>不需映射到存储空间的符号表和调试信息

  【.debug section】

  【.line section】

  【.strtab section】

  【节头部表】

