// 외부파일에서도 볼 수 있게
"use strict";

const CARROT_SIZE = 80;

export const ItemType = Object.freeze({
  carrot: "carrot",
  bug: "bug",
})

export class Field {
  constructor(carrotCount, bugCount) {
    this.carrotCount = carrotCount;
    this.bugCount = bugCount;
    this.$gameField = document.querySelector(".game-field");
    this.gameFieldRect = this.$gameField.getBoundingClientRect();
    this.$gameField.addEventListener("click", this.onClick);
  }

  // 필드를 초기화하고 아이템을 추가하는 역할
  init() {
    this.$gameField.innerHTML = "";
    this.addItem(ItemType.carrot, this.carrotCount, `img/${ItemType.carrot}.png`);
    this.addItem(ItemType.bug, this.bugCount, `img/${ItemType.bug}.png`);
  }

  setClickListener(onItemClick) {
    this.onItemClick = onItemClick;
    // itemClick 이라는 변수는 onItemClick을 인자로 받는 onItemClick 함수
  }

  addItem(className, count, imgPath) {
    const x1 = 0;
    const y1 = 0;
    const x2 = this.gameFieldRect.width - CARROT_SIZE; 
    const y2 = this.gameFieldRect.height - CARROT_SIZE;
    for(let i = 0; i < count; i++){
      const item = document.createElement("img");
      item.setAttribute("class", className);
      item.setAttribute("src", imgPath);
      item.style.position = "absolute";
      const x = randomNum(x1, x2);
      const y = randomNum(y1, y2);
      item.style.left = `${x}px`;
      item.style.top = `${y}px`;
  
      this.$gameField.appendChild(item);
    }
  }

  // 클래스 내부 함수를 어딘가로 전달할 때 클래스 정보가 사라지기 때문에 정보를 전달해 주기 위해 onClick을 변수로 만들어줌 (바인딩 작업)
  onClick = (e) => {
    const target = e.target;
    if(target.className === ItemType.carrot){
      target.remove();
      this.onItemClick && this.onItemClick(ItemType.carrot);
    } else if(target.className === ItemType.bug){
      target.remove();
      this.onItemClick && this.onItemClick(ItemType.bug);
    }
  }
}

function randomNum(min, max) {
  return Math.random() * (max - min + 1) + min;
  // randomNum(1, 10) -> 1~10까지 숫자 중 하나 랜덤하게 가져오기
}