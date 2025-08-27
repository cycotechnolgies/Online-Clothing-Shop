import { useState } from "react";
import BillingAddress from "./BillingAddress";
import ShippingMethod from "./ShippingMethod";
import PaymentMethod from "./PaymentMethod";
import DeliverySection from "./DeliverySection";
import { Link } from "react-router-dom";
import logo from "../../assets/OLLY LOGO.png";

const CheckoutForm = ({ shippingPrice, setShippingPrice }) => {
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    phone1: "",
    phone2: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    phone1: "",
    phone2: "",
  });

  // Handle input change
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  // Validation function
  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    const requiredFields = [
      "email",
      "firstName",
      "lastName",
      "address",
      "city",
      "postalCode",
      "phone1",
    ];

    requiredFields.forEach((field) => {
      if (formData[field].trim() === "") {
        newErrors[field] =
          `${field.charAt(0).toUpperCase() + field.slice(1)} cannot be empty`;
        isValid = false;
      }
    });

    // Phone number validation
    if (formData.phone1 && !/^\d{10}$/.test(formData.phone1)) {
      newErrors.phone1 = "Phone number must be 10 digits";
      isValid = false;
    }

    if (formData.phone2 && !/^\d{10}$/.test(formData.phone2)) {
      newErrors.phone2 = "Phone number must be 10 digits";
      isValid = false;
    }

    // Email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      alert("Form is valid, proceed to payment");
    } else {
      alert("Please fill all fields correctly.");
    }
  };

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
      <DeliverySection
        formData={formData}
        handleChange={handleChange}
        errors={errors}
      />

      <div className="h-px bg-white-200" />

      {/* -----------------Shipping------------------- */}
      <ShippingMethod
        formData={formData}
        handleChange={handleChange}
        errors={errors}
        setShippingPrice={setShippingPrice}
      />

      <div className="h-px bg-white-200" />

      {/*------------------ Payment ------------------*/}
      <PaymentMethod
        formData={formData}
        handleChange={handleChange}
        errors={errors}
      />

      <div className="h-px bg-white-200" />

      {/*------------------- Billing Address----------------- */}
      <BillingAddress
        formData={formData}
        handleChange={handleChange}
        errors={errors}
      />

      <div className="h-px bg-gray-200" />

      {/* Pay Now Button */}
      <button
        type="submit"
        className="w-full bg-black text-white py-3 text-sm font-semibold hover:opacity-90 transition"
        onClick={handleSubmit}
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
