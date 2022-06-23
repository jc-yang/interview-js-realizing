function ajax(url) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('get', url, true); // true 表示为异步，默认为 true
        xhr.onreadystatechange(() => {
          if(xhr.readyState === 4) {
              if(xhr.status === 200) {
                  resolve(xhr.responseText)
              } else if(xhr.status === 404) {
                  reject(new Error('404 not found'))
              }
          }
        })
        xhr.send(null);
    })
}
