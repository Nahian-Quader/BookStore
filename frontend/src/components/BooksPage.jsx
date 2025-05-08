import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function BooksPage() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    // Fetch books from Project Gutenberg's API
    fetch('https://gutendex.com/books?search=fiction&limit=10') // Example: Fetch 10 fiction books
      .then((response) => response.json())
      .then((data) => {
        console.log("API Data:", data.results); // 👈 Check if this logs data

        // Map API data to your book structure
        const formattedBooks = data.results.map((book) => ({
          id: book.id,
          title: book.title,
          author: book.authors?.[0]?.name || "Unknown Author",
          cover: book.formats['image/jpeg'] || "https://via.placeholder.com/200x300", // Use placeholder if no cover
          gutenberg_id: book.gutenberg_id, // For linking to Project Gutenberg
          description: `Download formats: ${Object.keys(book.formats).join(', ')}`,
        }));
        setBooks(formattedBooks);
      })
      .catch((error) => console.error("Error fetching books:", error));
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Book Collection</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((book) => (
          <div key={book.id} className="bg-white rounded-lg shadow-md p-6">
            <img
              src={book.cover}
              alt={book.title}
              className="w-full h-64 object-cover mb-4"
            />
            <h2 className="text-xl font-bold mb-2">{book.title}</h2>
            <p className="text-gray-600 mb-4">{book.author}</p>
            <Link
              to={`/books/${book.gutenberg_id}`} // Pass Gutenberg ID for redirect
              className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600"
            >
              Read Now
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BooksPage;