import { useState } from "react";

function RepoCommentsForm({
  onSubmit,
}: {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}) {
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(event);
    setName("");
    setComment("");
  };
  return (
    <form
      className="flex flex-col items-start rounded-lg border border-gray-500 bg-gray-100 bg-gradient-to-t from-slate-100 to-slate-200 px-6 py-2"
      onSubmit={handleSubmit}
    >
      <h2 className="mb-2 self-center">Something to say?</h2>
      <label htmlFor="name" className="text-sm">
        Your Name
      </label>
      <input
        type="text"
        id="name"
        name="name"
        className="mb-4 bg-gray-300 px-2 py-1"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <label htmlFor="comment" className="text-sm">
        Your Comment
      </label>
      <textarea
        id="comment"
        name="comment"
        rows={4}
        className="mb-4 w-full bg-gray-300 px-2 py-1"
        value={comment}
        onChange={(event) => setComment(event.target.value)}
      />
      <button
        type="submit"
        className="self-center rounded border border-gray-500 bg-slate-300 px-3 py-1 font-semibold transition-all hover:scale-105 hover:shadow-sm hover:shadow-slate-600 disabled:opacity-50"
        disabled={!name || !comment}
      >
        Submit
      </button>
    </form>
  );
}

export default RepoCommentsForm;
