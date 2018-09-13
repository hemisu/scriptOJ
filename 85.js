/**
 
优先队列是一种元素带权重的队列，你可以往队列中添加和删除元素，但是删除元素的时候会把优先级最高的元素删除。例如：

const pq = new PriorityQueue()
pq.add(1)
pq.add(2)
pq.add(3)

pq.remove() // => 3
pq.remove() // => 2
pq.remove() // => 1
remove 方法每次删除的时候都会把最大的元素删除掉，并且返回被删除元素。请你完成 PriorityQueue 的实现。

服务器运行时间限制：20ms。

 */

class PriorityQueue {
  add (num) {
    this.queue = this.queue || [];
    if (typeof num === 'object') {
      this.queue = this.queue.concat(num);
    } else {
      this.queue.push(num);
    }
  }
  
  remove () {
    if(!this.queue.length) return null;
    const max = Math.max(...this.queue);
    this.queue.splice(this.queue.indexOf(max), 1);
    return max;
  }
}

const pq = new PriorityQueue()
pq.add(1)
pq.add(2)
pq.add(3)
pq.add([19,15,13,16,30,28,22,44,20,43,24,40,9,23,31,34,38,5,11,6,24,35,27,36,11,31,11,24,47,34,32,5,4,37,8,38,46,32,40,44,3,14,29,18,22,46,19,49,8])

const a = pq.remove() // => 3
pq.remove() // => 2
pq.remove() // => 1

class PriorityQueue2 {
  constructor() {
    this._maxHeap = [];
  }

  _swapItem(i, j) {
    return [this._maxHeap[i], this._maxHeap[j]] = [this._maxHeap[j], this._maxHeap[i]];
  }
  add (item) {
    if(Object.prototype.toString.call(item) === '[object Array]'){
      for (let i = 0; i < item.length ; i++ ) {
        this._maxHeap.push(item[i]);
        this._up();
      }
    } else {
      this._maxHeap.push(item);
      this._up();
    }
  }
  
  remove () {
    let ans = this._maxHeap.shift();
    this._up();
    return ans;
  }

  _shiftUp() {
    const h = this._maxHeap;
    let son = h.length - 1;
    while(son != 0) {
      const parent = Math.floor((son - 1) / 2);
      if (h[parent] < h[son]) {
        this._swapItem(parent, son);
        son = parent;
      } else {
        break;
      }
    }
  }

  _up() {
    const h = this._maxHeap;
    for(let parent = Math.floor(h.length /2 ) - 1; parent >= 0 ; parent--) {
      let max;
      let lson = parent * 2 + 1;
      let rson = parent * 2 + 2;
      max = parent;
      if(lson < h.length && h[parent] < h[lson]) max = lson;
      if(rson < h.length && h[max] < h[rson]) max = rson;
      if(max !== parent) {
        this._swapItem(max, parent)
      }
    }
  }

}

const pq2 = new PriorityQueue2()
pq2.add(1)
pq2.add(2)
pq2.add(3)
pq2.add([19,15,13,16,30,28,22,44,20,43,24,40,9,23,31,34,38,5,11,6,24,35,27,36,11,31,11,24,47,34,32,5,4,37,8,38,46,32,40,44,3,14,29,18,22,46,19,49,8])

var b = pq2.remove() // => 3
var b = pq2.remove() // => 2
var b = pq2.remove() // => 1
