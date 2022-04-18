// append() - 노드객체, string 활용 가능, 한번에 여러개의 자식요소 설정 가능
// appendChild() - 노드객체만 활용 가능, 한번에 오직 하나의 노드만 추가

const $ul = document.querySelector(".items");
const $input = document.querySelector(".footer-input");
const $addBtn = document.querySelector(".footer-btn");

let id = 0;
function createLi(text) {
  const itemList = document.createElement("li");
  itemList.classList.add("item-list");
  itemList.setAttribute("data-id", id);
  // <li class="item-list" data-id=${id}></li>
  itemList.innerHTML = `
    <div class="item">
      <span class="item-name">${text}</span>
      <button class="item-delete">
        <i class="fa-solid fa-trash-can" data-id=${id}></i>
      </button>
    </div>
  `;
  id++;
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
$addBtn.addEventListener("click", (e) => {
  addList();
});

$ul.addEventListener("click", (e) => {
  const id = e.target.dataset.id;
  console.log(id);
  if(id) { // id가 존재할 때
   const toBeDeleted = document.querySelector(`.item-list[data-id="${id}"]`);
   toBeDeleted.remove();
  }
});