import { useEffect, useRef, useState } from "react";
import { FaFacebookF, FaInstagram, FaPinterestP } from 'react-icons/fa';
import { FiArrowUp } from "react-icons/fi";
import logo from '../assets/OLLY LOGO white.png';
import { Link } from 'react-router-dom';

const Footer = () => {
  const footerRef = useRef(null);
  const [showToTop, setShowToTop] = useState(false);

  useEffect(() => {
    // Show the button when the footer enters the viewport
    const obs = new IntersectionObserver(
      ([entry]) => setShowToTop(entry.isIntersecting),
      { root: null, threshold: 0.1 }
    );
    if (footerRef.current) obs.observe(footerRef.current);
    return () => obs.disconnect();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Floating back-to-top button (appears near footer; lifts above it) */}
      {showToTop && (
        <button
          onClick={scrollToTop}
          aria-label="Back to top"
          className={`fixed right-6 z-50 h-12 w-12 rounded-full bg-white text-black shadow-lg grid place-items-center hover:-translate-y-0.5 transition-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70
    ${showToTop ? 'bottom-24 md:bottom-28' : 'bottom-6'}`}
        >
          <FiArrowUp className="text-2xl" />
        </button>
      )}


      <footer ref={footerRef} className="bg-black text-white px-4 sm:px-6 py-10 sm:py-12">
        {/* Top Grid */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-center sm:text-left">

          {/* Our Collections */}
          <div className="flex flex-col items-center sm:items-start">
            <h4 className="font-semibold mb-2 text-lg sm:text-xl md:text-2xl">OUR COLLECTIONS</h4>
            <ul className="space-y-1 text-base md:text-lg text-gray-300">
              <li><Link to="/frock" className="hover:text-white transition">FROCK</Link></li>
              <li><Link to="/blouse" className="hover:text-white transition">BLOUSE</Link></li>
              <li><Link to="/skirt" className="hover:text-white transition">SKIRT</Link></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center sm:items-start">
            <h4 className="font-semibold mb-2 text-lg sm:text-xl md:text-2xl">QUICK LINKS</h4>
            <ul className="space-y-1 text-base md:text-lg text-gray-300">
              <li><Link to="/about" className="hover:text-white transition">About Us</Link></li>
              <li><Link to="/faq" className="hover:text-white transition">FAQ</Link></li>
              <li><Link to="/size-guide" className="hover:text-white transition">Size Guide</Link></li>
              <li><Link to="/contact" className="hover:text-white transition">Contact Us</Link></li>
              <li><Link to="/privacy-policy" className="hover:text-white transition">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* HERE TO HELP */}
          <div className="flex flex-col items-center sm:items-start">
            <h4 className="font-semibold mb-2 text-lg sm:text-xl md:text-2xl">HERE TO HELP</h4>
            <p className="text-base md:text-lg text-gray-300">
              <Link to="/support" className="hover:text-white transition">Customer care support</Link>
            </p>
          </div>

          {/* FOLLOW US */}
          <div className="flex flex-col items-center sm:items-start">
            <h4 className="font-semibold mb-3 text-lg sm:text-xl md:text-2xl text-center sm:text-left">
              FOLLOW US
            </h4>
            <div className="flex items-center justify-center sm:justify-start gap-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-gray-400 flex items-center justify-center">
                <FaFacebookF className="text-2xl" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-gray-400 flex items-center justify-center">
                <FaInstagram className="text-2xl" />
              </a>
              <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" aria-label="Pinterest" className="hover:text-gray-400 flex items-center justify-center">
                <FaPinterestP className="text-2xl" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 border-t border-gray-700 pt-4 flex flex-col md:flex-row justify-center md:justify-between items-center gap-3 text-center md:text-left">

          {/* Logo and copyright */}
          <div className="flex flex-col sm:flex-row items-center gap-2 text-sm text-gray-400">
            <img src={logo} alt="Olly Logo" className="h-8 w-auto" />
            <span>Copyright © 2025, <strong>OLLY</strong>.</span>
          </div>

          {/* Payment Icons (unchanged) */}
          <div className="flex flex-wrap justify-center gap-2">
            <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png" alt="Mastercard" className="h-6" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png" alt="Mastercard" className="h-6" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg" alt="Visa" className="h-6" />
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
