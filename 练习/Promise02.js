const MyPromiseStatus = {
    PENDING: 'pending',
    FULFILLED: 'fulfilled',
    REJECTED: 'rejected'
}

class MyPromise {
    status = MyPromiseStatus.PENDING;
    value = undefined;
    reason = undefined;

    resolveCallbacks = [];
    rejectCallbacks = [];

    constructor(cb) {
        const resolveHandler = (val) =>{
            if(this.status === MyPromiseStatus.PENDING) {
                this.status = MyPromiseStatus.FULFILLED;
                this.value = val;
                this.resolveCallbacks.forEach(fn => fn(this.value));
            }
        }
        const rejectHandler = (reason) =>{
            if(this.status === MyPromiseStatus.PENDING) {
                this.status = MyPromiseStatus.REJECTED;
                this.reason = reason;
                this.rejectCallbacks.forEach(fn => fn(this.reason));
            }
        }
        try {
            cb(resolveHandler, rejectHandler);
        } catch (err) {
            rejectHandler(err)
        }
    }

    then(fn1, fn2) {
        fn1 = typeof fn1 === 'function' ? fn1 : v => v;
        fn2 = typeof fn2 === 'function' ? fn2 : e => { throw e };

        if(this.status === MyPromiseStatus.PENDING) {
            return new MyPromise((resolve, reject) => {
                this.resolveCallbacks.push((val) => {
                    try {
                        const res = fn1(val);
                        resolve(res);
                    } catch (err) {
                        reject(err);
                    }
                })
                this.rejectCallbacks.push((reason) => {
                    try {
                        const res = fn2(reason);
                        resolve(res)
                    } catch (err) {
                        reject(err);
                    }
                })
            })
        }

        if(this.status === MyPromiseStatus.FULFILLED) {
            return new MyPromise((resolve, reject) => {
                try {
                    const res = fn1(this.value);
                    resolve(res);
                } catch (err) {
                    reject(err)
                }
            })
        }

        if(this.status === MyPromiseStatus.REJECTED) {
            return new MyPromise((resolve, reject) => {
                try {
                    const res = fn2(this.reason);
                    resolve(res);
                } catch (err) {
                    reject(err);
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
            return MyPromise.resolve(fn()).then(() => {throw err})
        })
    }

    static resolve(val) {
        if(val instanceof MyPromise) return val;
        return new MyPromise(resolve => resolve(val))
    }

    static reject(val) {
        return new MyPromise((resolve, reject) => reject(val))
    }
}
