function deepClone(obj, map = new WeakMap()) {
    if(typeof obj !== 'object' || obj === null) {
        return obj;
    }
    if(map.has(obj)) {
        return map.get(obj);
    }
    const newObj = Array.isArray(obj) ? [] : {};
    map.set(obj, newObj);
    Object.keys(obj).forEach(key => {
        newObj[key] = deepClone(obj[key], map);
    })
    return newObj;
}
