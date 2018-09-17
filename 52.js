/**
 #52 中间件模式
 中间件模式（middleware）是一种很常见、也很强大的模式，被广泛应用在 Express、Koa、Redux 等类库和框架当中。如果你能在自己的代码中也使用灵活这种模式能给你的程序带来更大的便利性和灵活性。

 ```
简单来说，中间件就是在调用目标函数之前，你可以随意插入其他函数预先对数据进行处理、过滤，在这个过程里面你可以打印数据、或者停止往下执行中间件等。数据就像水流一样经过中间件的层层的处理、过滤，最终到达目标函数。请你模拟一个中间件模式，可以达到以下效果：

const app = {
  callback (ctx) {
    console.log(ctx)
  },
  
  use (fn) {
    
  },
  
  go (ctx) {
    
  }
}

app.use((ctx, next) => {
  ctx.name = 'Lucy'
  next()
})

app.use((ctx, next) => {
  ctx.age = 12
  next()
})

app.use((ctx, next) => {
  console.log(`${ctx.name} is ${ctx.age} years old.`) // => Lucy is 12 years old.
  next()
})

// ... 任意调用 use 插入中间件

app.go({}) // => 启动执行，最后会调用 callback 打印 => { name: 'Lucy', age: 12  }
ctx 参数就是 app.go 接受的对象。调用 app.go 其实会调用目标函数 app.callback，但是调用 app.callback 之前我们可以先让参数 ctx 通过一系列的中间件，最后才会传递给 app.callback。

使用 app.use 插入任意中间件，中间件是一个函数，可以被传入一个 ctx 和 next；调用 next 的时候会执行下一个中间件。如果不调用 next 会阻止接下来所有的中间件的执行，也不会执行 app.callback。

请你补全 app 的实现，请不要添加额外的全局变量。

 */

const app = {
  callback (ctx) {
    console.log(ctx)
  },
  
  use (fn) {
    this.middleware = this.middleware || [];
    this.middleware.push(fn)
  },
  
  go (ctx) {
    this.middleware.reduceRight((p, n) => () => n(ctx, p), () => this.callback(ctx))()
  }
}
