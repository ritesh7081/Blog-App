import React from "react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

function Layout({ children }) {
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950">

      {/* Header */}
      <Header />

      {/* Animated Page Content */}
      <main className="grow">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.35 }}
          className="max-w-7xl mx-auto px-6 py-10"
        >
          {children}
        </motion.div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Layout;