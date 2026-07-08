import { useEffect, useRef, useState } from 'react';
import { consonants, getAudioFileName } from '../data/letters';
import './RecordBooth.css';

interface Recording {
  blob: Blob;
  url: string;
}

const UCHEN_FONT = "'Noto Serif Tibetan', serif";

export function RecordBooth() {
  const [index, setIndex] = useState(0);
  const [recordings, setRecordings] = useState<Record<string, Recording>>({});
  const [isRecording, setIsRecording] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);

  const current = consonants[index];

  useEffect(() => {
    return () => {
      streamRef.current?.getTracks().forEach((t) => t.stop());
      Object.values(recordings).forEach((r) => URL.revokeObjectURL(r.url));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startRecording = async () => {
    setError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      const recorder = new MediaRecorder(stream, { mimeType: 'audio/webm;codecs=opus' });
      chunksRef.current = [];
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };
      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(blob);
        setRecordings((prev) => {
          const old = prev[current.id];
          if (old) URL.revokeObjectURL(old.url);
          return { ...prev, [current.id]: { blob, url } };
        });
        stream.getTracks().forEach((t) => t.stop());
      };
      mediaRecorderRef.current = recorder;
      recorder.start();
      setIsRecording(true);
    } catch {
      setError('Could not access the microphone. Please allow microphone access and try again.');
    }
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
  };

  const goto = (i: number) => {
    if (isRecording) stopRecording();
    setIndex((i + consonants.length) % consonants.length);
  };

  const downloadCurrent = () => {
    const rec = recordings[current.id];
    if (!rec) return;
    const a = document.createElement('a');
    a.href = rec.url;
    a.download = `${getAudioFileName(current)}.webm`;
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  const downloadAll = () => {
    consonants.forEach((letter, i) => {
      const rec = recordings[letter.id];
      if (!rec) return;
      setTimeout(() => {
        const a = document.createElement('a');
        a.href = rec.url;
        a.download = `${getAudioFileName(letter)}.webm`;
        document.body.appendChild(a);
        a.click();
        a.remove();
      }, i * 200);
    });
  };

  const recordedCount = Object.keys(recordings).length;
  const currentRecording = recordings[current.id];

  return (
    <div className="record-booth">
      <header className="record-header">
        <h1>Tibetan Letter Sound Recording Booth</h1>
        <p>
          Thank you for helping record pronunciation audio! Go letter by letter, say the sound
          out loud in the Ü-Tsang (Lhasa) accent, and download each clip. When you're done,
          zip the downloaded files and send them back.
        </p>
        <p className="record-progress-label">
          {recordedCount} / {consonants.length} recorded
        </p>
      </header>

      <div className="record-letter-list">
        {consonants.map((letter, i) => (
          <button
            key={letter.id}
            className={`record-letter-chip ${i === index ? 'active' : ''} ${
              recordings[letter.id] ? 'done' : ''
            }`}
            onClick={() => goto(i)}
          >
            {letter.wylie}
          </button>
        ))}
      </div>

      <div className="record-stage">
        <div className="record-glyph" style={{ fontFamily: UCHEN_FONT }}>
          {current.tibetan}
        </div>
        <div className="record-wylie">{current.wylie}</div>
        <div className="record-pronunciation">pronounced "{current.pronunciation}"</div>

        {error && <p className="record-error">{error}</p>}

        <div className="record-controls">
          {!isRecording ? (
            <button className="record-btn record-start" onClick={startRecording}>
              ● Record
            </button>
          ) : (
            <button className="record-btn record-stop" onClick={stopRecording}>
              ■ Stop
            </button>
          )}
        </div>

        {currentRecording && (
          <div className="record-preview">
            <audio controls src={currentRecording.url} />
            <button onClick={downloadCurrent}>Download {getAudioFileName(current)}.webm</button>
          </div>
        )}

        <div className="record-nav">
          <button onClick={() => goto(index - 1)}>Prev</button>
          <button onClick={() => goto(index + 1)}>Next</button>
        </div>
      </div>

      <div className="record-footer">
        <button onClick={downloadAll} disabled={recordedCount === 0}>
          Download all recorded ({recordedCount})
        </button>
        <p className="record-footer-note">
          Each file downloads separately with the correct name (e.g. ka.webm) — your browser may
          ask to allow multiple downloads. Zip the downloads folder (or just the new files) and
          send it over.
        </p>
      </div>
    </div>
  );
}
