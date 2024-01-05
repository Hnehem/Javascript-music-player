export default function formatingTime(node, time) {
  let minutes = Math.floor(time / 60);
  let seconds = Math.floor(time % 60);

  seconds = seconds < 10 ? "0" + seconds : seconds;
  node.textContent = "0" + `${minutes}:${seconds}`;
}
