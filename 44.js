/*
同字母异序指的是两个字符串字母种类和字母的数量相同，但是顺序可能不同。

完成 isAnagram，接受两个字符串作为参数，返回true 或者 false 表示这两个字符串是否同字母异序。例如：

isAnagram("anagram", "nagaram") // => return true.
isAnagram("rat", "car") // => return false.
*/
const isAnagram = (str1, str2) => {
  let m = new Map();
  str1.split("").forEach(element => {
    if(!m.has(element)) m.set(element, 0);
    m.set(element, m.get(element) + 1);
  });
  str2.split("").forEach(element => {
    if(m.has(element)) m.set(element, m.get(element) - 1);
  });
  for (let value of m.values()) {
    if(value !== 0) return false;
  }
  return true;
}

const isAnagram = (str1, str2) => str1.split('').sort().join('') === str2.split('').sort().join('');