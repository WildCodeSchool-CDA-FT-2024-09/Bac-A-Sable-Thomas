import ReposList from "./components/ReposList";

function App() {
  return (
    <>
      <div className="container mx-auto flex min-h-[95vh] flex-col items-center justify-between bg-white bg-gradient-to-tl from-orange-300 to-indigo-400 p-4 px-6 shadow-lg shadow-slate-700">
        <header className="mb-6">
          <h1 className="mb-4 text-center text-3xl font-bold">
            My Lovely Repos
          </h1>
          <p className="text-center text-gray-600">// TODO - Nav</p>
        </header>
        <main>
          <ReposList />
        </main>
        <footer>
          <p className="mt-4 text-center text-gray-600">
            &copy; {new Date().getFullYear()} My Lovely Repos
          </p>
        </footer>
      </div>
    </>
  );
}

export default App;
