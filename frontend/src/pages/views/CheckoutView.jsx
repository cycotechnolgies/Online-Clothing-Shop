import { useState } from "react";
import CheckoutForm from "../../components/checkout/CheckoutForm";
import OrderSummary from "../../components/checkout/OrderSummary";
import { Link } from "react-router-dom";
import logo from "../../assets/OLLY LOGO.png";

// Parent Component that holds the state for the shipping price
const CheckoutView = () => {
  const [shippingPrice, setShippingPrice] = useState(290); // Default shipping price

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Responsive container: column on small, row on md+ */}
      <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
        
        {/* 📝 Form */}
        <div
          className="w-full md:w-1/2 h-auto md:h-screen overflow-y-auto px-6 py-10"
          style={{
            scrollbarWidth: "none", // Firefox
            msOverflowStyle: "none", // IE 10+
          }}
        >
          {/* Chrome/Safari scrollbar hiding */}
          <style>
            {`
              div::-webkit-scrollbar {
                display: none;
              }
            `}
          </style>
          <CheckoutForm
            shippingPrice={shippingPrice} // Pass shippingPrice to CheckoutForm
            setShippingPrice={setShippingPrice} // Pass setShippingPrice to CheckoutForm
          />
        </div>

        {/* 🧾 Order Summary */}
        <div className="w-full md:w-1/2 h-auto md:h-screen overflow-y-auto px-6 py-10 bg-gray-50">
          <OrderSummary shippingPrice={shippingPrice} /> {/* Pass shippingPrice to OrderSummary */}
        </div>
      </div>
    </div>
  );
};

export default CheckoutView;
