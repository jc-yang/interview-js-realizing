function createIncrement() {
    let count = 0;
    function increment() {
        count++;
        // console.log('incre', count)
    }
    let msg = count
    function log() {
        console.log(msg) // 0
        console.log(count) // 3
    }
    return [increment, log]
}

const [increment, log] = createIncrement();
increment();
increment();
increment();
log();
