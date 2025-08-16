import React from "react";
import lawImage from "../images/law12.webp";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Handle login logic here
    // If successful:
    // navigate("/dashboard");
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-800 overflow-hidden">
      {/* Blurred Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center blur-xl scale-110"
        style={{ backgroundImage: `url(${lawImage})` }}
      ></div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-40"></div>

      {/* Login Form */}
      <div className="relative z-10 bg-white/90 backdrop-blur-md rounded-xl shadow-2xl p-8 w-full max-w-md mx-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Login to GoLegal</h2>
        
        <form className="space-y-5" onSubmit={handleLogin}>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-700 text-white py-2 px-4 rounded-md hover:bg-green-800 transition"
          >
            Login
          </button>
        </form>

        <p className="text-sm text-gray-700 mt-4 text-center">
          Don’t have an account?{" "}
          <button
            onClick={() => navigate("/register", { replace: true })}
            className="text-green-700 hover:underline"
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
