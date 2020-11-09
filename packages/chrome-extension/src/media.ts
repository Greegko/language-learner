const JUMP_S = 2;

function getMedias(): NodeListOf<HTMLMediaElement> {
  return document.querySelectorAll('video, audio');
}

function keyboardEvent(event: KeyboardEvent) {
  const media = getMedias()[0];

  switch (event.code) {
    case "ArrowLeft":
      media.currentTime -= JUMP_S;
      break;

    case "ArrowRight":
      media.currentTime += JUMP_S;
      break;
    case "Space":
      media.paused ? media.play() : media.pause();
      break;
    default:
      return;
  }

  event.preventDefault();
}

document.body.addEventListener('keydown', keyboardEvent);