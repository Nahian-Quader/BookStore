import { useParams, useHistory } from 'react-router-dom';

function BookReaderPage() {
  const { id } = useParams();
  const history = useHistory();

  return (
    <div className="container mx-auto p-4 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6">
        {/* Back Button */}
        <button
          onClick={() => history.goBack()}
          className="mb-6 text-pink-500 hover:text-pink-600 flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to Collection
        </button>

        {/* Content Card */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Ready to Dive In?</h1>
          <p className="text-lg text-gray-600 mb-8">
            You're about to read this book on Project Gutenberg. Enjoy your reading experience!
          </p>

          {/* Book Preview Card */}
          <div className="bg-gray-50 p-8 rounded-lg border border-gray-200 mb-8">
            <h2 className="text-2xl font-semibold mb-4">Reading Options</h2>
            <a
              href={`https://www.gutenberg.org/cache/epub/${id}/pg${id}-images.html`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-pink-500 hover:bg-pink-600 text-white font-medium py-3 px-8 rounded-lg transition-all duration-200 inline-block mb-4"
            >
              Read HTML Version
            </a>
            <p className="text-sm text-gray-500 mt-4">
              Opens in new window • Full illustrations • Mobile-friendly
            </p>
          </div>

          {/* Additional Info */}
          <div className="text-left bg-blue-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-3">Need Help?</h3>
            <p className="text-gray-600 mb-2">
              🔖 Use your browser's bookmark feature to save your progress
            </p>
            <p className="text-gray-600">
              📚 Explore other formats (PDF/ePub) directly on Project Gutenberg
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookReaderPage;