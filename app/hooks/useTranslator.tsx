import { useReducer } from 'react';
import type { Action, Language, OriginalLanguage, State } from '../types';
import { AUTO_LANGUAGE } from '../utils/constants';

// initial state for the translator
const initialState: State = {
  originalLanguage: 'auto',
  translatedLanguage: 'en',
  originalText: '',
  translatedText: '',
  isTranslating: false
};

// reducer to manage the different states
const reducer = (state: State, action: Action) => {
  const { type } = action;

  if (type === 'SWAP_LANGUAGES') {
    if (state.originalLanguage === AUTO_LANGUAGE) return state;

    return {
      ...state,
      originalLanguage: state.translatedLanguage,
      translatedLanguage: state.originalLanguage
    };
  }

  if (type === 'SET_ORIGINAL_LANGUAGE') {
    if (state.originalLanguage === action.payload) return state; // avoid retranslating when it's not necesary.
    const isTranslating = state.originalText !== '';

    return {
      ...state,
      originalLanguage: action.payload,
      translatedText: '',
      isTranslating
    };
  }

  if (type === 'SET_TRANSLATED_LANGUAGE') {
    if (state.translatedLanguage === action.payload) return state; // avoid retranslating when it's not necesary.
    const isTranslating = state.originalText !== '';

    return {
      ...state,
      translatedLanguage: action.payload,
      translatedText: '',
      isTranslating
    };
  }

  if (type === 'SET_ORIGINAL_TEXT') {
    return {
      ...state,
      translating: true,
      originalText: action.payload,
      translatedText: ''
    };
  }

  if (type === 'SET_TRANSLATED_TEXT') {
    return {
      ...state,
      translating: false,
      translatedText: action.payload
    };
  }

  return state;
};

export const useTranslation = () => {
  const [
    { originalLanguage, translatedLanguage, originalText, translatedText, isTranslating },
    dispatch
    // @ts-ignore
  ] = useReducer(reducer, initialState);

  // Abstracting dispatch for cleaner code
  const swapLanguages = () => {
    // @ts-ignore
    dispatch({ type: 'SWAP_LANGUAGES' });
  };

  const setOriginalLanguage = (payload: OriginalLanguage) => {
    // @ts-ignore
    dispatch({ type: 'SET_ORIGINAL_LANGUAGE', payload });
  };

  const setTranslatedLanguage = (payload: Language) => {
    // @ts-ignore
    dispatch({ type: 'SET_TRANSLATED_LANGUAGE', payload });
  };

  const setOriginalText = (payload: string) => {
    // @ts-ignore
    dispatch({ type: 'SET_ORIGINAL_TEXT', payload });
  };

  const setTranslatedText = (payload: string) => {
    // @ts-ignore
    dispatch({ type: 'SET_TRANSLATED_TEXT', payload });
  };

  return {
    originalLanguage,
    translatedLanguage,
    originalText,
    translatedText,
    isTranslating,
    swapLanguages,
    setOriginalLanguage,
    setTranslatedLanguage,
    setOriginalText,
    setTranslatedText
  };
};
