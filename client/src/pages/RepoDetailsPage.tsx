import { useParams } from "react-router-dom";
import { Repo } from "../types/RepoTypes";
import {
  useRepoQuery,
  useCreateNewCommentMutation,
  RepoDocument,
} from "../generated/graphql-types";

import RepoDetailCard from "../components/RepoDetailCard";
import RepoComments from "../components/RepoComments";
import RepoCommentsForm from "../components/RepoCommentsForm";

function RepoDetailsPage() {
  const { repoId } = useParams<{ repoId: string }>();

  const {
    loading: repoLoading,
    error: repoError,
    data: repoData,
  } = useRepoQuery({
    variables: { repoId: repoId ?? "" },
    errorPolicy: "all",
  });

  const [createComment] = useCreateNewCommentMutation();

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get("name") as string;
    const comment = formData.get("comment") as string;
    await createComment({
      variables: {
        data: {
          author: name,
          repoId: repoId ?? "",
          text: comment,
        },
      },
      refetchQueries: [{ query: RepoDocument, variables: { repoId: repoId } }],
    });
  }

  if (repoLoading) return <p>Loading repo...</p>;
  if (repoError)
    return (
      <p>
        Error loading repo: <pre>{JSON.stringify(repoError, null, 2)}</pre>
      </p>
    );
  if (!repoData) return <p>No data</p>;

  // Casting as we've just covered the no repoData case
  const { repo } = repoData as { repo: Repo };

  return (
    <main className="flex flex-grow flex-col items-center justify-start gap-6">
      <h2>A Repo, in all its glory</h2>
      <RepoDetailCard repo={repo} />
      <RepoComments comments={repo?.comments || []} />
      <RepoCommentsForm onSubmit={handleSubmit} />
    </main>
  );
}

export default RepoDetailsPage;
