import { list } from '../main.js';
import {
  mousemoveActive,
  width,
  barInteractions,
} from "./barIteractions.js";
import formatingTime from "./formatingTime.js";

const container = document.getElementById("container");
const coverImg = document.querySelector(".cover");
const songTitle = document.querySelector(".title");
const songAunthor = document.querySelector(".author");

//duration and current time node displayers
const durationDisplay = document.querySelector(".duration");
const currentTimeDisplay = document.querySelector(".currentTime");

const bar = document.querySelector(".bar");
const progressBar = document.querySelector(".bar-fill");

let currentSong, durationSecs, currentSecs;
let index = 0;

function player(data, booleano) {
  coverImg.src = data.cover;
  songTitle.textContent = data.title;
  songAunthor.textContent = data.author;

  currentSong = new Audio(data.audio);
  currentSong.addEventListener("canplaythrough", () => {
    durationSecs = currentSong.duration;
    container.addEventListener("pointerdown", barInteractions);

    currentTimeDisplay.textContent = "00:00";
    formatingTime(durationDisplay, currentSong.duration);
  });

  currentSong.addEventListener("timeupdate", () => {
    currentSecs = currentSong.currentTime;
    progressBar.style.width = !mousemoveActive
      ? `${(currentSecs / durationSecs) * 100}%`
      : width;

    formatingTime(currentTimeDisplay, currentSong.currentTime);
  });

  currentSong.addEventListener("ended", () => {
    toggleHide();
    nextSong();
  });

  if (booleano) currentSong.play();
}

//next, previous, pause and play button controller...
const controls = document.querySelector(".controls");
const pauseBtn = document.querySelector(".pause");
const playBtn = document.querySelector(".play");

controls.addEventListener("click", (event) => {
  let classList = event.target.classList;
  
  if (classList.contains("previous")) {
    prevSong();
  } else if (classList.contains("next")) {
    nextSong();
  } else if (classList.contains("pause")) {
    currentSong.pause();
    toggleHide();
  } else if (classList.contains("play")) {
      currentSong.play();
    toggleHide();
}
});

function toggleHide() {
    pauseBtn.classList.toggle("hide");
    playBtn.classList.toggle("hide");
}

function nextSong() {
    if (currentSong.paused) toggleHide();
  currentSong.pause();
  
  index++;
  if (list[index]) {
      player(list[index], true);
    } else {
        index = 0;
        player(list[index], true);
  }
}
function prevSong() {
    if (currentSong.paused) toggleHide();
    currentSong.pause();
    
    index--;
    if (list[index]) {
        player(list[index], true);
    } else {
        index = list.length - 1;
        player(list[index], true);
    }
}


export { container, bar, progressBar, currentSong, player, toggleHide, nextSong };