import { expect, test } from 'vitest';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Home from './page';

test('My App translates as expected', async () => {
  const user = userEvent.setup(); // initialize user
  const app = render(<Home />);

  const textAreaOriginal = app.getByPlaceholderText('Insert your text'); // select textarea to insert text
  const languageSelectorOriginal = app.getByTestId('original-language-selector');

  await user.selectOptions(languageSelectorOriginal, 'es');
  await user.type(textAreaOriginal, 'Hola Mundo');
  const result = await app.findAllByDisplayValue(/Hello World/i, {}, { timeout: 2000 });

  expect(result).toBeTruthy();
});

test('selectOptions', async () => {
  const user = userEvent.setup();
  const app = render(<Home />);

  const languageSelectorOriginal = app.getByTestId('original-language-selector');

  await user.selectOptions(languageSelectorOriginal, 'es');
  //expect(app.getByText('B').selected).toBe(false)

  //expect(app.getByRole('option', { name: 'Detect Language' }).select).toBe(false);
  // expect(app.getByRole('option', { name: 'B' }).selected).toBe(false);
  // expect(app.getByRole('option', { name: 'C' }).selected).toBe(true);
});
