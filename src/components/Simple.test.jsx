// src/components/Simple.test.jsx
import { render, screen } from '@testing-library/react';

test('renders simple text', () => {
  render(<div>Hello World</div>);
  expect(screen.getByText('Hello World')).toBeInTheDocument();
});