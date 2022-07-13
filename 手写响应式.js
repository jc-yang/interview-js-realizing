// 此处更新视图
function updateView() {
    console.log('视图更新了');
}

// 重新定义数组原型
// 创建新对象，原型指向 oldArrProto，再扩展新的方法不会影响原原型
const arrProto = Object.create(Array.prototype);
// 重写一些修改数组的方法，修改数组时，更新视图
['push', 'pop', 'shift', 'unshift', 'splice'].forEach(methodName => {
    arrProto[methodName] = function () {
        Array.prototype[methodName].call(this, ...arguments);
        updateView(); // 更新视图
    }
})

// 重新定义属性，监听起来
function defineReactive(target, key, value) {
    observer(value) // 深度监听，需要反复递归

    // 核心 API
    Object.defineProperty(target, key, {
        get() {
            return value;
        },
        set(newVal) {
            if(newVal !== value) {
                observer(newVal) // 深度监听
                // value处在闭包中，设置完之后再次get，也是获取到最新的值
                value = newVal;
                // 触发去更新视图
                updateView();
            }
        }
    })
}

// 监听对象
function observer(target) {
    if(typeof target !== "object" || target === null) return target

    // 监听数组，重写了一些修改数组的方法
    if(Array.isArray(target)) {
        target.__proto__ = arrProto // 或Object.setPrototypeOf(target, arrProto)
    }

    Object.keys(target).forEach(key => {
        defineReactive(target, key, target[key]);
    })
}

const data = {
    nums: [10, 20, 30]
}
// 监听
observer(data)

// 测试

data.nums.push(40) // 监听数组
