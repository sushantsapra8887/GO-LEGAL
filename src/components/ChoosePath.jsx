import React, { useEffect, useRef } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useContent } from "../Contentcontext";
import legalImg1 from "../images/legal-support.avif";
import legalImg2 from "../images/legal-training.webp";
import legalImg3 from "../images/lawyer1.jpeg";
import { motion } from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";

const imageMap = {
  "startup-legal": legalImg1,
  "legal-training": legalImg2,
};

const ChoosePath = () => {
  const { choosePath } = useContent();
  const headingRef = useRef(null);
  const subtitleRef = useRef(null);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (headingRef.current && subtitleRef.current) {
      gsap.fromTo(
        headingRef.current,
        { y: 100, opacity: 0, scale: 0.8 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.4,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 80%",
          },
        }
      );

      gsap.fromTo(
        subtitleRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          delay: 0.3,
          ease: "power2.out",
          scrollTrigger: {
            trigger: subtitleRef.current,
            start: "top 85%",
          },
        }
      );
    }
  }, []);

  if (!choosePath || !choosePath.options) {
    return (
      <div className="py-24 text-center text-white text-xl">
        Loading your legal paths...
      </div>
    );
  }

  return (
    <div className="relative w-full z-10 overflow-x-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat blur-sm brightness-75 z-0"
        style={{
          backgroundImage: `url(${legalImg3})`,
          backgroundAttachment: "fixed",
        }}
      ></div>

      {/* Content */}
      <div className="relative z-10 w-full px-4 sm:px-6 md:px-12 lg:px-20 py-16 md:py-24">
        <h2
          ref={headingRef}
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-white mb-4 drop-shadow-2xl"
        >
          {choosePath.sectionTitle}
        </h2>

        <motion.p
          ref={subtitleRef}
          className="text-center text-base sm:text-lg md:text-xl text-gray-200 mb-12 md:mb-16 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          {choosePath.subtitle}
        </motion.p>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {choosePath.options.map((option, idx) => (
            <div
              key={option.id}
              data-aos="fade-up"
              data-aos-delay={idx * 150}
              className="bg-white bg-opacity-90 backdrop-blur-md rounded-xl shadow-xl overflow-hidden flex flex-col transition-all transform hover:-translate-y-1 hover:shadow-2xl hover:scale-[1.01] w-full"
            >
              <img
                src={imageMap[option.id]}
                alt={option.title}
                className="w-full h-48 sm:h-56 md:h-64 object-cover"
              />
              <div className="p-4 sm:p-5 md:p-6 flex flex-col flex-grow">
                <h3 className="text-xl sm:text-2xl font-bold mb-2 text-gray-800">
                  {option.title}
                </h3>
                <p className="text-gray-700 mb-4 italic text-sm sm:text-base">
                  {option.subtitle}
                </p>

                <ul className="text-gray-800 space-y-2 mb-6 text-sm sm:text-base font-medium">
                  {option.features.map((feature, index) => (
                    <li key={index} className="flex items-start space-x-2 sm:space-x-3">
                      <span className="text-lg">🎓</span>
                      <span>{feature.replace("⚖️", "")}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  to={option.cta.link}
                  className={`mt-auto inline-block px-4 sm:px-5 py-2 sm:py-2.5 rounded-md font-semibold text-white text-center transition w-full ${
                    option.cta.color === "blue"
                      ? "bg-blue-600 hover:bg-blue-700"
                      : "bg-orange-500 hover:bg-orange-600"
                  }`}
                >
                  {option.cta.label}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChoosePath;