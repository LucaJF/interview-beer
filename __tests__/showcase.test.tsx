import '@testing-library/jest-dom';
import { render, renderHook, screen, waitFor } from '@testing-library/react';
import Showcase from '@/app/ui/show-case';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { beer1ByRandom, useShowcaseQuery } from '../__mocks__/beers';

const beerByRamdon = beer1ByRandom;
const server = setupServer(
  http.get(
    'https://api.punkapi.com/v2/beers/random',
    ({ request, params, cookies }) => {
      return HttpResponse.json([beerByRamdon]);
    },
  ),
);
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});
const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Showcase testing', () => {
  it('test render successfully', () => {
    render(<Showcase />, { wrapper });

    const divs = screen.getAllByText('Loading...');
    expect(divs.length).toStrictEqual(2);
  });

  it('test useQuery:success', async () => {
    const { result } = renderHook(() => useShowcaseQuery(), {
      wrapper,
    });
    await waitFor(() => result.current.isSuccess);
    const details = screen.getAllByText('View details');
    expect(details.length).toStrictEqual(2);
  });

  it('tset useQuery:error', async () => {
    server.use(
      http.get(
        'https://api.punkapi.com/v2/beers/random',
        ({ request, params, cookies }) => {
          return new HttpResponse('occues an error', {
            status: 500,
            headers: {
              'Content-Type': 'text/plain',
            },
          });
        },
      ),
    );

    const { result } = renderHook(() => useShowcaseQuery(), {
      wrapper,
    });
    await waitFor(() => result.current.isSuccess);
    const errors = screen.getAllByText('occues an error');
    expect(errors.length).toStrictEqual(2);
  });
});
