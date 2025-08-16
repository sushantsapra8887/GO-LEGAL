// src/components/OurClients.jsx
import React from "react";
import { motion } from "framer-motion";

// Import logos from src/images/clients
import client1 from "../images/clients/AMBUQUICK.png";
import client2 from "../images/clients/bidcliq.png";
import client3 from "../images/clients/raotravels.png";
import client4 from "../images/clients/rsrtc.jpeg";

const clients = [
  { id: 1, name: "Ambuquick", logo: client1 },
  { id: 2, name: "Bidcliq", logo: client2 },
  { id: 3, name: "Rao Travels", logo: client3 },
  { id: 4, name: "RSRTC", logo: client4 },
];

export default function OurClients() {
  return (
    <section className="relative w-full bg-gray-700 py-16 overflow-hidden">
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Animated heading */}
        <motion.h2
          className="text-3xl sm:text-4xl font-extrabold text-white mb-12 tracking-wide"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          OUR{" "}
          <motion.span
            className="text-blue-500"
            animate={{ color: ["#3b82f6", "#60a5fa", "#3b82f6"] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            CLIENTS
          </motion.span>
        </motion.h2>

        {/* Cards grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {clients.map((client, index) => (
            <motion.div
              key={client.id}
              className="flex items-center justify-center bg-white rounded-xl shadow-lg p-4 sm:p-6"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: index * 0.2 + 0.5,
                duration: 0.6,
                type: "spring",
              }}
              whileHover={{ scale: 1.05 }}
            >
              <motion.img
                src={client.logo}
                alt={client.name}
                className="max-h-20 sm:max-h-24 md:max-h-28 w-auto object-contain"
                animate={{ y: [0, -8, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 3,
                  ease: "easeInOut",
                }}
                loading="lazy"
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Dark gradient background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-gray-900 via-gray-800 to-black"></div>
    </section>
  );
}