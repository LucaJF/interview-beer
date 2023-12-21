'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Beer } from '@/app/lib/definitions';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';

export default function Showcase() {
  const image_failed_to_load = '/image-load-failed-48.png';
  const getRandomBeer = async () => {
    const res = await fetch('https://api.punkapi.com/v2/beers/random');

    if (!res.ok) {
      throw new Error('Network response was not ok');
    }

    return res.json();
  };

  let {
    isSuccess: iss1,
    isPending: isp1,
    isError: ise1,
    data: beer1,
    error: e1,
  } = useQuery({
    queryKey: ['random-beer-1'],
    queryFn: getRandomBeer,
    refetchInterval: 10000,
  });
  let {
    isSuccess: iss2,
    isPending: isp2,
    isError: ise2,
    data: beer2,
    error: e2,
  } = useQuery({
    queryKey: ['random-beer-2'],
    queryFn: getRandomBeer,
    refetchInterval: 10000,
  });
  beer1 = iss1 ? beer1 : [{ id: Math.random().toString().substring(7, 12) }];
  beer2 = iss2 ? beer2 : [{ id: Math.random().toString().substring(7, 12) }];
  const beers: Beer[] = beer1?.concat(beer2);

  return (
    <div className="flex h-[185px] w-full gap-5">
      {beers?.map((beer, idx) => (
        <div
          className="h-full flex-1 rounded-md border-2 border-gray-300 p-5 hover:border-gray-400"
          key={`${beer?.id}-${idx}`}
        >
          {idx === 0 && isp1 ? (
            <div className="flex h-full w-full items-center justify-center">
              Loading...
            </div>
          ) : idx === 0 && ise1 ? (
            <div className="flex h-full w-full items-center justify-center">
              Error: {e1?.message}
            </div>
          ) : idx === 1 && isp2 ? (
            <div className="flex h-full w-full items-center justify-center">
              Loading...
            </div>
          ) : idx === 1 && ise2 ? (
            <div className="flex h-full w-full items-center justify-center">
              Error: {e2?.message}
            </div>
          ) : (
            <motion.div
              initial={{ x: 80 }}
              animate={{ x: 0 }}
              transition={{
                duration: 0.8,
                delay: idx * 0.07,
                ease: 'anticipate',
              }}
              className="flex h-full flex-col"
            >
              <div className="flex h-1/2 flex-1 items-start gap-7">
                <div className="flex-none">
                  <Image
                    src={beer?.image_url || image_failed_to_load}
                    alt={'×'}
                    width={25}
                    height={98}
                  />
                </div>
                <div className="flex flex-auto flex-col">
                  <p>{beer?.name}</p>
                  <p className="text-xs">{beer?.first_brewed}</p>
                </div>
              </div>
              <div className="flex h-1/2 flex-1 items-end">
                <Link href={`/${beer?.id}`}>
                  <p className="text-md font-medium text-emerald-400 hover:text-emerald-700 hover:opacity-80">
                    View details
                  </p>
                </Link>
              </div>
            </motion.div>
          )}
        </div>
      ))}
    </div>
  );
}
