/**
#11 获取文本的高度

完成 Post 组件，接受一个字符串的 content 作为 props，Post 会把它显示到自己的 <p> 元素内。

并且，点击 <p> 元素的时候，会使用 console.log 把元素的高度打印出来。

*/

class Post extends Component {
  render () {
    return (<p ref={r => this.refP = r} onClick={() => {console.log(this.refP.clientHeight)}}>{this.props.content}</p>)
  }
}
