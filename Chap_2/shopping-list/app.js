const $ul = document.querySelector("ul");
const $form = document.querySelector("form");
const $input = document.querySelector("input");
const $btn = document.querySelector("button");

function submitValue() {
  const value = $input.value;
  const $li = document.createElement("li");
  $li.innerHTML = `${value}`;
  $ul.appendChild($li);
  $input.value = "";
}

$form.addEventListener("submit", (e) => {
  e.preventDefault();
  submitValue();
})

$btn.addEventListener("click", () => {
  submitValue();
});