// Promise.resolve
function promiseResolve(value) {
    if(value instanceof Promise) return value;
    return new Promise(resolve => resolve(value))
}

// Promise.all
function promiseAll(promises) {
    return new Promise((resolve, reject) => {
        if(!promises.length) return resolve(promises);
        const results = [];
        let count = 0;
        promises.forEach((promise, index) => {
            promise.then(res => {
                results[index] = res;
                count++;
                count === promises.length && resolve(results);
            }, err => {
                reject(err);
            })
        })
    })
}

// Promise.race
function promiseRace(promises) {
    return new Promise((resolve, reject) => {
        if(!promises.length) return resolve(resolve);
        promises.forEach(promise => {
            promise.then(res => resolve(res), err => reject(err))
        })
    })
}

// Promise.allSettled
function promiseAllSettled(promises): Promise {
    return new Promise((resolve, reject) => {
        const result: PromiseSettledResult[] = [];
        let count = 0;
        promises.forEach((promise, index) => {
            promise.then(res => {
                count++;
                result[index] = {
                    status: 'fulfilled',
                    value: res,
                };
                count === promises.length && resolve(result);
            }, err => {
                count++;
                result[index] = {
                    status: 'rejected',
                    value: err,
                };
                count === promises.length && resolve(result);
            })
        })
    })
}

// Promise.prototype.finally
Promise.prototype.myFinally = function (cb){
    return this.then(res => {
        return Promise.resolve(cb()).then(() => res);
    }, err => {
        return Promise.resolve(cb).then(() => throw err);
    })
}
