// src/pages/LegalNoticePlans.jsx
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FaEnvelopeOpenText, FaClipboardCheck } from "react-icons/fa";
import toast from "react-hot-toast";
import content from "../data/Content.json";
import { useCart } from "../CONTEXT/CartContext";

const LegalNoticePlans = () => {
  const plans = content?.choosePath?.legalNoticePlans?.plans || [];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { cartItems, addToCart } = useCart();

  const iconMap = {
    "Standard Notice Drafting": (
      <FaEnvelopeOpenText className="text-cyan-400 text-4xl mb-4" />
    ),
    "Premium Legal Compliance": (
      <FaClipboardCheck className="text-indigo-400 text-4xl mb-4" />
    ),
  };

  const handleAddToCart = (item) => {
    const isAlreadyInCart = cartItems.some((i) => i.name === item.name);

    if (isAlreadyInCart) {
      toast.error(`${item.name} is already in cart!`);
      return;
    }

    addToCart(item);
    toast.success(`${item.name} added to cart!`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-100 text-gray-700 flex flex-col overflow-x-hidden">
      {/* ✅ Sticky Navbar */}
      <div className="sticky top-0 z-50">
        <Navbar />
      </div>

      <motion.main
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex-grow pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full"
      >
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-3">
          Legal Notices & Compliance
        </h1>
        <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto text-sm sm:text-base">
          Professionally drafted legal notices and compliance support with expert guidance.
        </p>

        {/* ✅ Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
          {plans.map((plan, index) => {
            const isPremium = plan.name === "Premium Legal Compliance";

            const ringColor = isPremium ? "ring-indigo-300" : "ring-cyan-300";
            const titleColor = isPremium ? "text-indigo-200" : "text-cyan-200";
            const bulletColor = isPremium ? "text-indigo-400" : "text-cyan-400";
            const buttonBg = isPremium
              ? "bg-indigo-600 hover:bg-indigo-700"
              : "bg-cyan-600 hover:bg-cyan-700";

            return (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                className={`rounded-xl shadow-lg p-6 sm:p-8 flex flex-col justify-between transition
                  backdrop-blur-md bg-black/80 border border-white/20 ring-1 ${ringColor}`}
              >
                <div className="flex flex-col items-center text-center mb-4">
                  {iconMap[plan.name]}
                  <h2 className={`text-lg sm:text-xl font-bold text-white ${titleColor} mb-2`}>
                    {plan.name}
                  </h2>
                  <p className="text-xs sm:text-sm text-white mb-3">{plan.description}</p>
                  <p className="text-lg sm:text-xl font-extrabold text-white mb-4">
                    ₹{plan.price}
                  </p>
                </div>

                <ul className="text-xs sm:text-sm text-white/85 mb-6 space-y-2">
                  {plan.features.map((f, i) => (
                    <li key={i} className="flex items-start">
                      <span className={`${bulletColor} mr-2 mt-1`}>☑️</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handleAddToCart(plan)}
                  className={`mt-auto w-full sm:w-auto text-center text-white py-2 px-4 rounded-md font-medium transition ${buttonBg}`}
                >
                  Add to Cart
                </button>
              </motion.div>
            );
          })}
        </div>
      </motion.main>

      <Footer />
    </div>
  );
};

export default LegalNoticePlans;