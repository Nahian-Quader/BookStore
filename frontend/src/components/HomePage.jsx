import React, { useState, useEffect } from "react";
import Freebook from "./Freebook";



function HomePage() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch("/list.json")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched data:", data);  // Check if data is fetched correctly
        setBooks(data);  // Set the books data
      })
      .catch((error) => console.error("Error fetching the list:", error));  // Log any errors
  }, []);

  return (
    <div>
      <section className="bg-blue-100 py-20 text-center">
        <h1 className="text-4xl font-bold text-gray-800">Welcome to BookStore</h1>
        <p className="text-xl text-gray-600 mt-4">
          Explore our collection of free and premium books
        </p>
        <button className="bg-pink-500 text-white py-2 px-6 rounded-lg mt-6 hover:bg-pink-600 duration-200">
          Get Started
        </button>
      </section>

      <section className="bg-gray-50 py-20">
        <h2 className="text-2xl font-semibold text-center mb-10">
          Browse Our Collection
        </h2>
        <Freebook books={books} />
      </section>
    </div>
  );
}

export default HomePage;
