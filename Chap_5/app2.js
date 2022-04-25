// 엄격모드 - 의도치 않은 오류를 방지 
"use strict";

const CARROT_SIZE = 80; // width=80, heigth=80
// 순수한 게임필드 범위를 벗어나서 아이템이 만들어지기 때문에 당근 이미지의 사이즈 체크 후 사이즈 만큼 게임필드 너비에서 빼줌
const CARROT_COUNT = 5;
const BUG_COUNT = 5;
const GAME_DURATION_SEC = 5;

const $gameField = document.querySelector(".game-field");
// getBoundingClientRect() - 원하는 요소의 위치값 구하기
const gameFieldRect = $gameField.getBoundingClientRect();
const $playBtn = document.querySelector(".play-btn");
const $gameTimer = document.querySelector(".game-timer");
const $gameScore = document.querySelector(".game-score");

let started = false; // 게임실행 여부를 확인하는 변수
let score = 0; // 최종 점수를 기억하는 변수
let timer = undefined; // 게임 시작 전 undefined, 게임 시작 후 타이머가 기억되고 있어야 함

$playBtn.addEventListener("click", () => {
  if(started) { // 게임이 시작됐다면
    stopGame(); // 게임중지
  } else {
    startGame(); // 게임실행
  }
  started = !started; // 버튼클릭하는 순간 started가 반대로 전환
});

function updateTimerText(time) { // time = remainingTimeSec
  const minutes = String(Math.floor(time / 60)).padStart(2, "0");
  // time = 5 ㅣ 5 / 60 = 0 ㅣ 0minutes
  // time = 65 ㅣ 65 / 60 = 1 ㅣ 1minutes 
  const seconds = String(Math.floor(time % 60)).padStart(2, "0");
  // time = 65 ㅣ 65 % 60 = 5(나머지)
  $gameTimer.innerText = `${minutes} : ${seconds}`;
}

function runTimer() {
  let remainingTimeSec = GAME_DURATION_SEC; // 10초
  updateTimerText(remainingTimeSec);
  timer = setInterval(() => {
    if(remainingTimeSec <= 0) { // 게임종료
      clearInterval(timer);
      return;
    }
    updateTimerText(--remainingTimeSec); // 게임이 아직 진행 중이라면
  }, 1000);
}

function showTimerAndScore() {
  $gameTimer.style.visibility = "visible";
  $gameScore.style.visibility = "visible";
}

function showStopButton() {
  const target = $playBtn.querySelector(".fa-play");
  target.classList.add("fa-stop");
  target.classList.remove("fa-play");
}

function startGame() {
  initGame();
  showStopButton();
  showTimerAndScore();
  runTimer();
}

function stopGame() {

}

// 1부터 max까지 숫자 중 하나를 랜덤하게 가져오기
function randomNum(min, max) {
  return Math.random() * (max - min + 1) + min;
  // randomNum(1, 10) -> 1~10까지 숫자 중 하나 랜덤하게 가져오기
}

// className - 당근인지 벌레인지
// count - 몇 개인지
// imgPath - 이미지 경로
function addItem(className, count, imgPath) {
  // 게임필드에 position: relative 적용
  // x2, y2 = 아이템이 랜덤하게 그려질 게임필드 면적
  // 아이템(이미지 태그) - position: absolute
  const x1 = 0; // 필드 가장 상단, 좌측 x좌표
  const y1 = 0; // 필드 가장 상단, 좌측 y좌표
  // 기존 게임필드 너비, 높이에 당근사이즈(80)만큼을 빼줌으로써 게임필드 너비, 높이가 80만큼 축소(게임창을 넘어가지 않고 아이템이 랜덤으로 그려짐)
  const x2 = gameFieldRect.width - CARROT_SIZE; 
  const y2 = gameFieldRect.height - CARROT_SIZE;
  // count만큼 반복문을 돌면서 item 만들기
  for(let i = 0; i < count; i++){
    const item = document.createElement("img"); // 이미지태그
    item.setAttribute("class", className);
    item.setAttribute("src", imgPath); // 이미지경로
    // <img class="className" src="imgPath">
    item.style.position = "absolute";
    // 1~792까지 랜덤수
    const x = randomNum(x1, x2); // x1=0, x2=field의 width(792)
    // 1~316까지 랜덤수
    const y = randomNum(y1, y2); // y1=0, y2=field의 heigth(316)
    item.style.left = `${x}px`;
    item.style.top = `${y}px`;

    $gameField.appendChild(item);
    item.addEventListener("click", (e) => {
      console.log(e.target.className);
    })
  }
}

function initGame() {
   // 플레이버튼 클릭할 때마다 필드 리셋 상태로 초기화
  $gameField.innerHTML = "";
  $gameScore.innerText = CARROT_COUNT;
  // addItem()으로 벌레와 당근을 생성한 뒤 game-field에 추가
  addItem("carrot", CARROT_COUNT, "img/carrot.png");
  addItem("bug", CARROT_COUNT, "img/bug.png");
}