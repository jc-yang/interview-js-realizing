// 通用的时间绑定函数
function bindEvent(elem, type, fn) {
    elem.addEventListener(type, fn)
}

// const btn1 = document.querySelector('#btn1')
//
// bindEvent(btn1, 'click', (e)=>{
//     console.log('点我了')
//     console.log(e)
// })
//
// const p1 = document.getElementById('p1')
// const body = document.body;
// bindEvent(p1, 'click', e => {
//     // e.stopPropagation();
//     alert('激活')
// })
//
// bindEvent(body, 'click', e => {
//     console.log('谁被点击',e.target)
//     alert('取消')
// })

// 事件代理
const div1 = document.querySelector('#div1');
div1.addEventListener('click', e => {
    e.preventDefault();
    const target = e.target;
    console.log(target.nodeName)
    if(target.nodeName === 'A') {
        alert(target.innerText)
    }
})
