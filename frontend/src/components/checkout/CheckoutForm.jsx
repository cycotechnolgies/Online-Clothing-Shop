import BillingAddress from "./BillingAddress";
import ShippingMethod from "./ShippingMethod";
import PaymentMethod from "./PaymentMethod";
import DeliverySection from "./DeliverySection";
import { Link } from "react-router-dom";
import logo from "../../assets/OLLY LOGO.png";

const CheckoutForm = ({

  formData,
  setFormData,
  errors,
  setErrors,
  shippingPrice,
  setShippingPrice,

}) => {
  // Handle input change
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  return (
    <div className="space-y-6 px-6 max-w-2xl mx-auto">
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

    </div>
  );
};

export default CheckoutForm;
