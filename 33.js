/**
编写一个 JavaScript 函数，接受一个仅包含数字的 多维数组 ，返回拍平以后的结果。例如传入：[1, [[2], 3, 4], 5]，返回 [1, 2, 3, 4, 5]。

（本题来源：阿里巴巴前端笔试题）

 */
// const flatten = (arr) => {
//   // 遍历
//   // 检测是否是数组 是-> flatten:不是 直接push
//   let result = [];
//   arr.forEach(element => {
//     if(Array.isArray(element)) {
//       result = result.concat(flatten(element));
//     } else {
//       result.push(element)
//     }
//   });
//   return result;
// }

// const flatten = (arr) => (arr.reduce(
//   (flat, toFlat) => (
//     flat.concat(Array.isArray(toFlat) ? flatten(toFlat) : toFlat)
//   ), [])
// );

// const flatten = (arr) => (arr.join().split(',').map(e => +e))

const flatten = (arr) => [].concat(...arr.map(v => (Array.isArray(v) ? flatten(v) : v)));

const array = [1, [[2], 3, 4], 5];
const result = flatten(array)
console.log(result);