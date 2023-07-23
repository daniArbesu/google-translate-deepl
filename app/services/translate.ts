import { Language, OriginalLanguage } from '../types';
import { AUTO_LANGUAGE } from '../utils/constants';

interface Props {
  translatedLanguage: Language;
  text: string;
  originalLanguage: OriginalLanguage;
}

export const translate = async ({ translatedLanguage, text, originalLanguage }: Props) => {
  const result = await fetch(
    `/api/translate?target_lang=${translatedLanguage}&text=${text}&source_lang=${originalLanguage}`
  ).then((res) => res.json());
  console.log(result);

  return result;
};
