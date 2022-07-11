// 判断两个对象是否内容相同
function isEqual(obj1, obj2, map = new WeakMap()) {
    if(obj1 === obj2) return true; // 地址相同，直接相同

    if(!isObject(obj1) || !isObject(obj2)) { // 如果不是对象，则直接判断
        return obj1 === obj2;
    }

    // map 取值判断循环引用
    if(map.has(obj1) || map.has(obj2)) {
        return true
    }
    map.set(obj1, obj2)

    const obj1Keys = Object.keys(obj1);
    const obj2Keys = Object.keys(obj2);
    // key 个数不同肯定不相等
    if(obj1Keys.length !== obj2Keys.length) {
        return false;
    }

    obj1Keys.forEach(key => {
        const res = isEqual(obj1[key], obj2[key], map)
        if(!res) return false;
    })
    return true;
}

function isObject(obj) {
    return typeof obj === 'object' && obj !== null;
}

// testing
const obj1 = { a: 100, b: { x: 100, y: 200 } }
const obj2 = { a: 100, b: { x: 100, y: 200 } }
console.log(obj1 === obj2)
console.log(isEqual(obj1, obj2))

const a = { c: undefined}
const b = { d: undefined}
console.log(isEqual(a,b))
