const STICKY_CLASSLIST =
  "border-2 border-black-500 w-48 min-h-24 p-4 bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500";

export const createStickyNote = (value) => {
  const stickyEl = document.createElement("div");
  stickyEl.classList.add(...STICKY_CLASSLIST.split(" "));
  stickyEl.innerHTML = value;
  return stickyEl;
};
