async function async1() {
    console.log('async1 start') // 2
    await async2()
    console.log('async1 end'); // 5
}

async function async2() {
    console.log('async2') // 3
}

console.log('script start') // 1
async1();
console.log('script end') // 4

// script start
// async1 start
// async2
// script end
// async1 end

// n 秒内不返回结果就 reject
// 自己的实现，不知道对否
function ww(promise, n) {
    return new Promise(async (resolve, reject) => {

        setTimeout(() => {
            reject()
        }, n)

        const res = await promise()
        resolve(res)
    })
}

