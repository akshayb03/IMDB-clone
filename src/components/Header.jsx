import { Link } from "react-router-dom";
import logo from "../assets/imdb_logo.png";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full bg-[#1F2937] shadow-md z-50 px-[100px]">
      <div className="mx-auto flex justify-between items-center px-4 py-3">
        <Link to="/" className="text-xl font-bold text-gray-800">
          <img src={logo} alt="logo" className="h-8" />
        </Link>

        <nav>
          <Link
            to="/"
            className="text-gray-600 hover:text-black font-medium transition mr-8"
          >
            Home
          </Link>
          <Link
            to="/admin"
            className="text-white hover:text-gray-300 font-medium transition"
          >
            Admin
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
