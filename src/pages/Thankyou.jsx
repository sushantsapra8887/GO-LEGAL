import React from "react";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import deliveryAnimation from "../lottie/Delivery.json"; 
const ThankYou = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e8f0fe] to-[#a2bedb] flex items-center justify-center p-4">
      <div className="backdrop-blur-xl bg-white/30 border border-blue-900 rounded-2xl p-8 max-w-md w-full shadow-2xl text-center">
        <div className="w-36 mx-auto mb-4">
          <Lottie animationData={deliveryAnimation} loop={true} />
        </div>
        <h1 className="text-3xl font-bold text-green-700 mb-2">Payment Successful!</h1>
        <p className="text-gray-800 mb-3 text-lg font-medium">
          Your order has been received.
        </p>
        <p className="text-gray-700 mb-4">
          You will get notified once our delivery partner is on their way — you'll get your legal package shortly!
        </p>
        <div className="text-sm text-gray-600 mb-6">
          <p><strong>Plan:</strong> Startup Legal Support</p>
          <p><strong>Transaction ID:</strong> #TXN12345678</p>
        </div>
        
<Link to="/#home">
  <button className="px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all duration-200">
    Go to Main Page
  </button>
</Link>
        <div className="mt-6 text-sm text-gray-500">
          Need help? <a href="/contact" className="underline">Contact us</a>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;