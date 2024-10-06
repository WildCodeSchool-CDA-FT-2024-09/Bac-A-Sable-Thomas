import ReposList from "../components/ReposList";
import { useLoaderData } from "react-router-dom";
import { ReposPageLoaderData } from "../types/RepoTypes";
import { Link } from "react-router-dom";

function ReposPage() {
  const { repos, languages } = useLoaderData() as ReposPageLoaderData;
  return (
    <main className="flex flex-grow flex-col items-center justify-start gap-6">
      <h1 className="mb-2 text-center">My Lovely Repos Page</h1>

      <div className="flex w-3/4 flex-row flex-wrap justify-center gap-2 xl:w-full">
        <Link
          to="/"
          className="rounded border border-gray-500 bg-slate-300 px-3 py-1 font-semibold transition-all hover:scale-105 hover:shadow-sm hover:shadow-slate-600"
        >
          All Languages
        </Link>
        {languages.length
          ? languages.map((lang) => (
              <div className="rounded border border-gray-500 bg-slate-300 px-3 py-1 italic transition-all hover:scale-105 hover:shadow-sm hover:shadow-slate-600">
                <Link to={`/repos/${lang.label}`} key={lang.id}>
                  {lang.label}
                </Link>
              </div>
            ))
          : null}
      </div>
      <ReposList repos={repos} />
    </main>
  );
}

export default ReposPage;
