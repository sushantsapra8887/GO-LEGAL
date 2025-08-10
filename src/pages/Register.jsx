import React from "react";
import lawImage from "../images/image.png";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    // Handle sign-up logic here
  };

  return (
    <div
      className="h-screen w-full bg-cover bg-center relative flex items-center justify-center"
      style={{ backgroundImage: `url(${lawImage})` }}
    >
      {/* Blurred overlay */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-xl"></div>

      {/* Signup Box */}
      <div className="relative z-10 bg-white/80 backdrop-blur-md shadow-lg rounded-xl p-10 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Create Account</h2>

        <form className="space-y-4" onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Full Name"
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <button
            type="submit"
            className="w-full bg-green-700 text-white py-2 rounded-md hover:bg-green-800 transition"
          >
            Sign Up
          </button>
        </form>

        <p className="text-sm text-center mt-4 text-gray-600">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/login", { replace: true })}
            className="text-green-700 hover:underline"
          >
            Log in
          </button>
        </p>
      </div>
    </div>
  );
};

export default Signup;
