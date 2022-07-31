// 字节面试题
console.log(1)
setTimeout(() => {
    console.log(2)
}, 0)
new Promise((resolve) => {
    console.log(3)
    resolve()
}).then(() => {
    console.log(4)
    Promise.resolve().then(() => {
        console.log(5)
    })
    Promise.resolve().then(() => { Promise.resolve().then(() => {
        console.log(6)
    }) })
    setTimeout(() => {
        console.log(7)
    })
})
console.log(8)
// 1 3 8 4 5 6 2 7
