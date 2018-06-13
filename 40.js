/**

有一个 div#wrapper 元素，高、宽度都未知。它其中有一个宽高都为 100px 的 div#box 元素，
请你完成 CSS，使得 div#box 在 div#wrapper 内水平、垂直方向居中。

 */

 ```html

<div id='wrapper'>
  <div id='box'></div>
</div>

```

// flex布局
```css
#box {
  width: 100px;
  height: 100px;
}
#wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}
```

// 定位 translate方法
```css
#wrapper{
  position:relative;
}
#box {
  position:absolute;
  width: 100px;
  height: 100px;
  top:50%;
  left:50%;
  transform:translate(-50%, -50%);
}
```