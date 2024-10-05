import { useParams } from "react-router-dom";

function RepoDetailsPage() {
  const { id } = useParams<{ id: string }>();
  return (
    <main>
      <h1>Repo Details Page {id}</h1>
      {/* TODO: rest of the component */}
    </main>
  );
}

export default RepoDetailsPage;
