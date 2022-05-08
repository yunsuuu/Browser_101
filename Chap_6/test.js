// ** 클릭이벤트리스너, 태스크큐 개념
// document.body.appendChild(h3) 작성 순서 상관없음g
// 1. 클릭이벤트리스너 등록에 따른 콜백함수(코드블럭 내부 모든 코드)는 태스크큐로 들어감
// 2. 태스크큐에 들어간 콜백함수는 이벤트루프가 돌다가 발견하여 콜스택 이동시킴
// 3. 콜스택으로 이동한 콜백함수 내부 모든 코드가 수행될 때까지 이벤트루프는 콜스택에서 대기
// 4. 콜백함수의 모든 코드가 모두 수행되면 이벤트루프는 해당 코드의 모든 수행사항을 적용하여 렌더링 단계로 감
// 5. 콜백함수 내부 코드가 모두 수행된 상태에서 렌더트리 생성
// 6. 5의 랜더트리를 바탕으로 레이아웃 계산, 페인트 단계 거쳐 브라우저에 출력
// 요약 - 자바스크립트엔진이 코드블럭 내부 모든 코드가 완료될 때까지 기다렸다가 렌더링이 발생하기 때문

// const h3 = document.createElement("h3");
// h3.innerText = "welcome!";
// h3.style.color = "lightblue";
// document.body.appendChild(h3);

// const h3 = document.createElement("h3");
// document.body.appendChild(h3);
// h3.innerText = "welcome!";
// h3.style.color = "lightblue";

// 예제1
// const $btn = document.querySelector("button");
// $btn.addEventListener("click", () => {
//   const h3 = document.createElement("h3");
//   h3.innerText = "welcome!";
//   h3.style.color = "lightblue";

//   document.body.appendChild(h3);
// });

// 예제2
// const $btn = document.querySelector("button");
// function onClick() {
//   console.log("click");
//   setTimeout(() => { // setTimeout 콜백은 큐 태스크로 이동
//     console.log("setTimeout");
//     onClick();
//   }, 0);
// }
// $btn.addEventListener("click", () => {
//   onClick();
// });

// 마이크로 태스크 큐 - 새롭게 만들어진 콜백을 계속 추가 가능
// 예제3
// const $btn = document.querySelector("button");
// function onClick() {
//   console.log("click");
//   // Promise - 주로 서버에서 받아온 데이터를 화면에 표시
//   // Promise 콜백은 마이크로 태스크로 이동
//   Promise.resolve(0)
//   // resolve라는 API를 이용, 0이라는 값을 리턴 
//   .then(() => { // 정상적으로 0이라는 값이 리턴되면
//     console.log("then");
//     onClick();
//   });
// }
// $btn.addEventListener("click", () => {
//   onClick();
// });

// 예제
const $btn = document.querySelector("button");
function onClick() {
  // requestAnimationFrame - 비동기 함수로서, CSS 애니메이션으로는 처리가 어렵거나 canvas, SVG 등의 애니메이션을 직접 구현하고자 할 때 사용
  requestAnimationFrame
}
$btn.addEventListener("click", () => {
  onClick();
});