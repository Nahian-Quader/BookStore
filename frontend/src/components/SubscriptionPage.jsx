import React, { useState } from "react";
import axios from "axios"; // Import axios for making API calls
import { Link } from "react-router-dom";  // Import Link for navigation

function SubscriptionPage() {
  const [email, setEmail] = useState("");
  const [plan, setPlan] = useState("basic");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [ccv, setCcv] = useState(""); // For CCV validation

  const handleSubscribe = async () => {
    if (ccv.length === 6) {
      if (email && plan) {
        const subscriptionData = {
          email,
          subscriptionPlan: plan,
        };

        try {
          const response = await axios.post("http://localhost:5000/api/subscribe", subscriptionData);
          alert("Subscription successful! " + response.data.message);
        } catch (error) {
          alert("There was an error with the subscription.");
          console.log(error);
        }
      } else {
        alert("Please select a subscription plan and enter your email.");
      }
    } else {
      alert("Please enter a valid 6-digit CCV.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Subscribe Now</h2>
        <div className="flex flex-wrap justify-center mb-8">
          {/* Subscription Plan Section */}
          <div className="w-full sm:w-1/2 md:w-1/3 p-4">
            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-300">
              <h3 className="text-2xl font-semibold text-center mb-4">Basic Plan</h3>
              <p className="text-center text-gray-500 mb-4">Perfect for casual readers.</p>
              <div className="text-center mb-4">
                <span className="text-3xl font-bold text-pink-500">$9.99</span>
                <span className="text-gray-500">/month</span>
              </div>
              <ul className="list-disc list-inside mb-6">
                <li>Access to free books</li>
                <li>Basic reading features</li>
                <li>Email support</li>
              </ul>
              <button
                onClick={() => setPlan("basic")}
                className={`w-full py-2 rounded-md ${plan === "basic" ? "bg-pink-500 text-white" : "bg-gray-200"}`}
              >
                {plan === "basic" ? "Selected" : "Choose Basic"}
              </button>
            </div>
          </div>

          <div className="w-full sm:w-1/2 md:w-1/3 p-4">
            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-300">
              <h3 className="text-2xl font-semibold text-center mb-4">Premium Plan</h3>
              <p className="text-center text-gray-500 mb-4">Best for avid readers with advanced features.</p>
              <div className="text-center mb-4">
                <span className="text-3xl font-bold text-pink-500">$19.99</span>
                <span className="text-gray-500">/month</span>
              </div>
              <ul className="list-disc list-inside mb-6">
                <li>Access to free & premium books</li>
                <li>Advanced reading features</li>
                <li>Priority email and live chat support</li>
              </ul>
              <button
                onClick={() => setPlan("premium")}
                className={`w-full py-2 rounded-md ${plan === "premium" ? "bg-pink-500 text-white" : "bg-gray-200"}`}
              >
                {plan === "premium" ? "Selected" : "Choose Premium"}
              </button>
            </div>
          </div>
        </div>

        {/* Subscription Form */}
        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
          <p className="text-center mb-4">Enter your email to get started with the subscription</p>
          <input
            type="email"
            className="w-full p-3 mb-4 border border-gray-300 rounded-md"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {/* Card details */}
          <input
            type="text"
            className="w-full p-3 mb-4 border border-gray-300 rounded-md"
            placeholder="Card Number"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
          />
          <input
            type="text"
            className="w-full p-3 mb-4 border border-gray-300 rounded-md"
            placeholder="Expiration Date (MM/YY)"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
          />
          <input
            type="text"
            className="w-full p-3 mb-4 border border-gray-300 rounded-md"
            placeholder="CCV"
            value={ccv}
            onChange={(e) => setCcv(e.target.value)}
          />

          <button
            onClick={handleSubscribe}
            className="w-full bg-pink-500 text-white py-3 rounded-md hover:bg-pink-600"
          >
            Subscribe
          </button>

          {/* Login Button */}
          <Link to="/login">
            <button
              className="w-full bg-blue-500 text-white py-3 rounded-md mt-4 hover:bg-blue-600"
            >
              Login
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SubscriptionPage;
