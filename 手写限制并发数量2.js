class Schedule {
    constructor(limit) {
        this.limit = limit
        this.taskList = []
        this.count = 0
    }

    add(promiseCreator) {
        this.taskList.push(promiseCreator)
    }

    start() {
        for(let i = 0; i < this.limit; i++) {
            this.doNext();
        }
    }

    doNext() {
        if(this.taskList.length && this.count < this.limit) {
            this.count++
            const promise = this.taskList.shift();
            promise.finally(() => {
                this.count--;
                this.doNext();
            })
        }
    }
}
