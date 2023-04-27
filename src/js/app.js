import "../css/styles.css";
import "toastify-js/src/toastify.css";

import Toastify from "toastify-js";
import { StickyNotesState } from "./state";

const inputEl = document.querySelector("#sticky-add");
const deleteBtnEl = document.querySelector("#sticky-del");
const stickyNotesEl = document.querySelector("#sticky-notes");

const ENTER_KEY = "Enter";
const ENTER_KEY_NUM = "NumpadEnter";
const STICKY_CLASSLIST =
  "border-2 border-black-500 w-48 min-h-24 p-4 bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500";

const stickyNotesState = new StickyNotesState();
stickyNotesState.loadStickyNotes();

inputEl.addEventListener("keyup", event => {
  if (event.code === ENTER_KEY || event.code === ENTER_KEY_NUM) {
    const noteText = event.currentTarget.value;
    createStickyNote(noteText);
    stickyNotesState.addStickyNote(noteText);
    event.currentTarget.value = "";
  }
});

const pressEnter = event => {
  if (event.currentTarget.value !== "") {
    Toastify({
      text: "Naciśnij klawisz ENTER, aby dodać notatkę",
      duration: 4000,
      gravity: "top",
      position: "center",
      backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
    }).showToast();
    // alert("Naciśnij klawisz ENTER, aby dodać notatkę");
  }
};

inputEl.addEventListener("mouseout", pressEnter);
inputEl.addEventListener("blur", pressEnter);

const createStickyNote = value => {
  const stickyEl = document.createElement("div");
  stickyEl.classList.add(...STICKY_CLASSLIST.split(" "));
  stickyNotesEl.appendChild(stickyEl);
  stickyEl.innerHTML = value;
};

stickyNotesState.state.forEach(note => createStickyNote(note.text));

deleteBtnEl.addEventListener("click", () => {
  stickyNotesEl.innerHTML = "";
  localStorage.removeItem("notes");
});
