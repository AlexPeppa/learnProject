import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { MyRouter } from '.';

describe('MyRouter', () => {
  test('element in the document with id', () => {
    render(<MyRouter />);
    const element = screen.getByText(/Настроил роутинг, вроде работает/i);
    expect(element).toBeInTheDocument();
    expect(element).toHaveAttribute('id', 'routerId');
  });
  test('div have className wrapper', () => {
    render(<MyRouter />);
    const divElement = screen.getByTestId('routerDiv');
    expect(divElement).toBeInTheDocument();
    expect(divElement).toHaveClass('wrapper');
  });
});
