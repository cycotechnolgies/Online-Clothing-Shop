import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaShoppingBag, FaSearch, FaBars, FaTimes } from 'react-icons/fa';
import logo from '../assets/OLLY LOGO.png';
import { useAuth } from '../context/AuthContext'; // Import useAuth

const Header = () => {
  const { user, logout } = useAuth(); // Destructure logout from useAuth
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const navigate = useNavigate();

  const dropdownRef = useRef(null);
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = (menu) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  const handleLogout = () => {
    logout(); // Call the logout function from context
    setOpenDropdown(null);
    navigate('/'); // Redirect to the homepage after logout
  };

  return (
    <header className="w-full border-b border-gray-200 shadow-sm bg-white">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold tracking-wide">
          <img src={logo} alt="Olly Logo" className="h-8 w-auto" />
        </Link>

        <nav className="hidden md:flex space-x-6 text-sm font-medium relative" ref={dropdownRef}>
          <div className="relative">
            <button
              onClick={() => toggleDropdown('clothing')}
              className="flex items-center cursor-pointer text-sm font-semibold text-gray-800 hover:text-black transition-all duration-300 focus:outline-none"
              aria-expanded={openDropdown === 'clothing'}
              aria-haspopup="true"
            >
              CLOTHING <span className="ml-1">▼</span>
            </button>
            {openDropdown === 'clothing' && (
              <ul className="absolute left-0 mt-3 w-60 bg-gradient-to-br from-white to-gray-100 border border-gray-300 rounded-xl shadow-2xl z-30 backdrop-blur-md animate-dropdown">
                <li><Link to="/clothing/frock" className="block px-5 py-5 text-gray-800 hover:text-white hover:bg-teal-900 rounded-md transition-all duration-300" onClick={() => setOpenDropdown(null)}>FROCK</Link></li>
                <li><Link to="/clothing/blouse" className="block px-5 py-5 text-gray-800 hover:text-white hover:bg-teal-900 rounded-md transition-all duration-300" onClick={() => setOpenDropdown(null)}>BLOUSE</Link></li>
                <li><Link to="/clothing/skirt" className="block px-5 py-5 text-gray-800 hover:text-white hover:bg-teal-900 rounded-md transition-all duration-300" onClick={() => setOpenDropdown(null)}>SKIRT</Link></li>
              </ul>
            )}
          </div>

          <div className="relative">
            <button
              onClick={() => toggleDropdown('collections')}
              className="flex items-center cursor-pointer text-sm font-semibold text-gray-800 hover:text-black transition-all duration-300 focus:outline-none"
              aria-expanded={openDropdown === 'collections'}
              aria-haspopup="true"
            >
              COLLECTIONS <span className="ml-1">▼</span>
            </button>
            {openDropdown === 'collections' && (
              <ul className="absolute left-0 mt-3 w-60 bg-gradient-to-br from-white to-gray-100 border border-gray-300 rounded-xl shadow-2xl z-30 backdrop-blur-md animate-dropdown">
                <li><Link to="/collections/summer" className="block px-5 py-5 text-gray-800 hover:text-white hover:bg-teal-900 rounded-md transition-all duration-300" onClick={() => setOpenDropdown(null)}>Summer</Link></li>
                <li><Link to="/collections/winter" className="block px-5 py-5 text-gray-800 hover:text-white hover:bg-teal-900 rounded-md transition-all duration-300" onClick={() => setOpenDropdown(null)}>Winter</Link></li>
                <li><Link to="/collections/limited" className="block px-5 py-5 text-gray-800 hover:text-white hover:bg-teal-900 rounded-md transition-all duration-300" onClick={() => setOpenDropdown(null)}>Limited</Link></li>
              </ul>
            )}
          </div>

          <Link to="/new-arrivals">NEW ARRIVALS</Link>
          <Link to="/sale" className="text-red-500">SALE</Link>
        </nav>

        <button
          className="md:hidden text-xl"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => toggleDropdown('profile')}
                className="flex items-center text-sm font-medium text-gray-800 hover:text-black transition-all duration-300 focus:outline-none"
              >
                Hi, {user.name.split(' ')[0]} <span className="ml-1">▼</span>
              </button>
              {openDropdown === 'profile' && (
                <ul className="absolute right-0 mt-3 w-40 bg-gradient-to-br from-white to-gray-100 border border-gray-300 rounded-xl shadow-2xl z-30 backdrop-blur-md animate-dropdown">
                  <li><Link to="/profile" className="block px-5 py-5 text-gray-800 hover:text-white hover:bg-teal-900 rounded-md transition-all duration-300" onClick={() => setOpenDropdown(null)}>My Account</Link></li>
                  <li><Link to="/orders" className="block px-5 py-5 text-gray-800 hover:text-white hover:bg-teal-900 rounded-md transition-all duration-300" onClick={() => setOpenDropdown(null)}>My Orders</Link></li>
                  <li><button onClick={handleLogout} className="w-full text-left px-5 py-5 text-gray-800 hover:text-white hover:bg-teal-900 rounded-md transition-all duration-300">Logout</button></li>
                </ul>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className="bg-black text-white text-sm px-4 py-1 rounded-sm">
                Login
              </Link>
              <Link to="/profile" aria-label="Profile">
                <FaUser className="text-xl cursor-pointer" />
              </Link>
            </>
          )}
          <Link to="/cart" className="flex items-center text-sm">
            <FaShoppingBag className="text-lg mr-1" />
            <span>Bag (0)</span>
          </Link>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden px-4 pb-4 text-sm font-medium flex flex-col items-start space-y-2 border-b border-gray-200 bg-white shadow-md">
          <Link to="/clothing" onClick={() => setMobileMenuOpen(false)} className="py-2 px-3 hover:bg-gray-100 rounded-md w-full">CLOTHING</Link>
          <Link to="/collections" onClick={() => setMobileMenuOpen(false)} className="py-2 px-3 hover:bg-gray-100 rounded-md w-full">COLLECTIONS</Link>
          <Link to="/new-arrivals" onClick={() => setMobileMenuOpen(false)} className="py-2 px-3 hover:bg-gray-100 rounded-md w-full">NEW ARRIVALS</Link>
          <Link to="/sale" className="text-red-500 py-2 px-3 hover:bg-red-100 rounded-md w-full" onClick={() => setMobileMenuOpen(false)}>SALE</Link>
          
          {user ? (
            <>
              <div className="w-full">
                <button onClick={() => toggleDropdown('profile')} className="w-full flex justify-between items-center py-2 px-3 font-semibold text-gray-800 bg-gray-100 rounded-md hover:bg-gray-200 transition">
                  Hi, {user.name.split(' ')[0]} <span>{openDropdown === 'profile' ? '▲' : '▼'}</span>
                </button>
                {openDropdown === 'profile' && (
                  <div className="pl-5 mt-1 flex flex-col space-y-1 bg-gray-50 rounded-md py-2 transition-all duration-200">
                    <Link to="/profile" onClick={() => setMobileMenuOpen(false)} className="px-2 py-2 hover:bg-teal-900 hover:text-white text-gray-600">My Account</Link>
                    <Link to="/orders" onClick={() => setMobileMenuOpen(false)} className="px-2 py-2 hover:bg-teal-900 hover:text-white text-gray-600">My Orders</Link>
                    <button onClick={handleLogout} className="w-full text-left px-2 py-2 hover:bg-teal-900 hover:text-white text-gray-600">Logout</button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="bg-black text-white px-4 py-2 rounded-md text-center w-full hover:bg-gray-800 transition" onClick={() => setMobileMenuOpen(false)}>
                Login
              </Link>
              <Link to="/profile" className="flex items-center gap-2 px-3 py-2 w-full hover:bg-gray-100 rounded-md" onClick={() => setMobileMenuOpen(false)}>
                <FaUser className="text-xl" /> Profile
              </Link>
            </>
          )}

          <Link to="/cart" className="flex items-center gap-2 px-3 py-2 w-full hover:bg-gray-100 rounded-md" onClick={() => setMobileMenuOpen(false)}>
            <FaShoppingBag className="text-lg" />
            <span>Bag (0)</span>
          </Link>
        </div>
      )}

      <div className="w-full border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 py-2 flex justify-end items-center space-x-2">
          <input
            type="text"
            placeholder="Search..."
            className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-black"
          />
          <button className="bg-black text-white px-3 py-1 rounded-md text-sm hover:bg-gray-800">
            <FaSearch />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;