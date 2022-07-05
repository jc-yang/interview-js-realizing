// new
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
                throw new TypeError('Wrong desc for object definition')
            }
        })
    }

    return res;
}

Object.myAssign = function (target, ...sources) {
    if(typeof target !== 'object' || target === null) throw TypeError('Wrong target type');

    sources.forEach(source => {
        if(source !== null && source !== undefined) { // 跳过的逻辑别忘了
            Object.keys(source).forEach(key => {
                target[key] = source[key];
            })
        }
    })

    return target;
}

function myInstanceOf(left, right) {
    if((typeof left !== 'object' && typeof left !== 'function') || left === null) return false; // 对原始类型的处理别忘了
    left = left.__proto__;
    while (true) {
        if(left === null) return false;
        if(left === right.prototype) return true;
        left = left.__proto__;
    }
}
