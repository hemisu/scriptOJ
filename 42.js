/**

页面上有这么一个列表：

<ul id='adjustable-list'>
  <li>
    <span>1</span>
    <button class='up'>UP</button>
    <button class='down'>DOWN</button>
  </li>
  <li>
    <span>2</span>
    <button class='up'>UP</button>
    <button class='down'>DOWN</button>
  </li>
  <li>
    <span>3</span>
    <button class='up'>UP</button>
    <button class='down'>DOWN</button>
  </li>
  ...
</ul>
点击 UP 按钮会使得该 li 元素在列表中上升一个位置，点击 DOWN 按钮会使得该 li 元素下降一个位置。点击最后的元素的 DOWN 按钮会使得元素回到第一个位置，点击第一个元素的 UP 按钮会使其回到最后的位置。

页面上已经存在该列表，你只需要完成 initAdjustableList() 函数，给元素添加事件。

 */

const initAdjustableList = () => {
  const oul = document.getElementById('adjustable-list');
  oul.addEventListener('click',upOrDown);
  function upOrDown(e){
    const ev = e || window.event;
    const target = ev.target;
    target.classList.contains('up') ? upBtn() : '';
    target.classList.contains('down') ? downBtn() : '';
    function upBtn(){
      const oli = target.parentElement;
      oul.insertBefore(oli, oli.previousElementSibling);
    }
    function downBtn(){
      const oli = target.parentElement;
      const next = oli.nextElementSibling;
      oli === oul.lastElementChild ? 
      oul.insertBefore(oli, oul.firstElementChild) : oul.insertBefore(next, oli);
    }
  }
}