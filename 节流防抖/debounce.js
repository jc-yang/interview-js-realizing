// 防抖
export function debounce(cb, delay = 500) {
    let timer = null;
    return function () {
        if(timer) clearTimeout(timer);
        timer = setTimeout(() => {
            cb.apply(this, arguments);
            timer = null;
        }, delay)
    }
}
