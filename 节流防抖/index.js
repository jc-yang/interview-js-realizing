
function debounce(cb, delay = 500) {
    let timer = null;
    return function (...args) {
        if(timer) clearTimeout(timer);

        timer = setTimeout(() => {
            // cb(...args);
            cb.apply(this, arguments)
            timer = null;
        }, delay)
    }
}

// input 输入防抖
const input1 = document.querySelector('#input1')
const handleInput = function () {
    console.log(input1.value)
}
input1.addEventListener('input',
    debounce(handleInput, 500)
)


function throttle(fn, delay = 100) {
    let timer = null;
    return function () {
        if(timer) return;
            fn.apply(this, arguments);
        timer = setTimeout(() => {
            // fn(...args)
            timer = null;
        }, delay)
    }
}

// div 拖拽节流
const div1 = document.querySelector('#div1');
div1.addEventListener('drag', throttle( (e) => {
    console.log(e.offsetX, e.offsetY)
}, 500))
