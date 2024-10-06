import { useLoaderData } from "react-router-dom";
import { Repo } from "../types/RepoTypes";
import RepoDetailCard from "../components/RepoDetailCard";
import RepoComments from "../components/RepoComments";
import RepoCommentsForm from "../components/RepoCommentsForm";

function RepoDetailsPage() {
  const repo = useLoaderData() as Repo;
  const { comments } = repo;

  return (
    <main className="flex flex-grow flex-col items-center justify-start gap-6">
      <h1>My Lovely Repo Details Page</h1>
      {/* TODO: rest of the component */}
      <RepoDetailCard repo={repo} />
      <RepoComments comments={comments} />
      <RepoCommentsForm />
    </main>
  );
}

export default RepoDetailsPage;
