// GoIT [JS_10] Zdarzenia

import "../css/styles.css";
import "toastify-js/src/toastify.css";

import editIconFile from "../img/edit.svg";
import trashIconFile from "../img/trash.svg";

import Toastify from "toastify-js";
import { StickyNotesState } from "./state";

const inputEl = document.querySelector("#sticky-add");
const deleteBtnEl = document.querySelector("#sticky-del");
const stickyNotesEl = document.querySelector("#sticky-notes");

const ENTER_KEY = "Enter";
const ENTER_KEY_NUM = "NumpadEnter";
const STICKY_CLASSLIST =
  "border-2 border-black-500 w-48 h-40 p-4 relative bg-gradient-to-r from-green-400 to-blue-500";
const EDIT_ICON_CLASSLIST =
  "absolute top-0 right-0 cursor-pointer opacity-50 hover:opacity-100 mt-4 mr-2";
const TRASH_ICON_CLASSLIST =
  "absolute bottom-0 right-0 cursor-pointer opacity-50 hover:opacity-100 mb-2 mr-2";

const stickyNotesState = new StickyNotesState();
stickyNotesState.loadStickyNotes();

inputEl.addEventListener("keyup", event => {
  if (event.code === ENTER_KEY || event.code === ENTER_KEY_NUM) {
    const noteText = event.currentTarget.value;
    createStickyNote({
      value: noteText,
      onEdit: onEditNote,
      onTrash: onTrashNote,
      });
    stickyNotesState.addStickyNote({
      value: noteText,
      onEdit: onEditNote,
      onTrash: onTrashNote,
    });
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
// inputEl.addEventListener("blur", pressEnter);

const createStickyNote = ({ value, onEdit, onTrash }) => {
  const stickyEl = document.createElement("div");
  stickyEl.classList.add(...STICKY_CLASSLIST.split(" "));
  stickyNotesEl.appendChild(stickyEl);
  stickyEl.innerHTML = value;

  const editIcon = new Image(24, 24);
  const trashIcon = new Image(24, 24);
  editIcon.src = editIconFile;
  trashIcon.src = trashIconFile;
  editIcon.classList.add(...EDIT_ICON_CLASSLIST.split(" "));
  trashIcon.classList.add(...TRASH_ICON_CLASSLIST.split(" "));
  stickyEl.append(editIcon, trashIcon);

  editIcon.addEventListener("click", onEdit);
  trashIcon.addEventListener("click", onTrash);
};

stickyNotesState.state.forEach(note => createStickyNote(note.text));

const onEditNote = () => {
  console.log("EDIT");
};

const onTrashNote = () => {
  console.log("TRASH");
};

deleteBtnEl.addEventListener("click", () => {
  stickyNotesEl.innerHTML = "";
  localStorage.removeItem("notes");
});
