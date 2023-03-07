//防抖
export function myDebounce(fn, wait) {
    let timeout = null
    return function() {
        clearTimeout(timeout)
        timeout = setTimeout(()=>{
            fn.apply(this, arguments)
        }, wait)
    }
}
//节流
export function throttle(fn, delay) {
    let timer = null
    return function () {
        if(!timer) {
            timer = setTimeout(()=>{
                fn.apply(this, arguments)
                timer = null
            }, delay)
        }
    }
}
// 代码题
// let url = "http://www.domain.com/?user=jack&id=123&id=456&city=%E5%8C%97%E4%BA%AC&enabled";

// 实现一个函数： parseParam
// 输入解析后的结果为:

// {
//   user: 'jack',
//   id: [ 123, 456 ], // 重复出现的 key 要组装成数组，能被转成数字的就转成数字类型
//   city: '北京', // 中文需解码
//   enabled: true, // 未指定值得 key 约定为 false
// }
export function myDecodeUrl (url) {
    let idx = url.indexOf('?')
    let arr = url.slice(idx+1).split('&')
    let res = {}
    arr.forEach((item)=>{
        let [key,val] = item.split('=')
        if(decodeURIComponent(val) === val){
            val = isNaN(val) ? val : Number(val)
        } else val = decodeURIComponent(val)
        val = val==='undefined'? false : val
        if(res.hasOwnProperty(key) && res[key]!=undefined) {
            if(!(res[key] instanceof Array)) {
                const temp = res[key]
                res[key] = new Array()
                res[key].push(temp)
            }    
            res[key].push(val)
        } else res[key] = val
    })
    return res
}
// let item = {
//     city: "北京",
//     enabled: false,
//     id: [123, 456],
//     user: "jack"
// }
export function myEncodeUrl (url,item) {
    let arr = []
    for(let key in item) {
        console.log(key,item[key])
        if(item[key] instanceof Array) {
            for(let i of item[key]) {
                arr.push(key+'='+i)
            }
        } 
        else if(typeof(item[key]) === 'boolean') {
            arr.push(key + '=' + item[key])
        } else {
            arr.push(key+'='+encodeURIComponent(item[key]))
        }
    }
    return url + '?' +arr.join('&')
}