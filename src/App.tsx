import { useState } from 'react';
import './App.css';
import { ScriptTabs } from './components/ScriptTabs';
import { LetterGrid } from './components/LetterGrid';
import { LetterDetail } from './components/LetterDetail';
import { Flashcards } from './components/Flashcards';
import { Quiz } from './components/Quiz';
import { WritePractice } from './components/WritePractice';
import { Reading } from './components/Reading';
import { getScript, ScriptId } from './data/scripts';
import { consonants, vowels, numbers, Letter } from './data/letters';

type Mode = 'browse' | 'flashcards' | 'quiz' | 'write' | 'read';
type GroupFilter = 'consonant' | 'vowel' | 'number';

const groupLetters: Record<GroupFilter, Letter[]> = {
  consonant: consonants,
  vowel: vowels,
  number: numbers,
};

function App() {
  const [scriptId, setScriptId] = useState<ScriptId>('uchen');
  const [mode, setMode] = useState<Mode>('browse');
  const [group, setGroup] = useState<GroupFilter>('consonant');
  const [selected, setSelected] = useState<Letter | null>(null);

  const script = getScript(scriptId);
  const letters = groupLetters[group];

  const handleScriptChange = (id: ScriptId) => {
    setScriptId(id);
    setSelected(null);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Learn Tibetan Scripts</h1>
        <p className="subtitle">Uchen · Ume · Gyug Yik (Drutsa)</p>
      </header>

      <ScriptTabs active={scriptId} onChange={handleScriptChange} />

      <p className="script-description">{script.description}</p>
      {script.fontCredit && (
        <p className="script-credit">Rendered with the {script.fontCredit} font.</p>
      )}

      <nav className="mode-nav">
        <button className={mode === 'browse' ? 'active' : ''} onClick={() => setMode('browse')}>
          Browse
        </button>
        <button
          className={mode === 'flashcards' ? 'active' : ''}
          onClick={() => setMode('flashcards')}
        >
          Flashcards
        </button>
        <button className={mode === 'quiz' ? 'active' : ''} onClick={() => setMode('quiz')}>
          Quiz
        </button>
        <button className={mode === 'write' ? 'active' : ''} onClick={() => setMode('write')}>
          Write
        </button>
        <button className={mode === 'read' ? 'active' : ''} onClick={() => setMode('read')}>
          Read
        </button>
      </nav>

      {mode === 'browse' && (
        <>
          <div className="group-filter">
            <button className={group === 'consonant' ? 'active' : ''} onClick={() => setGroup('consonant')}>
              Consonants (30)
            </button>
            <button className={group === 'vowel' ? 'active' : ''} onClick={() => setGroup('vowel')}>
              Vowels
            </button>
            <button className={group === 'number' ? 'active' : ''} onClick={() => setGroup('number')}>
              Numbers
            </button>
          </div>
          <LetterDetail letter={selected} fontFamily={script.fontFamily} />
          <LetterGrid
            letters={letters}
            fontFamily={script.fontFamily}
            onSelect={setSelected}
            selectedId={selected?.id}
          />
        </>
      )}

      {mode === 'flashcards' && (
        <Flashcards key={scriptId} letters={consonants} fontFamily={script.fontFamily} />
      )}

      {mode === 'quiz' && (
        <Quiz key={scriptId} letters={consonants} fontFamily={script.fontFamily} />
      )}

      {mode === 'write' && (
        <WritePractice key={scriptId} letters={consonants} fontFamily={script.fontFamily} />
      )}

      {mode === 'read' && <Reading key={scriptId} fontFamily={script.fontFamily} />}

      <footer className="app-footer">
        Tibetan fonts (Qomolangma family, Yalasoo) via the{' '}
        <a href="https://github.com/OpenPecha/tibetan-fonts" target="_blank" rel="noreferrer">
          OpenPecha tibetan-fonts
        </a>{' '}
        collection.
      </footer>
    </div>
  );
}

export default App;
