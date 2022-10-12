TODO  排序（希尔排序，快速排序、冒泡排序、归并排序、堆排序、选择排序）空间复杂度+时间复杂度
## 排序 
### 快速排序
平均时间复杂度是 O(nlogn)但最坏情况下的时间复杂度是O(n^2)
基本思想：
1. 选中一个元素，将小于它的都放在左边大于它的都放在右边。
2. 再在他的左边和右边选中一个元素，重复上述操作。
![](2022-10-12-11-19-29.png)![](2022-10-12-11-19-30.png)

实现方法
1. 双边循环法
设置两个指针
2. 单边循环法

```c++
#include <iostream>
#include <vector>
#include <stack>
#include <map>
#include <string>
using namespace std;

void quickSort(vector<int> &arr, int startIndex, int endIndex);
int partition(vector<int> &arr, int startIndex, int endIndex);

int main(){
    vector<int> arr = {4,2,4,6,8,24,7,1,7,3,5,9,2,3};
    int end = (int)arr.size() - 1;
    quickSort(arr, 0, end);
    for(int i : arr) cout << i << ", ";
    
    return 0;
}
void quickSort(vector<int> &arr, int startIndex, int endIndex){
    //初始化创建stack：每一个元素包含（startIndex，endIndex）的信息
    stack<map<string, int>> quickSortStack;
    map<string, int> root;
    root.insert({"endIndex", endIndex});
    root.insert({"startIndex", startIndex});

    quickSortStack.push(root);
    //初始时头尾为arr的头尾（未分化）
    while(!quickSortStack.empty()){
        //先获得栈顶元素信息
        map<string, int> temp = quickSortStack.top();
        int start = temp["startIndex"];
        int end = temp["endIndex"];
        quickSortStack.pop();
        //排序并且取得分化后的范围
        int mid = partition(arr, start, end);
        if(mid > start+1){
            map<string, int> param;
            param.insert({"startIndex", start});
            param.insert({"endIndex", mid-1});
            quickSortStack.push(param);
        }
        if(mid < end - 1){
            map<string, int> param;
            param.insert({"startIndex", mid+1});
            param.insert({"endIndex", end});
            quickSortStack.push(param);
        }
    }
}
int partition(vector<int> &arr, int startIndex, int endIndex){
    //选择第一个元素作为基准
    int pivot = arr[startIndex];
    int mark = startIndex;
    //将所有小于基准的元素挪到左边
    for(int i = startIndex+1; i <= endIndex; i++){
        if(arr[i] < pivot)
            swap(arr[++mark], arr[i]);
    }
    //将mark的位置和基准的位置调换-> 所有基准左边的值都比基准小
    swap(arr[mark], arr[startIndex]);
    return mark;
}


```