import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import Header from '@/app/ui/header';

describe('Header testing', () => {
  it('render successfully', () => {
    render(<Header />);

    const h1 = screen.getByRole('heading', { level: 1 });
    const hh = screen.getByText('Beer 🍺');
    expect(h1).toEqual(hh);
  });
});
