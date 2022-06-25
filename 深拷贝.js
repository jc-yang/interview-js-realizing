
function deepClone(obj) {
    if(typeof obj !== 'object' || obj === null) return obj; // 基本类型或null直接返回

    const newObj = Array.isArray(obj) ? [] : {}; // 需判断是否为数组
    // 等价于 obj instanceof Array

    // 遍历对象自身的属性
    Object.keys(obj).forEach(key => {
        newObj[key] = deepClone(obj[key]);
    })

    return newObj;
}
// map作为检查器，避免对象深拷贝中出现循环引用，导致递归溢出
function deepClone2(obj, map = new WeakMap()) {
    if(typeof obj !== 'object' || obj === null) return obj;
    // 如果已经拷贝过这个对象，则返回之前拷贝后生成的对象
    if(map.has(obj)) return map.get(obj);
    // 判断是否为数组
    const newObj = Array.isArray(obj) ? [] : {};
    // 记录当前obj被复制后的结果newObj，后续逻辑对其属性进行追加
    map.set(obj, newObj);
    Object.keys(obj).forEach(key => {
        newObj[key] = deepClone(obj[key], map);
    })
    return newObj;
}

// test
const obj1 = {
    age: 20,
    name: 'xxx',
    address: {
        city: 'Beijing',
    },
    arr: ['a', 'b', 'c'],
}
const obj2 = deepClone(obj1);
obj2.address.city = 'Shanghai'
console.log(obj1.address.city)
