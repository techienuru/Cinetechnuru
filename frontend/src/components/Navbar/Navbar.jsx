import { useState } from "react";
import {
  FaBookmark,
  FaHeart,
  FaRegClock,
  FaRegHeart,
  FaSearch,
  FaUser,
  FaUserCircle,
} from "react-icons/fa";
import { Link } from "react-router-dom";
const Navbar = () => {
  const [openSearch, setOpenSearch] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <>
      <div className="flex justify-between items-center py-3">
        <div className="navbar-brand">
          <Link to="/">
            <h2 className="text-primary text-xl sm:text-3xl font-bold">
              Cine<span className="text-secondary">Tech</span>Nuru
            </h2>
          </Link>
        </div>
        <ul className="navbar-nav flex justify-between items-center gap-2 text-xs sm:text-2xl sm:gap-3">
          <li>
            <button
              type="button"
              className="border border-secondary rounded-full p-2 cursor-pointer"
              title="Search"
            >
              <FaSearch
                onClick={() => {
                  setOpenSearch(true);
                }}
              />
            </button>
          </li>

          <li
            className="border border-secondary rounded-full p-2"
            title="Watch Later"
          >
            <Link to="/watch-later">
              <FaRegClock />
            </Link>
          </li>
          <li
            className="border border-secondary rounded-full p-2"
            title="Favorites"
          >
            <Link to="/favorites">
              <FaHeart className="text-red-500" />
            </Link>
          </li>
          <li className="flex place-items-center relative">
            <button
              type="button"
              className="text-4xl hover:text-gray-300"
              title="User Account"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <FaUserCircle />
            </button>
            {showDropdown && (
              <div className="absolute top-full right-0 mt-2 w-50 bg-white text-black border border-gray-200 rounded-md shadow-lg p-2 z-1">
                <ul className="flex flex-col text-sm">
                  <li className="block px-4 py-2 hover:bg-gray-100">
                    <Link to="/register">Sign Up</Link>
                  </li>
                  <li className="block px-4 py-2 hover:bg-gray-100">
                    <Link to="/auth/login">Login</Link>
                  </li>
                  <li className="block px-4 py-2 hover:bg-gray-100">
                    <Link to="/manage-profile">Manage Profile</Link>
                  </li>
                </ul>
              </div>
            )}
          </li>
        </ul>
        <div className="hamburger hidden md:hidden"></div>
        <div className="hamburger-menu hidden"></div>
      </div>
      {/* Search Modal Popup */}
      {openSearch && (
        <div className="fixed top-0 left-0 w-full h-full bodyGradient flex place-items-center z-2">
          <div className="absolute top-0 right-0">
            <button
              type="button"
              className=" bg-primary px-3 py-1 rounded-md"
              onClick={() => {
                setOpenSearch(false);
              }}
            >
              Close
            </button>
          </div>
          <form
            className="p-3 w-full"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <div className="flex w-full">
              <input
                type="text"
                autoFocus
                placeholder="Search For Movies by name, title, genre, or year"
                className="w-[70%] border border-secondary px-1 focus:outline-none focus:shadow-md focus:shadow-primary"
              />
              <button
                type="submit"
                className="w-[20%] bg-tertiary px-3 py-1 rounded-md cursor-pointer"
              >
                Search
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default Navbar;
