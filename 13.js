/**
#13 黑色边框的容器组件

实现一个组件 BlackBorderContianer，它会把作为它的嵌套结构的 每个直接子元素 都用一个黑色边框的 div 包裹起来。例如：
```
<BlackBorderContainer>
  <div className='name'>My Name：Lucy</div>
  <p className='age'>
    My Age：<span>12</span>
  </p>
</BlackBorderContainer>
```
最后的 div.name 和 p.age 都具有一层黑色边框（1px solid #000000）外层结构。

 */

// css
/*
.black-border {
  border: 1px solid #000;
}
*/

// js
class BlackBorderContainer extends Component {
  render() {
    return (<div>{this.props.children.map(el => <div className="black-border">{el}</div> )}</div>)
  }
}
