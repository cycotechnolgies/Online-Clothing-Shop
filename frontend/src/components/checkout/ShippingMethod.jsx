import { useState } from "react";

const shippingOptions = [
  { id: 1, label: "Courier Shipping (Colombo District)", price: 290, detail: "Standard Shipping Delivered in 3–5 business days. Tracking available." },
  { id: 2, label: "Courier Shipping (Other Districts)", price: 390, detail: "Standard Shipping Delivered in 3–5 business days. Tracking available." },
  { id: 3, label: "Pickup from Store", price: 0, detail: "Pickup from Olly Store." },
];

const ShippingMethod = ({ setShippingPrice }) => {
  const [selectedId, setSelectedId] = useState(1);

  const handleShippingChange = (id, price) => {
    setSelectedId(id);
    setShippingPrice(price); // Update shipping price in parent
  };

  return (
    <section>
      <h2 className="text-base font-bold uppercase tracking-wide mb-3">Shipping Method</h2>
      <div className="border border-gray-300 divide-y divide-gray-300">
        {shippingOptions.map((option) => {
          const isSelected = option.id === selectedId;
          return (
            <div
              key={option.id}
              className={`transition-colors duration-300 ease-in-out ${isSelected ? "bg-blue-100 border-blue-300" : "bg-gray-100"}`}
              onClick={() => handleShippingChange(option.id, option.price)}
            >
              <label className="flex items-center px-4 py-3 cursor-pointer gap-2 text-sm w-full">
                <input
                  type="radio"
                  name="shipping"
                  checked={isSelected}
                  onChange={() => handleShippingChange(option.id, option.price)}
                  className="peer hidden"
                />
                <div
                  className={`w-4 h-4 rounded-full transition-all duration-300 ease-in-out transform ${isSelected ? "bg-black scale-100" : "bg-white border border-gray-400 scale-100"}`}
                />
                <span className="font-medium">{`${option.label} – Rs ${option.price}`}</span>
              </label>
              <div
                className={`overflow-hidden transition-all duration-0 ease-in-out ${isSelected ? "max-h-40 opacity-100 py-4 px-4 border-t border-gray-300 bg-gray-50" : "max-h-0 opacity-0"}`}
              >
                <p className="text-sm text-center text-gray-700 font-small tracking-wide leading-relaxed">{option.detail}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ShippingMethod;
