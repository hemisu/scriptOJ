/**
观察者模式在前端开发中非常常用，我们经常用的事件就是观察者模式的一种体现。它对我们解耦模块、开发基于消息的业务起着非常重要的作用。
Node.js 原生自带 EventEmitter 模块，可见它的重要性。

完成 EventEmitter 模块，它是一个类，它的实例具有以下几个方法：on、emit、off：

on(eventName, func)：监听 eventName 事件，事件触发的时候调用 func 函数。
emit(eventName, arg1, arg2, arg3...)：触发 eventName 事件，并且把参数 arg1, arg2, arg3... 传给事件处理函数。
off(eventName, func)：停止监听某个事件。
使用例子：

const emitter = new EventEmitter()
const sayHi = (name) => console.log(`Hello ${name}`)
const sayHi2 = (name) => console.log(`Good night, ${name}`)

emitter.on('hi', sayHi)
emitter.on('hi', sayHi2)
emitter.emit('hi', 'ScriptOJ')
// => Hello ScriptOJ
// => Good night, ScriptOJ

emitter.off('hi', sayHi)
emitter.emit('hi', 'ScriptOJ')
// => Good night, ScriptOJ

const emitter2 = new EventEmitter()
emitter2.on('hi', (name, age) => {
  console.log(`I am ${name}, and I am ${age} years old`)
})
emitter2.emit('hi', 'Jerry', 12)
// => I am Jerry, and I am 12 years old
 */

class EventEmitter {
  constructor() {
    this.eventHub = [];
  }
  on(type, fn) {
    if(!this.eventHub[type]) this.eventHub[type] = []; // 如果type队列为空，创建新数组
    this.eventHub[type].push(fn);
  }
  emit(type, ...args) {
    if(this.eventHub[type].length) this.eventHub[type].forEach(fn => fn(...args));
  }
  off(type, fn) {
    if(this.eventHub[type].length) {
      const index = this.eventHub[type].indexOf(fn);
      this.eventHub[type] = [...this.eventHub[type].slice(0, index), ...this.eventHub[type].slice(index + 1)];
    }
  }
  once(type, fn) {
    const fnOnce = (...args) => {
      fn(...args);
      this.off(type, fnOnce);
    };
    this.on(type, fnOnce);
  }
}

const emitter = new EventEmitter()
const sayHi = (name) => console.log(`Hello ${name}`)
const sayHi2 = (name) => console.log(`Good night, ${name}`)

emitter.on('hi', sayHi)
emitter.on('hi', sayHi2)
emitter.emit('hi', 'ScriptOJ')
// => Hello ScriptOJ
// => Good night, ScriptOJ

emitter.off('hi', sayHi)
emitter.emit('hi', 'ScriptOJ')
// => Good night, ScriptOJ

const emitter2 = new EventEmitter()
emitter2.on('hi', (name, age) => {
  console.log(`I am ${name}, and I am ${age} years old`)
})
emitter2.emit('hi', 'Jerry', 12)
// => I am Jerry, and I am 12 years old

emitter.once('hi once', sayHi);
emitter.emit('hi once', 'hemisu');
emitter.emit('hi once', 'hemisu');
// => Hello hemisu;
// print only once