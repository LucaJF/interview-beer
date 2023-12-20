import { useDebouncedCallback } from 'use-debounce';

export default function Search({ setBeername }: { setBeername: Function }) {
  const handleSearch = useDebouncedCallback((term: string) => {
    setBeername(term);
  }, 300);

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <input
        className="block w-full rounded-md border border-gray-200 py-[9px] pl-5 outline-2 placeholder:text-gray-500"
        placeholder="Search beer name..."
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
      />
    </div>
  );
}
