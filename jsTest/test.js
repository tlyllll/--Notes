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
