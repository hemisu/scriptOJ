/**

在开发前端框架、模版引擎的时候，经常会需要我们在特定的上下文中，动态分析、执行特定的表达式。例如：在 { x: 1, y: 2, z: 3 } 的上下文中执行表达式 x + y 那么就会得到 3，执行 z - x 就会得到 2。

请你完成 execute 函数，接受一个字符串和对象作为参数，它可以在特定的上下文中执行任意的表达式，例如：

execute(`'My name is ' + name`, { name: 'Jerry' }) // => My name is Jerry
execute('monkeys.length + 1', { monkeys: [1, 2, 3] }) // => 4
execute('user.name + user.age', { user: { name: 'Jerry', age: 12 } }) // => Jerry12
execute('run()', { run: () => 'Good Night' }) // => Good Night
...
（你能否想出不使用 with 的方案？）

 */
// with
const execute = (exp, data) => eval(`with(data){${exp}}`);

// function
const execute = (exp, data) => new Function(...Object.keys(data), `return ${exp}`)(...Object.values(data));

// vm + complier
class Stream {
  constructor(tokens) {
    this.tokens = tokens
    this.pos = 0
  }
  
  get next() {
    return this.tokens[this.pos++] || ''
  }
  
  cancel() {
    this.pos--
  }
  
  get done() {
    return this.pos >= this.tokens.length
  }
  
  get rest() {
    return this.tokens.slice(this.pos)
  }
  
  transaction(fn) {
    const rpos = this.pos
    const ret = fn()
    if (ret === failure) {
      this.pos = rpos
      return failure
    }
    return ret
  }
}

function preventRec(fn) {
  const stack = []
  return stream => {
    if (stack.includes(stream.pos)) {
      return ignore
    }
    stack.push(stream.pos)
    const ret = fn(stream)
    stack.pop()
    return ret
  }
}

const failure = Symbol('failure')
const ignore = Symbol('ignore')

const eq = str => stream => stream.transaction(() => stream.next == str ? ignore : failure)

const re = regex => fn => stream => stream.transaction(() => {
  const ret = stream.next.match(regex)
  if (!ret) return failure
  return fn(ret)
})

const assembly = (...parsers) => stream => stream.transaction(() => {
  console.log('assembly')
  let result = ignore
  for (const parser of parsers) {
    result = parser(result)(stream)
    if (result == failure)
      return failure
  }
  return result
})

const chain = (...parsers) => fn => stream => stream.transaction(() => {
  const arr = []
  for (const parser of parsers) {
    const result = parser(stream)
    if (result == failure)
      return failure
    if (result != ignore)
      arr.push(result)
  }
  return fn(...arr)
})

const choice = (...parsers) => stream => {
  for (const parser of parsers) {
    const result = parser(stream)
    if (result != failure)
      return result
  }
  return failure
}

const repeatRange = parser => (low, high = Number.MAX_SAFE_INTEGER) => stream => stream.transaction(() => {
  const arr = []
  let i = 0
  for (; i < high; i++) {
    const result = parser(stream)
    if (result == failure)
      break
    if (result != ignore)
      arr.push(result)
  }
  if (i < low || i > high) return failure
  return arr
})

const repeat = parser => number => repeatRange(parser)(number, number)

const many = parser => repeatRange(parser)(1)

const zeroOrMany = parser => repeatRange(parser)(0)

const maybe = parser => repeatRange(parser)(0, 1)

const must = parser => repeatRange(parser)(1, 1)

const packer = parser => fn => stream => {
  const ret = parser(stream)
  if (ret === failure)
    return failure
  return fn(ret)
}

const $log = (...param) => stream => {
  //console.log(...param, stream.rest)
  return ignore
}

const $lazy = fn => a => b => fn(a)(b)

let Parser
Parser = (() => {
  const number = re(/^\d+(\.\d+)?$/)(x => ({op: 'immi', value: parseFloat(x[0])}))
  const string = re(/^'((?:\\'|[^'])+)'$/)(x => ({op: 'imms', value: JSON.parse(`"${x[1].replace('"', '\\"')}"`)}))
  const name = re(/^\w+$/)(x => x[0])
  let expression
  const variable = chain(
    name,
    zeroOrMany(chain(
      eq('.'),
      name
    )(x => x))
  )((x, xs) => ({op: 'arg', path: [x, ...xs]}))
  const func_call = chain(
    preventRec(s => expression(s)),
    eq('('),
    maybe(
      chain(
        s => expression(s),
        zeroOrMany(
          chain(
            eq(','),
            s => expression(s)
          )(x => x)
        )
      )((x, xs) => [x, ...xs])
    ),
    eq(')')
  )((func, params) => ({op: 'call', func, params: params[0] || []}))
  const factor = choice(
    number,
    string,
    chain(
      eq('('),
      s => expression(s),
      eq(')')
    )(ex => ex),
    func_call,
    variable
  )
  const term = choice(
    chain(
      factor,
      many(
        chain(
          re(/^[*/%]$/g)(x => x[0]),
          factor
        )((...x) => x)
      )
    )((x, xs) => xs.reduce((a, [op, b]) => ({op, a, b}), x)),
    factor
  )
  expression = choice(
    chain(
      term,
      many(
        chain(
          re(/^[+-]$/g)(x => x[0]),
          term
        )((...x) => x)
      )
    )((x, xs) => xs.reduce((a, [op, b]) => ({op, a, b}), x)),
    term
  )
  return expression
})()

class Compiler {
  compile(code) {
    return this.pass3(this.pass2(this.pass1(code)))
  }
  
  tokenizer(str) {
    return str.match(/(?:'(?:\\'|[^'])+'|[\+\-\*\/\.\(\),]|\w+)/g)
  }
  
  pass1(code) {
    return Parser(new Stream(this.tokenizer(code)))
  }
  
  pass2(ast) {
    const opmap = {
      '+': (a, b) => a + b,
      '-': (a, b) => a - b,
      '*': (a, b) => a * b,
      '/': (a, b) => a / b,
    }
    let simp
    simp = snode => {
      const node = Object.assign({}, snode)
      if (node.op in opmap) {
        node.a = simp(node.a)
        node.b = simp(node.b)
        if (node.a.op == 'immi' && node.b.op == 'immi')
          return {op: 'immi', value: opmap[node.op](node.a.value, node.b.value)}
      } else if (node.op == 'call') {
        node.params = node.params.map(param => simp(param))
      }
      return node
    }
    return simp(ast)
  }
  
  pass3(ast) {
    console.log(JSON.stringify(ast))
    const opmap = {
      '+': node => load => [...load(node.a), 'PUSH', ...load(node.b), 'SWAP', 'POP_', 'ADD_'],
      '-': node => load => [...load(node.a), 'PUSH', ...load(node.b), 'SWAP', 'POP_', 'SUB_'],
      '*': node => load => [...load(node.a), 'PUSH', ...load(node.b), 'SWAP', 'POP_', 'MUL_'],
      '/': node => load => [...load(node.a), 'PUSH', ...load(node.b), 'SWAP', 'POP_', 'DIV_'],
      'immi': node => load => [`IMMI ${node.value}`],
      'imms': node => load => [`IMMS ${node.value}`],
      'arg': node => load => [`ARG_ ${node.path[0]}`, ...node.path.slice(1).map(x => `PROP ${x}`)],
      'call': node => load => [...node.params.map(param => [...load(param), 'PUSH']).reduce((p, c) => [...p, ...c], []), `IMMI ${node.params.length}`, 'SWAP', ...load(node.func), 'CALL']
    }
    let walk
    walk = node => opmap[node.op](node)(walk)
    return walk(ast)
  }
}

class VM {
  load(code) {
    this.code = code
    return this
  }
  
  execute(variable) {
    let r0, r1
    const stack = []
    const opmap = {
      'ADD_': rest => r0 = r0 + r1,
      'SUB_': rest => r0 = r0 - r1,
      'MUL_': rest => r0 = r0 * r1,
      'DIV_': rest => r0 = r0 / r1,
      'IMMI': rest => r0 = parseFloat(rest),
      'IMMS': rest => r0 = rest,
      'ARG_': rest => r0 = variable[rest],
      'PROP': rest => r0 = r0[rest],
      'CALL': rest => r0 = r0(...[...Array(parseInt(r1))].map(() => stack.pop()).reverse()),
      'PUSH': rest => stack.push(r0),
      'POP_': rest => r0 = stack.pop(),
      'SWAP': rest => {
        const tmp = r0
        r0 = r1
        r1 = tmp
      }
    }
    for (const item of this.code) {
      const instruction = item.substring(0, 4).toUpperCase()
      const rest = item.substring(5)
      console.log(instruction, rest, JSON.stringify({r0, r1, stack}))
      opmap[instruction](rest)
    }
    return r0
  }
}

const execute = (code, variable) => {
  const compiler = new Compiler()
  const vm = new VM()
  console.log(compiler.compile(code));
  return vm.load(compiler.compile(code)).execute(variable)
}