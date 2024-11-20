import { useNavigate } from "react-router-dom";
import { useLoginLazyQuery } from "../generated/graphql-types";
import { useAuth } from "../contexts/useAuth";

function LoginPage() {
  const [login, { loading, error }] = useLoginLazyQuery();
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = (e.currentTarget[0] as HTMLInputElement).value;
    const password = (e.currentTarget[1] as HTMLInputElement).value;

    const response = await login({
      variables: { email, password },
      context: {
        credentials: "include", // Ensure cookies are included in the request
      },
    });

    if (response.data?.login) {
      setUser(response.data.login);
      navigate("/");
    }
  };
  return (
    <main className="flex h-2/3 flex-col items-center justify-start">
      <h1 className="mb-4">Login to Lovely Repos</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input className="rounded px-2 py-1" type="text" placeholder="Email" />
        <input
          className="rounded px-2 py-1"
          type="password"
          placeholder="Password"
        />
        <button
          className="rounded border border-slate-700 bg-slate-300 transition-all hover:scale-110"
          type="submit"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
      {error && <p className="text-red-500">{error.message}</p>}
    </main>
  );
}

export default LoginPage;
