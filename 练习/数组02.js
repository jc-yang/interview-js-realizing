function flat(arr) {
    if(!Array.isArray(arr)) return arr;
    let res = [];
    arr.forEach(item => {
        if(!Array.isArray(item)) {
            res.push(item);
        } else {
            res = res.concat(flat(item));
        }
    })
    return res;
}

function flatIteration(arr) {
    const stack = [...arr];
    let res = [];

    while(stack.length) {
        const top = stack.pop();
        if(Array.isArray(top)) {
            stack.push(...top);
        } else {
            res.unshift(top);
        }
    }
    return res;
}

function unique(arr) {
    const newArr = [];
    arr.reduce((pre, cur, curIdx, arr) => {
        if(!pre.has(cur)) {
            newArr.push(cur);
            pre.set(cur, '');
        }
        return pre;
    }, new Map())
    return newArr;
}

function unique2(arr) {
    const newArr = [];
    arr.forEach(item => {
        if (newArr.indexOf(item) === -1) {
            newArr.push(item);
        }
    })
    return newArr;
}

function unique3(arr) {
    const res = [];
    arr.forEach((item, index) => {
        let isUnique = true;
        for(let i = 0; i < res.length; i++) {
            if(res[i] === item) {
                isUnique = false;
                break;
            }
        }
        if(isUnique) {
            res.push(item);
        }
    })
    return res;
}
