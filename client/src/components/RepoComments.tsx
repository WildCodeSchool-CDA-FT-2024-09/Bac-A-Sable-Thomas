import { Comment } from "../types/RepoTypes";

function RepoComments({ comments }: { comments: Comment[] | [] }) {
  const displayDate = (date: string) => {
    return new Date(date).toLocaleString();
  };
  return (
    <section className="flex w-full flex-col items-center justify-center gap-4 rounded-lg border border-gray-500 bg-gray-100 bg-gradient-to-t from-slate-100 to-slate-200 px-4 py-4">
      <h2>Repo Gossip</h2>
      <ul className="align-start flex w-full flex-col items-start gap-4">
        {comments.length ? (
          comments.map((comment) => (
            <li key={comment.id} className="flex flex-col">
              <p className="italic">{comment.text}</p>
              <span className="text-xs text-gray-500">
                💬 by {comment.author} -{displayDate(comment.createdAt)}
              </span>
            </li>
          ))
        ) : (
          <p className="italic">Waiting for some words of wisdom...</p>
        )}
      </ul>
    </section>
  );
}

export default RepoComments;
