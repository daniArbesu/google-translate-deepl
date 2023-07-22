import { useReducer } from 'react';
import type { Action, Language, OriginalLanguage, State } from '../types';
import { AUTO_LANGUAGE } from '../utils/constants';

// initial state for the translator
const initialState: State = {
  originalLanguage: 'auto',
  translatedLanguage: 'en',
  originalText: '',
  translatedText: '',
  isTranslating: false,
};

// reducer to manage the different states
const reducer = (state: State, action: Action) => {
  const { type } = action;

  if (type === 'SWAP_LANGUAGES') {
    if (state.originalLanguage === AUTO_LANGUAGE) return state;

    return {
      ...state,
      originalLanguage: state.translatedLanguage,
      translatedLanguage: state.originalLanguage,
    };
  }

  if (type === 'SET_ORIGINAL_LANGUAGE') {
    return {
      ...state,
      originalLanguage: action.payload,
    };
  }

  if (type === 'SET_TRANSLATED_LANGUAGE') {
    return {
      ...state,
      translatedLanguage: action.payload,
    };
  }

  if (type === 'SET_ORIGINAL_TEXT') {
    return {
      ...state,
      translating: true,
      originalText: action.payload,
      translatedText: '',
    };
  }

  if (type === 'SET_TRANSLATED_TEXT') {
    return {
      ...state,
      translating: false,
      translatedText: action.payload,
    };
  }

  return state;
};

export const useTranslation = () => {
  const [
    {
      originalLanguage,
      translatedLanguage,
      originalText,
      translatedText,
      isTranslating,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  // Abstracting dispatch for cleaner code
  const swapLanguages = () => {
    dispatch({ type: 'SWAP_LANGUAGES' });
  };

  const setOriginalLanguage = (payload: OriginalLanguage) => {
    dispatch({ type: 'SET_ORIGINAL_LANGUAGE', payload });
  };

  const setTranslatedLanguage = (payload: Language) => {
    dispatch({ type: 'SET_TRANSLATED_LANGUAGE', payload });
  };

  const setOriginalText = (payload: string) => {
    dispatch({ type: 'SET_ORIGINAL_TEXT', payload });
  };

  const setTranslatedText = (payload: string) => {
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
    setTranslatedText,
  };
};
