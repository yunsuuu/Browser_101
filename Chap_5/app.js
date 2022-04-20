const $playBtn = document.querySelector(".play-btn");
const $timer = document.querySelector(".game-timer");
const $gameField = document.querySelector(".game-field");

function createIcon() {
  iconName.src = `./img/${iconPath}.png`;
}

let min;
let max;
// get random coordinate(랜덤좌표)
function getRandomCoor(min, max){
 min = Math.ceil(min);
 max = Math.floor(max);
 return Math.random() * (max - min) + min;
}

let timeleft;
let interval;
function playGame(){
  timeleft = 10;
  interval = setInterval(() => {
    timeleft -= 1; // timeleft = timeleft - 1
    if(timeleft <= 0){
      clearInterval(interval);
    }
    $timer.innerText = `${timeleft}초`;
  }, 1000);
}

$playBtn.addEventListener("click", () => {
  playGame();
});