import type { AUTO_LANGUAGE, SUPPORTED_LANGUAGES } from './utils/constants';

export interface State {
  originalLanguage: OriginalLanguage;
  translatedLanguage: Language;
  originalText: string;
  translatedText: string;
  isTranslating: boolean;
}

export type Action =
  | { type: 'SWAP_LANGUAGES' }
  | { type: 'SET_ORIGINAL_LANGUAGE'; payload: string }
  | { type: 'SET_TRANSLATED_LANGUAGE'; payload: string }
  | { type: 'SET_ORIGINAL_TEXT'; payload: string }
  | { type: 'SET_TRANSLATED_TEXT'; payload: string };

export type Language = keyof typeof SUPPORTED_LANGUAGES;
export type AutoLanguage = typeof AUTO_LANGUAGE;
export type OriginalLanguage = Language | AutoLanguage;

export enum TranslationDirection {
  From = 'from',
  To = 'to',
}
