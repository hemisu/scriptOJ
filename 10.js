/**
#10 React.js 加载、刷新数据

完成 Post 组件，它可以加载、刷新文章内容。

已有函数 getPostData，它会返回一个 Promise，你可以通过它获取文章的内容。
```
getPostData().then((postContent) => {
  // ...
})
```
在获取数据的时候，Post 组件的 div.post-content 中显示 数据加载中...，完成加载以后直接显示 getPostData 的返回结果。

页面有个按钮，点击可以重新加载数据。

*/

class Post extends Component {
  state = {
    content: '数据加载中...',
  }
  
  componentDidMount() {
    this._load();
  }
  
  async _load() {
    this.setState({ content: '数据加载中...' })
    const content = await getPostData()
    this.setState({ content })
  }
  
  render () {
    return (
      <div>
        <div className='post-content'>
        {this.state.content}
        </div>
        <button onClick={() => {this._load()}}>刷新</button>
      </div>
    )
  }
}
