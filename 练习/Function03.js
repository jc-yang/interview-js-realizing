Function.prototype.myBind = function (context, ...args) {
    if(typeof this !== 'function') throw new Error('not a function');

    context = context || window;
    const that = this;

    const fBound = function (...innerArgs) {
        return that.call(this instanceof fBound ? this : context, ...args, ...innerArgs);
    }

    const fNOP = function () {}
    fNOP.prototype = this.prototype;
    fBound.prototype = new fNOP();

    return fBound;
}

Function.prototype.myCall = function (context, ...args) {
    if(typeof this !== 'function') throw new Error('not a function');
    context = context || window;

    const fn = Symbol('fn')
    context[fn] = this;


    const result = context[fn](...args);
    delete context[fn];

    return result;

}
