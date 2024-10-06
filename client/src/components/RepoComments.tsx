function RepoComments() {
  return (
    <section className="flex w-full flex-col items-center justify-center gap-4 rounded-lg border border-gray-500 bg-gray-100 bg-gradient-to-t from-slate-100 to-slate-200 px-6 py-2">
      <h2>Repo Gossip</h2>
      <ul className="flex flex-col gap-4">
        <li>
          <h3>Comment 1</h3>
          <p>Comment 1 content</p>
        </li>
        <li>
          <h3>Comment 2</h3>
          <p>Comment 2 content</p>
        </li>
        <li>
          <h3>Comment 3</h3>
          <p>
            Comment 3 content Lorem ipsum dolor sit amet consectetur,
            adipisicing elit. Sed, itaque fugit. Veniam magnam labore tempora
            veritatis sapiente facere maiores vero exercitationem dignissimos
            sunt assumenda, vel voluptatum ratione nam a. Sapiente!
          </p>
        </li>
      </ul>
    </section>
  );
}

export default RepoComments;
