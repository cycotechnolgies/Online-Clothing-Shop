import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { FaUser, FaShoppingBag, FaSearch, FaBars, FaTimes, FaChevronDown } from 'react-icons/fa'
import logo from '../assets/OLLY LOGO.png'

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState(null) // 'clothing' | 'collections' | null

  const dropdownRef = useRef(null)
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const toggleDropdown = (menu) => {
    setOpenDropdown(openDropdown === menu ? null : menu)
  }

  // Dropdown animation classes
  const baseMenuClasses =
    "absolute top-full left-0 w-60 bg-gradient-to-br from-white to-gray-100 border border-gray-300 rounded-xl shadow-2xl z-50 backdrop-blur-md " +
    // hidden state
    "opacity-0 invisible -translate-y-1 scale-95 pointer-events-none " +
    // transition
    "transition ease-out duration-200 will-change-transform " +
    // desktop hover keeps open
    "lg:group-hover:opacity-100 lg:group-hover:visible lg:group-hover:translate-y-0 lg:group-hover:scale-100 lg:group-hover:pointer-events-auto"

  const openMenuClasses =
    "opacity-100 visible translate-y-0 scale-100 pointer-events-auto"

  return (
    <header className="w-full border-b border-gray-200 shadow-sm bg-white">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">

        {/* Logo */}
        <Link to="/" className="text-[15px] md:text-base font-bold tracking-wide">
          <img src={logo} alt="Olly Logo" className="h-9 md:h-10 w-auto" />
        </Link>

        {/* Desktop Navigation (only from lg and up) */}
        <nav
          className="hidden lg:flex space-x-6 text-[15px] md:text-base font-medium relative"
          ref={dropdownRef}
        >
          {/* CLOTHING */}
          <div className="relative group">
            <button
              onClick={() => toggleDropdown('clothing')}
              className="flex items-center cursor-pointer text-[15px] md:text-base font-semibold text-gray-800 hover:text-black transition-colors duration-200 focus:outline-none"
              aria-expanded={openDropdown === 'clothing'}
              aria-haspopup="true"
            >
              CLOTHING <FaChevronDown className="ml-1 text-xs" />
            </button>

            <ul className={baseMenuClasses + " " + (openDropdown === 'clothing' ? openMenuClasses : "")}>
              {['FROCK', 'BLOUSE', 'SKIRT'].map(item => (
                <li key={item}>
                  <Link
                    to={`/clothing/${item.toLowerCase()}`}
                    className="block px-5 py-4 text-[15px] md:text-base text-gray-800 hover:text-white hover:bg-teal-900 rounded-md transition-colors duration-200"
                    onClick={() => setOpenDropdown(null)}
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COLLECTIONS */}
          <div className="relative group">
            <button
              onClick={() => toggleDropdown('collections')}
              className="flex items-center cursor-pointer text-[15px] md:text-base font-semibold text-gray-800 hover:text-black transition-colors duration-200 focus:outline-none"
              aria-expanded={openDropdown === 'collections'}
              aria-haspopup="true"
            >
              COLLECTIONS <FaChevronDown className="ml-1 text-xs" />
            </button>

            <ul className={baseMenuClasses + " " + (openDropdown === 'collections' ? openMenuClasses : "")}>
              {['Summer', 'Winter', 'Limited'].map(item => (
                <li key={item}>
                  <Link
                    to={`/collections/${item.toLowerCase()}`}
                    className="block px-5 py-4 text-[15px] md:text-base text-gray-800 hover:text-white hover:bg-teal-900 rounded-md transition-colors duration-200"
                    onClick={() => setOpenDropdown(null)}
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Other links */}
          <Link to="/new-arrivals">NEW ARRIVALS</Link>
          <Link to="/sale" className="text-red-500">SALE</Link>
        </nav>

        {/* Mobile Menu Button (visible < lg) */}
        <button
          className="lg:hidden text-2xl"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Right Side Icons (desktop only) */}
        <div className="hidden lg:flex items-center space-x-4">
          <Link to="/login" className="bg-black text-white text-[15px] md:text-base px-4 py-1.5 rounded-sm hover:bg-gray-800 transition-colors duration-200">
            Login
          </Link>
          <Link to="/profile" aria-label="Profile">
            <FaUser className="text-xl cursor-pointer" />
          </Link>
          <Link to="/cart" className="flex items-center text-[15px] md:text-base">
            <FaShoppingBag className="text-lg mr-1" />
            <span>Bag (0)</span>
          </Link>
        </div>
      </div>

      {/* Mobile / Tablet Nav (visible < lg) */}
      {mobileMenuOpen && (
        <div className="lg:hidden px-4 pb-4 text-[15px] md:text-base font-medium flex flex-col items-start space-y-2 border-b border-gray-200 bg-white shadow-md">

          {/* CLOTHING (accordion) */}
          <div className="w-full">
            <button
              onClick={() => toggleDropdown('clothing')}
              className="w-full flex justify-between items-center py-3 px-4 font-semibold text-gray-800 bg-gray-100 rounded-md hover:bg-gray-200 transition"
            >
              CLOTHING <FaChevronDown className={`text-xs transition-transform ${openDropdown === 'clothing' ? 'rotate-180' : ''}`} />
            </button>
            {openDropdown === 'clothing' && (
              <div className="pl-5 mt-1 flex flex-col space-y-1 bg-gray-50 rounded-md py-2">
                {['Frock', 'Blouse', 'Skirt'].map(item => (
                  <Link
                    key={item}
                    to={`/clothing/${item.toLowerCase()}`}
                    onClick={() => { setMobileMenuOpen(false); setOpenDropdown(null) }}
                    className="px-2 py-2 hover:bg-teal-900 hover:text-white text-gray-700 rounded-md"
                  >
                    {item}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* COLLECTIONS (accordion) */}
          <div className="w-full">
            <button
              onClick={() => toggleDropdown('collections')}
              className="w-full flex justify-between items-center py-3 px-4 font-semibold text-gray-800 bg-gray-100 rounded-md hover:bg-gray-200 transition"
            >
              COLLECTIONS <FaChevronDown className={`text-xs transition-transform ${openDropdown === 'collections' ? 'rotate-180' : ''}`} />
            </button>
            {openDropdown === 'collections' && (
              <div className="pl-5 mt-1 flex flex-col space-y-1 bg-gray-50 rounded-md py-2">
                {['Summer', 'Winter', 'Limited'].map(item => (
                  <Link
                    key={item}
                    to={`/collections/${item.toLowerCase()}`}
                    onClick={() => { setMobileMenuOpen(false); setOpenDropdown(null) }}
                    className="px-2 py-2 hover:bg-teal-900 hover:text-white text-gray-700 rounded-md"
                  >
                    {item}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Other links */}
          <Link to="/new-arrivals" onClick={() => setMobileMenuOpen(false)} className="py-2 px-3 hover:bg-gray-100 rounded-md w-full">NEW ARRIVALS</Link>
          <Link to="/sale" onClick={() => setMobileMenuOpen(false)} className="text-red-500 py-2 px-3 hover:bg-red-100 rounded-md w-full">SALE</Link>
          <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="bg-black text-white px-4 py-3 rounded-md text-center w-full hover:bg-gray-800">Login</Link>
          <Link to="/profile" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 px-3 py-2 w-full hover:bg-gray-100 rounded-md">
            <FaUser className="text-xl" /> Profile
          </Link>
          <Link to="/cart" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 px-3 py-2 w-full hover:bg-gray-100 rounded-md">
            <FaShoppingBag className="text-lg" />
            <span>Bag (0)</span>
          </Link>
        </div>
      )}

      {/* Search Bar (kept below header; a bit larger) */}
      <div className="w-full border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 py-2 flex justify-end items-center space-x-2">
          <input
            type="text"
            placeholder="Search..."
            className="border border-gray-300 rounded-md px-3 py-1.5 text-[15px] md:text-base focus:outline-none focus:ring-2 focus:ring-black w-full sm:w-auto"
          />
          <button className="bg-black text-white px-3 py-1.5 rounded-md text-[15px] md:text-base hover:bg-gray-800 transition-colors duration-200">
            <FaSearch />
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
