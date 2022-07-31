// 实现 add(1)(2)(3) 返回 6
// const add = (x) => (y) => (z) => x + y +z

const _add = (x, y, z) => x + y + z

const curry = (fn, ...args) => {
    // 函数的参数个数可直接通过函数的 .length 属性来访问
    return args.length >= fn.length
        // 传入的参数大于等于原始函数 fn 的参数个数，则直接执行
        ? fn(...args)
        // 传入的参数小于原始函数fn的参数个数是则继续柯里化
        // 返回一个接收说有参数（当前参数和剩余参数）的函数
        : (..._args) => curry(fn, ...args, ..._args)
}

// 无限参数
function add(...args){
    let sum = args.reduce((pre,cur) => pre + cur);
    let fn = function(...nextArgs){
        return nextArgs.length ? add(sum,...nextArgs) : sum
    }
    fn.toString = function () {
        return sum
    }
    return fn
}

// 任意函数柯里化
function curry(fn, ...args) {
    let curried = function (...newArgs) {
        return curry(fn, ...args, ...newArgs)
    }
    curried.toString = function () {
        return fn(...args)
    }
    return curried
}
// 使用
function dynamicAdd() {
    return [...arguments].reduce((prev, curr) => {
        return prev + curr
    }, 0)
}
var add = curry(dynamicAdd);
add(1)(2)(3)(4) // 10
add(1, 2)(3, 4)(5, 6) // 21
