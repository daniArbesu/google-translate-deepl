import * as deepl from 'deepl-node';

interface Props {
  translatedLanguage: deepl.TargetLanguageCode;
  text: string;
}

const apiKey = process.env.DEEPL_API_KEY;
const translator = new deepl.Translator(apiKey);

export const translate = async ({ translatedLanguage, text }: Props) => {
  const result = await translator.translateText(text, null, translatedLanguage);
  console.log(result);

  return result.text;
};
