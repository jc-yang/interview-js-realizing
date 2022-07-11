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
