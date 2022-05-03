"use strict";

export default class Game {
  constructor(gameDuration, carrotCount, bugCount) {
    this.gameDuration = gameDuration;
    this.carrotCount = carrotCount;
    this.bugCount = bugCount;

    this.$gameTimer = document.querySelector(".game-timer");
    this.$gameScore = document.querySelector(".game-score");
    this.$playBtn = document.querySelector(".play-btn");
    this.$playBtn.addEventListener("click", () => {
      if(started) {
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

  onItemClick = (item) => {
    if(!this.started){ // 게임시작 전이면 함수 종료
      return;
    }
    if(item === "carrot"){
      this.score++ // 타깃 클릭할 때마다 score 1씩 증가
      this.updateScore(); // 스코어변화반영
      if(this.carrotCount === this.score){
        this.finishGame(true); // 승리로 게임종료
      }
    } else if(item === "bug"){
      this.finishGame(false); // 패배로 게임종료
    }
  }
}