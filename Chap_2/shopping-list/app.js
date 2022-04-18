// 1. 사용자가 입력한 input value 읽음
// 2. + 버튼 클릭시, input enter시 value값으로 list 출력
// 3. list 출력 후 input창 focus 유지
// 4. list는 리스트명, 휴지통 아이콘으로 구성
// 5. 휴지통 아이콘 클릭시 list 삭제

const $ul = document.querySelector(".items");
const $input = document.querySelector(".footer-input");
const $btn = document.querySelector(".footer-btn");

function deleteItem(e) {
  console.log(e);
}

function createLi(text) {
  const li = document.createElement("li");
  li.classList.add("item-list");
  li.innerHTML = `
    <div class="item">
      <span class="item-name">${text}</span>
      <button class="delete-btn">
        <i class="fa-solid fa-trash-can"></i>
      </button>
    </div>
  `;

  // 중요!
  return li; // 화면에 출력하려면 return 필요
}

function addList() {
  const value = $input.value;
  // console.log(value);
  const itemList = createLi(value);
  $input.value = "";
  $input.focus();

  $ul.append(itemList);
}

// 휴지통 클릭 이벤트(아이템 삭제)
$ul.addEventListener("click", deleteItem);

// 엔터키 이벤트
$input.addEventListener("keypress", (e) => {
  if ($input.value === "") {
    return;
  }

  if (e.keyCode === 13) {
    addList();
  }
});

// 버튼클릭이벤트
$btn.addEventListener("click", () => {
  if ($input.value === "") {
    $input.focus();
    return;
  }
  addList();
});