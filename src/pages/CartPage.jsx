import React, { useEffect, useState } from "react";
import { useCart } from "../CONTEXT/CartContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Player } from "@lottiefiles/react-lottie-player";
import emptyCartAnimation from "../lottie/empty.json";
import { useNavigate } from "react-router-dom";


const CartPage = () => {
  const navigate = useNavigate();
  const {
    cartItems,
    removeFromCart,
    clearCart,
  } = useCart();

  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Group by category/type (fallback to "Others")
  const groupedItems = cartItems.reduce((groups, item) => {
    const key = item.category || item.type || "Others";
    if (!groups[key]) groups[key] = [];
    groups[key].push(item);
    return groups;
  }, {});

  const toggleSelect = (itemKey) => {
    setSelectedItems((prev) =>
      prev.includes(itemKey)
        ? prev.filter((key) => key !== itemKey)
        : [...prev, itemKey]
    );
  };

  const getSelectedTotal = () => {
  return cartItems
    .filter((item) => selectedItems.includes(`${item.id}-${item.name}`))
    .reduce((acc, item) => acc + Number(item.price || 0), 0);
};

  const proceedToPayment = () => {
  const selectedCartItems = cartItems.filter((item) =>
    selectedItems.includes(`${item.id}-${item.name}`)
  );

  if (selectedCartItems.length === 0) {
    alert("Please select at least one item to proceed.");
    return;
  }

  const totalAmount = selectedCartItems.reduce(
    (acc, item) => acc + Number(item.price || 0),
    0
  );

  navigate("/payment", {
    state: {
      items: selectedCartItems,
      total: totalAmount,
    },
  });
};

  const getCategoryHeading = (type) => {
    switch (type) {
      case "consultationPlans":
      case "appointment":
        return "Consultation Call Appointment";
      case "legalnotice":
        return "Legal Notice & Compliance";
      case "contractdrafting":
        return "Contract Drafting";
      case "education":
        return "Education Plans";
      default:
        return type.replaceAll("-", " ");
    }
  };

  return (
    
    <>
    
      <Navbar />
      <div className="pt-24 max-w-10xl mx-auto p-6 min-h-[80vh] bg-gradient-to-br from-blue-100 via-white to-blue-100" >
        
        <h2 className="text-5xl font-extrabold text-gray-700 mb-6 text-center">Your Cart</h2>

        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center">
            <Player
              autoplay
              loop
              src={emptyCartAnimation}
              className="w-64 h-64"
            />
            <p className="text-gray-600 mt-4 text-lg font-medium">
              Your cart is empty.
            </p>
          </div>
        ) : (
          <>
            {Object.entries(groupedItems).map(([type, items]) => (
              <div key={type} className="mb-10 border rounded-lg p-4 shadow-sm">
                <h3 className="text-xl font-semibold mb-3 border-b pb-2">
                  {getCategoryHeading(type)}
                </h3>
                <ul className="space-y-4">
                  {items.map((item) => {
                    const itemKey = `${item.id}-${item.name}`;
                    const isConsultation =
                      item.type === "consultationPlans" ||
                      item.type === "appointment";
                    const isEducation = item.type === "education" || item.category === "education";

                    return (
                      <li
                        key={itemKey}
                        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b pb-4"
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={selectedItems.includes(itemKey)}
                            onChange={() => toggleSelect(itemKey)}
                            className="accent-blue-600 scale-125"
                          />
                          <div>
                            <h4 className="font-semibold text-lg">{item.name}</h4>
                            <p className="text-gray-600 text-sm">₹{item.price}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => removeFromCart(item.id, item.name)}
                            className="text-red-500 hover:underline ml-4"
                          >
                            Remove
                          </button>
                        </div>

                        {isConsultation && item.details && !isEducation && (
                          <div className="bg-blue-50 p-3 mt-2 rounded-md text-sm text-gray-800 shadow">
                            <p><strong>Client Name:</strong> {item.details.name}</p>
                            <p><strong>Email:</strong> {item.details.email}</p>
                            <p><strong>Date:</strong> {item.details.date}</p>
                            <p><strong>Time:</strong> {item.details.time}</p>
                          </div>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}

            {selectedItems.length > 0 && (
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-8 border-t pt-6">
                <h4 className="text-xl font-semibold">
                  Total: ₹{getSelectedTotal()}
                </h4>
                <div className="flex gap-4">
                  <button
                    onClick={clearCart}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    Clear Cart
                  </button>
                  <button
                    onClick={proceedToPayment}
                    className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700"
                  >
                    Proceed to Payment
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default CartPage;