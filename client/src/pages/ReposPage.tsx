import ReposList from "../components/ReposList";
import { useLoaderData } from "react-router-dom";
import { ReposPageLoaderData } from "../types/RepoTypes";
import { Link } from "react-router-dom";

function ReposPage() {
  const { repos, languages } = useLoaderData() as ReposPageLoaderData;
  return (
    <main className="flex flex-grow flex-col justify-start gap-6">
      <h1 className="mb-2 text-center">My Lovely Repos Page</h1>
      {/* <p className="mb-4 text-center">
        {search.language ? `Language: ${search.language}` : "All languages"}
      </p> */}
      <div className="flex flex-row flex-wrap justify-center gap-2">
        {languages.length
          ? languages.map((lang) => (
              <div className="rounded border border-gray-500 bg-slate-300 px-3 py-1 transition-all hover:scale-105 hover:shadow-sm hover:shadow-slate-600">
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
