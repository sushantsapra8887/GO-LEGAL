import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Ananya Sharma",
    title: "Founder, LegalEase",
    quote:
      "GoLegal has revolutionized how I access legal services. The team is responsive, reliable, and the process is seamless.",
    rating: 5,
  },
  {
    name: "Rohan Verma",
    title: "Startup Mentor",
    quote:
      "Their startup legal subscription saved me countless hours. I highly recommend GoLegal to early-stage founders.",
    rating: 4,
  },
  {
    name: "Priya Mehta",
    title: "Law Student",
    quote:
      "The legal education platform is practical and insightful. It bridged the gap between academics and real-world law.",
    rating: 5,
  },
];

const slideVariants = [
  { hidden: { opacity: 0, x: -50 }, visible: { opacity: 1, x: 0 } },
  { hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0 } },
  { hidden: { opacity: 0, x: 50 }, visible: { opacity: 1, x: 0 } },
];

const Testimonials = () => {
  return (
    <section className="bg-gradient-to-b from-[#83839c] to-[#856b6b] py-20 px-4 md:px-8">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-extrabold text-white mb-12">
          WHAT PEOPLE SAY
        </h2>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => {
            const variant = slideVariants[i % slideVariants.length];
            return (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.2 }}
                variants={variant}
                className="bg-white/10 backdrop-blur-md border border-white/20 text-left rounded-xl p-6 shadow-lg hover:shadow-xl transition text-white"
              >
                <p className="text-sm mb-4 italic text-white/90">"{t.quote}"</p>
                <div className="flex items-center gap-1 mb-3 text-yellow-400">
                  {Array(t.rating)
                    .fill(0)
                    .map((_, j) => (
                      <Star key={j} className="w-4 h-4 fill-yellow-400" />
                    ))}
                </div>
                <p className="font-semibold text-base text-white">{t.name}</p>
                <p className="text-sm text-white">{t.title}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;