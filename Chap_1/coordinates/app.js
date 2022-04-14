const $horizontal = document.querySelector(".horizontal");
const $vertical = document.querySelector(".vertical");
const $circle = document.querySelector(".circle");
const $tag = document.querySelector(".tag");
document.addEventListener("mousemove", (e) => {
  const x = e.clientX;
  const y = e.clientY;
  $horizontal.style.top = `${y}px`;
  $vertical.style.left = `${x}px`;
  $circle.style.top = `${y}px`;
  $circle.style.left = `${x}px`;
  $tag.style.top = `${y}px`;
  $tag.style.left = `${x}px`;
  $tag.innerHTML = `
    ${x}px, ${y}px
  `;
});