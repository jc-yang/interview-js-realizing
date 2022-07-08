Promise.resolve = function (val) {
    if(val instanceof Promise) return val;
    return new Promise((resolve, reject) => resolve(val));
}

Promise.reject = function (val) {
    return new Promise((resolve, reject) => reject(val))
}

Promise.race = function (promises) {
    return new Promise((resolve, reject) => {
        promises.forEach(promise => {
            promise.then(res => resolve(res), err => reject(err));
        })
    })
}

Promise.any = function (promises) {
    return new Promise((resolve, reject) => {
        let count = 0
        promises.forEach(promise => {
            promise.then(res => resolve(res), err => {
                count++;
                if(count === promise.length) {
                    reject(new Error('No promise resolved'))
                }
            })
        })
    })
}

Promise.all = function (promises) {
    return new Promise((resolve, reject) => {
        let count = 0, result = [];
        promises.forEach((promise, index) => {
            promise.then(res => {
                count++;
                result[index] = res;
                if(count === promises.length) resolve(result);
            }, err => {
                reject(err);
            })
        })
    })
}

Promise.allSettled = function (promises) {
    return new Promise((resolve, reject) => {
        let count = 0, result = [];
        promises.forEach((promise, index) => {
            promise.then(res =>{
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
                count === promises.length && resolve(result);
            })
        })
    })
}
