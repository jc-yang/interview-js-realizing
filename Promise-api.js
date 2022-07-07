// Promise.resolve
function promiseResolve(val) {
    if(val instanceof Promise) {
        return val;
    }
    return new Promise(resolve => resolve(val))
}

// Promise.reject
function promiseReject(err) {
    return new Promise((resolve, reject) => reject(err))
}

// Promise.all
function promiseAll(promises) {
    return new Promise((resolve, reject) => {
        if(promises.length) return resolve(promises);
        let result = [];
        let count = 0; // count 另外计数，因 index 不能保证前面的 promise 结束
        promises.forEach((promise, index) => {
            promise.then(res => {
                result[index] = res;
                count++;
                count === promises.length && resolve(result);
            }, err => reject(err))
        })
    })
}

// Promise.prototype.finally
Promise.prototype.finally = function (cb) {
    return this.then((res) => {
        // 保证 Promise.then 能够执行完
        return Promise.resolve(cb()).then(() => res);
    }, (err) => {
        // Promise.resolve 目的是等待 cb() 后的Promise执行完成
        return Promise.resolve(cb()).then(() => throw err);
    })
}

// Promise.race，有一个成功或失败(率先改变状态)，就返回这个成功或失败的promise
function promiseRace(promises) {
    return new Promise((resolve, reject) => {
        promises.forEach(promise => {
            promise.then(res => resolve(res), err => reject(err));
        })
    })
}

// Promise.any，有一个成功就返回这个成功，否则reject
function promiseAny(promises) {
    return new Promise((resolve, reject) => {
        let count = 0;
        promises.forEach((promise, index) => {
            promise.then(res => resolve(res), err => {
                count++;
                if(count === promises.length) {
                    reject(new Error('All Promises rejected'))
                }
            });
        })
    })
}

// Promise.allSettled， 所有 promise 都返回结果，就返回这些结果
function promiseAllSettled(promises) {
    return new Promise((resolve, reject) => {
        const result = [];
        let count = 0;
        promises.forEach((promise, index) => {
            promise.then(res => {
                count++;
                result[index] = {
                    status: 'fulfilled',
                    value: res,
                }
                count === promises.length && resolve(result);
            }, err => {
                count++;
                result[index] = {
                    status: 'rejected',
                    value: err,
                }
                count === promises.length && resolve(result); // 注意这里也是 resolve
            })
        })
    })
}






















