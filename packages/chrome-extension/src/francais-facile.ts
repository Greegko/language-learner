const JUMP_S = 2;

function updatePlaytime(diff: number) {
  const element = document.getElementsByTagName('audio')[0] as HTMLMediaElement;
  element.currentTime += diff;
}

function keyboardEvent(event: KeyboardEvent) {
  if (event.code === 'ArrowLeft') {
    updatePlaytime(-JUMP_S);
  }

  if (event.code === 'ArrowRight') {
    updatePlaytime(JUMP_S);
  }
}

document.body.addEventListener('keydown', keyboardEvent);