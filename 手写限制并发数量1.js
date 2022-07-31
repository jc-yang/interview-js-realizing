class Scheduler {
    constructor(limit) {
        this.limit = limit // 最大限制
        this.count = 0 // 当前执行的异步函数的数量
        this.taskList = [] // 暂存异步函数队列
    }

    async add(promiseCreator) {
        // 超过可执行数量限制
        if(this.count >= this.limit) {
            // 创建一个 Promise 将 resolve 放入队列 —— 此时Promise为pending，持续 await
            await new Promise(resolve => {
                this.taskList.push(resolve)
            })
        }
        // 异步执行数量+1
        this.count++;
        // 等待异步任务结束
        await promiseCreator()
        // 异步执行数量-1
        this.count--;
        // 如有等待的异步任务
        if(this.taskList.length > 0) {
            // 将异步队列中的任务 resolve，接触上面的pending状态
            this.taskList.shift()()
        }
    }
}
