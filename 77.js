/*

有一个数组，这个数组从两个地方开始升序，一个是开始，一个是中间。例如：

[10, 21, 32, 11, 16, 40] // 从 0 和 3 开始升序
[1, 5, 10, 11, 3, 4, 8, 12, 30] // 0 和 4 开始升序
请你完成 merge 函数，可以把类似上面的数组变成一个完全升序的数组（直接修改原来的数组）。你不能用 sort 方法，并且只能使用一次循环。


*/
const merge = (arr) => {
  const a = arr.slice(0, arr.length / 2);
  const b = arr.slice(arr.length / 2);
  let p = 0;
  let q = 0;
  let i = 0;
  for (; i < arr.length ; i ++) {
    if (p === a.length) {
      arr[i] = b[q++];
      continue;
    }
    if (q === b.length) {
      arr[i] = a[p++];
      continue;
    }
    if (a[p] > b[q]) {
      arr[i] = b[q++];
      continue;
    }
    if (a[p] <=b[q]) {
      arr[i] = a[p++];
      continue;
    }
  }
}

const arr = [10, 21, 32, 11, 16, 40]
merge(arr);
console.log(arr);