const $playBtn = document.querySelector(".play-btn");
const $timer = document.querySelector(".game-timer");

let startTime;
let interval;

function playGame(){
  startTime = new Date();
  interval = setInterval(() => {
    const time = Math.floor((new Date() - startTime) / 1000);
    $timer.innerText = `${time}`;
  }, 1000);
}

$playBtn.addEventListener("click", () => {
  playGame();
});