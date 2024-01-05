import { container, bar, progressBar, currentSong } from "./player.js";

let mousemoveActive = false;
let width;

function barInteractions(event) {
  event.preventDefault();
  if (![bar, progressBar].some((elem) => event.target.isEqualNode(elem)))
    return;

  onMouseMove(event);

  container.addEventListener("pointermove", onMouseMove);
  container.addEventListener("touchmove", onMouseMove);
  container.addEventListener("pointerup", onMouseUp);
  container.addEventListener("touchend", onMouseUp);

  function onMouseMove(event) {
    mousemoveActive = true;
    width =
      (event.touches ? event.touches[0].clientX : event.clientX) -
      bar.getBoundingClientRect().left;

    if (width < 0) width = 0;

    let widthLimit = bar.offsetWidth;

    if (width > widthLimit) width = widthLimit;
    progressBar.style.width = width + 1 + "px";
  }

  function onMouseUp() {
    mousemoveActive = false;
    let newCurrentTime = width * (currentSong.duration / bar.offsetWidth);
    currentSong.currentTime = newCurrentTime;

    container.removeEventListener("pointerup", onMouseUp);
    container.removeEventListener("touchend", onMouseUp);
    container.removeEventListener("pointermove", onMouseMove);
    container.removeEventListener("touchmove", onMouseMove);
  }
}

export {mousemoveActive, width, barInteractions};