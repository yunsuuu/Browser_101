import { Field, ItemType } from "./field.js";

// 타입스크립트라면 문자열을 이용하여 간단하게 타입 보장이 가능한데, 자바스크립트를 그렇지 않기 때문에 Object.freeze()함수를 사용하여 *객체 동결*
// 게임종료에 따른 팝업창 메시지의 reason을 string type으로 작성, 오타발생시 타입에러를 감지
export const Reason = Object.freeze({
  cancel: "cancel",
  win: "win",
  lose: "lose",
})

// Builder Pattern - 어떤 오브젝트를 만들 때 builder pattern을 이용해서 오브젝트를 간단명료, 가독성 좋게 작성
export class GameBuilder {
  gameDuration(duration) {
     // Method Chaining - 연속적인 코드 줄에서 개체의 Method를 반복적으로 호출, Method가 객체를 반환하면 그 반환값(객체)이 또 다른 Method를 호출
    this.gameDuration = duration; // 전달 받을 duration을 할당한 다음
    return this; // 게임클래스 자체를 리턴
  }

  carrotCount(num) { // 전달받은 숫자를 carrotCount에 전달, 게임을 return
    this.carrotCount = num;
    return this;
  }

  bugCount(num) {
    this.bugCount = num;
    return this;
  }

  // duration, carrotcount, bugcount 함수를 이용해서 구체적인 값을 정한 후 마지막에 build()함수로 게임 클래스 자체를 return
  build() {
    return new Game(
      this.gameDuration, // - 한줄에 나란히 오는 거 방지하려고 // 사용
      this.carrotCount, //
      this.bugCount
    );
  }
} 

// 게임생성방법은 외부로 노출되지 않음
class Game {
  constructor(gameDuration, carrotCount, bugCount) {
    this.gameDuration = gameDuration;
    this.carrotCount = carrotCount;
    this.bugCount = bugCount;

    this.$gameTimer = document.querySelector(".game-timer");
    this.$gameScore = document.querySelector(".game-score");
    this.$playBtn = document.querySelector(".play-btn");
    this.$playBtn.addEventListener("click", () => {
      if(this.started) {
        this.stop(Reason.cancel); // 게임시작 후 버튼클릭시 게임취소
      } else {
        this.start(); // 게임시작 전 버튼클릭시 게임시작
      }
    });

    // 게임필드 컨트롤
    this.gameField = new Field(carrotCount, bugCount);
    this.gameField.setClickListener(this.onItemClick);

    this.started = false;
    this.score = 0;
    this.timer = undefined;
  }

  // 게임종료를 알리는 콜백함수를 불러옴 
  setGameStopListener(onGameStop) {
    this.onGameStop = onGameStop;
  }

  start() {
    this.started = true;
    this.initGame();
    this.showStopBtn();
    this.showTimerAndScore();
    this.startGameTimer();
  }
  
  // stop이 되었을 때 왜 stop이 되었는지 명시
  stop(reason) {
    this.started = false;
    this.stopGameTimer();
    this.hidePlayBtn();
    this.onGameStop && this.onGameStop(reason);
  }

  initGame()  {
    this.score = 0;
    this.$gameScore.innerText = this.carrotCount;
    this.gameField.init();
  }

  onItemClick = (item) => {
    if(!this.started){ // 게임시작 전이면 함수 종료
      return;
    }
    if(item === ItemType.carrot){
      this.score++ // 타깃 클릭할 때마다 score 1씩 증가
      this.updateScore(); // 스코어변화반영
      if(this.carrotCount === this.score){
        this.stop(Reason.win); // 승리로 게임종료
      }
    } else if(item === ItemType.bug){
      this.stop(Reason.lose); // 패배로 게임종료
    }
  }
  
  updateTimerText(time) { // time = remainingTimeSec
    const minutes = String(Math.floor(time / 60)).padStart(2, "0");
    const seconds = String(Math.floor(time % 60)).padStart(2, "0"); // 나머지 구하는 방법
    this.$gameTimer.innerText = `${minutes} : ${seconds}`;
  }
  
  stopGameTimer() {
    clearInterval(this.timer);
  }
  
  startGameTimer() {
    let remainingTimeSec = this.gameDuration; // 10초
    this.updateTimerText(remainingTimeSec);
    this.timer = setInterval(() => {
      if(remainingTimeSec <= 0) { // 시간초과시
        clearInterval(this.timer); // 타이머종료
        this.stop(this.carrotCount === this.score ? Reason.win : Reason.lose);
        return;
      }
      this.updateTimerText(--remainingTimeSec); // 게임이 아직 진행 중이라면
    }, 1000);
  }
  
  updateScore() {
    this.$gameScore.innerText = this.carrotCount - this.score;
  }
  
  showTimerAndScore() {
    this.$gameTimer.style.visibility = "visible";
    this.$gameScore.style.visibility = "visible";
  }
  
  hidePlayBtn() {
    this.$playBtn.style.visibility = "hidden";
  }
  
  showStopBtn() {
    const target = this.$playBtn.querySelector(".fas");
    target.classList.add("fa-stop");
    target.classList.remove("fa-play");
    this.$playBtn.style.visibility = "visible";
  }
}