import React from "react";
import { FaSearch, FaShoppingCart, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "../images/LOGOGO.png";
import { useContent } from "../Contentcontext";
import { useCart } from "../CONTEXT/CartContext";

export default function Navbar() {
  const { navbar } = useContent();
  const { cartItems } = useCart();

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  if (!navbar) return null;

  return (
    <header className="fixed top-0 left-0 w-full bg-slate-100 shadow-md z-50">
      <div className="relative w-full px-6 md:px-12 lg:px-20 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <img src={logo} alt="GoLegal Logo" className="h-12 w-12 object-contain" />
          <div className="flex flex-col leading-tight">
            <h1 className="text-xl font-extrabold text-gray-700">{navbar.brand}</h1>
            <p className="text-sm text-gray-600 font-medium mt-0.5">{navbar.tagline}</p>
          </div>
        </div>

        {/* Nav Links */}
       {navbar.links.map((link) => (
  <Link
    key={link}
    to={link.toLowerCase() === "home" ? "/#home" : `/#${link.toLowerCase()}`}
    className="hover:text-gray-400 transition"
  >
    {link}
  </Link>
))}

        {/* Right Icons */}
        <div className="flex items-center gap-4 text-gray-600 text-lg ml-6 font-semibold relative">
          <button className="hover:text-gray-400 transition" title="Search">
            <FaSearch />
          </button>

          <Link to="/cart" className="relative hover:text-gray-400 transition" title="Cart">
            <FaShoppingCart />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                {cartCount}
              </span>
            )}
          </Link>

          <Link to="/login" title="Login" className="hover:text-gray-400 transition">
            <FaUser className="text-xl" />
          </Link>
        </div>
      </div>
    </header>
  );
}