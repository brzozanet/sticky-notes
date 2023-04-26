export class StickyNotesState {
  #state = [];

  addStickyNote = value => {
    this.#state.push({
      id: this.#state.length,
      text: value,
    });
    this.#saveState();
  };

  loadStickyNotes() {
    this.#state = this.#loadState();
  }

  get state() {
    return this.#state;
  }

  #saveState() {
    localStorage.setItem("notes", JSON.stringify(this.#state));
  }

  #loadState() {
    const notes = localStorage.getItem("notes");
    if (notes) {
      return JSON.parse(notes);
    }
    return [];
  };
};
