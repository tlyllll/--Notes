# 内存管理

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
- 你用过的地方不再是免费的了。如果您请求的内存分配大小大于可用的大小 
- Malloc向操作系统请求更多的内存，**这需要更多的时间**。

时间的不同主要是因为分配的方式。