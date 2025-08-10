import React from "react";
import { motion } from "framer-motion";
import content from "../data/Content.json";
import logo from "../images/logo.jpeg";

const About = () => {
  const { title, text } = content?.about || {};

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#d4daea] via-[#b3c1d6] to-white text-gray-800 py-16 px-4 flex flex-col items-center justify-center">
      
      {/* Animated Logo */}
      <motion.img
        src={logo}
        alt="Logo"
        className="w-28 h-28 mb-6 rounded-full bg-white/10 backdrop-blur-md p-2 shadow-lg"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      />

      {/* Glass Card with Animation */}
      <motion.div
        className="max-w-3xl w-full bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-xl border border-white/20"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <motion.h1
          className="text-3xl md:text-4xl font-bold mb-6 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {title}
        </motion.h1>

        {text?.map((para, index) => (
          <motion.p
            key={index}
            className="text-lg text-gray-800 mb-4 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 + index * 0.2 }}
          >
            {para}
          </motion.p>
        ))}
      </motion.div>
    </div>
  );
};

export default About;