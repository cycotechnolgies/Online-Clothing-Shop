import React, { useState, useMemo } from "react";
import CartItemCard from "../../components/CartItemCard.jsx";
import Card from "../../components/Card.jsx";
import Header from "../../components/Header.jsx";
import Footer from "../../components/Footer.jsx";
import { ArrowLeft, RefreshCw } from "lucide-react";

const Cartview = () => {
  // Replace this initial data with real cart data from your store/state when available
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "V Neck Mandarine Collar Top-Blue",
      size: "XS",
      price: 3690,
      quantity: 1,
      image: "https://zigzag.lk/cdn/shop/files/workwearAlbum-Web-01-G_575x.progressive.jpg?v=1755837393",
    },
    // you can add more sample items while testing
  ]);

  // update quantity for an item
  const handleQuantityChange = (id, newQuantity) => {
    setCartItems((prev) =>
      prev.map((it) => (it.id === id ? { ...it, quantity: newQuantity } : it))
    );
  };

  // remove an item
  const handleRemoveItem = (id) => {
    setCartItems((prev) => prev.filter((it) => it.id !== id));
  };

  // subtotal
  const subtotal = useMemo(
    () => cartItems.reduce((sum, it) => sum + it.price * (it.quantity || 1), 0),
    [cartItems]
  );

  // placeholder handlers (replace with navigation / API calls in your app)
  const handleContinueShopping = () => {
    // example: navigate back to product listing
    console.log("Continue shopping clicked");
  };

  const handleUpdateBag = () => {
    // Could be used to sync with server, for now we just log
    console.log("Update bag clicked, cartItems:", cartItems);
  };

  return (
    <>
      <Header />
      <div className="max-w-3xl mx-auto px-3 mt-5 mb-5">
        <div className="flex flex-col lg:flex-row lg:gap-5">
          {/* Left: Cart Items */}
          <div className="flex-1">
            {cartItems.length === 0 ? (
              <div className="border rounded-lg p-6 text-center text-gray-600">
                Your cart is empty
              </div>
            ) : (
              cartItems.map((item) => (
                <CartItemCard
                  key={item.id}
                  product={item}
                  onQuantityChange={handleQuantityChange}
                  onRemove={handleRemoveItem}
                />
              ))
            )}

            {/* Footer actions below cart items */}
            <div className="flex flex-col sm:flex-row items-center justify-between border-t pt-4 mt-6 gap-3">
              {/* Continue Shopping */}
              <button
                onClick={handleContinueShopping}
                className="flex items-center gap-2 text-gray-600 hover:text-black"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="text-sm font-medium">CONTINUE SHOPPING</span>
              </button>

              {/* Update Bag */}
              <button
                onClick={handleUpdateBag}
                className="flex items-center gap-2 text-gray-600 hover:text-black"
              >
                <RefreshCw className="w-5 h-5" />
                <span className="text-sm font-medium">UPDATE BAG</span>
              </button>
            </div>
          </div>

          {/* Right: Cart Summary */}
          <div className="w-full lg:w-[350px] mt-6 lg:mt-0">
            {/* If your Card component accepts props (subtotal, items) pass them.
                Otherwise just render it - update Card to show subtotal if desired. */}
            <Card subtotal={subtotal} cartItems={cartItems} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Cartview;
