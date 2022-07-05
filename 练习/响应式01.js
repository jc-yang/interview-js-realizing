

function notify() {
    console.log('去更新视图')
}

function observe(target) {
    if(typeof target !== 'object' || target === null) return;

    // 数组
    if(Array.isArray(target)) {
        target.__proto__ = newArrProto
    }

    Object.keys(target).forEach(key => defineReactive(target, key, target[key]))
}

function defineReactive(target, key, val) {
    observe(val)
    Object.defineProperty(target, key, {
        get() {
            return val;
        },
        set(newVal) {
            if (val !== newVal) {
                val = newVal;
                observe(newVal)
                notify();
            }
        }
    })
}

const oldArrProto = Array.prototype;
const newArrProto = Object.create(oldArrProto);
['push', 'shift', 'pop'].forEach(fnName => {
    newArrProto[fnName] = function () {
        oldArrProto[fnName].call(this, ...arguments)
        notify();
    }
})
