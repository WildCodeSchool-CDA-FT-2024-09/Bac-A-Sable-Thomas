import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="mb-6">
      <Link to="/">
        <h1 className="mb-4 text-center text-3xl font-bold">
          👩‍💻 My Lovely Repos App 👨‍💻
        </h1>
      </Link>
    </header>
  );
}

export default Header;
