// new
function myNew(constructor, ...args) {
    // 创建空对象
    let obj = {}; // 等价于 new Object()
    obj.__proto__ = constructor.prototype; // 继承构造函数的 prototype 属性
    // 或使用 let obj = Object.create(constructor.prototype)

    // 执行构造函数并将 this 绑定到新创建的对象上
    let res = constructor.call(obj, ...args);

    // 如果原来构造函数中返回的是一个对象，那实例就只能访问这个对象里的值。需要将这个对像返回
    if(typeof res === 'object' && res !== null) return res;
    // 否则就还是返回新建的这个对象
    return obj;
}

// create
function objectCreate(proto, propertiesObject) {
    function F(){}
    F.prototype = proto;
    const res = new F();

    if(propertiesObject !== undefined) {
        Object.keys(propertiesObject).forEach(key => {
            let desc = propertiesObject[key];
            if(typeof desc !== 'object' || desc === null) { // 须为描述符类型
                throw new TypeError('Wrong property desc')
            } else {
                Object.defineProperty(res, key, desc);
            }
        })
    }

    return res;
}

// assign
function objectAssign(target, ...sources) {
    if(target === null || target === undefined) {
        throw new TypeError('Check the target')
    }
    const res = Object(target); // 若不是对象则转换为对象，是对象则复制为引用
    sources.forEach(source => {
        // assign 会跳过源对象为 null 或 undefined 的值，不报错
        if(source !== null && source !== undefined) {
            // for..in 会遍历出源对象中可枚举的属性（包括自身的和继承的），
            // 同样 obj[key]也可以访问到自身和继承的属性值
            for(const key in source) {
                // hasOwnProperty 只查询对象自身属性
                if(source.hasOwnProperty(key)) {
                    res[key] = source[key];
                }
            }
            // 上面的方法可替代为 Object.keys()，遍历的是对象自身可枚举的属性
            // Object.keys(source).forEach(key => res[key] = source[key])
        }
    })
    return res;
}

