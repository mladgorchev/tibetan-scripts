import { languages } from '../i18n/languages';
import { useLanguage } from '../i18n/LanguageContext';

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <select
      className="language-switcher"
      value={language}
      onChange={(e) => setLanguage(e.target.value as typeof language)}
      aria-label="Language"
    >
      {languages.map((lang) => (
        <option key={lang.code} value={lang.code}>
          {lang.nativeLabel}
        </option>
      ))}
    </select>
  );
}
