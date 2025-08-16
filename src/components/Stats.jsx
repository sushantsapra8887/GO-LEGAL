import React, { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

const StatItem = ({ end, label }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const duration = 2000; // 2 seconds
    const stepTime = 16; // ~60fps
    const totalSteps = duration / stepTime;
    const increment = end / totalSteps;

    const counter = setInterval(() => {
      start += increment;
      if (start >= end) {
        start = end;
        clearInterval(counter);
      }
      setCount(Math.floor(start)); // change to toFixed(0) for float-freezing effect
    }, stepTime);

    return () => clearInterval(counter);
  }, [isInView, end]);

  return (
    <div
      ref={ref}
      className="flex flex-col items-center text-center w-full sm:w-auto"
    >
      <span
        className="text-4xl sm:text-5xl font-bold"
        style={{
          color: "#E6E6FA",
          textShadow:
            "0 0 8px rgba(230, 230, 250, 0.9), 0 0 16px rgba(230, 230, 250, 0.7)",
        }}
      >
        {count.toLocaleString()}+
      </span>
      <span className="text-base sm:text-lg text-white mt-2 px-2">{label}</span>
    </div>
  );
};

export default function StatsSection() {
  return (
    <section
      className="py-12 sm:py-16 w-full"
      style={{
        background:
          "linear-gradient(145deg, rgba(15, 35, 65, 0.95), rgba(10, 20, 45, 0.9))",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Animated heading */}
        <motion.h2
          className="text-center text-2xl sm:text-3xl font-bold text-white mb-10 sm:mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          OUR{" "}
          <span className="text-blue-400 font-extrabold drop-shadow-[0_0_8px_#3b82f6]">
            IMPACT
          </span>
        </motion.h2>

        <div className="flex flex-col sm:flex-row items-center justify-around gap-8 sm:gap-12 flex-wrap">
          <StatItem end={1200} label="Law Students Trained" />
          <StatItem end={350} label="Startup Founders Assisted" />
          <StatItem end={500} label="Legal Cases Reviewed" />
        </div>
      </div>
    </section>
  );
}