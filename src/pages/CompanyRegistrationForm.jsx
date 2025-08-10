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
      logWithTime("⏳ Attempting to load Visme embed script...");

      const existingScript = document.getElementById(scriptId);
      if (existingScript) {
        logWithTime("🔁 Existing Visme script found. Removing...");
        existingScript.remove();
      }

      const script = document.createElement("script");
      script.src = "https://static-bundles.visme.co/forms/vismeforms-embed.js";
      script.id = scriptId;
      script.async = true;
      script.onload = () => {
        logWithTime("✅ Visme embed script loaded successfully.");
      };
      script.onerror = () => {
        logWithTime("❌ Failed to load Visme script.", "error");
        setLoadError(true);
        setIsLoading(false);
      };

      document.body.appendChild(script);
      logWithTime("📜 Visme script appended to DOM.");
    };

    const initializeEmbed = () => {
      if (vismeRef.current) {
        if (vismeRef.current.children.length === 0) {
          logWithTime("📦 Visme container is empty. Injecting script...");
          loadVismeScript();
        } else {
          logWithTime("✅ Visme form already partially/fully loaded.");
          setIsLoading(false);
        }
      } else {
        logWithTime("🚫 vismeRef is not attached properly.", "warn");
        setLoadError(true);
        setIsLoading(false);
      }
    };

    const timer = setTimeout(() => {
      logWithTime("⏱ DOM mount delay completed. Checking embed...");
      initializeEmbed();

      const safetyTimeout = setTimeout(() => {
        if (vismeRef.current?.children.length > 0) {
          logWithTime("✅ Visme embed successfully rendered.");
          setLoadError(false);
        } else {
          logWithTime("⚠️ Visme embed still not visible. Using fallback form.", "warn");
          setLoadError(true);
        }
        setIsLoading(false);
      }, 6000);

      return () => clearTimeout(safetyTimeout);
    }, 100);

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

      <div className="pt-32 px-4 pb-16 flex justify-center relative">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/70 z-10">
            <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500 border-opacity-70"></div>
          </div>
        )}

        <div className="w-full flex justify-center px-4">
          {loadError ? (
            <div className="w-full max-w-xl bg-white p-6 rounded-xl shadow-lg border border-gray-900">
              <h2 className="text-xl font-semibold text-red-600 mb-2">⚠️ Unable to load Visme form</h2>
              <p className="text-gray-700 mb-4">
                Please fill out the fallback form or try loading again.
              </p>

              {/* Fallback Form */}
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <input type="text" className="w-full px-4 py-2 border rounded-md" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input type="email" className="w-full px-4 py-2 border rounded-md" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Message</label>
                  <textarea className="w-full px-4 py-2 border rounded-md" rows="4" required />
                </div>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
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
              className="visme_d w-full max-w-xl h-[800px] bg-white rounded-xl shadow-lg border border-gray-900"
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