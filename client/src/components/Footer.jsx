import { FaTwitter, FaFacebook, FaInstagram } from "react-icons/fa"; // Import icons for social sites

import RelateAI from "../assets/RelateAI.png";

export default function Footer() {
  return (
    <footer className="w-full z-50 my-8">
    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex flex-1 items-center justify-start sm:items-stretch sm:justify-start ">
            <a
              href="/"
              className="flex flex-shrink-0 items-center sm:justify-start"
            >
              <img
                className="h-12 w-auto  pointer-events-none select-none"
                src={RelateAI}
                alt="RelateAI"
              />
            </a>
          </div>
          <div className="flex justify-end">
            <div className="flex mt-4 sm:justify-center sm:mt-0">
              {/* Social media icons... */}
              <a href="/" className="text-gray-500 hover:text-gray-700 mr-4">
                <FaTwitter />
              </a>
              <a href="/" className="text-gray-500 hover:text-gray-700 mr-4">
                <FaFacebook />
              </a>
              <a href="/" className="text-gray-500 hover:text-gray-700 mr-4">
                <FaInstagram />
              </a>
            </div>
          </div>
        </div>
        <hr className="my-2 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-4" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
            <a href="/about" className="text-gray-500 hover:text-gray-700 mr-4">
              Policies & Terms
            </a>
            <a href="/about" className="text-gray-500 hover:text-gray-700 mr-4">
              About
            </a>
            <a href="/about" className="text-gray-500 hover:text-gray-700 mr-4">
              Core
            </a>
            <a
              href="/feedback"
              className="text-gray-500 hover:text-gray-700 mr-4"
            >
              Feedback
            </a>
            <a href="/about" className="text-gray-500 hover:text-gray-700 mr-4">
              Help & Support
            </a>
          </span>
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © 2024 RelateAI™. All Rights Reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}
