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
import { LanguageSwitcher } from './components/LanguageSwitcher';
import { getScript, ScriptId } from './data/scripts';
import { consonants, consonantRows, vowels, numbers, Letter } from './data/letters';
import { useLanguage } from './i18n/LanguageContext';
import { Dictionary } from './i18n/translations';

type GroupFilter = 'consonant' | 'vowel' | 'number';

const groupLetters: Record<GroupFilter, Letter[]> = {
  consonant: consonants,
  vowel: vowels,
  number: numbers,
};

function BrowsePage({
  script,
  group,
  setGroup,
  selected,
  setSelected,
  t,
}: {
  script: ReturnType<typeof getScript>;
  group: GroupFilter;
  setGroup: (g: GroupFilter) => void;
  selected: Letter | null;
  setSelected: (l: Letter | null) => void;
  t: Dictionary;
}) {
  const letters = groupLetters[group];
  return (
    <>
      <div className="group-filter">
        <button className={group === 'consonant' ? 'active' : ''} onClick={() => setGroup('consonant')}>
          {t.filterConsonants(30)}
        </button>
        <button className={group === 'vowel' ? 'active' : ''} onClick={() => setGroup('vowel')}>
          {t.filterVowels}
        </button>
        <button className={group === 'number' ? 'active' : ''} onClick={() => setGroup('number')}>
          {t.filterNumbers}
        </button>
      </div>
      {group === 'consonant' && (
        <div className="tone-legend">
          <p className="tone-legend-intro">{t.toneLegendIntro}</p>
          <div className="tone-legend-items">
            <span className="tone-legend-item">
              <span className="tone-swatch tone-swatch-high">H</span> {t.toneHigh}
            </span>
            <span className="tone-legend-item">
              <span className="tone-swatch tone-swatch-low">L</span> {t.toneLow}
            </span>
          </div>
          <p className="tone-legend-note">{t.toneLegendNoteNasals}</p>
          <p className="tone-legend-note">{t.toneLegendNoteVoiced}</p>
        </div>
      )}
      <div className="browse-layout">
        <div className="browse-grid-col">
          <LetterGrid
            letters={letters}
            fontFamily={script.fontFamily}
            glyphOffsetEm={script.glyphOffsetEm}
            onSelect={setSelected}
            selectedId={selected?.id}
            rows={group === 'consonant' ? consonantRows : undefined}
            rowLabels={t.rowLabels}
          />
        </div>
        <div className="browse-detail-col">
          <LetterDetail
            letter={selected}
            fontFamily={script.fontFamily}
            glyphOffsetEm={script.glyphOffsetEm}
            t={t}
          />
        </div>
      </div>
    </>
  );
}

function App() {
  const [scriptId, setScriptId] = useState<ScriptId>('uchen');
  const [group, setGroup] = useState<GroupFilter>('consonant');
  const [selected, setSelected] = useState<Letter | null>(null);
  const location = useLocation();
  const { t } = useLanguage();

  const script = getScript(scriptId);

  const pageTitles: Record<string, string> = {
    '/': t.navBrowse,
    '/flashcards': t.navFlashcards,
    '/quiz': t.navQuiz,
    '/write': t.navWrite,
    '/read': `${t.navRead} — ${t.readTitle}`,
  };

  const handleScriptChange = (id: ScriptId) => {
    setScriptId(id);
    setSelected(null);
  };

  useEffect(() => {
    const pageTitle = pageTitles[location.pathname] ?? t.navBrowse;
    document.title = `${pageTitle} — ${t.appTitle}`;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, t]);

  return (
    <div className="app">
      <div className="app-toolbar">
        <LanguageSwitcher />
      </div>

      <header className="app-header">
        <h1>{t.appTitle}</h1>
        <p className="subtitle">Uchen · Ume · Gyug Yik (Drutsa)</p>
      </header>

      <ScriptTabs active={scriptId} onChange={handleScriptChange} />

      <p className="script-description">{t.scriptDescriptions[scriptId]}</p>
      {script.fontCredit && <p className="script-credit">{t.renderedWithFont(script.fontCredit)}</p>}

      <nav className="mode-nav">
        <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>
          {t.navBrowse}
        </NavLink>
        <NavLink to="/flashcards" className={({ isActive }) => (isActive ? 'active' : '')}>
          {t.navFlashcards}
        </NavLink>
        <NavLink to="/quiz" className={({ isActive }) => (isActive ? 'active' : '')}>
          {t.navQuiz}
        </NavLink>
        <NavLink to="/write" className={({ isActive }) => (isActive ? 'active' : '')}>
          {t.navWrite}
        </NavLink>
        <NavLink to="/read" className={({ isActive }) => (isActive ? 'active' : '')}>
          {t.navRead}
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
              t={t}
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
              t={t}
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
              t={t}
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
              t={t}
            />
          }
        />
        <Route
          path="/read"
          element={<Reading key={scriptId} fontFamily={script.fontFamily} t={t} />}
        />
      </Routes>

      <footer className="app-footer">
        {t.footerPrefix}{' '}
        <a href="https://github.com/OpenPecha/tibetan-fonts" target="_blank" rel="noreferrer">
          OpenPecha tibetan-fonts
        </a>{' '}
        {t.footerSuffix}
      </footer>
    </div>
  );
}

export default App;
