import React, { useRef, useEffect, useState } from "react";
import content from "../data/Content.json";
import doctorImage from "../images/lawyer.jpeg";
import { motion } from "framer-motion";

const iconColors = ["text-blue-500", "text-purple-500", "text-red-500", "text-green-500"];
const bgColors = ["bg-blue-100", "bg-purple-100", "bg-red-100", "bg-green-100"];

const WhyChooseUs = () => {
  const { title, points } = content.whyChooseUs;

  const cardRef = useRef(null);
  const [cardHeight, setCardHeight] = useState("auto");

  useEffect(() => {
    if (cardRef.current) {
      setCardHeight(`${cardRef.current.offsetHeight}px`);
    }
  }, [points.length]);

  return (
    <section className="bg-gradient-to-b from-[#515c6c] to-white py-16 px-4 md:px-10">
      {/* Title */}
      <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-gray-800 mb-12">
        {title.split(" ")[0]}{" "}
        <span className="text-indigo-700">{title.split(" ").slice(1).join(" ")}</span>
      </h2>

      {/* Layout */}
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
        
        {/* Cards - desktop left, mobile below image */}
        <div className="space-y-6 order-2 lg:order-1" ref={cardRef}>
          {points.map((point, idx) => (
            <motion.div
              key={idx}
              className="bg-white p-4 sm:p-6 rounded-xl shadow hover:shadow-lg transition border flex items-start space-x-4"
              whileHover={{ scale: 1.02 }}
            >
              <div
                className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-lg sm:text-xl font-bold ${bgColors[idx % bgColors.length]}`}
              >
                <span className={`${iconColors[idx % iconColors.length]}`}>
                  {point.icon}
                </span>
              </div>
              <div>
                <h4 className="text-base sm:text-lg font-semibold text-gray-800">{point.title}</h4>
                <p className="text-sm sm:text-base text-gray-600">{point.text}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Image - desktop right, mobile top */}
        <div
          className="rounded-xl sm:rounded-3xl overflow-hidden shadow-lg border-4 border-blue-200 w-full max-w-md order-1 lg:order-2 mx-auto"
          style={{
            height: typeof window !== "undefined" && window.innerWidth < 1024 ? "250px" : cardHeight,
          }}
        >
          <img
            src={doctorImage}
            alt="Legal Support"
            className="w-full h-full object-cover"
          />
        </div>

      </div>
    </section>
  );
};

export default WhyChooseUs;