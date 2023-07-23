import * as deepl from 'deepl-node';

interface Props {
  translatedLanguage: deepl.TargetLanguageCode;
  text: string;
}

export const translate = async ({ translatedLanguage, text }: Props) => {
  const result = await fetch(`/api/translate?target_lang=${translatedLanguage}&text=${text}`).then(
    (res) => res.json()
  );
  console.log(result);

  return result;
};
