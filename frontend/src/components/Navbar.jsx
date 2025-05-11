import React from "react";
import { Link, useHistory } from "react-router-dom";

function Navbar() {
  const history = useHistory();

  const handleCoursesClick = (e) => {
    e.preventDefault();
    history.push("/login");
  };

  return (
    <nav className="bg-gray-800 text-white p-4 fixed w-full top-0 z-10">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">BookStore</Link>
        <ul className="flex space-x-6">
          <li>
            <Link 
              to="/courses" 
              onClick={handleCoursesClick}
              className="hover:text-pink-500 flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
              </svg>
              Log in
            </Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-pink-500">About</Link>
          </li>
          <li>
            <Link to="/subscription" className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600">
              Subscribe
            </Link>
          </li>
          <li>
            <Link 
              to="/admin/login" 
              className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
            >
              Admin Login
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;