import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FaWhatsapp } from "react-icons/fa";
import content from "../data/Content.json";
import { useCart } from "../CONTEXT/CartContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const steps = ["Service", "Date & Time", "Basic Details", "Summary"];

const ConsultationPlans = () => {
  const [step, setStep] = useState(0);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [appointment, setAppointment] = useState({
    date: "",
    time: "",
    name: "",
    email: "",
  });
  const [emailError, setEmailError] = useState("");
  const controls = useAnimation();

  const plans = content?.choosePath?.consultationPlans?.plans || [];
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    controls.start({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    });
    window.scrollTo(0, 0);
  }, [controls]);

  const validateEmail = (email) => {
    const regex =
      /^[a-zA-Z0-9._%+-]+@(gmail|outlook|yahoo|protonmail|icloud|hotmail)\.com$/;
    return regex.test(email);
  };

  const isStepValid = () => {
    if (step === 1) {
      return appointment.date && appointment.time;
    }
    if (step === 2) {
      return (
        appointment.name.trim().length > 0 &&
        validateEmail(appointment.email)
      );
    }
    return true;
  };

  const next = () => {
    if (step === 2 && !validateEmail(appointment.email)) {
      setEmailError("Please enter a valid email (e.g., yourname@gmail.com)");
      return;
    }
    if (step < steps.length - 1) setStep(step + 1);
  };

  const prev = () => {
    if (step > 0) setStep(step - 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-50 to-blue-100 text-gray-800 flex flex-col">
      <Navbar />
      <motion.main
        className="flex-grow pt-24 sm:pt-28 pb-12 sm:pb-16 px-4 sm:px-6 md:px-10 lg:px-20 max-w-7xl mx-auto w-full"
        initial={{ opacity: 0, y: 30 }}
        animate={controls}
      >
        {/* Heading */}
        <motion.h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-2">
          Book a Consultation
        </motion.h1>
        <motion.p className="text-center text-gray-600 mb-8 sm:mb-12 max-w-xl mx-auto text-sm sm:text-base">
          Choose a support option that suits your legal need best — from free
          chat to detailed calls.
        </motion.p>

        <div className="flex flex-col lg:flex-row gap-8 sm:gap-10">
          {/* Sidebar Steps */}
          <div className="lg:w-1/4 flex flex-row lg:flex-col gap-3 lg:gap-6 overflow-x-auto pb-2 lg:pb-0">
            {steps.map((s, idx) => (
              <div
                key={idx}
                className={`flex items-center gap-2 text-xs sm:text-sm font-medium py-2 px-3 rounded-lg transition min-w-max lg:min-w-0 ${
                  idx === step
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-500 hover:bg-gray-100"
                }`}
              >
                <span className="text-base sm:text-lg">➤</span> {s}
              </div>
            ))}
          </div>

          {/* Main Form Area */}
          <div className="lg:w-3/4 space-y-6">
            {/* Step 0 */}
            {step === 0 && (
              <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {plans.map((plan, index) =>
                  plan.type === "chat" ? (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.02 }}
                      className="bg-white/70 backdrop-blur-lg border-l-4 border-green-400 p-5 sm:p-6 rounded-tr-3xl rounded-bl-3xl shadow flex flex-col justify-between"
                    >
                      <div>
                        <h2 className="text-base sm:text-lg font-semibold text-green-700 mb-1">
                          {plan.name}
                        </h2>
                        <p className="text-gray-600 text-xs sm:text-sm mb-3">
                          {plan.description}
                        </p>
                        <ul className="text-xs sm:text-sm text-gray-700 space-y-1 mb-4">
                          {plan.features.map((f, i) => (
                            <li key={i}>✔️ {f}</li>
                          ))}
                        </ul>
                      </div>
                      <a
                        href="https://wa.me/918383843679"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center gap-2 text-xs sm:text-sm text-white bg-green-500 hover:bg-green-600 px-3 sm:px-4 py-2 rounded-md"
                      >
                        <FaWhatsapp className="text-base sm:text-lg" /> Start Chat
                      </a>
                    </motion.div>
                  ) : (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.02 }}
                      className={`bg-white/70 backdrop-blur-lg border-l-4 ${
                        selectedPlan?.name === plan.name
                          ? "border-blue-500 ring-2 ring-blue-300"
                          : "border-blue-200"
                      } p-5 sm:p-6 rounded-tr-3xl rounded-bl-3xl shadow flex flex-col justify-between transition`}
                    >
                      <div>
                        <h2 className="text-base sm:text-lg font-semibold text-blue-700 mb-1">
                          {plan.name}
                        </h2>
                        <p className="text-xs sm:text-sm text-gray-600 mb-2">
                          {plan.description}
                        </p>
                        <p className="text-xs sm:text-sm text-gray-600 mb-4">
                          Duration: {plan.duration}
                        </p>
                        <ul className="text-xs sm:text-sm text-gray-700 space-y-1 mb-6">
                          {plan.features.map((f, i) => (
                            <li key={i}>✔️ {f}</li>
                          ))}
                        </ul>
                      </div>
                      <button
                        onClick={() => {
                          setSelectedPlan(plan);
                          setStep(1);
                        }}
                        className="self-end bg-blue-600 hover:bg-blue-700 text-white px-3 sm:px-4 py-2 text-xs sm:text-sm rounded-md"
                      >
                        Select Plan →
                      </button>
                    </motion.div>
                  )
                )}
              </motion.div>
            )}

            {/* Step 1 */}
            {step === 1 && selectedPlan && (
              <motion.div className="space-y-4">
                <label className="block text-xs sm:text-sm font-medium">
                  Select Date:
                </label>
                <input
                  type="date"
                  className="w-full px-3 sm:px-4 py-2 border rounded-md text-sm"
                  value={appointment.date}
                  onChange={(e) =>
                    setAppointment({ ...appointment, date: e.target.value })
                  }
                />
                <label className="block text-xs sm:text-sm font-medium">
                  Select Time:
                </label>
                <input
                  type="time"
                  className="w-full px-3 sm:px-4 py-2 border rounded-md text-sm"
                  value={appointment.time}
                  onChange={(e) =>
                    setAppointment({ ...appointment, time: e.target.value })
                  }
                />
              </motion.div>
            )}

            {/* Step 2 */}
            {step === 2 && selectedPlan && (
              <motion.div className="space-y-4">
                <label className="block text-xs sm:text-sm font-medium">
                  Your Name:
                </label>
                <input
                  type="text"
                  className="w-full px-3 sm:px-4 py-2 border rounded-md text-sm"
                  value={appointment.name}
                  onChange={(e) =>
                    setAppointment({ ...appointment, name: e.target.value })
                  }
                />
                <label className="block text-xs sm:text-sm font-medium">
                  Email Address:
                </label>
                <input
                  type="email"
                  className={`w-full px-3 sm:px-4 py-2 border rounded-md text-sm ${
                    emailError ? "border-red-500" : ""
                  }`}
                  value={appointment.email}
                  onChange={(e) => {
                    const val = e.target.value;
                    setAppointment({ ...appointment, email: val });
                    setEmailError(validateEmail(val) ? "" : "Invalid email format");
                  }}
                />
                {emailError && (
                  <p className="text-red-500 text-xs sm:text-sm mt-1">{emailError}</p>
                )}
              </motion.div>
            )}

            {/* Step 3 */}
            {step === 3 && selectedPlan && (
              <motion.div className="bg-white/80 p-5 sm:p-6 rounded-lg border border-blue-200 shadow-md">
                <h2 className="text-lg sm:text-xl font-semibold text-blue-700 mb-4">
                  Appointment Summary
                </h2>
                <div className="space-y-2 text-xs sm:text-sm text-gray-700">
                  <div>
                    <strong>Customer:</strong> {appointment.name}
                  </div>
                  <div>
                    <strong>Email:</strong> {appointment.email}
                  </div>
                  <div>
                    <strong>Service:</strong> {selectedPlan.name}
                  </div>
                  <div>
                    <strong>Date:</strong> {appointment.date}
                  </div>
                  <div>
                    <strong>Time:</strong> {appointment.time}
                  </div>
                  <div className="pt-4 border-t mt-4 text-base sm:text-lg font-bold">
                    Total Payable:{" "}
                    <span className="text-blue-600">{selectedPlan.price}</span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    const priceValue = parseFloat(
                      selectedPlan.price.replace(/[^0-9.]/g, "")
                    );
                    addToCart({
                      id: `consultation-${selectedPlan.name}-${appointment.date}-${appointment.time}`,
                      name: selectedPlan.name,
                      price: priceValue,
                      quantity: 1,
                      type: "appointment",
                      details: {
                        name: appointment.name,
                        email: appointment.email,
                        date: appointment.date,
                        time: appointment.time,
                      },
                    });
                    toast.success(`${selectedPlan.name} appointment added to cart!`);
                    setTimeout(() => {
                      navigate("/cart");
                    }, 800);
                  }}
                  className="mt-6 w-full sm:w-auto bg-blue-600 text-white px-5 sm:px-6 py-2 rounded-md hover:bg-blue-700 text-sm sm:text-base"
                >
                  Book Appointment
                </button>
              </motion.div>
            )}

            {/* Navigation Buttons */}
            {step > 0 && (
              <div className="flex justify-between pt-6">
                <button
                  onClick={prev}
                  className="text-xs sm:text-sm bg-gray-200 px-3 sm:px-4 py-2 rounded-md hover:bg-gray-300"
                >
                  ← Back
                </button>
                {step < 3 && (
                  <button
                    onClick={next}
                    disabled={!isStepValid()}
                    className={`text-xs sm:text-sm px-3 sm:px-4 py-2 rounded-md transition ${
                      isStepValid()
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    Continue →
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </motion.main>
      <Footer />
    </div>
  );
};

export default ConsultationPlans;