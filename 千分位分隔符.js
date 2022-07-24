
function transfer(num) {
    if(typeof num === 'number') num = String(num);

    const [left, right] = num.split('.')

    const targetLeft = left.split('').reverse().reduce((pre, cur, index, arr) => {

        if(index%3) {
            return cur + pre
        } else {
            return cur + ',' + pre
        }
    })

    return `${targetLeft}.${right}`
}

console.log(transfer(1234567.12345))
console.log(transfer('1234567.12345'))
