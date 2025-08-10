import React, { useState } from "react";
import content from "../data/Content.json";
import logo from "../images/LOGOGO.png";
import { useNavigate, useLocation } from "react-router-dom";

const Payment = () => {
  const location = useLocation();
  const { items, total } = location.state || { items: [], total: 0 };

  const { payment } = content;
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const amount = 1499 * 100; // in paisa

  const validateEmail = (value) => {
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    setEmailError(isValid ? "" : "Please enter a valid email");
    return isValid;
  };

  const loadRazorpay = () => {
    if (!validateEmail(email)) return;

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      const options = {
        key: "rzp_test_1DP5mmOlF5G5ag",
        amount: amount,
        currency: "INR",
        name: "GoLegal",
        description: "Subscription Payment",
        image: logo,
        handler: function (response) {
          // Navigate to Thank You page after successful payment
          navigate("/thankyou");
        },
        prefill: { name, email },
        theme: { color: "#1a56db" },
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    };
  };

  return (
    <div className="min-h-screen bg-gray-300 flex items-center justify-center p-6">
      <div className="bg-blue-100/30 backdrop-blur-md border border-blue-800 shadow-2xl rounded-2xl w-full max-w-3xl p-8 space-y-8 animate-fadeIn">
        {/* Brand logo and name */}
        <div className="flex flex-col items-center">
          <img src={logo} alt="GoLegal Logo" className="w-16 h-20" />
          <h1 className="mt-2 text-3xl font-extrabold text-blue-800">GO LEGAL</h1>
        </div>

        <h2 className="text-3xl font-bold text-center text-gray-900">{payment.title}</h2>
        <p className="text-center text-gray-600">{payment.description}</p>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-800">{payment.orderSummary.heading}</h3>
            <div className="bg-white/60 backdrop-blur-sm p-4 rounded-lg border border-gray-200 shadow">
              <p className="text-gray-700">
                {payment.orderSummary.itemsLabel}:{" "}
                <span className="font-medium">1 Plan</span>
              </p>
              <p className="text-gray-700">
                {payment.orderSummary.totalLabel}:{" "}
                <span className="font-bold text-lg text-blue-600">₹1499</span>
              </p>
            </div>
          </div>

          {/* User Details */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-800">{payment.userDetails.heading}</h3>
            <input
              type="text"
              placeholder={payment.userDetails.namePlaceholder}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div>
              <input
                type="email"
                placeholder={payment.userDetails.emailPlaceholder}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  validateEmail(e.target.value);
                }}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {emailError && (
                <p className="text-red-500 text-sm mt-1">{emailError}</p>
              )}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-4 gap-4">
          <button
            onClick={() => navigate("/cart")}
            className="text-blue-600 hover:underline transition"
          >
            {payment.backToCart}
          </button>
          <button
            onClick={loadRazorpay}
            disabled={!name || !email || emailError}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl text-lg font-medium transition disabled:opacity-50"
          >
            {payment.payNow}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Payment;