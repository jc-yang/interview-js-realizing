Function.prototype.myCall = function (context, ...args){
    if(typeof this !== 'function') throw new TypeError('Not a function');
    context = context || window;
    const fn = Symbol('fn');
    context[fn] = this;
    const res = context[fn](...args);
    delete context[fn];
    return res;
}

Function.prototype.myApply = function (context, args) {
    if(typeof this !== 'function') throw new TypeError('Not a function');
    context = context || window;
    const fn = Symbol('fn');
    context[fn] = this;
    let res;
    if(args && args.length) {
        res = context[fn](...args);
    } else {
        res = context[fn]();
    }
    delete context[fn];
    return res;
}

Function.prototype.myBind = function (context, ...args) {
    if(typeof this !== 'function') throw new TypeError('Not a function');
    const that = this;
    const fBound = function (...innerArgs) {
        return that.call(this instanceof fBound ? this : context, ...args, ...innerArgs);
    }
    const fNOP = function (){}
    fNOP.prototype = that.prototype;
    fBound.prototype = new fNOP();
    return fBound;
}

function myNew(constructor, ...args) {
    const newObj = Object.create(constructor.prototype);

    const res = constructor.call(newObj, ...args);

    if(typeof res === 'object' && res !== null) return res;

    return newObj;
}

Object.myCreate = function (proto, propertiesObject) {
    function F(){}
    F.prototype = proto;
    const res = new F();

    if(propertiesObject !== undefined) {
        Object.keys(propertiesObject).forEach(key => {
            const desc = propertiesObject[key];
            if(typeof desc === 'object' && desc !== null) {
                Object.defineProperty(res, key, desc);
            } else {
                throw new TypeError('Wrong property desc')
            }
        })
    }

    return res;
}

Object.myAssign = function (target, ...sources) {
    if(typeof target !== 'object' || target === null) throw new Error('not an object');
    sources.forEach(source => {
        Object.keys(source).forEach(key => {
            target[key] = source[key];
        })
    })
    return target;
}
