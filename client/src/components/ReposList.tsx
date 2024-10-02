import { useEffect, useState } from "react";

type Repo = {
  id: number;
  name: string;
  url: string;
  status: {
    label: string;
  };
  languages: {
    id: number;
    label: string;
  }[];
};

const defaultRepo: Repo = {
  id: 0,
  name: "",
  url: "",
  status: {
    label: "",
  },
  languages: [],
};

const ReposList = () => {
  const [repos, setRepos] = useState([defaultRepo]);

  async function fetchRepos() {
    const response = await fetch("/api/repos");
    const data = await response.json();
    setRepos(data);
  }

  useEffect(() => {
    fetchRepos();
  }, []);

  return (
    <>
      <ul className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
        {repos.map((repo) => (
          <li
            key={repo.id}
            className="mb-6 flex origin-top-left flex-col items-start rounded-lg bg-gray-100 bg-gradient-to-t from-slate-100 to-slate-300 px-6 py-3 shadow-lg shadow-slate-500 transition-all hover:scale-105 hover:shadow-lg hover:shadow-slate-600"
          >
            <h2 className="text-xl font-bold">{repo.name}</h2>
            <p className="text-gray-600">Status: {repo.status.label}</p>
            <ul className="flex gap-2">
              {repo.languages.map((lang) => (
                <li
                  key={lang.id}
                  className="font-semibold italic text-slate-600"
                >
                  {lang.label}
                </li>
              ))}
            </ul>
            <a
              href={repo.url}
              target="_blank"
              rel="noreferrer"
              className="w-full truncate text-nowrap text-base"
            >
              {repo.url}
            </a>
          </li>
        ))}
      </ul>
    </>
  );
};

export default ReposList;
