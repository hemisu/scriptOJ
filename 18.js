/**


完成函数 commafy，它接受一个数字作为参数，返回一个字符串，可以把整数部分从右到左每三位数添加一个逗号，
如：12000000.11 转化为 12,000,000.11。

*/

function commafy (num) {
  /* TODO */
  if(typeof num !== 'number') return false;
  const arr = num.toString().split('.');
  if(arr.length > 2) return false;
  const decimal = arr[1] ? `.${arr[1]}` : ``;
  return arr[0].replace(/\B(?=(?:\d{3})+$)/g,',') + decimal;
}
