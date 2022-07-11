function isEqual(obj1, obj2) {
    if(obj1 === obj2) return true;
    if(!isEqual(obj1) || !isEqual(obj2)) {
        return obj1 === obj2;
    }
    const k1 = Object.keys(obj1);
    const k2 = Object.keys(obj2);
    if(k1.length !== k2.length) return false;

    k1.forEach(k => {
        const res = isEqual(obj1[k], obj2[k]);
        if(!res) return false;
    })
    return true;
}

function isObject(obj) {
    return typeof obj === 'object' && obj !== null;
}

