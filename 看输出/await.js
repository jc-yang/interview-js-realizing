(async () => {
    setTimeout(() => {
        console.log(1);
    });

    const foo = () => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                reject(2);
                resolve(3);

                console.log(4);
            })

            console.log(0)
        })
    }

    const res = await foo();
    console.log(res)
})()
