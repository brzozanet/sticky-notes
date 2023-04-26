import "../css/styles.css";

const inputEl = document.querySelector("#sticky-input");

inputEl.addEventListener("input", (event) => {
  const value = event.target.value;
  const stickyEl = document.querySelector(".sticky");
  stickyEl.innerHTML = value;

  console.log(value);
  console.log(stickyEl);
});