import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders import button', () => {
  const { getByText } = render(<App />);
  expect(getByText(/Import/i)).toBeInTheDocument();
});
