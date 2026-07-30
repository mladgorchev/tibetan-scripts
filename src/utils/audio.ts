let currentAudio: HTMLAudioElement | null = null;

export function playAudioUrl(url: string | null) {
  if (!url) return;
  if (currentAudio) {
    currentAudio.pause();
  }
  currentAudio = new Audio(url);
  currentAudio.play().catch(() => {
    // Ignore playback errors (e.g. no user gesture yet, or file missing).
  });
}
