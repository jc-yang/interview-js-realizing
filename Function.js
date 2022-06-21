
// Function.prototype.call
Function.prototype.myCall = function (context, ...args) {
    if(typeof this !== 'function') {
        throw new Error('Not a function')
    }
    context = context || window; // 如果传入是null，则指向 window
    let fn = Symbol('fn');  // 生成唯一的key值fn，Symbol值不是对象， 不能使用new命令
    context[fn] = this; // 将这个要执行的函数绑定到context的一个属性上
    let res = context[fn](...args) // 调用这个函数，并拿到返回值用于最终的返回
    delete context[fn]; // 删除对象中的函数，保持原来context对象不变
    return res; // 返回值
}


// Function.prototype.apply()
Function.prototype.myApply = function (context, args) {
    if(typeof this !== 'function') {
        throw new Error('Not a function')
    }
    context = context || window;
    let fn = Symbol('fn');
    context[fn] = this;
    let res;
    if(args && args.length) { // 需判断是否为空
        res = context[fn](...args);
    } else {
        res = context[fn]();
    }
    delete context[fn];
    return res;
}

Function.prototype.myBind = function (context, ...args) {
    if(typeof this !== 'function') {
        throw new Error('Not a function')
    }
    context = context || window;
    const that = this;
    const fNOP = function (){}
    const fBound = function (...innerArgs) {
        // 当作为构造函数时，this 指向实例，所以应为当前作用域内的this
        // 后面步骤改变了proto指向，fBound.prototype = new fNOP(),所以使用 fNOP 或 fBound 判断都可以
        return that.call(this instanceof fNOP ? this : context, ...args, ...innerArgs)
    }
    // 修改返回函数的 prototype 为绑定函数的 prototype，实例就可以继承绑定函数的原型中的值
    // 但不能直接fBound.prototype = this.prototype，否则直接修改 fBound.prototype 的时候，也会直接修改绑定函数的 prototype。
    // 这个时候，我们可以通过一个空函数来进行中转
    fNOP.prototype = this.prototype;
    fBound.prototype = new fNOP(); // new 出来的新对象具有新的地址，修改不会影响到 this.prototype

    return fBound;
}
