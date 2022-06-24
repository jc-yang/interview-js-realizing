// 实现 instanceof
function myInstanceof(left, right) {
    // 基本数据类型均返回 false
    if((typeof left !== 'object' && typeof left !== 'function')
    || left === null) {
        return false;
    }
    // 取隐式原型
    let leftProto = left.__proto__; // 等价于 Object.getPrototypeOf(left)
    // 循环判断原型链
    while (true) {
        // 是否到达原型链顶端
        if(leftProto === null) return false;
        // 判断右边的显式原型 prototype 对象是否在左边的原型链上
        if(leftProto === right.prototype) return true;
        // 原型链查找
        leftProto = leftProto.__proto__;
    }
}
