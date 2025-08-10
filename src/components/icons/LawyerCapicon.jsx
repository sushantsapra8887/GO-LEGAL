import React from "react";

const LawyerCapIcon = ({ className = "w-5 h-5 text-blue-600" }) => (
  <svg
    className={className}
    fill="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 2L1 7l11 5 9-4.09V15h2V7L12 2z" />
    <path d="M12 22c3.3137 0 6-2.6863 6-6h-2a4 4 0 1 1-8 0H6c0 3.3137 2.6863 6 6 6z" />
  </svg>
);

export default LawyerCapIcon;
