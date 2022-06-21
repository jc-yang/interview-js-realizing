// 数组去重
function unique(arr) {
    const res = [];
    arr.forEach(item => {
        if(res.indexOf(item) === -1) {
            res.push(item);
        }
    })
    return res;
}


// const arr = [1, 1, 2, 2, 3, 3, 4];
// console.log(unique(arr));

// 数组扁平化
function flat1(arr, depth = 1) {
    const res = [];
    arr.forEach(item => {
        if(Array.isArray(item) && depth > 0) {
            res.push(...flat1(item, depth - 1));
        } else {
            res.push(item);
        }
    })
    return res;
}

function flat2(arr) {
    const stack = [...arr];
    const res = [];
    while (stack.length) {
        let top = stack.pop();
        if(Array.isArray(top)) {
            stack.push(...top);
        } else {
            res.unshift(top);
        }
    }
    return res;
}

const arr = [1, [2, [3, [4 ,[5]]]]];
console.log(flat1(arr, Infinity))
console.log(flat2(arr))
