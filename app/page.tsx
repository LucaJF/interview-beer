import Header from '@/app/ui/header';
import Showcase from '@/app/ui/show-case';
import BeerList from '@/app/ui/beer-list/list';

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen w-[640px] flex-col items-center justify-center gap-10">
      <Header />
      <Showcase />
      <BeerList />
    </main>
  );
}
