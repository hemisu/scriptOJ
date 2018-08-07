/**
#30 curry 函数

函数式编程当中有一个非常重要的概念就是 函数柯里化。一个接受 任意多个参数 的函数，如果执行的时候传入的参数不足，那么它会返回新的函数，新的函数会接受剩余的参数，直到所有参数都传入才执行操作。这种技术就叫柯里化。请你完成 curry 函数，它可以把任意的函数进行柯里化，效果如下：

const f = (a, b, c, d) => { ... }
const curried = curry(f)

curried(a, b, c, d)
curried(a, b, c)(d)
curried(a)(b, c, d)
curried(a, b)(c, d)
curried(a)(b, c)(d)
curried(a)(b)(c, d)
curried(a, b)(c)(d)
// ...
// 这些函数执行结果都一样

// 经典加法例子
const add = curry((a, b) => a + b)
const add1 = add(1)

add1(1) // => 2
add1(2) // => 3
add1(3) // => 4
注意，传给 curry 的函数可能会有任意多个参数。


*/
// ES5
var curry = function (f) {
  var arr = (typeof arguments[1] !== undefined && arguments[1]) || [];
  return function() {
    // 获取当前函数的参数
    var args = Array.prototype.slice.call(arguments);
    return function(arg) {
      // 传入函数足够，执行 || 传入的参数若不足，返回新的函数
      return arg.length >= f.length ? f.apply(null, arg) : curry(f, arg);
    }(arr.concat(args));
  }
}
// ES6
const curry = (fn, arity = fn.length, ...args) =>
  arity <= args.length ? 
  fn(...args) 
  :
  curry.bind(void 0, fn, arity, ...args); // 用于吃参数

const f = (a, b, c, d) => (a+b+c+d)
const curried = curry(f)
console.log(curried(1)(2)(3)(4));