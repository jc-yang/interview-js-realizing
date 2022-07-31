/**
 * @description myPromise
 */


class MyPromise {

    state = 'pending' // pending, fulfilled, rejected
    value = undefined // resolve 后的值
    reason = undefined // rejected 后的值

    resolveCallbacks = [] // pending 时，储存要执行的 resolve 的回调
    rejectCallbacks = [] // pending 时，存储要执行的 reject 的回调
    // 用数组是因为一个promise可以多次调用 then： p1.then(()=>{}), p1.then(()=>{}), p1.then(()=>{})

    constructor(cb) {
        const resolveHandler = (value) => {
            if (this.state === 'pending') {
                this.state = 'fulfilled';
                this.value = value;
                this.resolveCallbacks.forEach(fn => fn()) // 执行then的回调
            }
        }

        const rejectHandler = (reason) => {
            if (this.state === 'pending') {
                this.state = 'rejected';
                this.reason = reason;
                this.rejectCallbacks.forEach(fn => fn()) // 执行 catch 的回调
            }
        }

        try {
            cb(resolveHandler, rejectHandler)
        } catch (err) {
            rejectHandler(err)
        }

    }

    then(fn1, fn2) {
        // 首先类型判断
        fn1 = typeof fn1 === 'function' ? fn1 : (v) => v;
        fn2 = typeof fn2 === 'function' ? fn2 : (e) => { throw e };

        if(this.state === 'pending') {
            // pending 状态下，fn1 fn2 会被存储到 callbacks 数组中
            return new MyPromise((resolve, reject) => {
                this.resolveCallbacks.push(() => {
                    try {
                        const newVal = fn1(this.value);
                        resolve(newVal);
                    } catch (err) {
                        reject(err);
                    }
                });

                this.rejectCallbacks.push(() => {
                    try {
                        const newReason = fn2(this.reason);
                        resolve(newReason); // .catch 后仍然可以 .then
                    } catch (err) {
                        reject(err);
                    }
                })
            })
        }

        if(this.state === 'fulfilled') {
            return new MyPromise((resolve, reject) => {
                try {
                    const newVal = fn1(this.value);
                    resolve(newVal);
                } catch (err) {
                    reject(err);
                }
            })
        }

        if(this.state === 'rejected') {
            return new MyPromise((resolve, reject) => {
                try {
                    const newReason = fn2(this.reason);
                    resolve(newReason); // .catch 后仍然可以 .then
                } catch (err) {
                    reject(err)
                }
            })
        }
    }

    catch(fn) {
        return this.then(null, fn);
    }

    finally(fn) {
        return this.then(res => {
            return MyPromise.resolve(fn()).then(() => res)
        }, err => {
            return MyPromise.resolve(fn()).then(() => { throw err });
        })
    }

    static resolve(val) {
        if(val instanceof MyPromise) return val;
        return new MyPromise(resolve => resolve(val));
    }

    static reject(err) {
        return new MyPromise((resolve, reject) => reject(err));
    }

}
