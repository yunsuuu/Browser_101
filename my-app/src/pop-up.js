"use strict";

export default class PopUp {
  // PopUp이라는 클래스에 맴버변수 3개를 생성
  // 생성자 안에서 DOM 요소를 받아와서 this.$popUp과 같이 할당
  // class에서는 const 대신 this 사용
  constructor() { // this = PopUp
    this.$popUp = document.querySelector(".pop-up");
    this.$popUpBtn = document.querySelector(".pop-up-btn");
    this.$popUpMsg = document.querySelector(".pop-up-msg");
    this.$popUpBtn.addEventListener("click", () => {
      this.onClick  && this.onClick(); 
      // PopUp 클래스에 onClick이라는 맴버변수가 있으면 onClick() 함수 실행
      this.hide();
      // 팝업버튼 클릭시 팝업창 닫기
    });
  }

  setClickListener(onClick) {
    // PopUp 클래스의 onClick이라는 맴버변수는 onClick이라는 함수 
    this.onClick = onClick;
  }

  showPopUp(text) {
    this.$popUpMsg.innerText = text;
    this.$popUp.classList.remove("pop-up-hide");
  }

  hide() {
    this.$popUp.classList.add("pop-up-hide");
  }
}