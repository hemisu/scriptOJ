/**
#9 百分比换算器

做一个百分比换算器，需要你完成三个组件：

<Input />：封装了原生的<input />，可以输入任意数字

<PercentageShower />：实时 显示 <Input /> 中的数字内容，但是需要把它转换成百分比，例如 <Input /> 输入的是 0.1，那么就要显示 10.00%，保留两位小数。

<PercentageApp />：组合上述两个组件。


*/

class Input extends Component {
  render () {
    return (
      <div>
        <input type='number' onChange={this.props.setNum} />
      </div>
    )
  }
}

class PercentageShower extends Component {

  render () {
    return (
      <div>{`${(this.props.num*100).toFixed(2)}%`}</div>
    )
  }
}

class PercentageApp extends Component {
  state = {
    value: 0,
  }
  
  handleInput = (e) => {
    this.setState({
      value: e.target.value,
    })
  }
  
  render () {
    return (
      <div>
        <Input setNum={this.handleInput} />
        <PercentageShower num={this.state.value}/>
      </div>
    )
  }
}
