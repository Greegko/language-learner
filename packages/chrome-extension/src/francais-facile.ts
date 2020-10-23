const JUMP_S = 2;


function keyboardEvent(event: KeyboardEvent) {
  const audio = document.getElementsByTagName('audio')[0] as HTMLMediaElement;

  switch (event.code) {
    case "ArrowLeft":
      audio.currentTime -= JUMP_S;
      break;

    case "ArrowRight":
      audio.currentTime += JUMP_S;
      break;
    case "Space":
      audio.paused ? audio.play() : audio.pause();
      break;
    default:
      return;
  }

  event.preventDefault();
}

document.body.addEventListener('keydown', keyboardEvent);