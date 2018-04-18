/**
#6 不能摸的狗（二）

有一只狗，不允许别人摸它，一旦摸它就会叫，然后就跑了；这只狗跑一段时间（20~50ms）以后就会停下来，也不叫了。

完成 Dog 组件，当用户点击的时候会执行自身的 bark 和 run 方法。给这个 Dog 组件加上状态 isRunning 和 isBarking，在进行相应的动作的时候设置为 true，停下来的时候设置为 false。

*/

class Dog extends Component {
  constructor () {
    super()
    /* TODO */
    this.state = {
      isRunning: false,
      isBarking: false,
    }
  }
  
  bark () {
    /* TODO */
    this.setState({
      isBarking: true,
    })
    setTimeout(() => this.setState({isBarking: false}, Math.floor(Math.random()*30+20)))
  }
  
  run () {
    /* TODO */
    this.setState({
      isRunning: true,
    })
    setTimeout(() => this.setState({isRunning: false}, Math.floor(Math.random()*30+20)))
  }
 
  render () {
    return (<div onClick={() => {this.bark(); this.run();}}>DOG</div>)
  }
}
