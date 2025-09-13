import { FaFacebookF, FaInstagram, FaPinterestP, FaTwitter, FaYoutube } from 'react-icons/fa'
import { MdEmail, MdPhone, MdLocationOn } from 'react-icons/md'
import logo from '../assets/OLLY LOGO white.png'
import { Link } from 'react-router-dom'

const Footer = () => {
  // onClick handler functions for different types of links
  const handleCollectionClick = (category) => {
    console.log(`Navigating to ${category} collection`);
    // Add analytics tracking, state updates, or other logic here
  };

  const handleCustomerCareClick = (page) => {
    console.log(`Navigating to ${page} page`);
    // Add analytics tracking, state updates, or other logic here
  };

  const handleLegalClick = (page) => {
    console.log(`Navigating to ${page} page`);
    // Add analytics tracking, state updates, or other logic here
  };

  const handleSocialMediaClick = (platform) => {
    console.log(`Opening ${platform} in new tab`);
    // Add analytics tracking for social media clicks
  };

  const handleNewsletterSubmit = () => {
    console.log('Newsletter subscription attempted');
    // Add newsletter subscription logic here
  };

  return (
  <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-repeat" style={{
          backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"0.1\"%3E%3Ccircle cx=\"30\" cy=\"30\" r=\"2\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')"
        }}></div>
      </div>

  <div className="relative px-4 lg:px-6 py-8">
        {/* Newsletter Section */}
        <div className="max-w-7xl mx-auto mb-4">
          <div className="bg-gray-800 border border-gray-700 rounded-2xl p-2 lg:p-3 text-center">
            <h3 className="text-lg lg:text-xl font-bold mb-2">Stay in Style</h3>
            <p className="text-gray-300 mb-4 max-w-xl mx-auto text-sm">
              Subscribe to our newsletter for updates and offers.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 max-w-xs mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-full text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 text-sm"
              />
              <button 
                onClick={handleNewsletterSubmit}
                className="bg-white text-gray-900 px-4 py-2 rounded-full font-semibold hover:bg-gray-200 transition-colors duration-300 text-sm">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
  <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center lg:text-left">
          
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex justify-center lg:justify-start mb-6">
              <img src={logo} alt="Olly Logo" className="h-12 w-auto" />
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              OLLY brings you the finest collection of contemporary women's fashion. 
              Discover elegance, comfort, and style in every piece.
            </p>
            <div className="flex justify-center lg:justify-start space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" 
                 onClick={() => handleSocialMediaClick('Facebook')}
                 className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-rose-600 transition-colors duration-300">
                <FaFacebookF />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" 
                 onClick={() => handleSocialMediaClick('Instagram')}
                 className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-rose-600 transition-colors duration-300">
                <FaInstagram />
              </a>
              <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" 
                 onClick={() => handleSocialMediaClick('Pinterest')}
                 className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-rose-600 transition-colors duration-300">
                <FaPinterestP />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" 
                 onClick={() => handleSocialMediaClick('Twitter')}
                 className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-rose-600 transition-colors duration-300">
                <FaTwitter />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" 
                 onClick={() => handleSocialMediaClick('YouTube')}
                 className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-rose-600 transition-colors duration-300">
                <FaYoutube />
              </a>
            </div>
          </div>

          {/* Collections */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">Our Collections</h4>
            <ul className="space-y-3">
              <li><Link to="/frock" onClick={() => handleCollectionClick('Frocks')} className="text-gray-300 hover:text-rose-400 transition-colors duration-300 flex items-center justify-center lg:justify-start">
                <span className="border-b border-transparent hover:border-rose-400 pb-1">Frocks</span>
              </Link></li>
              <li><Link to="/blouse" onClick={() => handleCollectionClick('Blouses')} className="text-gray-300 hover:text-rose-400 transition-colors duration-300 flex items-center justify-center lg:justify-start">
                <span className="border-b border-transparent hover:border-rose-400 pb-1">Blouses</span>
              </Link></li>
              <li><Link to="/skirt" onClick={() => handleCollectionClick('Skirts')} className="text-gray-300 hover:text-rose-400 transition-colors duration-300 flex items-center justify-center lg:justify-start">
                <span className="border-b border-transparent hover:border-rose-400 pb-1">Skirts</span>
              </Link></li>
              <li><Link to="/dress" onClick={() => handleCollectionClick('Dresses')} className="text-gray-300 hover:text-rose-400 transition-colors duration-300 flex items-center justify-center lg:justify-start">
                <span className="border-b border-transparent hover:border-rose-400 pb-1">Dresses</span>
              </Link></li>
              <li><Link to="/accessories" onClick={() => handleCollectionClick('Accessories')} className="text-gray-300 hover:text-rose-400 transition-colors duration-300 flex items-center justify-center lg:justify-start">
                <span className="border-b border-transparent hover:border-rose-400 pb-1">Accessories</span>
              </Link></li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">Customer Care</h4>
            <ul className="space-y-3">
              <li><Link to="/about" onClick={() => handleCustomerCareClick('About Us')} className="text-gray-300 hover:text-rose-400 transition-colors duration-300 flex items-center justify-center lg:justify-start">
                <span className="border-b border-transparent hover:border-rose-400 pb-1">About Us</span>
              </Link></li>
              <li><Link to="/contact" onClick={() => handleCustomerCareClick('Contact Us')} className="text-gray-300 hover:text-rose-400 transition-colors duration-300 flex items-center justify-center lg:justify-start">
                <span className="border-b border-transparent hover:border-rose-400 pb-1">Contact Us</span>
              </Link></li>
              <li><Link to="/size-guide" onClick={() => handleCustomerCareClick('Size Guide')} className="text-gray-300 hover:text-rose-400 transition-colors duration-300 flex items-center justify-center lg:justify-start">
                <span className="border-b border-transparent hover:border-rose-400 pb-1">Size Guide</span>
              </Link></li>
              <li><Link to="/shipping" onClick={() => handleCustomerCareClick('Shipping Info')} className="text-gray-300 hover:text-rose-400 transition-colors duration-300 flex items-center justify-center lg:justify-start">
                <span className="border-b border-transparent hover:border-rose-400 pb-1">Shipping Info</span>
              </Link></li>
              <li><Link to="/returns" onClick={() => handleCustomerCareClick('Returns')} className="text-gray-300 hover:text-rose-400 transition-colors duration-300 flex items-center justify-center lg:justify-start">
                <span className="border-b border-transparent hover:border-rose-400 pb-1">Returns</span>
              </Link></li>
              <li><Link to="/faq" onClick={() => handleCustomerCareClick('FAQ')} className="text-gray-300 hover:text-rose-400 transition-colors duration-300 flex items-center justify-center lg:justify-start">
                <span className="border-b border-transparent hover:border-rose-400 pb-1">FAQ</span>
              </Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">Get in Touch</h4>
            <div className="space-y-4">
              <div className="flex items-center justify-center lg:justify-start space-x-3">
                <MdLocationOn className="text-rose-400 text-xl" />
                <span className="text-gray-300">123 Fashion Street, Style City, SC 12345</span>
              </div>
              <div className="flex items-center justify-center lg:justify-start space-x-3">
                <MdPhone className="text-rose-400 text-xl" />
                <span className="text-gray-300">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center justify-center lg:justify-start space-x-3">
                <MdEmail className="text-rose-400 text-xl" />
                <span className="text-gray-300">hello@olly.com</span>
              </div>
            </div>
            <div className="mt-6 p-4 bg-gray-800/50 rounded-lg backdrop-blur-sm">
              <p className="text-sm text-gray-300 mb-2">Store Hours:</p>
              <p className="text-sm text-white">Mon - Sat: 9AM - 8PM</p>
              <p className="text-sm text-white">Sunday: 11AM - 6PM</p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
  <div className="max-w-7xl mx-auto mt-8 pt-4 border-t border-gray-700">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            
            {/* Copyright */}
            <div className="text-center lg:text-left">
              <p className="text-gray-400 text-sm">
                © 2025 <span className="text-white font-semibold">OLLY</span>. All rights reserved.
              </p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-4 mt-2">
                <Link to="/privacy-policy" onClick={() => handleLegalClick('Privacy Policy')} className="text-gray-400 hover:text-rose-400 text-xs transition-colors duration-300">Privacy Policy</Link>
                <span className="text-gray-600">•</span>
                <Link to="/terms" onClick={() => handleLegalClick('Terms of Service')} className="text-gray-400 hover:text-rose-400 text-xs transition-colors duration-300">Terms of Service</Link>
                <span className="text-gray-600">•</span>
                <Link to="/cookies" onClick={() => handleLegalClick('Cookie Policy')} className="text-gray-400 hover:text-rose-400 text-xs transition-colors duration-300">Cookie Policy</Link>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="flex flex-col items-center lg:items-end">
              <p className="text-gray-400 text-sm mb-3">Secure payments with</p>
              <div className="flex gap-3">
                <div className="bg-white rounded-lg p-2 hover:scale-105 transition-transform duration-300">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg" alt="Visa" className="h-6 w-10" />
                </div>
                <div className="bg-white rounded-lg p-2 hover:scale-105 transition-transform duration-300">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png" alt="Mastercard" className="h-6 w-10" />
                </div>
                <div className="bg-white rounded-lg p-2 hover:scale-105 transition-transform duration-300">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/American_Express_logo_%282018%29.svg" alt="American Express" className="h-6 w-10" />
                </div>
                <div className="bg-white rounded-lg p-2 hover:scale-105 transition-transform duration-300">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-6 w-10" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
