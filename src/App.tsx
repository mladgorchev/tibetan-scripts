import { useEffect, useState } from 'react';
import { NavLink, Route, Routes, useLocation } from 'react-router-dom';
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

type GroupFilter = 'consonant' | 'vowel' | 'number';

const groupLetters: Record<GroupFilter, Letter[]> = {
  consonant: consonants,
  vowel: vowels,
  number: numbers,
};

const pageTitles: Record<string, string> = {
  '/': 'Browse',
  '/flashcards': 'Flashcards',
  '/quiz': 'Quiz',
  '/write': 'Write',
  '/read': 'Read — The Heart Sutra',
};

function BrowsePage({
  script,
  group,
  setGroup,
  selected,
  setSelected,
}: {
  script: ReturnType<typeof getScript>;
  group: GroupFilter;
  setGroup: (g: GroupFilter) => void;
  selected: Letter | null;
  setSelected: (l: Letter | null) => void;
}) {
  const letters = groupLetters[group];
  return (
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
      <LetterDetail
        letter={selected}
        fontFamily={script.fontFamily}
        glyphOffsetEm={script.glyphOffsetEm}
      />
      <LetterGrid
        letters={letters}
        fontFamily={script.fontFamily}
        glyphOffsetEm={script.glyphOffsetEm}
        onSelect={setSelected}
        selectedId={selected?.id}
      />
    </>
  );
}

function App() {
  const [scriptId, setScriptId] = useState<ScriptId>('uchen');
  const [group, setGroup] = useState<GroupFilter>('consonant');
  const [selected, setSelected] = useState<Letter | null>(null);
  const location = useLocation();

  const script = getScript(scriptId);

  const handleScriptChange = (id: ScriptId) => {
    setScriptId(id);
    setSelected(null);
  };

  useEffect(() => {
    const pageTitle = pageTitles[location.pathname] ?? 'Browse';
    document.title = `${pageTitle} — Learn Tibetan Scripts`;
  }, [location.pathname]);

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
        <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>
          Browse
        </NavLink>
        <NavLink to="/flashcards" className={({ isActive }) => (isActive ? 'active' : '')}>
          Flashcards
        </NavLink>
        <NavLink to="/quiz" className={({ isActive }) => (isActive ? 'active' : '')}>
          Quiz
        </NavLink>
        <NavLink to="/write" className={({ isActive }) => (isActive ? 'active' : '')}>
          Write
        </NavLink>
        <NavLink to="/read" className={({ isActive }) => (isActive ? 'active' : '')}>
          Read
        </NavLink>
      </nav>

      <Routes>
        <Route
          path="/"
          element={
            <BrowsePage
              script={script}
              group={group}
              setGroup={setGroup}
              selected={selected}
              setSelected={setSelected}
            />
          }
        />
        <Route
          path="/flashcards"
          element={
            <Flashcards
              key={scriptId}
              letters={consonants}
              fontFamily={script.fontFamily}
              glyphOffsetEm={script.glyphOffsetEm}
            />
          }
        />
        <Route
          path="/quiz"
          element={
            <Quiz
              key={scriptId}
              letters={consonants}
              fontFamily={script.fontFamily}
              glyphOffsetEm={script.glyphOffsetEm}
            />
          }
        />
        <Route
          path="/write"
          element={
            <WritePractice
              key={scriptId}
              letters={consonants}
              fontFamily={script.fontFamily}
              glyphOffsetEm={script.glyphOffsetEm}
            />
          }
        />
        <Route path="/read" element={<Reading key={scriptId} fontFamily={script.fontFamily} />} />
      </Routes>

      <footer className="app-footer">
        Uchen: Noto Serif Tibetan (Google Fonts). Ume &amp; Drutsa: Qomolangma family (Yalasoo),
        via the{' '}
        <a href="https://github.com/OpenPecha/tibetan-fonts" target="_blank" rel="noreferrer">
          OpenPecha tibetan-fonts
        </a>{' '}
        collection.
      </footer>
    </div>
  );
}

export default App;
