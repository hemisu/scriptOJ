/**
#2 用 React.js 构建未读消息组件

使用 React.js 构建一个未读消息组件 Notification。

通过 getNotificationsCount() 来获取未读消息的数量 ，如果有未读消息 N 条，而且 N > 0，那么 Notification 组件渲染显示：
a
```
<span>有(N)条未读消息</span>
```
否则显示：
```
<span>没有未读消息</span>
```
（你只需要完成组件部分，不需要调用 ReactDOM）

*/

// 函数 getNotificationsCount 已经可以直接调用

class Notification extends Component {
  render () {
    // TODO
    const N = getNotificationsCount()
    return (
        <div>
          <span>{ N > 0 ? `有(${N})条未读消息` : `没有未读消息`}</span>
        </div>
      )
  }
}
