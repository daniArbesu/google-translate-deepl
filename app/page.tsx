'use client';
import styles from './page.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useTranslation } from './hooks/useTranslator';
import { Col, Container, Row, Button, Stack } from 'react-bootstrap';
import { AUTO_LANGUAGE } from './utils/constants';
import { SwapIcon } from './components/Icons';
import LanguageSelector from './components/LanguageSelector';
import { TranslationDirection } from './types.d';
import Textarea from './components/Textarea';
import { translate } from './services/translate';
import { useEffect } from 'react';

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

  useEffect(() => {
    if (originalText === '') return;

    translate({ translatedLanguage, text: originalText })
      .then((response) => {
        if (response === null) return;
        setTranslatedText(response);
      })
      .catch(() => {
        setTranslatedText('Error!');
      });
  }, [originalText, translatedLanguage]);

  return (
    <main className={styles.main}>
      <Container fluid>
        <h2>Google Translate GPT</h2>
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
              <Textarea
                type={TranslationDirection.To}
                value={translatedText}
                onChange={setTranslatedText}
                isTranslating={isTranslating}
              />
            </Stack>
          </Col>
        </Row>
      </Container>
    </main>
  );
}
