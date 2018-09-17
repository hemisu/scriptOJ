/**

我们用一个 HTML 结构来表示一头猪的子子孙孙：

<div class="pig">
  <div class="pig">
    <div class="pig">
      <div class="pig"></div>
    </div>
    <div class="pig">
      <div class="pig"></div>
    </div>
    <div class="pig">
      <div class="pig"></div>
    </div>
  </div>
  <div class="pig">
    <div class="pig"></div>
    <div class="pig"></div>
  </div>
  <div class="pig">
    <div class="pig">
      <div class="pig"></div>
      <div class="pig"></div>
      <div class="pig"></div>
      <div class="pig"></div>
      <div class="pig"></div>
    </div>
  </div>
</div>
每个 DOM 节点都是一头猪，子节点就是这头猪的孩子。

请你完成一个函数 findMostProductivePigChildrenCount 它接受一个 DOM 节点作为参数，返回一个数组。存放同代猪最高产的猪的孩子的数量。例如：

1:          o
2:    o     o     o
3:  o o o  o o    o
4:  o o o       ooooo 
上面的结果是 [3, 3, 5, 0]，解释如下：

第一代猪有三个孩子，所以数组第一项是 3。

第二代的三头猪中，第一头猪生了 3 个，第二头猪生了 2 个，第三头猪生了 1 个。最高产的是第一头猪，它的孩子数是 3，所以数组第二项为 3。

第三代的前三头猪都有一个后代，中间两头猪绝后，而最后一头猪惊人地生出了 5 头猪。这一代最高产的猪的孩子数是 5，所以数组项是 5。

最后一代无后，所以是 0。

 */

const findMostProductivePigChildrenCount = (dom) => {
  const q = [];
  const result = [];
  let level = 0;

  q.push(dom)
  while(q.length !== 0) { // 队列不为空
    result[level] = 0;
    const currentLength = q.length;
    let cnt = 0;
    while(cnt < currentLength) {
      let top = q.shift(); // 取出队列
      if(top.children.length !== 0) {
        q.push(...top.children) // 入栈
      }
      result[level] = Math.max(result[level], top.children.length);
      cnt++;
    }
    level++;
  }
  return result;
}

const findMostProductivePigChildrenCount2 = (dom) => {
  let quque = [...dom.children];
  const result = [dom.children.length];
  while (quque.length) {
    let temp = [];
    result.push(Math.max(...quque.map(v => v.children.length)))
    quque.forEach(v => temp.push(...v.children))
    quque = temp;
  }
  return result
}