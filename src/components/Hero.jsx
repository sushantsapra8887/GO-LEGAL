import React from "react";
import lawImage from "../images/law12.webp";
import { motion } from "framer-motion";
import { useContent } from "../Contentcontext";

const Hero = () => {
  const { hero } = useContent();
  if (!hero) return null;

  return (
    <section id="home" className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.img
          src={lawImage}
          alt="Legal background"
          className="w-full h-full object-cover scale-110 blur-[20px]"
          initial={{ scale: 1.05 }}
          animate={{ scale: 1.1 }}
          transition={{ duration: 20, ease: "easeOut" }}
        />
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      </div>

      <motion.div
        className="relative z-20 flex-1 flex flex-col items-center justify-center text-center px-6 md:px-12 lg:px-20 py-20"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <motion.h1
          className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-6 drop-shadow-lg"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          {hero.title} <span className="text-blue-400">{hero.highlight}</span>
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-white/90 max-w-2xl mb-10 drop-shadow"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          {hero.subtitle}
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <a href="#services" className="px-6 py-3 bg-white text-blue-400 rounded-xl font-semibold shadow hover:bg-gray-100 transition">
            {hero.cta1}
          </a>
          
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;