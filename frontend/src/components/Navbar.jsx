import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-gray-800 text-white p-4 fixed w-full top-0 z-10">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">BookStore</Link>
        <ul className="flex space-x-4">
          <li>
            <Link to="/courses" className="hover:text-pink-500">Courses</Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-pink-500">About</Link>
          </li>
          <li>
            <Link to="/subscription" className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600">Subscribe</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
