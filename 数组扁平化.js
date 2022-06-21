
// 1 递归
function flat1(arr) {
    let res = [];
    arr.forEach(item => {
        if(Array.isArray(item)) {
            res = res.concat(flat1(item));
        } else {
            res.push(item);
        }
    })
    return res;
}

// 2 stack 非递归
function flat2(arr) {
    const stack = [...arr];
    const res = [];
    while (stack.length) {
        const top = stack.pop();
        if(Array.isArray(top)) {
            stack.push(...top);
        } else {
            res.push(top);
        }
    }
    // 别忘记翻转，因为栈是从原数组最后一个数据处理的
    return res.reverse();
}
