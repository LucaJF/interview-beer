'use client';

import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { Beer } from '@/app/lib/definitions';

export default function Page({ params }: { params: { id: string } }) {
  const image_failed_to_load = '/image-load-failed-48.png';
  const beerId = params.id;
  const { isSuccess, isPending, isError, data, error } = useQuery({
    queryKey: ['getBeer', beerId],
    queryFn: async () => {
      const res = await fetch(`https://api.punkapi.com/v2/beers/${beerId}`);

      if (!res.ok) {
        throw new Error('Network response was not ok');
      }

      return res.json();
    },
  });
  const beer: Beer = isSuccess && data.length ? data[0] : null;

  return (
    <div className="mx-auto flex w-[640px] flex-col gap-10">
      <Link href="/" className="mt-20">
        <p className="text-lg font-bold text-emerald-400 hover:text-emerald-700 hover:opacity-80">
          Back
        </p>
      </Link>
      {isPending ? (
        <div className="flex h-full w-full items-center justify-center">
          Loading...
        </div>
      ) : isError ? (
        <div className="flex h-full w-full items-center justify-center">
          Error: {error.message}
        </div>
      ) : (
        <div className="flex gap-5">
          <div className="flex-none">
            <Image
              src={beer?.image_url || image_failed_to_load}
              alt={`${beer?.name} Image`}
              width={50}
              height={195}
            />
          </div>
          <div className="flex flex-auto flex-col gap-3">
            <div>
              <p>{beer?.name}</p>
              <p className="text-xs">{beer?.first_brewed}</p>
            </div>
            <div>
              <p>{beer?.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
