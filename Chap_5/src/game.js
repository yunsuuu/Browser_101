"use strict";

import Field from "./field.js";
import PopUp from "./pop-up.js";

export default class Game {
  constructor(gameDuration, carrotCount, bugCount) {
    this.gameDuration = gameDuration;
    this.carrotCount = carrotCount;
    this.bugCount = bugCount;

    this.$gameTimer = document.querySelector(".game-timer");
    this.$gameScore = document.querySelector(".game-score");
    this.$playBtn = document.querySelector(".play-btn");
    this.$playBtn.addEventListener("click", () => {
      if(this.started) {
        // this.stopGame(); - this=game이라 game.stopgame보단 this.stop()으로
        this.stop();
      } else {
        // this.startGame(); // 게임실행
        this.start();
      }
    });

    this.gameField = new Field(carrotCount, bugCount);
    this.gameField.setClickListener(this.onItemClick);

    this.started = false;
    this.score = 0;
    this.timer = undefined;
  }

  // 게임이 끝나면 알려주는 콜백 함수를 받아오는 역할 
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
  
  stop() {
    this.started = false;
    this.stopGameTimer();
    this.hidePlayBtn();
    this.onGameStop && this.onGameStop("cancel");
  }

  finish(win) {
    this.started = false;
    this.hidePlayBtn();
    this.stopGameTimer();
    this.onGameStop && this.onGameStop(win? "win" : "lose");
  }

  initGame() {
    this.score = 0;
    this.$gameScore.innerText = this.carrotCount;
    this.gameField.init();
  }

  onItemClick = (item) => {
    if(!this.started){ // 게임시작 전이면 함수 종료
      return;
    }
    if(item === "carrot"){
      this.score++ // 타깃 클릭할 때마다 score 1씩 증가
      this.updateScore(); // 스코어변화반영
      if(this.carrotCount === this.score){
        this.finish(true); // 승리로 게임종료
      }
    } else if(item === "bug"){
      this.finish(false); // 패배로 게임종료
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
        this.finish(this.carrotCount === this.score);
        // 당근전체수 = 클릭한 당근수 -> 승리로 게임종료
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