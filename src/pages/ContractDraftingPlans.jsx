import React from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import content from "../data/Content.json";
import { useCart } from "../CONTEXT/CartContext";
import { toast } from "react-hot-toast";
// React Icons
import {
  MdBusinessCenter,
  MdVerifiedUser,
  MdOutlineGavel,
} from "react-icons/md";

// Icon color & style mappings
const colorMap = {
  green: {
    border: "border-green-500",
    text: "text-green-700",
    icon: "text-green-600",
    bg: "bg-green-600",
    hover: "hover:bg-green-700",
  },
  blue: {
    border: "border-blue-500",
    text: "text-blue-700",
    icon: "text-blue-600",
    bg: "bg-blue-600",
    hover: "hover:bg-blue-700",
  },
  red: {
    border: "border-red-500",
    text: "text-red-700",
    icon: "text-red-600",
    bg: "bg-red-600",
    hover: "hover:bg-red-700",
  },
};

// Mapping plan name to icon
const iconMap = {
  "Starter Plan": MdBusinessCenter,
  "Growth Plan": MdVerifiedUser,
  "Legal Pro Plan": MdOutlineGavel,
};

const ContractDraftingPlans = () => {
  const plans = content?.choosePath?.contractDraftingPlans;
  const { addToCart } = useCart();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-100 flex flex-col">
      <Navbar />

      <main className="flex-grow">
        <div className="pt-28 px-4 sm:px-6 pb-20 max-w-6xl mx-auto text-center">
          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl font-extrabold text-gray-700 mb-2"
          >
            {plans?.title}
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-600 mb-12 max-w-2xl mx-auto px-2 sm:px-0"
          >
            {plans?.description}
          </motion.p>

          {/* Responsive Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {plans?.plans?.map((plan, index) => {
              const Icon = iconMap[plan.name];
              const color = colorMap[plan.color] || colorMap.green;

              const priceValue = parseFloat(
                plan.price.replace(/[^0-9.]/g, "")
              );

              return (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  className={`bg-white rounded-xl shadow-md ${color.border} border-t-4 p-6 flex flex-col justify-between hover:shadow-xl transition`}
                >
                  {/* Top Section */}
                  <div className="flex flex-col items-center mb-4 text-center">
                    {Icon && <Icon className={`text-4xl ${color.icon} mb-3`} />}

                    <h2 className={`text-lg sm:text-xl font-bold ${color.text} mb-1`}>
                      {plan.name}
                    </h2>
                    <p className="text-xl sm:text-2xl font-semibold text-gray-800 mb-2">
                      {plan.price}
                    </p>
                    <p className="text-sm text-gray-600 mb-4">
                      {plan.description}
                    </p>
                  </div>

                  {/* Features */}
                  <div className="flex-grow">
                    <ul className="text-sm text-gray-700 mb-6 text-left space-y-2">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="text-green-600 mr-2 mt-1">✔️</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Button */}
                  <div className="mt-auto pt-4">
                    <button
                      onClick={() => {
                        addToCart({
                          id: `contract-drafting-${index}`,
                          name: plan.name,
                          price: priceValue,
                          quantity: 1,
                        });
                        toast.success(`"${plan.name}" added to cart`);
                      }}
                      className={`w-full ${color.bg} ${color.hover} text-white py-2 rounded-lg font-medium transition transform hover:scale-105`}
                    >
                      Get This Plan
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ContractDraftingPlans;