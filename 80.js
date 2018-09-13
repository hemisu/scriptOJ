/**

完成一个函数 partition，它接受一个数组作为参数。它会搬动数组中的元素，使得所有小于第一个项的元素都搬动到它的左边，所有大于第一个项的元素都搬动到右边。例如：

const arr = [3, 1, 6, 2, 4, 5]
partition(arr)
console.log(arr) // => [2, 1, 3, 6, 4, 5]
输入的数组的第一个项是 3，所以最后小于 3 的 1、2 的都到了左边，大于 3 的 4， 5， 6 都到了右边。

请你在不能使用任何数组原生方法，只能使用循环和赋值的情况下完成 partition 函数。

 */

const partition = (arr) => {
  const swap = (arr, i, j) => [arr[i], arr[j]] = [arr[j], arr[i]];
  const prior = arr[0];

  let i = 0;
  let k = 1;
  let j = arr.length - 1;
  while(k <= j) {
    if (arr[k] < prior) swap(arr, i++, k++);
    else if(arr[k] > prior) swap(arr, k, j--);
    else k++
  }
}

const arr = [3, 1, 6, 2, 4, 5]
partition(arr)
console.log(arr) // => [2, 1, 3, 6, 4, 5]