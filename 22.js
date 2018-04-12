/**
完成 `getChildAttributes` 函数，它接受一个 DOM 元素作为参数和一个属性名作为参数，你需要返回这个 DOM 的 **直接** 子元素的特定属性列表。例如：
```
<ul id='list'>
  <li data-name="Jerry" class="item"><span>1</span></li>
  <li data-name="Lucy" class="item"><span>2</span></li>
  <li data-name="Tomy"><span>3</span></li>
</ul>
```
```
getChildAttributes(el, 'data-name') // => ['Jerry', 'Lucy', 'Tomy']
getChildAttributes(el, 'class') // => ['item', 'item', null]
```
只需要完成 `getChildAttributes` 的编写。
 */
const getChildAttributes = (el, attr) => Array.from(el.childNodes).filter(e => e.nodeType === 1).map(e => e.getAttribute(attr));

const getChildAttributes = (el, attr) => Array.from(el.children).map(e => e.getAttribute(attr));

const getChildAttributes = (el, attr) => Array.prototype.map.call(el.children,e => e.getAttribute(attr));

const getChildAttributes = (el, attr) => [...el.children].map(e => e.getAttribute(attr));

// 主要是要注意HTMLCollection和NodeList没有Array里的遍历方式，也可以用fori这种形式遍历