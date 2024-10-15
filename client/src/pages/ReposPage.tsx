import ReposList from "../components/ReposList";
// import { useEffect } from "react";
import { ReposPageData } from "../types/RepoTypes";
import { Link, useLocation } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";

const GET_REPOS = gql`
  query Repos($language: String) {
    repos(language: $language) {
      id
      name
      url
      status {
        id
        label
      }
      languages {
        id
        label
      }
    }
    languages {
      id
      label
    }
  }
`;

function ReposPage() {
  // These native methods won't work - outside the lifecycle of react
  // const url = new URL(window.location.href);
  // const language = url?.searchParams.get("language");
  const { search } = useLocation();
  const language = new URLSearchParams(search).get("language");
  const variables = language ? { language } : {};

  const { loading, error, data } = useQuery<ReposPageData>(GET_REPOS, {
    variables: variables,
    errorPolicy: "all",
  });

  // Explicit refetching not needed for simple usecase
  // useLocation change triggers re-render and reload
  // useQuery still manages the cache
  // Explicit refetch might be good for e.g. pagination where we don't want to re-render all the interface
  // useEffect(() => {
  //   refetch();
  // }, [language]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;
  if (!data) return <p>No data</p>;

  const { repos, languages } = data;

  return (
    <main className="flex flex-grow flex-col items-center justify-start gap-6">
      <h1 className="mb-2 text-center">Sic transit gloria repos</h1>

      <div className="flex w-3/4 flex-row flex-wrap justify-center gap-2 xl:w-full">
        <Link
          to="/"
          className="rounded border border-gray-500 bg-slate-300 px-3 py-1 font-semibold transition-all hover:scale-105 hover:shadow-sm hover:shadow-slate-600"
        >
          All Languages
        </Link>
        {languages.length
          ? languages.map((lang) => (
              <div
                className="rounded border border-gray-500 bg-slate-300 px-3 py-1 italic transition-all hover:scale-105 hover:shadow-sm hover:shadow-slate-600"
                key={lang.id}
              >
                <Link to={`?language=${lang.label}`}>{lang.label}</Link>
              </div>
            ))
          : null}
      </div>
      <ReposList repos={repos} />
    </main>
  );
}

export default ReposPage;
