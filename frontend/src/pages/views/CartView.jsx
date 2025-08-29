import React from 'react'
import CartItemCard from '../../components/CartItemCard.jsx'
import Card from '../../components/Card.jsx'
import Header from '../../components/Header.jsx'
import Footer from '../../components/Footer.jsx'
import { ArrowLeft, RefreshCw } from 'lucide-react'

const Cartview = () => {
  // Example product data (replace with real cart data from state/props)
  const cartItems = [
    {
      id: 1,
      name: "V Neck Mandarine Collar Top-Blue",
      size: "XS",
      price: 3690,
      quantity: 1,
      image: "https://via.placeholder.com/150", // Replace with product image path
    },
  ];

  return (
    <>
      <Header />
      <div className="flex flex-col lg:flex-row lg:w-[80%] mx-auto gap-5 mt-5 px-3 mb-5">
        
        {/* Left: Cart Items */}
        <div className="flex-1">
          {cartItems.map((item) => (
            <CartItemCard key={item.id} product={item} />
          ))}

          {/* Footer actions below cart items */}
          <div className="flex items-center justify-between border-t pt-4 mt-6">
            {/* Continue Shopping */}
            <button className="flex items-center gap-2 text-gray-600 hover:text-black">
              <ArrowLeft className="w-5 h-5" />
              <span className="text-sm font-medium">CONTINUE SHOPPING</span>
            </button>

            {/* Update Bag */}
            <button className="flex items-center gap-2 text-gray-600 hover:text-black">
              <RefreshCw className="w-5 h-5" />
              <span className="text-sm font-medium">UPDATE BAG</span>
            </button>
          </div>
        </div>

        {/* Right: Cart Summary */}
        <div className="w-full lg:w-[350px]">
          <Card />
        </div>

      </div>
      <Footer />
    </>
  )
}

export default Cartview
