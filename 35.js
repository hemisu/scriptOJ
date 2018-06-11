/**
在开发当中，我们经常要处理 url。而 url 上的 query string 是我们重点要处理的对象，完成一个 parseQueryString 函数。它接受一个 url 字符串作为参数，返回一个对象，这个对象包含 query string 上的键值对。例如：

parseQueryString('https://scriptoj.com/problems?offset=100&limit=10')
返回:

{ offset: '100', limit: '10'}
特殊情况说明：如果出现 ?name=&age=12 则返回 { name: '', age: '12' }，如果 ?name&age=12 则返回 { name: null, age: '12' }。

请考虑清楚 query string 可能出现的各种情况，包括可能的出现 hash 的情况（?name=jerry#nice）。

如果需要帮助，可以对照参 URI.js 的执行结果。
 */

const parseQueryString = (url) => {
  const search = (url.replace((url.match(/#.*/) || [])[0], '').match(/\?.*/) || [])[0] || "";
  return (search.match(/[^\?&]([^&]+)|[^?&=]+(=([^&]*))/g) || []).reduce((pre, cur) => (pre[cur.slice(0, cur.indexOf('=')>>>0)] = cur.indexOf('=') !== -1 ? cur.slice((cur.indexOf('=') >>> 0) + 1) : null, pre), {})
}

