import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import Showcase from '@/app/ui/show-case';
import React from 'react';
import { wrapper } from '@/__mocks__/utils';
import { server } from '@/__mocks__/server';
import { HttpResponse, http } from 'msw';

describe('Showcase testing', () => {
  it('test query:loading', () => {
    render(<Showcase />, { wrapper });

    const divs = screen.getAllByText('Loading...');
    expect(divs).toHaveLength(2);
  });

  it('test query:success', async () => {
    render(<Showcase />, { wrapper });

    const details = await screen.findAllByText('View details');
    expect(details).toHaveLength(2);
  });

  it('test query:error', async () => {
    server.use(
      http.get(
        'https://api.punkapi.com/v2/beers/random',
        ({ request, params, cookies }) => {
          return new HttpResponse('occurs an error', {
            status: 500,
            headers: {
              'Content-Type': 'text/plain',
            },
          });
        },
      ),
    );

    render(<Showcase />, { wrapper });

    const errors = await screen.findAllByText('Network response was not ok', {
      exact: false,
    });
    expect(errors).toHaveLength(2);
  });
});
