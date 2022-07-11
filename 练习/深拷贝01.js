
function deepClone(target, map = new WeakMap) {
    if(typeof target !== 'object' || target === null) {
        return target;
    }
    if(map.has(target)) {
        return map.get(target);
    }

    const res = Array.isArray(target) ? [] : {};

    map.set(target, res);

    Object.keys(target).forEach(key => {
        res[key] = deepClone(target[key])
    })

    return res;
}
