/*

在开发前端框架、模版引擎的时候，经常会需要我们在特定的上下文中，动态分析、执行特定的表达式。例如：在 { x: 1, y: 2, z: 3 } 的上下文中执行表达式 x + y 那么就会得到 3，执行 z - x 就会得到 2。

请你完成 execute 函数，接受一个字符串和对象作为参数，它可以在特定的上下文中执行任意的表达式，例如：

execute(`'My name is ' + name`, { name: 'Jerry' }) // => My name is Jerry
execute('monkeys.length + 1', { monkeys: [1, 2, 3] }) // => 4
execute('user.name + user.age', { user: { name: 'Jerry', age: 12 } }) // => Jerry12
execute('run()', { run: () => 'Good Night' }) // => Good Night
...
另外，你不能使用 with 关键字。

*/

const execute = (string, context) => new Function(...Object.keys(context), `return ${string}`)(...Object.values(context));

console.log(
  execute(`'My name is ' + name`, { name: 'Jerry' }), // => My name is Jerry
  execute('monkeys.length + 1', { monkeys: [1, 2, 3] }), // => 4
  execute('user.name + user.age', { user: { name: 'Jerry', age: 12 } }), // => Jerry12
  execute('run()', { run: () => 'Good Night' }), // => Good Night
);