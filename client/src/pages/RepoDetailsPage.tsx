import { useParams, useLoaderData } from "react-router-dom";
import { Repo } from "../types/RepoTypes";
import RepoDetailCard from "../components/RepoDetailCard";

function RepoDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const repo = useLoaderData() as Repo;

  return (
    <main>
      <h1>My Lovely Repo Details Page {id}</h1>
      {/* TODO: rest of the component */}
      <RepoDetailCard repo={repo} />
    </main>
  );
}

export default RepoDetailsPage;
