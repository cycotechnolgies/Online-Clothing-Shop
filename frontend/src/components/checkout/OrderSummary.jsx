import denimJacket from "../../assets/denim-jacket.jpeg";
import { useState } from "react";

const items = [
  {
    id: 1,
    name: "Viana Cold Shoulder Mini Dress",
    details: "Teal Blue (design effect) / UK12",
    price: 5150,
    image: denimJacket,
    count: 1,
  },
  {
    id: 2,
    name: "Classic Denim Jacket",
    details: "Blue Wash / M",
    price: 3450,
    image: denimJacket,
    count: 2,
  },
];

const OrderSummary = ({ shippingPrice = 0 }) => {
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

  // Calculate total using count, including the shipping price
  const grossTotal = items.reduce((sum, item) => sum + item.price * item.count, 0);
  const netTotal = grossTotal + shippingPrice;

  // Validation function for demo purposes
  const validateForm = () => {
    const requiredFields = ["email", "firstName", "lastName", "address", "city", "postalCode", "phone1"];
    let isValid = true;
    const newErrors = {};

    requiredFields.forEach((field) => {
      if (!formData[field] || formData[field].trim() === "") {
        newErrors[field] = "This field is required";
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handlePayNow = () => {
    if (validateForm()) {
      alert("Form is valid, proceed to payment");
    } else {
      alert("Please fill all required fields.");
    }
  };

  return (
    <aside className="bg-white p-6 -mt-3">
      {items.map((item) => (
        <div key={item.id} className="flex items-center gap-4 mb-5">
          <div className="relative w-[70px] h-[90px] rounded overflow-hidden">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover rounded"
            />
            <span className="absolute top-0 left-0 bg-gray-700 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-semibold shadow">
              {item.count}
            </span>
          </div>

          {/* You could add item details here */}
          <div>
            <p className="text-sm font-medium">{item.name}</p>
            <p className="text-xs text-gray-500">{item.details}</p>
            <p className="text-sm font-semibold">LKR {(item.price * item.count).toLocaleString()}.00</p>
          </div>
        </div>
      ))}

      <div className="flex items-center mb-3 gap-2">
        <input
          type="text"
          placeholder="Discount Code or Gift Card"
          className="flex-1 border border-gray-300 px-4 py-2 rounded-md text-sm"
        />
        <button className="bg-black text-white font-medium text-sm px-5 py-2 rounded-md hover:opacity-90">
          Apply
        </button>
      </div>

      <div className="mt-6 space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-500">Gross Total:</span>
          <span>LKR {grossTotal.toLocaleString()}.00</span>
        </div>
        <div className="flex justify-between text-gray-500">
          <span>Promo Discount:</span>
          <span>LKR 0.00</span>
        </div>
        <div className="flex justify-between text-gray-500">
          <span>Sales Discount:</span>
          <span>LKR 0.00</span>
        </div>
        <div className="flex justify-between text-gray-500">
          <span>Full Discount:</span>
          <span>LKR 0.00</span>
        </div>
        <div className="flex justify-between text-gray-500">
          <span>Delivery:</span>
          <span>LKR {shippingPrice.toLocaleString()}.00</span>
        </div>
      </div>

      <div className="flex justify-between font-semibold text-sm mt-4">
        <span className="text-black">Net Total :</span>
        <span className="text-black">LKR {netTotal.toLocaleString()}.00</span>
      </div>

      <button
        type="button"
        className="w-full bg-black text-white py-3 text-sm font-semibold mt-6 hover:opacity-90 transition"
        onClick={handlePayNow}
      >
        Pay Now
      </button>
    </aside>
  );
};

export default OrderSummary;
