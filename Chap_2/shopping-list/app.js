// append() - 노드객체, string 활용 가능, 한번에 여러개의 자식요소 설정 가능
// appendChild() - 노드객체만 활용 가능, 한번에 오직 하나의 노드만 추가

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

  itemDiv.append(itemSpan, deleteBtn);
  // itemDiv.appendChild(deleteBtn);

  itemList.appendChild(itemDiv);
  return itemList;
}

function addList() {
  const value = $input.value;
  if (value === "") {
    $input.focus();
    return;
  }
  const li = createLi(value);
  $ul.appendChild(li);
  li.scrollIntoView({block: "center"}); // list 많아져도 스크롤은 항상 가운데 고정
  $input.value = "";
  $input.focus();
}

$input.addEventListener("keypress", (e) => {
  // if(e.keyCode === 13) {
  //   addList();
  // }
  if(e.key === "Enter") {
    addList();
  }
})
$btn.addEventListener("click", () => {
  addList();
});