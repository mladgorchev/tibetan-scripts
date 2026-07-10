export type LanguageCode = 'en' | 'uk';

export interface LanguageInfo {
  code: LanguageCode;
  label: string;
  nativeLabel: string;
}

export const languages: LanguageInfo[] = [
  { code: 'en', label: 'English', nativeLabel: 'English' },
  { code: 'uk', label: 'Ukrainian', nativeLabel: 'Українська' },
];

export const defaultLanguage: LanguageCode = 'en';
