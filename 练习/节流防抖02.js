
function throttle(fn, delay = 100) {
    let timer = null;
    return function () {
        if(timer) return;
        timer = setTimeout(() => {
            fn.apply(this, arguments)
            timer = null;
        }, delay)
    }
}

function debounce(fn, delay = 100) {
    let timer = null;
    return function () {
        if(timer) clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(this, arguments)
            timer = null
        }, delay)
    }
}
