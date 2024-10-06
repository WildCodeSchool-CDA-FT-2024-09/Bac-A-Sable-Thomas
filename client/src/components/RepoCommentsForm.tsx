function RepoCommentsForm() {
  return (
    <form className="flex flex-col items-start gap-4 rounded-lg border border-gray-500 bg-gray-100 bg-gradient-to-t from-slate-100 to-slate-200 px-6 py-2">
      <h2 className="self-center">Something to say?</h2>
      <label htmlFor="name">Name</label>
      <input
        type="text"
        id="name"
        name="name"
        className="pc-2 bg-gray-300 px-2 py-1"
      />
      <label htmlFor="comment">Comment</label>
      <textarea
        id="comment"
        name="comment"
        rows={4}
        className="bg-gray-300 px-2 py-1"
      />
      <button
        type="submit"
        className="self-center rounded border border-gray-500 bg-slate-300 px-3 py-1 font-semibold transition-all hover:scale-105 hover:shadow-sm hover:shadow-slate-600"
      >
        Submit
      </button>
    </form>
  );
}

export default RepoCommentsForm;
