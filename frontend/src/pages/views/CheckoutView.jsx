import { useState } from "react";
import CheckoutForm from "../../components/checkout/CheckoutForm";
import OrderSummary from "../../components/checkout/OrderSummary";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const CheckoutView = () => {
  const [shippingPrice, setShippingPrice] = useState(290);

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

  const [errors, setErrors] = useState({});

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
    ];

    requiredFields.forEach((field) => {
      if (!formData[field] || formData[field].trim() === "") {
        const label = field.charAt(0).toUpperCase() + field.slice(1);
        newErrors[field] = `${label} cannot be empty`;
        isValid = false;
      }
    });

    // ✅ Postal code must be 5 digits
    if (formData.postalCode && !/^\d{5}$/.test(formData.postalCode)) {
      newErrors.postalCode = "Postal code must be 5 digits";
      isValid = false;
    }

    // ✅ Require at least one phone number
    const phone1Filled = formData.phone1.trim() !== "";
    const phone2Filled = formData.phone2.trim() !== "";

    if (!phone1Filled && !phone2Filled) {
      newErrors.phone1 = "Contact number is required";
      isValid = false;
    }

    // ✅ Validate phone1 if filled
    if (phone1Filled && !/^\d{9}$/.test(formData.phone1)) {
      newErrors.phone1 = "Phone number must be 10 digits";
      isValid = false;
    }

    // ✅ Validate phone2 if filled
    if (phone2Filled && !/^\d{9}$/.test(formData.phone2)) {
      newErrors.phone2 = "Phone number must be 10 digits";
      isValid = false;
    }

    // ✅ Email format validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };


  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <div className="flex-1 overflow-y-auto">
        <div className="flex flex-col md:flex-row min-h-full">
          <div className="w-full md:w-1/2 px-6 py-10">
            <CheckoutForm
              formData={formData}
              setFormData={setFormData}
              errors={errors}
              setErrors={setErrors}
              shippingPrice={shippingPrice}
              setShippingPrice={setShippingPrice}
            />
          </div>
          <div className="w-full md:w-1/2 px-6 py-10 bg-gray-50">
            <OrderSummary
              formData={formData}
              errors={errors}
              validateForm={validateForm}
              shippingPrice={shippingPrice}
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CheckoutView;
