// class 继承
class Parent {
    constructor(name) {
        this.name = name
    }
}

class Child extends Parent {
    constructor(name, age) {
        super(name);
        this.age = age;
    }
}

// 测试
let instance = new Child('instance', 19);
console.log(instance.name);
