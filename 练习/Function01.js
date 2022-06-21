// Function.prototype.call
Function.prototype.myCall = function (context, ...args) {
    if(typeof this !== 'function') throw new Error('Not a function');
    context = context || window;
    let fn = Symbol('fn');
    context[fn] = this;
    const res = context[fn](...args);
    delete context[fn];
    return res;
}

// Function.prototype.apply
Function.prototype.myApply = function (context, arr) {
    if(typeof this !== 'function') throw new Error('Not a function');
    context = context || window;
    let fn = Symbol('fn');
    context[fn] = this;
    let res;
    if(arr && arr.length) {
        res = context[fn](...arr);
    } else {
        res = context[fn]()
    }
    delete context[fn];
    return res;
}

// Function.prototype.bind
Function.prototype.myBind = function (context, ... args) {
    if(typeof this !== 'function') throw new Error('Not a function');
    context = context || window;
    const that = this;
    const fNOP = function (){};
    const fBound = function (...innerArgs) {
        const ctx = this instanceof fBound ? this : context;
        return that.call(ctx, ...innerArgs, ...args);
    }
    fNOP.prototype = this.prototype;
    fBound.prototype = new fNOP();
    return fBound;
}



// test
function aa(d) {
    console.log('aa')
    console.log(this.value)
    console.log(d)
}
let obj = {
    value: 'ccc'
}

// aa.myCall(obj,'ddd')
aa.myApply(obj, 'ddd')
// aa.apply(obj, ['ddd'])

