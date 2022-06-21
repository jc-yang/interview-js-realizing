// 1 使用 Map 记录，利用的 Map 的 key 的不可重复性
function unique1(arr) {
    const newArr = [];
    arr.reduce((pre, cur) => {
        if(!pre.has(cur)) {
            pre.set(cur, 'val') // 存入 map
            newArr.push(cur);
        }
        return pre;
    }, new Map())
    return newArr;
}

// 2 使用 Set
function unique2(arr) {
    return [...new Set(arr)]
}

// 3 使用 indexOf/includes
function unique3(arr) {
    const newArr = [];
    arr.forEach(item => {
        if(newArr.indexOf(item) === -1) { // 等价于 !newArr.includes(item)
            newArr.push(item);
        }
    });
    return newArr;
}

// 4 如果不用 api，那就两个for循环使用 === 判断
function unique4(arr) {
    const newArr = [];
    for(let i = 0; i < arr.length; i++) {
        let isRepeated = false;
        for(let j = 0; j < newArr.length; j++) {
            if(newArr[j] === arr[i]) {
                isRepeated = true;
                break;
            }
        }
        if(!isRepeated) newArr.push(arr[i])
    }
    return newArr;
}

