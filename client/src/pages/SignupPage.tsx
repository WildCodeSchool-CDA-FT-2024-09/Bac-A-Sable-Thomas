import { useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../generated/graphql-types";

function SignupPage() {
  const [register, { loading, error }] = useRegisterMutation();
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = (e.currentTarget[0] as HTMLInputElement).value;
    const username = (e.currentTarget[1] as HTMLInputElement).value;
    const password = (e.currentTarget[2] as HTMLInputElement).value;

    const response = await register({
      variables: { email, username, password },
      context: {
        credentials: "include", // Ensure cookies are included in the request
      },
    });

    if (response.data?.register) {
      navigate("/");
    }
  };
  return (
    <main className="flex h-2/3 flex-col items-center justify-start">
      <h1 className="mb-4">Join Lovely Repos</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input className="rounded px-2 py-1" type="text" placeholder="Email" />
        <input
          className="rounded px-2 py-1"
          type="text"
          placeholder="Username"
        />
        <input
          className="rounded px-2 py-1"
          type="password"
          placeholder="Password"
        />
        <button
          className="rounded border border-slate-700 bg-slate-300 transition-all hover:scale-110"
          type="submit"
        >
          {loading ? "Signing up..." : "Signup"}
        </button>
      </form>
      {error && <p className="text-red-500">{error.message}</p>}
    </main>
  );
}

export default SignupPage;
