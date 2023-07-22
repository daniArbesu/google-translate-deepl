import { Form } from 'react-bootstrap';
import { TranslationDirection } from '../types.d';
// import { styled } from 'styled-components';
import React from 'react';

interface Props {
  type: TranslationDirection;
  isTranslating?: boolean;
  onChange: (value: string) => void;
  value: string;
}

interface GetPlaceholderProps {
  type: TranslationDirection;
  isTranslating?: boolean;
}
/* 
const StyledForm = styled(Form.Control)`
  resize: none;
  border: 0;
  height: 200px;
  background-color: ${({ type }) =>
    type === TranslationDirection.From ? '' : '#f5f5f5'};
`; */

const getPlaceholder = ({ type, isTranslating }: GetPlaceholderProps) => {
  if (type === TranslationDirection.From) return 'Insert your text';
  if (isTranslating === true) return 'Translating...';
  return 'Translation';
};

const Textarea: React.FC<Props> = ({ type, isTranslating, value, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  return (
    <Form.Control
      as="textarea"
      type={type}
      autoFocus={type === TranslationDirection.From}
      disabled={type === TranslationDirection.To}
      placeholder={getPlaceholder({ type, isTranslating })}
      value={value}
      onChange={handleChange}
    />
  );
};

export default Textarea;
