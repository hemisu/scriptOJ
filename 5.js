/**
#5 不能摸的狗（一）

有一只狗，不允许别人摸它，一旦摸它就会叫，然后就跑了。

完成 Dog 组件，当用户点击的时候会执行自身的 bark 和 run 方法。

*/

class Dog extends Component {
  bark () {
    console.log('bark')
  }
  
  run () {
    console.log('run')
  }
  
  render () {
    return (<div onClick={() => { this.bark(); this.run(); }}>DOG</div>)
  }
}
