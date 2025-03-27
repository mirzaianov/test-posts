import Posts from './components/posts';

export default function App() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start py-10">
      <div className="flex w-10/12 max-w-3xl flex-col items-center gap-10">
        <h1 className="ultra-regular text-6xl font-bold">Posts</h1>
        <Posts />
      </div>
    </main>
  );
}
