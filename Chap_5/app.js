const $playBtn = document.querySelector(".play-btn");
const $timer = document.querySelector(".game-timer");

// 플레이버튼 클릭시 발생하는 함수
let timeleft;
let intervalId;
function playGame(){
  timeleft = 10;
  intervalId = setInterval(() => {
    timeleft -= 1; // timeleft = timeleft - 1;
    $timer.innerText = `00:0${timeleft}`;
    if(timeleft <= 0){
      clearInterval(intervalId);
      return;
    }
  }, 1000);
}

$playBtn.addEventListener("click", () => {
  playGame();
});