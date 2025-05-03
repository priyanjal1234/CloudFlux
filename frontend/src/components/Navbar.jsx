import React, { useState, useEffect } from "react";
import { Menu, X, BarChart3, BarChart } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        isScrolled
          ? "bg-dark-400/95 backdrop-blur-sm border-b border-dark-300"
          : "bg-transparent"
      }`}
    >
      <div className="container-custom">
        <div className="flex h-16 items-center justify-around">
          <div className="flex items-center">
            <a href="#" className="flex items-center space-x-2">
              <BarChart className="h-8 w-8 text-[#0EA5E9]" />

              <span className="font-bold text-xl text-white">CloudFlux</span>
            </a>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <a
              href="#features"
              className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
            >
              Features
            </a>
            <a
              href="#integrations"
              className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
            >
              Integrations
            </a>
            <a
              href="#testimonials"
              className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
            >
              Testimonials
            </a>
            <a
              href="#pricing"
              className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
            >
              Pricing
            </a>
            <a
              href="#calculator"
              className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
            >
              Calculator
            </a>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <Link to={'/login'} className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
              Login
            </Link>
            <Link to={'/register'} className="px-5 py-2 bg-[#0EA5E9] rounded-lg text-white">Sign up</Link>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-gray-400 hover:text-white transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden border-t border-dark-300 bg-dark-400"
        >
          <div className="container-custom py-4 space-y-3">
            <a
              href="#features"
              className="block px-3 py-2 text-gray-300 hover:text-white transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Features
            </a>
            <a
              href="#integrations"
              className="block px-3 py-2 text-gray-300 hover:text-white transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Integrations
            </a>
            <a
              href="#testimonials"
              className="block px-3 py-2 text-gray-300 hover:text-white transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Testimonials
            </a>
            <a
              href="#pricing"
              className="block px-3 py-2 text-gray-300 hover:text-white transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Pricing
            </a>
            <a
              href="#calculator"
              className="block px-3 py-2 text-gray-300 hover:text-white transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Calculator
            </a>
            <div className="pt-4 border-t border-dark-300 flex flex-col space-y-3">
              <a
                href="#"
                className="px-3 py-2 text-gray-300 hover:text-white transition-colors"
              >
                Login
              </a>
              <a href="#" className="btn btn-primary mx-3">
                Get Started
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
};
