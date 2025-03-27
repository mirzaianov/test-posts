import Posts from './components/posts';

export default function App() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start py-10 md:py-16 xl:py-24">
      <div className="flex w-10/12 max-w-3xl flex-col items-center gap-10 md:gap-16 xl:gap-24">
        <h1 className="ultra-regular text-6xl font-bold md:text-7xl">Posts</h1>
        <Posts />
      </div>
    </main>
  );
}
