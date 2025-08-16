// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Hero from "./components/Hero";
import Testimonials from "./components/Testimonials";
import About from "./components/About";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ChoosePath from "./components/ChoosePath";
import Navbar from "./components/Navbar";
import { ContentProvider, useContent } from "./Contentcontext";
import LegalPlans from "./pages/LegalPlans";
import CompanyRegistrationForm from "./pages/CompanyRegistrationForm";
import ContractDraftingPlans from "./pages/ContractDraftingPlans";
import ConsultationPlans from "./pages/ConsultationPlans";
import LegalNoticePlans from "./pages/LegalNoticePlans";
import { Toaster } from "react-hot-toast";
import Education from "./pages/Education";
import CartPage from "./pages/CartPage";
import { CartProvider } from "./CONTEXT/CartContext";
import WhyChooseUs from "./components/WhyChooseUs";
import ScrollToHashElement from "./components/ScrolltoHash";
import Payment from "./pages/Payment";
import ThankYou from "./pages/Thankyou"; 
import OurClients from "./components/OurClients";
import Stats from "./components/Stats";
import SearchPage from "./pages/SearchPage"; // ✅ Import added

const AppRoutes = () => {
  const content = useContent();

  if (Object.keys(content).length === 0) {
    return <div className="text-center mt-20 text-lg">Loading GoLegal...</div>;
  }

  return (
    <Router>
      <main className="bg-white text-gray-900">
        <Toaster position="top-center" reverseOrder={false} toastOptions={{ duration: 2000 }} />

        <Routes>
          <Route
            path="/"
            element={
              <>
                <Navbar />
                <section id="home">
                  <Hero />
                  <section id="about">
                    <About />
                  </section>
                  <OurClients />
                </section>
                <section id="services">
                  <ChoosePath />
                </section>
                <Stats />
                <WhyChooseUs />
                <Testimonials />
                <section id="contact">
                  <Footer />
                </section>
                <ScrollToHashElement />
              
              </>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/legal-plans" element={<LegalPlans />} />
          <Route path="/start-registration" element={<CompanyRegistrationForm />} />
          <Route path="/request-contract" element={<ContractDraftingPlans />} />
          <Route path="/consultation" element={<ConsultationPlans />} />
          <Route path="/legal-notice" element={<LegalNoticePlans />} />
          <Route path="/training" element={<Education />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/thankyou" element={<ThankYou />} />
          <Route path="/search" element={<SearchPage />} /> {/* ✅ Route fixed */}
        </Routes>
      </main>
    </Router>
  );
};

function App() {
  return (
    <CartProvider>
      <ContentProvider>
        <AppRoutes />
      </ContentProvider>
    </CartProvider>
  );
}

export default App;