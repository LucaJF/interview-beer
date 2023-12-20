'use client';

import { UndefinedInitialDataOptions, useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Beer } from '@/app/lib/definitions';

export default function Table({
  queryOptions,
}: {
  queryOptions: UndefinedInitialDataOptions;
}) {
  const { isPending, isError, data: beers, error } = useQuery(queryOptions);

  return (
    <div className="flex min-h-[400px] w-full">
      {isPending ? (
        <div className="my-auto flex h-full w-full items-center justify-center">
          Loading...
        </div>
      ) : isError ? (
        <div className="my-auto flex h-full w-full items-center justify-center">
          Error: {error.message}
        </div>
      ) : (
        <ul className="w-full">
          {(beers as Beer[])?.map((beer, idx) => (
            <motion.li
              key={beer?.id}
              initial={{ x: 60 }}
              animate={{ x: 0 }}
              transition={{
                duration: 0.8,
                delay: idx * 0.07,
                ease: 'anticipate',
              }}
            >
              <Link
                href={`/${beer?.id}`}
                className="text-md flex w-full rounded py-2 hover:bg-gray-500 hover:text-white hover:opacity-45"
              >
                <span className="ml-2 flex-1">{beer?.name}</span>
                <span className="mr-1 text-sm">{beer?.first_brewed}</span>
              </Link>
            </motion.li>
          ))}
        </ul>
      )}
    </div>
  );
}
