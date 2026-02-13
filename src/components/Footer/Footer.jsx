import React from "react";
import { Link } from "react-router-dom";
import Logo from "../Logo";

function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 dark:bg-gray-900 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-6 py-14">

        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <Logo />
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                Writely
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              Express your ideas. Inspire the world. Repeat your success.
              Writely is a modern blogging platform built for creators.
            </p>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-5">
              Company
            </h3>
            <ul className="space-y-3">
              {["About", "Features", "Pricing", "Careers"].map((item) => (
                <li key={item}>
                  <Link
                    to="/"
                    className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-white transition"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-5">
              Support
            </h3>
            <ul className="space-y-3">
              {["Help Center", "Contact", "Account", "Status"].map((item) => (
                <li key={item}>
                  <Link
                    to="/"
                    className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-white transition"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-5">
              Legal
            </h3>
            <ul className="space-y-3">
              {["Terms", "Privacy Policy", "Cookies", "Licensing"].map(
                (item) => (
                  <li key={item}>
                    <Link
                      to="/"
                      className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-white transition"
                    >
                      {item}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-14 pt-8 border-t border-gray-200 dark:border-gray-700 flex flex-col md:flex-row items-center justify-between text-sm text-gray-500 dark:text-gray-400">
          <p>
            © {new Date().getFullYear()} Writely. All rights reserved.
          </p>

          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/" className="hover:text-blue-600 transition">
              Twitter
            </Link>
            <Link to="/" className="hover:text-blue-600 transition">
              GitHub
            </Link>
            <Link to="/" className="hover:text-blue-600 transition">
              LinkedIn
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;