// 节流
function throttle(fn, delay = 100) {
    let timer = null;
    return function () {
        if(timer) return;
        timer = setTimeout(() => {
            fn.apply(this, arguments)
            timer = null
        }, delay)
    }
}
