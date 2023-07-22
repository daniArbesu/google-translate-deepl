import { Form } from 'react-bootstrap';
import { AUTO_LANGUAGE, SUPPORTED_LANGUAGES } from '../utils/constants';
import {
  type OriginalLanguage,
  type Language,
  TranslationDirection,
} from '../types.d';

type Props =
  | {
      type: TranslationDirection.From;
      value: OriginalLanguage;
      onChange: (language: OriginalLanguage) => void;
    }
  | {
      type: TranslationDirection.To;
      value: Language;
      onChange: (language: Language) => void;
    };

const LanguageSelector: React.FC<Props> = ({ onChange, type, value }) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value as Language);
  };

  return (
    <Form.Select
      aria-label="Select a Language"
      onChange={handleChange}
      value={value}
    >
      {/* Add option for input language to be auto detected */}
      {type === TranslationDirection.From && (
        <option value={AUTO_LANGUAGE}>Detect Language</option>
      )}

      {Object.entries(SUPPORTED_LANGUAGES).map(([key, literal]) => (
        <option key={key} value={key}>
          {literal}
        </option>
      ))}
    </Form.Select>
  );
};

export default LanguageSelector;
