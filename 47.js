/**

  实现一个函数 where，它返回它被调用的时候所在的函数的名字，例如：

  function main () {
    where() // => 'main'
  }

  function a () {
    function b () {
      where() // => 'b'
    }
    b()
  }

  main()
  a()

  where 需要在严格模式下编写。
 */

const where = () => (new Error()).stack.split('\n')[2].match(/at\s(.+?)\s/)[1];

function main () {
  where() // => 'main'
}

function a () {
  function b () {
    where() // => 'b'
  }
  b()
}

console.log(
  main(),
  a(),
)