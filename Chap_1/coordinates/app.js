// 사용자의 인터렉션이 많이 발생하는 웹앱일수록 성능에 유의
// top, left 등으로 위치이동하는 것보다 transform(translate)로 위치이동하면 성능이 높아짐
const $horizontal = document.querySelector(".horizontal");
const $vertical = document.querySelector(".vertical");
const $circle = document.querySelector(".circle");
const $tag = document.querySelector(".tag");

addEventListener("load", () => {
  // getBoundingClientRect() - 원하는 요소의 위치값을 얻을 수 있음
  const circleRect = $circle.getBoundingClientRect();
  const circleHalfWidth = circleRect.width / 2;
  const circleHalfHeight = circleRect.height / 2;

  document.addEventListener("mousemove", (e) => {
    const x = e.clientX;
    const y = e.clientY;
    // horizontal = x축(상하이동)
    $horizontal.style.transform = `translateY(${y}px)`;
    // vertical = y축(좌우이동)
    $vertical.style.transform = `translateX(${x}px)`;
    $circle.style.transform = `translate(${x - circleHalfWidth}px, ${y - circleHalfHeight}px)`;
    $tag.style.transform = `translate(${x + 30}px, ${y + 20}px)`;
    $tag.innerHTML = `${x}px, ${y}px`;
  });
});