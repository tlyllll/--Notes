#include <iostream>
#include <vector>
using namespace std;
int main(){
    int n;
    cout << "pls input n:" << endl;
    cin>>n;
    cout << "n is " << n << endl;
    vector<int> nums(2*n);
    for(int i = 0; i < n; i++){
        int temp;
        cin >> temp;
        nums[i] = temp;
    }
    reverse_copy(nums.begin(), nums.begin()+n, nums.begin()+n);
    for(int i : nums) cout << i;
    cout << endl; 
    int k;
    cin >> k;
    if(k > 2*n) cout << nums[k%(2*n)-1] << endl;

    return 0;
}