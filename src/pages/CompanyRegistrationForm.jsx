import React, { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const CompanyRegistrationForm = () => {
  const vismeRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [retry, setRetry] = useState(0);

  const logWithTime = (message, type = "log") => {
    const timestamp = new Date().toLocaleTimeString();
    const prefix = `[🕒 ${timestamp}]`;
    console[type](`${prefix} ${message}`);
  };

  useEffect(() => {
    const scriptId = "visme-embed-script";

    const loadVismeScript = () => {
      const existingScript = document.getElementById(scriptId);
      if (existingScript) existingScript.remove();

      const script = document.createElement("script");
      script.src = "https://static-bundles.visme.co/forms/vismeforms-embed.js";
      script.id = scriptId;
      script.async = true;
      script.onload = () => setIsLoading(false);
      script.onerror = () => {
        setLoadError(true);
        setIsLoading(false);
      };

      document.body.appendChild(script);
    };

    const timer = setTimeout(() => {
      if (vismeRef.current) {
        loadVismeScript();
      } else {
        setLoadError(true);
        setIsLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [retry]);

  const handleRetry = () => {
    setIsLoading(true);
    setLoadError(false);
    vismeRef.current.innerHTML = ""; // reset container
    setRetry((r) => r + 1); // trigger re-run
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-100 flex flex-col">
      <Navbar />

      <div className="pt-28 px-4 sm:px-6 lg:px-8 pb-16 flex justify-center relative">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/70 z-10">
            <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500 border-opacity-70"></div>
          </div>
        )}

        <div className="w-full flex justify-center">
          {loadError ? (
            <div className="w-full max-w-lg sm:max-w-xl bg-white p-6 rounded-xl shadow-lg border border-gray-200">
              <h2 className="text-lg sm:text-xl font-semibold text-red-600 mb-2">
                ⚠️ Unable to load Visme form
              </h2>
              <p className="text-gray-700 mb-4 text-sm sm:text-base">
                Please fill out the fallback form or try loading again.
              </p>

              {/* Fallback Form */}
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-2 border rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Message</label>
                  <textarea
                    className="w-full px-4 py-2 border rounded-md"
                    rows="4"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition w-full sm:w-auto"
                >
                  Submit
                </button>
              </form>

              <button
                onClick={handleRetry}
                className="mt-6 text-sm text-blue-600 underline hover:text-blue-800"
              >
                🔁 Try loading Visme again
              </button>
            </div>
          ) : (
            <div
              ref={vismeRef}
              className="visme_d w-full max-w-lg sm:max-w-xl h-[700px] sm:h-[800px] bg-white rounded-xl shadow-lg border border-gray-200"
              data-title="Start Up Subscription Form"
              data-url="op60687e-start-up-subscription-form"
              data-domain="forms"
              data-min-height="800px"
              data-form-id="138726"
            ></div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CompanyRegistrationForm;