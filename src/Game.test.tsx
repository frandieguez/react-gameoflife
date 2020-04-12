import React from 'react';
import { render } from '@testing-library/react';
import Game from './Game';

test('renders update form', () => {
  const { getByText } = render(<Game />);
  const linkElement = getByText(/Update every/i);
  expect(linkElement).toBeInTheDocument();
});
