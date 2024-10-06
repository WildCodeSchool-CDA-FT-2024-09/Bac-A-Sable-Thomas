import { useParams, useLoaderData } from "react-router-dom";
import { Repo } from "../types/RepoTypes";
import RepoDetailCard from "../components/RepoDetailCard";
import RepoComments from "../components/RepoComments";
import RepoCommentsForm from "../components/RepoCommentsForm";

function RepoDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const repo = useLoaderData() as Repo;

  return (
    <main className="flex flex-grow flex-col items-center justify-start gap-6">
      <h1>My Lovely Repo Details Page {id}</h1>
      {/* TODO: rest of the component */}
      <RepoDetailCard repo={repo} />
      <RepoComments />
      <RepoCommentsForm />
    </main>
  );
}

export default RepoDetailsPage;
