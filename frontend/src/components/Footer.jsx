import { FaFacebookF, FaInstagram, FaPinterestP } from 'react-icons/fa'
import logo from '../assets/OLLY LOGO white.png'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-black text-white px-4 sm:px-6 py-10 sm:py-12">
      {/* Top Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center sm:text-left">
        
        {/* Our Collections */}
        <div className="flex flex-col items-center sm:items-start">
          <h4 className="font-semibold mb-4 text-sm">OUR COLLECTIONS</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><Link to="/frock" className="hover:text-white transition">FROCK</Link></li>
            <li><Link to="/blouse" className="hover:text-white transition">BLOUSE</Link></li>
            <li><Link to="/skirt" className="hover:text-white transition">SKIRT</Link></li>
          </ul>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col items-center sm:items-start">
          <h4 className="font-semibold mb-4 text-sm">QUICK LINKS</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><Link to="/about" className="hover:text-white transition">About Us</Link></li>
            <li><Link to="/faq" className="hover:text-white transition">FAQ</Link></li>
            <li><Link to="/size-guide" className="hover:text-white transition">Size Guide</Link></li>
            <li><Link to="/contact" className="hover:text-white transition">Contact Us</Link></li>
            <li><Link to="/privacy-policy" className="hover:text-white transition">Privacy Policy</Link></li>
          </ul>
        </div>

        {/* Follow Us */}
        <div className="flex flex-col items-center sm:items-start">
          <h4 className="font-semibold mb-4 text-sm">FOLLOW US</h4>
          <div className="flex justify-center sm:justify-start space-x-4 text-lg">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebookF className="hover:text-gray-400" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="hover:text-gray-400" />
            </a>
            <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer">
              <FaPinterestP className="hover:text-gray-400" />
            </a>
          </div>
        </div>

        {/* Help */}
        <div className="flex flex-col items-center sm:items-start">
          <h4 className="font-semibold mb-4 text-sm">HERE TO HELP</h4>
          <p className="text-sm text-gray-300">
            <Link to="/support" className="hover:text-white transition">Customer care support</Link>
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-10 border-t border-gray-700 pt-6 flex flex-col md:flex-row justify-center md:justify-between items-center gap-4 text-center md:text-left">
        
        {/* Logo and copyright */}
        <div className="flex flex-col sm:flex-row items-center gap-2 text-sm text-gray-400">
          <img src={logo} alt="Olly Logo" className="h-8 w-auto" />
          <span>Copyright © 2025, <strong>OLLY</strong>.</span>
        </div>

        {/* Payment Icons */}
        <div className="flex flex-wrap justify-center gap-3">
          <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png" alt="Mastercard" className="h-6" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png" alt="Mastercard" className="h-6" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg" alt="Visa" className="h-6" />
        </div>
      </div>
    </footer>
  )
}

export default Footer
