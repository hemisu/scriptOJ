/**
 
完成高阶组件 makeProvider，接受一个任意类型的数据和组件作为参数：

Post = makeProvider({ name: 'Jerry' })(Post)
Post 下的所有子组件都可以通过 this.context.data 获取到传给 makeProvider 的参数。
如上面的 Post 及其子组件的内部可以通过 this.context.data.name 获取到 Jerry。

 */

const makeProvider = data => WrappedComponent => {
  return class extends React.Component {
    static childContextTypes = {
      data: PropTypes.any,
    }

    getChildContext() {
      return {data};
    }

    render() {
      return <WrappedComponent />
    }
  }
}
