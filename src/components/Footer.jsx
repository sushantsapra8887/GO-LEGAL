// src/components/Footer.jsx
import React from "react";
import {
  FaTwitter,
  FaYoutube,
  FaFacebook,
  FaInstagram,
  FaWhatsapp,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="relative bg-black/70 text-white py-14 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 text-center md:text-left">
        
        {/* Follow Us */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
          <div className="flex justify-center md:justify-start gap-4 flex-wrap">
            <a
              href="#"
              className="bg-white p-3 rounded-full text-black hover:scale-110 transition"
            >
              <FaTwitter />
            </a>
            <a
              href="#"
              className="bg-white p-3 rounded-full text-black hover:scale-110 transition"
            >
              <FaYoutube />
            </a>
            <a
              href="#"
              className="bg-white p-3 rounded-full text-black hover:scale-110 transition"
            >
              <FaFacebook />
            </a>
            <a
              href="#"
              className="bg-white p-3 rounded-full text-black hover:scale-110 transition"
            >
              <FaInstagram />
            </a>
          </div>
        </div>

        {/* Policies */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Policies</h3>
          <ul className="space-y-2 text-gray-300">
            <li><a href="#" className="hover:text-white">About Us</a></li>
            <li><a href="#" className="hover:text-white">Terms & Conditions</a></li>
            <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-white">Cancellation Policy</a></li>
            <li><a href="#" className="hover:text-white">Cookies Policy</a></li>
          </ul>
        </div>

        {/* Get Started */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Get Started</h3>
          <ul className="space-y-2 text-gray-300">
            <li><a href="#" className="hover:text-white">Tutorials</a></li>
            <li><a href="#" className="hover:text-white">Resources</a></li>
            <li><a href="#" className="hover:text-white">Guides</a></li>
          </ul>
        </div>

        {/* About */}
        <div>
          <h3 className="text-lg font-semibold mb-4">About</h3>
          <ul className="space-y-2 text-gray-300">
            <li><a href="#" className="hover:text-white">Stories</a></li>
            <li><a href="#" className="hover:text-white">Community</a></li>
            <li><a href="#" className="hover:text-white">Blog</a></li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center mt-10 text-gray-400 text-sm px-4">
        &copy; {new Date().getFullYear()} GoLegal. All rights reserved.
      </div>

      {/* ✅ WhatsApp Floating Icon */}
      <a
        href="https://wa.me/your-number"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 p-4 rounded-full shadow-lg hover:scale-110 transition z-50"
      >
        <FaWhatsapp className="text-white text-2xl" />
      </a>
    </footer>
  );
};

export default Footer;