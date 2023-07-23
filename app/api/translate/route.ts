import { NextResponse } from 'next/server';

const apiKey = process.env.DEEPL_API_KEY as string;
const url = 'https://api-free.deepl.com/v2/translate';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const target_lang = searchParams.get('target_lang');
  const originalText = searchParams.get('text');
  const textArray = [originalText];

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Host: 'api-free.deepl.com',
      'Content-Type': 'application/json',
      'User-Agent': 'DaniApp/1.2.3',
      Authorization: `DeepL-Auth-Key ${apiKey}`
    },
    body: JSON.stringify({ text: textArray, target_lang })
  });
  const { translations } = await response.json();
  const { text: translatedText } = translations[0];
  return NextResponse.json(translatedText);
}
