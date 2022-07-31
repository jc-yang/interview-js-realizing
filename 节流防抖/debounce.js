// 防抖
export function debounce(cb, delay = 500) {
    let timer = null;
    return function () {
        if(timer) clearTimeout(timer);
        timer = setTimeout(() => {
            cb.apply(this, arguments); // 如果不绑定 this，那用户在 cb 内部使用的 this 指向会出错
            timer = null;
        }, delay)
    }
}

// (立即执行版)首次不防抖直接执行，之后再开始防抖
function debounce1(cb, delay) {
    let timer = null
    let immediate = true
    return function () {

        if(immediate) {
            immediate = false;
            cb.apply(this, arguments)
        }

        if(timer) clearTimeout(timer)
        timer = setTimeout(() => {
            cb.apply(this, arguments)
            timer = null
        }, delay)
    }
}
