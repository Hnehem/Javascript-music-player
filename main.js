import { player, index } from "./src/player.js";

export let list = [
  {
    title: "Lost in the City Lights",
    author: "Cosmo Sheldrake",
    cover: "images/songs-cover/cover-1.png",
    audio: "audio/lost-in-city-lights-145038.mp3",
  },
  {
    title: "Forest Lullaby",
    author: "Lesfm",
    cover: "images/songs-cover/cover-2.png",
    audio: "audio/lost-in-city-lights-145038.mp3",
  },
];


document.addEventListener("DOMContentLoaded", () => {
  player(list[index], false);
});
