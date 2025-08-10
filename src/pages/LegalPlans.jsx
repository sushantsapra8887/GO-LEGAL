import React, { useEffect } from 'react';
import Lottie from "lottie-react";
import { motion } from "framer-motion";
import {
  MdBusinessCenter,
  MdCall,
  MdArticle,
  MdSupportAgent,
} from "react-icons/md";

import Navbar from "../components/Navbar";
import content from "../data/Content.json";

import companyAnim from "../lottie/register.json";
import consultAnim from "../lottie/consultation.json";
import contractAnim from "../lottie/Contract sign.json";
import supportAnim from "../lottie/document.json";
import { Link } from "react-router-dom";
import Footer from '../components/Footer';

// ✅ Import the background image
import bgImage from "../images/law2.jpeg";

const iconMap = {
  "Company Registration": <MdBusinessCenter className="text-3xl text-blue-600" />,
  "Consultation Calls": <MdCall className="text-3xl text-green-600" />,
  "Contract Drafting": <MdArticle className="text-3xl text-purple-600" />,
  "Legal Notices & Compliance": <MdSupportAgent className="text-3xl text-orange-600" />,
};

const lottieMap = {
  "Company Registration": companyAnim,
  "Consultation Calls": consultAnim,
  "Contract Drafting": contractAnim,
  "Legal Notices & Compliance": supportAnim,
};

const LegalPlans = () => {
  const legalPlans = content?.choosePath?.legalPlans || [];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div
      className="min-h-screen text-gray-700 flex flex-col relative"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-white/20 backdrop-blur-md z-0" />

      {/* Content wrapper */}
      <div className="relative z-10">
        {/* Navbar */}
        <Navbar />

        {/* Main Content */}
        <div className="px-6 md:px-20 pt-36 pb-20">
          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-gray-800 text-4xl font-extrabold md:text-5xl text-center mb-4"
          >
            OUR LEGAL PLANS
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-600 font-medium text-center max-w-2xl mx-auto mb-16 text-lg"
          >
            We’ve designed legal services that are tailor-made for startups and founders. Choose what you need, when you need it.
          </motion.p>

          {/* Cards */}
          <div className="flex flex-col gap-10">
            {legalPlans.map((plan, index) => (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                key={index}
                className="w-full max-w-4xl mx-auto bg-white/90 backdrop-blur-md border border-gray-300 rounded-xl shadow-md px-6 py-6 flex flex-col gap-6 relative"
              >
                {/* Icon & Title */}
                <div className="flex justify-center items-center gap-3">
                  <span className="text-blue-600 text-2xl">{iconMap[plan.title]}</span>
                  <h3 className="text-xl md:text-2xl font-bold text-gray-800 text-center">
                    {plan.title}
                  </h3>
                </div>

                {/* Content Row */}
                <div className="flex flex-col md:flex-row justify-between items-start gap-6">
                  {/* Description */}
                  <div className="w-full md:w-2/3">
                    <p className="text-gray-700 text-sm mb-3">{plan.description}</p>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700 mb-4">
                      {plan.features?.map((point, idx) => (
                        <li key={idx}>{point}</li>
                      ))}
                    </ul>

                    {/* Conditional Buttons */}
                    {plan.title === "Company Registration" && (
                      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2">
                        <Link to="/start-registration">
                          <button className="bg-blue-600 text-white text-sm font-semibold px-5 py-2 rounded-md shadow hover:bg-blue-700 transition duration-300">
                            Register Now
                          </button>
                        </Link>
                      </div>
                    )}

                    {plan.title === "Contract Drafting" && (
                      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2">
                        <Link to="/request-contract">
                          <button className="bg-purple-600 text-white text-sm font-semibold px-5 py-2 rounded-md shadow hover:bg-purple-700 transition duration-300">
                            Request Contract Drafting
                          </button>
                        </Link>
                      </div>
                    )}

                    {plan.title === "Consultation Calls" && (
                      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2">
                        <Link to="/consultation">
                          <button className="bg-green-600 text-white text-sm font-semibold px-5 py-2 rounded-md shadow hover:bg-green-700 transition duration-300">
                            Book a Consultation
                          </button>
                        </Link>
                      </div>
                    )}

                    {plan.title === "Legal Notices & Compliance" && (
                      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2">
                        <Link to="/legal-notice">
                          <button className="bg-orange-600 text-white text-sm font-semibold px-5 py-2 rounded-md shadow hover:bg-orange-700 transition duration-300">
                            Get Legal Support
                          </button>
                        </Link>
                      </div>
                    )}
                  </div>

                  {/* Lottie Animation */}
                  <div className="w-full md:w-1/3 flex justify-center">
                    <div className="w-full h-full rounded-es-full overflow-hidden border-4 border-gray-200 shadow-sm bg-orange-300 flex items-center justify-center">
                      <Lottie
                        animationData={lottieMap[plan.title]}
                        loop
                        className="w-24 h-24"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default LegalPlans;