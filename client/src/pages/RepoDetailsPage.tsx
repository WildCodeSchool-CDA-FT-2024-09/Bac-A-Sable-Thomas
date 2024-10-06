import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { Repo } from "../types/RepoTypes";
import connection from "../services/connection";

import RepoDetailCard from "../components/RepoDetailCard";
import RepoComments from "../components/RepoComments";
import RepoCommentsForm from "../components/RepoCommentsForm";

function RepoDetailsPage() {
  const repo = useLoaderData() as Repo;
  const [comments, setComments] = useState(repo.comments);

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get("name") as string;
    const comment = formData.get("comment") as string;
    const response = await connection.post("/api/comments", {
      author: name,
      text: comment,
      repoId: repo.id,
    });
    if (response.status === 201) {
      setComments([...comments, response.data]);
    }
  }

  return (
    <main className="flex flex-grow flex-col items-center justify-start gap-6">
      <h2>A Repo, in all its glory</h2>
      <RepoDetailCard repo={repo} />
      <RepoComments comments={comments} />
      <RepoCommentsForm onSubmit={handleSubmit} />
    </main>
  );
}

export default RepoDetailsPage;
