import { Repo } from "../types/RepoTypes";

const RepoCard = ({ repo }: { repo: Repo }) => {
  return (
    <li
      key={repo.id}
      className="flex origin-top-left flex-col items-start rounded-lg border border-gray-500 bg-gray-100 bg-gradient-to-t from-slate-100 to-slate-200 px-6 py-3 shadow-slate-500 drop-shadow-sm transition-all hover:scale-105 hover:shadow-md hover:shadow-slate-600 lg:mb-6"
    >
      <h2 className="text-xl font-bold">{repo.name}</h2>
      <p className="text-gray-600">Status: {repo.status.label}</p>
      <ul className="flex gap-2">
        {repo.languages.length ? (
          repo.languages.map((lang) => (
            <li key={lang.id} className="font-semibold italic text-slate-600">
              {lang.label}
            </li>
          ))
        ) : (
          <li className="font-serif font-bold italic text-purple-500">
            This 👻 repo is written without languages
          </li>
        )}
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
  );
};

export default RepoCard;
