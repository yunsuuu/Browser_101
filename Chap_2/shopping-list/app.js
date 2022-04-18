// 1. 사용자가 입력한 input value 읽음
// 2. + 버튼 클릭시, input enter시 value값으로 list 출력
// 3. list 출력 후 input창 focus 유지
// 4. list는 리스트명, 휴지통 아이콘으로 구성
// 5. 휴지통 아이콘 클릭시 list 삭제

const $ul = document.querySelector(".items");
const $input = document.querySelector(".footer-input");
const $btn = document.querySelector(".footer-btn");

function createItem() {
  const li = document.createElement("li");
  li.classList.add("item-list");
  li.innerHTML = `
    <div class="item">
     <span class="itme-name">a</span>
     <button class="delete-btn">
      <i class="fa-solid fa-trash-can"></i>
     </button>
    </div>
  `;
}

function addList() {
  const value = $input.value;
  const createItem = createItem();

  $ul.appendChild(createItem);
}

$btn.addEventListener("click", () => {
  addList();
});