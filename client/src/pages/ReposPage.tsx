import ReposList from "../components/ReposList";
import { useLoaderData } from "react-router-dom";
import { Repo } from "../types/RepoTypes";

function ReposPage() {
  const repos = useLoaderData() as Repo[] | [];
  return (
    <main>
      <h1 className="mb-2 text-center">My Lovely Repos Page</h1>
      <ReposList repos={repos} />
    </main>
  );
}

export default ReposPage;
