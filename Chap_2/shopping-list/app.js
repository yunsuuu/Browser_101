const $ul = document.querySelector(".items");
const $input = document.querySelector(".footer-input");
const $btn = document.querySelector(".footer-btn");

function createLi(text) {
  const itemList = document.createElement("li");
  itemList.classList = "item-list"

  const itemDiv = document.createElement("div");
  itemDiv.classList = "item";
  const itemSpan = document.createElement("span");
  itemSpan.classList = "item-name";
  itemSpan.innerText = text;
  const deleteBtn = document.createElement("button");
  deleteBtn.classList = "item-delete";
  deleteBtn.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;
  deleteBtn.addEventListener("click", () => {
    $ul.removeChild(itemList);
  });

  itemDiv.appendChild(itemSpan);
  itemDiv.appendChild(deleteBtn);
  
  itemList.appendChild(itemDiv);
  return itemList;
}

function onClickAdd() {
  const value = $input.value;
  const li = createLi(value);
  $ul.append(li);
  $input.value = "";
  $input.focus();
}
$btn.addEventListener("click", onClickAdd);