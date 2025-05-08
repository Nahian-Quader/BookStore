import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleLogin = async (e) => {
    e.preventDefault();

    console.log('Logging in with email:', email);

    try {
      // Check subscription status
      const subscriptionResponse = await axios.post(
        'http://localhost:5000/api/check-subscription', 
        { email }
      );

      // If subscription is valid, redirect to books page
      if (subscriptionResponse.status === 200) {
        history.push('/books');
      }
    } catch (error) {
      alert('Subscription not found or inactive.');
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Login</h2>

        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg border border-gray-300">
          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 mb-4 border border-gray-300 rounded-md"
              required
            />
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 mb-4 border border-gray-300 rounded-md"
              required
            />
            <button
              type="submit"
              className="w-full bg-pink-500 text-white py-3 rounded-md hover:bg-pink-600"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
