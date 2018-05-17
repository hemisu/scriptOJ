/** 
完成 getPageTags 函数，判断你的代码所执行的页面用到了哪些标签。

例如，如果页面中：

<html>
  <head></head>
  <body></body>
  <script>...</script>
</html>
那么 getPageTags() 则返回数组 ['html', 'head' 'body', 'script']（顺序不重要）。
 */

const getPageTags = () => ([...new Set([...document.all].map(e => e.tagName.toLowerCase()))]);

const getPageTags = () => {
  var root = document.documentElement;
  var queue = [];
  queue.push(root);
  var result = [];
  while(queue.length !== 0) {
    var node = queue.shift();
    result.push(node.tagName.toLocaleLowerCase());
    var childs = node.children;
    queue.push(...childs);
  }
  result = [...new Set(result)];
  return result;
}