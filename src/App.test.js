import { render, screen } from '@testing-library/react';
import App from './App';

test('renders header', () => {
  render(<App />);
  const linkElement = screen.getAllByText(/University of Michigan/i);
  expect(linkElement[0]).toBeInTheDocument();
});
