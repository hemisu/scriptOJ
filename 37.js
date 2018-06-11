/**
 
  假设你是 ScriptOJ 的前端工程师，现在你做一个消息通知显示的功能。

  前端有一个 socket 对象，它是一个 EventEmitter，具有通过 on 监听后端事件，emit 给后端发送事件的功能。
  当后端有新的消息通知的时候，socket 会接收到 new notification 事件，并且获取一个参数 n，表示有多少条消息通知。
  一开始的时候，网页标签页上显示“ScriptOJ”字样；当有新消息通知的时候，要把网页标签页上的内容改成“（n 条消息）ScriptOJ”（n是从后端拿过来的数字）。
  页面上有一个按钮，用户点击的时候可以把消息都标记成已读：前端向后端发送一个 mark all read 事件，并且恢复网页标签页标题。
  请你把所有功能的实现都放在 initNotification 函数当中。

 */

 /* socket 对象已经可以直接使用 */
function initNotification () {
  socket.on('new notification', (n) => {
    document.title = `（${n} 条消息）ScriptOJ`;
  })
  document.getElementById('mark-read').addEventListener('click', function() {
    document.title = `ScriptOJ`;
    socket.emit('mark all read');
  });
}
