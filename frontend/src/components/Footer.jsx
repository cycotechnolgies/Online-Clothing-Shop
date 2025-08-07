
import { FaFacebookF, FaInstagram, FaPinterestP } from 'react-icons/fa'
import logo from '../assets/OLLY LOGO white.png'

const Footer = () => {
  return (
    <footer className="bg-black text-white px-6 py-12">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
        
        {/* Our Collections */}
        <div>
            <h4 className="font-semibold mb-4 text-sm">OUR COLLECTIONS</h4>
            <ul className="space-y-2 text-sm text-gray-300">
                <li>
                <a href="/collections/frock" className="hover:text-white transition">FROCK</a>
                </li>
                <li>
                <a href="/collections/blouse" className="hover:text-white transition">BLOUSE</a>
                </li>
                <li>
                <a href="/collections/skirt" className="hover:text-white transition">SKIRT</a>
                </li>
            </ul>
            </div>

            {/* Quick Links */}
            <div>
            <h4 className="font-semibold mb-4 text-sm">QUICK LINKS</h4>
            <ul className="space-y-2 text-sm text-gray-300">
                <li>
                <a href="/about" className="hover:text-white transition">About Us</a>
                </li>
                <li>
                <a href="/faq" className="hover:text-white transition">FAQ</a>
                </li>
                <li>
                <a href="/size-guide" className="hover:text-white transition">Size Guide</a>
                </li>
                <li>
                <a href="/contact" className="hover:text-white transition">Contact Us</a>
                </li>
                <li>
                <a href="/privacy-policy" className="hover:text-white transition">Privacy Policy</a>
                </li>
            </ul>
            </div>


            {/* Follow Us */}
            <div>
            <h4 className="font-semibold mb-4 text-sm">FOLLOW US</h4>
            <div className="flex items-center space-x-4 text-lg">

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
            <div>
            <h4 className="font-semibold mb-4 text-sm">HERE TO HELP</h4>
                <p className="text-sm text-gray-300">
                <a href="/support" className="hover:text-white transition">Customer care support</a>
                </p>
            </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-10 border-t border-gray-700 pt-6 flex flex-col md:flex-row justify-between items-center">
        {/* Logo and copyright */}
        <div className="flex items-center space-x-3 text-sm text-gray-400">
          <img src={logo} alt="Olly Logo" className="h-8 w-auto" />
          <span>Copyright © 2025, <strong>OLLY</strong>.</span>

        </div>

        {/* Payment Icons */}
        <div className="flex space-x-2 mt-4 md:mt-0">
          <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png" alt="Mastercard" className="h-6" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png" alt="Mastercard" className="h-6" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg" alt="Visa" className="h-6" />
        </div>
      </div>
    </footer>
  )
}

export default Footer
