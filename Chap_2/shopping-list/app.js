// 1. 사용자가 입력한 input value 읽음
// 2. + 버튼 클릭시, input enter시 value값으로 list 출력
// 3. list 출력 후 input창 focus 유지
// 4. list는 리스트명, 휴지통 아이콘으로 구성
// 5. 휴지통 아이콘 클릭시 list 삭제

const $ul = document.querySelector(".items");
const $form = document.querySelector(".form");
const $input = document.querySelector(".footer-input");
const $btn = document.querySelector(".footer-btn");

let id = 0;

function createLi(text) {
  const li = document.createElement("li");
  li.classList.add("item-list");
  li.setAttribute("data-id", id);
  // <li class="item-list" data-id="id"></li>
  li.innerHTML = `
    <div class="item">
      <span class="item-name">${text}</span>
      <button class="delete-btn">
        <i class="fa-solid fa-trash-can" data-id=${id}></i>
      </button>
    </div>
  `;
  id++;
  // 중요!
  return li; // 화면에 출력하려면 return 필요
}

function addList() {
  const value = $input.value;
  if(value === ""){
    $input.focus();
    return;
  }

  const itemList = createLi(value);
  $ul.append(itemList);
  itemList.scrollIntoView({block: "center"});

  $input.value = "";
  $input.focus();
}

// 아이템삭제 이벤트(ul 태그에 위임함으로써 이벤트를 한번만 발생시킴)
$ul.addEventListener("click", (e) => {
   const id = e.target.dataset.id;
   if(id) {
     const toBeDeleted = document.querySelector(`.item-list[data-id="${id}"]`);
     toBeDeleted.remove();
    }
});

$form.addEventListener("submit", (e) => {
  e.preventDefault();
  addList();
});

// 엔터키 이벤트
// keyup - 키보드에서 손가락을 뗐을 때
// $input.addEventListener("keydown", (e) => {
//   if (e.key === "Enter") {
//     addList();
//   }
// });

// 버튼클릭 이벤트
$btn.addEventListener("click", () => {
  if ($input.value === "") {
    // $input.focus();
    return;
  }
  addList();
});