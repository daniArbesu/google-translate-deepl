'use client';
import styles from './page.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useTranslation } from './hooks/useTranslator';
import { Col, Container, Row, Button, Stack } from 'react-bootstrap';
import { AUTO_LANGUAGE, LANGUAGE_FOR_VOICE } from './utils/constants';
import { ClipboardIcon, SpeakerIcon, SwapIcon } from './components/Icons';
import LanguageSelector from './components/LanguageSelector';
import { TranslationDirection } from './types.d';
import Textarea from './components/Textarea';
import { translate } from './services/translate';
import { useEffect } from 'react';
import { useDebounce } from './hooks/useDebounce';

export default function Home() {
  const {
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
  } = useTranslation();

  const debouncedValue = useDebounce(originalText);

  useEffect(() => {
    if (debouncedValue === '') return;

    translate({ translatedLanguage, text: debouncedValue, originalLanguage })
      .then((response) => {
        if (response === null) return;
        setTranslatedText(response);
      })
      .catch(() => {
        setTranslatedText('Error!');
      });
  }, [debouncedValue, originalLanguage, translatedLanguage]);

  const handleClipboard = () => {
    navigator.clipboard.writeText(translatedText);
  };

  const handleSpeak = () => {
    const utterance = new SpeechSynthesisUtterance(translatedText);
    // @ts-ignore
    utterance.lang = LANGUAGE_FOR_VOICE[translatedLanguage];
    speechSynthesis.speak(utterance);
  };

  return (
    <main className={styles.main}>
      <Container fluid>
        <Stack gap={3}>
          <h2>Google Translate Deepl</h2>
          <Row>
            <Col xs="auto">
              <Stack gap={2}>
                <LanguageSelector
                  type={TranslationDirection.From}
                  value={originalLanguage}
                  onChange={setOriginalLanguage}
                />
                <Textarea
                  type={TranslationDirection.From}
                  value={originalText}
                  onChange={setOriginalText}
                />
              </Stack>
            </Col>
            <Col xs="auto">
              <Button
                variant="link"
                disabled={originalLanguage === AUTO_LANGUAGE}
                onClick={swapLanguages}
              >
                <SwapIcon />
              </Button>
            </Col>
            <Col>
              <Stack gap={2}>
                <LanguageSelector
                  type={TranslationDirection.To}
                  value={translatedLanguage}
                  onChange={setTranslatedLanguage}
                />
                <div className={styles.translatedTextDiv}>
                  <Textarea
                    type={TranslationDirection.To}
                    value={translatedText}
                    onChange={setTranslatedText}
                    isTranslating={isTranslating}
                  />
                  <div className={styles.buttonsDiv}>
                    <Button variant="link" className="" onClick={handleClipboard}>
                      <ClipboardIcon />
                    </Button>
                    <Button variant="link" className="" onClick={handleSpeak}>
                      <SpeakerIcon />
                    </Button>
                  </div>
                </div>
              </Stack>
            </Col>
          </Row>
        </Stack>
      </Container>
    </main>
  );
}
