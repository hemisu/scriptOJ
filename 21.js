/**
  完成函数 hexToRGB，它的作用将 16 进制颜色值转换成 RGB 值：

  hexToRGB('#F0F0F0') // => rgb(240, 240, 240)
  hexToRGB('#9fc') // => rgb(153, 255, 204)
  hexToRGB('无效颜色') // => null
 */
const hexToRGB = (hex) => {
  const regex = /^\#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/;
  if(!regex.test(hex)){
    return null;
  }
  let h = hex.slice(1);
  const result = [];
  if(h.length === 3) h = h.replace(/(.)/g,'$&$&');
  h.replace(/../g, color => result.push(parseInt(color, 0x10)));
  
  return `rgb(${result.join(', ')})`;
}

console.log(
  hexToRGB('#F0F0F0'), // => rgb(240, 240, 240)
  hexToRGB('#9fc'), // => rgb(153, 255, 204)
  hexToRGB('#6c4A07'), // => rgb(108, 74, 7)
  hexToRGB('无效颜色'), // => null
)

/**
 补充了一份RGBToHex的
 */
const RGBToHex = (rgb) => {
  const regx = /^rgb\(\d+(\,\s*\d+){2}\)$/g;
  if(!regx.test(rgb)) return null;
  return rgb.slice()
            .match(/\d+/g)
            .reduce((p,c) => p.concat(
              Number(c).toString(16) // Number.toString(16) 可以转换成16进制的字符串
                        .replace(/^[0-9a-fA-F](?=$)/,'0$&') // 如果结果是1位数，就在前面补0
            ), ['#']).join('');
}

console.log(
  RGBToHex('rgb(240, 240, 240)'), // #F0F0F0
  RGBToHex('rgb(153, 255, 204)'), // #99ffcc
  RGBToHex('rgb(108, 74, 7)'), // #6c4A07
  RGBToHex('无效颜色'),
)