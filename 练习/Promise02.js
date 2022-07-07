const MyPromiseStatus = {
    PENDING: Symbol('pending'),
    FULFILLED: Symbol('fulfilled'),
    REJECTED: Symbol('rejected')
}

class MyPromise {
    status = MyPromiseStatus.PENDING;
    value = undefined;
    reason = undefined;

    resolveCallbacks = [];
    rejectCallbacks = [];

    constructor(fn) {
        const resolveHandler = (val) => {
            if(this.status === MyPromiseStatus.PENDING) {
                this.status = MyPromiseStatus.FULFILLED;
                this.value = val;
                this.resolveCallback.forEach(fn => fn())
            }
        }
        const rejectHandler = (err) => {
            if(this.status === MyPromiseStatus.PENDING) {
                this.status = MyPromiseStatus.REJECTED;
                this.reason = err;
                this.rejectCallbacks.forEach(fn => fn())
            }
        }

        try {
            fn(resolveHandler, rejectHandler);
        } catch (err) {
            rejectHandler();
        }
    }

    then(fn1, fn2) {
        if(this.status === MyPromiseStatus.PENDING) {
            return new MyPromise((resolve, reject) => {
                this.resolveCallbacks.push(() => {
                    try {
                        const res = fn1(this.value);
                        resolve(res);
                    } catch (err) {
                        reject(err)
                    }
                });
                this.rejectCallbacks.push(() => {
                    try {
                        const res = fn2(this.reason);
                        resolve(res)
                    } catch (err) {
                        reject(err)
                    }
                })
            })
        }

        if(this.status === MyPromiseStatus.FULFILLED) {
            return new MyPromise((resolve, reject) => {
                try {
                    const res = fn1(this.value)
                    resolve(res);
                } catch (err) {
                    reject(err);
                }
            })
        }

        if(this.status === MyPromiseStatus.REJECTED) {
            return new MyPromise((resolve, reject) => {
                try {
                    const res = fn2(this.reason);
                    resolve(res);
                } catch (err) {
                    reject(err)
                }
            })
        }

    }

    catch(fn) {
        return this.then(null, fn);
    }
}
