import { Repo } from "../generated/graphql-types";
import RepoCard from "./RepoCard";

const ReposList = ({ repos }: { repos: Repo[] }) => {
  return (
    <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8 xl:grid-cols-3">
      {repos.length ? (
        repos.map((repo) => <RepoCard key={repo.id} repo={repo} />)
      ) : (
        <p>Loading...</p>
      )}
    </ul>
  );
};

export default ReposList;
