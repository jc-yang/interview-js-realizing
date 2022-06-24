 // 图片加载，没有懒加载
function loadImg(src) {
    return new Promise((resolve, reject) => {
        const img = document.createElement('img');
        img.onload = () => {
            resolve(img);
        }
        img.onerror = () => {
            reject(new Error('Image loading failed'))
        }
        img.src = src;
    })
}

const url = 'https://www.sjtu.edu.cn/resource/upload/202206/20220621_003845_812.jpg'
loadImg(url).then(res => {
    console.log(res.width);
    return res;
}).then(res => {
    console.log(res.height);
}).catch(err => {
    console.error(err);
});
