

const xhr = new XMLHttpRequest();

xhr.open('GET', './data/test.json');

xhr.onreadystatechange = function () { // send 之后才会触发
    // 此处函数异步执行
    if(xhr.readyState === 4) { // 表示请求响应下载完成
        if(xhr.status === 200) { // 状态码
            console.log(JSON.parse(xhr.responseText))
            alert(xhr.responseText)
        } else {
            console.log('其他情况')
        }
    }
}

xhr.send(null) // get 请求无数据body
