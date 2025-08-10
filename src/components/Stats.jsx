import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const StatItem = ({ end, label }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 2000; // 2 seconds
    const increment = end / (duration / 16); // assuming 60fps
    const counter = setInterval(() => {
      start += increment;
      if (start >= end) {
        start = end;
        clearInterval(counter);
      }
      setCount(Math.floor(start));
    }, 16);

    return () => clearInterval(counter);
  }, [end]);

  return (
    <div className="flex flex-col items-center">
      <span
        className="text-5xl font-bold"
        style={{
          color: "#E6E6FA", // frosty lavender
          textShadow:
            "0 0 8px rgba(230, 230, 250, 0.9), 0 0 16px rgba(230, 230, 250, 0.7)",
        }}
      >
        {count}+
      </span>
      <span className="text-lg text-white mt-2">{label}</span>
    </div>
  );
};

export default function StatsSection() {
  return (
    <section
      className="py-16"
      style={{
        background:
          "linear-gradient(145deg, rgba(15, 35, 65, 0.95), rgba(10, 20, 45, 0.9))",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
      }}
    >
      <div className="max-w-6xl mx-auto px-4">
        {/* Animated heading */}
        <motion.h2
          className="text-center text-3xl font-bold text-white mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          OUR{" "}
          <span className="text-blue-400  font-extrabold drop-shadow-[0_0_8px_#3b82f6]">
            IMPACT
          </span>
        </motion.h2>

        <div className="flex justify-around gap-12 flex-wrap">
          <StatItem end={1200} label="Law Students Trained" />
          <StatItem end={350} label="Startup Founders Assisted" />
          <StatItem end={500} label="Legal Cases Reviewed" />
        </div>
      </div>
    </section>
  );
}