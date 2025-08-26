import { useState } from "react";
import ShippingMethod from "./ShippingMethod";
import { Link } from "react-router-dom";
import logo from "../../assets/OLLY LOGO.png";

const CheckoutForm = ({ shippingPrice, setShippingPrice }) => {
  return (
    <div className="space-y-6 px-6 max-w-2xl mx-auto">
      {/* Logo */}
      <div className="pb-2">
        <Link to="/" className="inline-block">
          <img
            src={logo}
            alt="Olly Logo"
            className="h-10 w-auto transition-transform duration-300 hover:scale-105"
          />
        </Link>
      </div>

      <div className="h-px bg-gray-200" />

      {/* -----------------Contact & Delivery------------------- */}
      <p>----Contact & Delivery add here-----</p>

      {/* -----------------Shipping------------------- */}
      <ShippingMethod setShippingPrice={setShippingPrice} />




      {/*------------------ Payment ------------------*/}
      <p>----Payment methods add here-------</p>

      <div className="h-px bg-white-200" />

      {/*------------------- Billing Address----------------- */}
      <p>-----Billing methods add here-------</p>


      <div className="h-px bg-gray-200" />

      {/* Pay Now Button */}
      <button
        type="submit"
        className="w-full bg-black text-white py-3 text-sm font-semibold hover:opacity-90 transition"
      >
        Pay now
      </button>

      {/* Policy Links */}
      <div className="pt-2 flex flex-wrap justify-center gap-6 text-sm text-blue-600 underline">
        <Link to="/refund-policy">Refund policy</Link>
        <Link to="/privacy-policy">Privacy policy</Link>
        <Link to="/terms-of-service">Terms of service</Link>
        <Link to="/contact">Contact</Link>
      </div>
    </div>
  );
};

export default CheckoutForm;
