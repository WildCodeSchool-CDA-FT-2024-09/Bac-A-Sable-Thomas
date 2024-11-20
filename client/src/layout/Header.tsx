import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useAuth } from "../contexts/useAuth";

function Header() {
  const location = useLocation();
  const { user } = useAuth();
  return (
    <header className="mb-6">
      <Link to="/">
        <h1 className="mb-4 text-center text-3xl font-bold">
          👩‍💻 My Lovely Repos App 👨‍💻
        </h1>
      </Link>
      {location.pathname !== "/signup" &&
        (user ? (
          <h2 className="text-center text-xl font-bold">{`Hi ${user.username}!`}</h2>
        ) : (
          <nav className="flex flex-row justify-center gap-4">
            <Link to="/signup">
              <h2 className="text-center text-xl font-bold underline transition-all hover:scale-110">
                Signup!
              </h2>
            </Link>
            <Link to="/login">
              <h2 className="text-center text-xl font-bold underline transition-all hover:scale-110">
                Login!
              </h2>
            </Link>
          </nav>
        ))}
    </header>
  );
}

export default Header;
