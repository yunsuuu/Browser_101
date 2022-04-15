const $ul = document.querySelector(".items");
const $input = document.querySelector(".footer-input");
const $btn = document.querySelector(".footer-btn");

function onClickAdd() {
  const value = $input.value;
  const li = document.createElement("li");
  
}
$btn.addEventListener("click", onClickAdd);