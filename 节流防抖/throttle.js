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

// (立即执行版)首次不节流，之后节流
function throttle1(fn, delay = 100) {
    let timer = null
    return function () {
        if(!timer) return
        fn.apply(this, arguments)
        timer = setTimeout(() => {
            timer = null
        }, delay)
    }
}
