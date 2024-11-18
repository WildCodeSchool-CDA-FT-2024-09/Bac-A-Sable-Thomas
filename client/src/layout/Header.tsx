import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

function Header() {
  const location = useLocation();
  return (
    <header className="mb-6">
      <Link to="/">
        <h1 className="mb-4 text-center text-3xl font-bold">
          👩‍💻 My Lovely Repos App 👨‍💻
        </h1>
      </Link>
      {location.pathname !== "/signup" && (
        <Link to="/signup">
          <h2 className="text-center text-xl font-bold transition-all hover:scale-110 hover:underline">
            Sign Up!
          </h2>
        </Link>
      )}
    </header>
  );
}

export default Header;
