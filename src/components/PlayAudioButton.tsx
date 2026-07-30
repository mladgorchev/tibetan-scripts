import { useRef } from 'react';

interface Props {
  src: string;
  label: string;
  className?: string;
}

export function PlayAudioButton({ src, label, className }: Props) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const play = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!audioRef.current) audioRef.current = new Audio(src);
    audioRef.current.currentTime = 0;
    audioRef.current.play().catch(() => {
      // Ignore playback errors (e.g. no user gesture yet, or file missing).
    });
  };

  return (
    <button type="button" className={`play-audio-btn ${className ?? ''}`} onClick={play} aria-label={label}>
      🔊
    </button>
  );
}
