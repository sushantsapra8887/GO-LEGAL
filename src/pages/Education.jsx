import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import content from "../data/Content.json";
import { useCart } from "../CONTEXT/CartContext";

import {
  FaUserGraduate,
  FaGavel,
  FaCheckCircle,
  FaArrowRight,
  FaTimes,
} from "react-icons/fa";

// Icon and color mapping
const iconMap = {
  FaUserGraduate: {
    icon: <FaUserGraduate className="text-white text-xl" />,
    bg: "bg-indigo-500",
  },
  FaGavel: {
    icon: <FaGavel className="text-white text-xl" />,
    bg: "bg-rose-500",
  },
};

const ProgramModal = ({ program, onClose, onConfirm }) => {
  if (!program) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex justify-center items-center px-4">
      <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6 relative shadow-lg">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
        >
          <FaTimes />
        </button>

        <h2 className="text-2xl font-bold mb-2">{program.title}</h2>
        <p className="italic text-sm text-gray-600 mb-4">
          {program.eligibility}
        </p>
        <p className="text-gray-800 mb-4">{program.description}</p>
        <p className="font-semibold mb-2">Course Fee: ₹{program.price}</p>

        <p className="text-green-700 font-medium mb-4">
          ✅ Includes: Online Access + Certification
        </p>

        <ul className="text-sm text-gray-700 mb-6 space-y-2">
          {program.highlights.map((point, i) => (
            <li key={i} className="flex items-center gap-2">
              <FaCheckCircle className="text-green-400" />
              <span>{point}</span>
            </li>
          ))}
        </ul>

        <button
          onClick={() => onConfirm(program)}
          className="w-full bg-green-600 text-white font-semibold py-2 rounded-md hover:bg-green-700 transition"
        >
          Confirm & Proceed
        </button>
      </div>
    </div>
  );
};

const ProgramCard = ({ program, delay, onJoinClick }) => {
  const visuals = iconMap[program.icon] || {};

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      whileHover={{ scale: 1.02 }}
      className="relative w-full max-w-sm md:max-w-md rounded-2xl p-6 bg-white/50 border border-white/30 shadow-xl backdrop-blur-lg text-gray-700"
    >
      {/* Icon */}
      <div className="flex justify-center -mt-12 mb-4">
        <div className={`p-4 rounded-full shadow-md ${visuals.bg}`}>
          {visuals.icon}
        </div>
      </div>

      {/* Text Content */}
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-1">{program.title}</h2>
        <p className="text-sm italic text-gray-600">{program.eligibility}</p>
        <p className="text-sm text-gray-900 mt-2">{program.description}</p>
        <p className="text-md font-semibold text-gray-800 mt-4">
          Course Fee: ₹{program.price}
        </p>

        <ul className="text-sm text-gray-900 mt-4 mb-6 space-y-2 text-left md:text-center">
          {program.highlights.map((point, i) => (
            <li key={i} className="flex items-center gap-2">
              <FaCheckCircle className="text-green-400" />
              <span>{point}</span>
            </li>
          ))}
        </ul>

        <button
          onClick={() => onJoinClick(program)}
          className="group inline-flex items-center gap-2 px-6 py-2 rounded-md font-semibold bg-gray-700 text-white hover:bg-gray-800 transition"
        >
          Join Program{" "}
          <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </motion.div>
  );
};

const Education = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const programs = content?.choosePath?.trainingPrograms?.programs || [];
  const { addToCart } = useCart();

  const [selectedProgram, setSelectedProgram] = useState(null);

  const handleJoinClick = (program) => {
    setSelectedProgram(program);
  };

  const handleConfirm = (program) => {
    addToCart({
      id: program.id,
      name: program.title,
      price: program.price,
      quantity: 1,
      type: "course",
      details: {
        info: "Online Access + Certification",
      },
    });

    setSelectedProgram(null); // Close modal
  };

  const closeModal = () => setSelectedProgram(null);

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat text-gray-900 flex flex-col"
      style={{ backgroundImage: "url('/src/images/law2.jpeg')" }}
    >
      <div className="bg-white/20 backdrop-blur-md flex-grow">
        <Navbar />

        <main className="pt-28 pb-20 px-6 max-w-6xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold text-center mb-4"
          >
            Legal Training Programs
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-center font-semibold text-white max-w-xl mx-auto mb-12"
          >
            Practical legal training designed for both students and professionals
            to help you master courtroom-ready legal skills.
          </motion.p>

          {/* Responsive Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-10 justify-items-center">
            {programs.map((program, idx) => (
              <ProgramCard
                program={program}
                key={program.id}
                delay={idx * 0.1}
                onJoinClick={handleJoinClick}
              />
            ))}
          </div>
        </main>

        <Footer />
      </div>

      {/* Modal */}
      {selectedProgram && (
        <ProgramModal
          program={selectedProgram}
          onClose={closeModal}
          onConfirm={handleConfirm}
        />
      )}
    </div>
  );
};

export default Education;