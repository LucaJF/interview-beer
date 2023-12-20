import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';
import Table from './table';

export default function TableWrapper({ beername }: { beername: string }) {
  const queryClient = new QueryClient();
  const queryOptions = {
    queryKey: ['beers', beername],
    queryFn: async () => {
      const res = await fetch(
        `https://api.punkapi.com/v2/beers?page=1&per_page=10${
          beername ? '&beer_name=' + beername : ''
        }`,
      );

      if (!res.ok) {
        throw new Error('Network response was not ok');
      }

      return res.json();
    },
  };

  queryClient.prefetchQuery(queryOptions);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Table queryOptions={queryOptions} />
    </HydrationBoundary>
  );
}
