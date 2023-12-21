import { http, HttpResponse } from 'msw';
import { beer1ByRandom } from './beers';

export const handlers = [
  http.get(
    'https://api.punkapi.com/v2/beers/random',
    ({ request, params, cookies }) => {
      return HttpResponse.json([beer1ByRandom]);
    },
  ),
];
