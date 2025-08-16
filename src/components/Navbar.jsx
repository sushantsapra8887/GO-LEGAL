// src/components/Navbar.jsx
import React, { useState } from "react";
import { FaSearch, FaShoppingCart, FaUser, FaBars, FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import logo from "../images/LOGOGO.png";
import { useContent } from "../Contentcontext";
import { useCart } from "../CONTEXT/CartContext";

export default function Navbar() {
  const { navbar } = useContent();
  const { cartItems } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  if (!navbar) return null;

  const handleSearch = (e) => {
    e.preventDefault();
    const term = searchTerm.trim().toLowerCase();

    if (!term) return;

    // Match keywords to routes or section IDs
    const routesMap = {
      services: "/#services",
      "legal plans": "/legal-plans",
      training: "/training",
      blogs: "/blogs",
      courses: "/training",
      contract: "/request-contract",
      notice: "/legal-notice",
      consultation: "/consultation",
      registration: "/start-registration",
      clients: "/#clients",
      about: "/#about",
      contact: "/#contact",
    };

    let matchedRoute = null;
    for (const [keyword, path] of Object.entries(routesMap)) {
      if (term.includes(keyword)) {
        matchedRoute = path;
        break;
      }
    }

    // Default to home if nothing matches
    matchedRoute = matchedRoute || "/";

    // Navigate or scroll
    if (matchedRoute.startsWith("/#")) {
      // On same page, scroll to section
      const id = matchedRoute.replace("/#", "");
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      } else {
        navigate(matchedRoute); // fallback
      }
    } else {
      navigate(matchedRoute);
    }

    setSearchTerm("");
    setSearchOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-slate-100 shadow-md z-50">
      <div className="relative w-full px-4 md:px-12 lg:px-20 py-4 flex justify-between items-center">
        
        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-2xl mr-3"
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Logo + Brand */}
        <div className="flex items-center space-x-3">
          <img src={logo} alt="GoLegal Logo" className="h-12 w-12 object-contain" />
          <div className="flex flex-col leading-tight">
            <h1 className="text-lg md:text-xl font-extrabold text-gray-700">{navbar.brand}</h1>
            <p className="text-xs md:text-sm text-gray-600 font-medium">{navbar.tagline}</p>
          </div>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-6 font-medium text-gray-700">
          {navbar.links.map((link) => (
            <Link
              key={link}
              to={link.toLowerCase() === "home" ? "/#home" : `/#${link.toLowerCase()}`}
              className="hover:text-gray-400 transition"
            >
              {link}
            </Link>
          ))}
        </nav>

        {/* Right Icons */}
        <div className="flex items-center gap-4 text-gray-600 text-lg relative">
          
          {/* Search Button */}
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            title="Search"
            className="text-xl"
          >
            <FaSearch />
          </button>

          {/* Search Input */}
          {searchOpen && (
            <form
              onSubmit={handleSearch}
              className="absolute top-12 right-0 bg-white shadow-md p-2 rounded flex items-center gap-2 z-50"
            >
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none"
                autoFocus
              />
              <button
                type="submit"
                className="text-blue-600 font-bold hover:text-blue-800 transition"
              >
                Go
              </button>
            </form>
          )}

          {/* Cart */}
          <Link to="/cart" className="relative hover:text-gray-400 transition" title="Cart">
            <FaShoppingCart />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Login */}
          <Link to="/login" title="Login" className="hover:text-gray-400 transition">
            <FaUser className="text-xl" />
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-slate-100 shadow-lg flex flex-col items-center py-4 space-y-4">
          {navbar.links.map((link) => (
            <Link
              key={link}
              to={link.toLowerCase() === "home" ? "/#home" : `/#${link.toLowerCase()}`}
              className="hover:text-gray-400 transition"
              onClick={() => setIsOpen(false)}
            >
              {link}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}