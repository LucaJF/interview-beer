'use client';

import { useState } from 'react';
import Search from './search';
import TableWrapper from './table-wrapper';

export default function BeerList() {
  const [beername, setBeername] = useState('');

  return (
    <div className="flex w-full flex-col">
      <Search setBeername={setBeername} />
      <TableWrapper beername={beername} />
    </div>
  );
}
