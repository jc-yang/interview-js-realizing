// 寄生式组合继承
function Parent(name) {
    this.name = name;
}

function Child(name, age) {
    Parent.call(this, name); //这里调用一次父类构造函数
    this.age = age;
}

Child.prototype = Object.create(Parent.prototype);
// 重写原型导致默认 constructor 丢失，手动将 constructor 指回 Parent
Child.prototype.constructor = Child; // 否则构造函数仍为 Parent

// 测试
let instance = new Child('instance', 19);
console.log(Child.prototype.constructor)
console.log(instance.name);
