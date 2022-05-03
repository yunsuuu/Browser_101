// 엄격모드 - 의도치 않은 오류를 방지 
"use strict";
import Game from "./game.js";
import PopUp from "./pop-up.js";

// const CARROT_COUNT = 5;
// const BUG_COUNT = 5;
// const GAME_DURATION_SEC = 10;

// 게임 관련 클래스
const game = new Game(3, 3, 5);
game.setGameStopListener(reason => {
  let message; 
  switch(reason) {
    case "cancel":
      message = "REPLAY❓";
      break;
    case "win":
      message = "YOU WON 🥳";
      break;
    case "lose":
      message = "YOU LOST 🥺";
      break;
      default: // 위의 세 경우 아닐 때 에러 메시지 던짐
        throw new Error("not valid reason");
  }
  gameFinishBanner.showPopUp(message);
});

// 팝업창 관련 클래스
const gameFinishBanner = new PopUp();
gameFinishBanner.setClickListener(() => {
  game.start();
});

// const $playBtn = document.querySelector(".play-btn");
// const $gameTimer = document.querySelector(".game-timer");
// const $gameScore = document.querySelector(".game-score");
// const $gameField = document.querySelector(".game-field");
// const gameFieldRect = $gameField.getBoundingClientRect();
// getBoundingClientRect() - 원하는 요소의 위치값 구하기

// const $popUp = document.querySelector(".pop-up");
// const $popUpBtn = document.querySelector(".pop-up-btn");
// const $popUpMsg = document.querySelector(".pop-up-msg");

// let started = false; // 게임실행 여부를 확인하는 변수
// let score = 0; // 최종 점수를 기억하는 변수
// let timer = undefined; // 게임 시작 전 undefined, 게임 시작 후 타이머가 기억되고 있어야 함

// function onItemClick(item) {
//   if(!started){ // 게임시작 전이면 함수 종료
//     return;
//   }
//   if(item === "carrot"){
//     score++ // 타깃 클릭할 때마다 score 1씩 증가
//     updateScore(); // 스코어변화반영
//     if(CARROT_COUNT === score){
//       finishGame(true); // 승리로 게임종료
//     }
//   } else if(item === "bug"){
//     finishGame(false); // 패배로 게임종료
//   }
// }

// 이벤트 위임으로, 아이콘 각각에 클릭이벤트 등록하지 않고, 게임필드 자체에 클릭이벤트 등록하여 클릭된 아이콘이 어떤 것인지에 따라 결과 다르게 표기
// $gameField.addEventListener("click", onFieldClick);
// $playBtn.addEventListener("click", () => {
//   if(started) { // 게임이 진행 중인 상황에서 플레이 버튼 클릭시
//     stopGame(); // 게임중지
//   } else {
//     startGame(); // 게임실행
//   }
// });

// function initGame() {
//   score = 0;
//   $gameScore.innerText = CARROT_COUNT;
//   gameField.init();
//   // $gameField.innerHTML = "";
//   // addItem("carrot", CARROT_COUNT, "img/carrot.png");
//   // addItem("bug", BUG_COUNT, "img/bug.png");
// }

// function updateTimerText(time) { // time = remainingTimeSec
//   const minutes = String(Math.floor(time / 60)).padStart(2, "0");
//   const seconds = String(Math.floor(time % 60)).padStart(2, "0"); // 나머지 구하는 방법
//   $gameTimer.innerText = `${minutes} : ${seconds}`;
// }

// function stopGameTimer() {
//   clearInterval(timer);
// }

// function startGameTimer() {
//   let remainingTimeSec = GAME_DURATION_SEC; // 10초
//   updateTimerText(remainingTimeSec);
//   timer = setInterval(() => {
//     if(remainingTimeSec <= 0) { // 시간초과시
//       clearInterval(timer); // 타이머종료
//       finishGame(CARROT_COUNT === score);
//       // 당근전체수 = 클릭한 당근수 -> 승리로 게임종료
//       return;
//     }
//     updateTimerText(--remainingTimeSec); // 게임이 아직 진행 중이라면
//   }, 1000);
// }

// function updateScore() {
//   $gameScore.innerText = CARROT_COUNT - score;
// }

// function showTimerAndScore() {
//   $gameTimer.style.visibility = "visible";
//   $gameScore.style.visibility = "visible";
// }

// function hidePlayBtn() {
//   $playBtn.style.visibility = "hidden";
// }

// function showStopBtn() {
//   const target = $playBtn.querySelector(".fas");
//   target.classList.add("fa-stop");
//   target.classList.remove("fa-play");
//   $playBtn.style.visibility = "visible";
// }

// 1부터 max까지 숫자 중 하나를 랜덤하게 가져오기
// function randomNum(min, max) {
//   return Math.random() * (max - min + 1) + min;
//   // randomNum(1, 10) -> 1~10까지 숫자 중 하나 랜덤하게 가져오기
// }

// function addItem(className, count, imgPath) {
//   // 게임필드에 position: relative 적용
//   // x2, y2 = 아이템이 랜덤하게 그려질 게임필드 면적
//   // 아이템(이미지 태그) - position: absolute
//   const x1 = 0; // 필드 가장 상단, 좌측 x좌표
//   const y1 = 0; // 필드 가장 상단, 좌측 y좌표
//   // 기존 게임필드 너비, 높이에 당근사이즈(80)만큼을 빼줌으로써 게임필드 너비, 높이가 80만큼 축소(게임창을 넘어가지 않고 아이템이 랜덤으로 그려짐)
//   const x2 = gameFieldRect.width - CARROT_SIZE; 
//   const y2 = gameFieldRect.height - CARROT_SIZE;
//   // count만큼 반복문을 돌면서 item 만들기
//   for(let i = 0; i < count; i++){
//     const item = document.createElement("img"); // 이미지태그
//     item.setAttribute("class", className);
//     item.setAttribute("src", imgPath); // 이미지경로
//     // <img class="className" src="imgPath">
//     item.style.position = "absolute";
//     // 1~792까지 랜덤수
//     const x = randomNum(x1, x2); // x1=0, x2=field의 width(792)
//     // 1~316까지 랜덤수
//     const y = randomNum(y1, y2); // y1=0, y2=field의 heigth(316)
//     item.style.left = `${x}px`;
//     item.style.top = `${y}px`;

//     $gameField.appendChild(item);
//   }
// }

// function hidePopUp() {
//   $popUp.classList.add("pop-up-hide");
// }

// function showPopUp(text) {
//   $popUpMsg.innerText = text;
//   $popUp.classList.remove("pop-up-hide");
// }

// function startGame() {
//   started = true;
//   initGame();
//   showStopBtn();
//   showTimerAndScore();
//   startGameTimer();
// }

// function stopGame() {
//   started = false;
//   stopGameTimer();
//   hidePlayBtn();
//   gameFinishBanner.showPopUp("REPLAY?");
// }

// function finishGame(win) { // 승리했는지 패배했는지
//   started = false;
//   hidePlayBtn();
//   stopGameTimer();
//   gameFinishBanner.showPopUp(win ? "You Won! 🥳" : "You Lost! 🥺");
// }

// function onFieldClick(e) {
//   if(!started){ // 게임시작 전이면 함수 종료
//     return;
//   }
//   const target = e.target;
//   if(target.className === "carrot"){
//     target.remove();
//     score++ // 타깃 클릭할 때마다 score 1씩 증가
//     updateScore(); // 스코어변화반영
//     if(CARROT_COUNT === score){
//       finishGame(true); // 승리로 게임종료
//     }
//   } else if(target.className === "bug"){
//     finishGame(false); // 패배로 게임종료
//   }
// }