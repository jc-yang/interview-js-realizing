function updateView() {
    console.log('更新视图')
}


function reactive(target) {
    if(typeof target !== 'object' || target === null) return target

    // 生成代理对象
    const observed = new Proxy(target, {
        get(target, key, receiver) {
            // 只处理自身的属性，（非原型属性）

            const res = Reflect.get(target, key, receiver)
            console.log('get', key)
            return reactive(res) // 递归监听
        },
        set(target, key, value, receiver) {
            // 重复数据不处理
            if(target[key] === value) return true

            // 判断是否为新增属性
            const ownKeys = Reflect.ownKeys(target)
            if(ownKeys.includes(key)) {
                console.log('已有的key', key)
            } else {
                console.log('新增的key', key)
            }
            const res = Reflect.set(target, key, value, receiver)
            console.log('set', key, value)
            updateView()
            return res // 是否设置成功
        },
        deleteProperty(target, key) {
            const res = Reflect.deleteProperty(target, key)
            console.log('delete', key)
            updateView()
            return res // 是否删除成功
        }

    })
    return observed
}



// testing
const data = {
    a: 'aa'
}
reactive(data)
