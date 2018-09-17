/**
 
在前端开发当中，会遇到某个函数被高频率调用的情况。比如说用户疯狂地按住某个按钮，这些事件都会导致回调函数被高频地调用，但是高频调用这些函数可能会导致页面运行效率下降。

于是就有了一种 debounce 的解决方案：如果你疯狂、高频地调用某个函数，而调用之间的时间间隔低于某个时间段，这个函数最后只会被执行一次；如果高于某个时间段，则会执行多次。

请你完成 debounce，它接受两个参数，一个是被封装函数，一个是时间间隔（ms），然后返回一个函数。可以做到函数防抖的效果：

window.addEventListener('resize', debounce(() => {
  console.log('Hello')
}, 100))

 */
const debounce = (fn, duration) => {
  let timer;
  return function() {
    if(timer) clearTimeout(timer);
    timer = setTimeout(function(){
      fn.apply(this, arguments)
    }, duration);
  }
}