import { useState } from "react";

const BillingAddress = () => {
  const [useDifferent, setUseDifferent] = useState(false);

  return (
    <section>
      <h2 className="text-base font-bold uppercase tracking-wide mb-3">
        Billing Address
      </h2>

      <div className="border border-gray-300 divide-y divide-gray-300">
        {/* Option 1: Same as shipping */}
        <div
          className={`transition-colors duration-300 ease-in-out ${!useDifferent ? "bg-blue-100 border-blue-300" : "bg-gray-100"}`}
          onClick={() => setUseDifferent(false)}
        >
          <label className="flex items-center px-4 py-3 cursor-pointer gap-2 text-sm w-full">
            <input
              type="radio"
              name="billing"
              checked={!useDifferent}
              onChange={() => setUseDifferent(false)}
              className="peer hidden"
            />
            <div
              className={`w-4 h-4 rounded-full transition-all duration-300 ease-in-out transform 
                ${!useDifferent ? "bg-black scale-100" : "bg-white border border-gray-400 scale-100"}`}
            />
            <span className="font-medium">Same as shipping address</span>
          </label>
        </div>

        {/* Option 2: Use different billing address */}
        <div
          className={`transition-colors duration-300 ease-in-out ${useDifferent ? "bg-blue-100 border-blue-300" : "bg-gray-100"}`}
          onClick={() => setUseDifferent(true)}
        >
          <label className="flex items-center px-4 py-3 cursor-pointer gap-2 text-sm w-full">
            <input
              type="radio"
              name="billing"
              checked={useDifferent}
              onChange={() => setUseDifferent(true)}
              className="peer hidden"
            />
            <div
              className={`w-4 h-4 rounded-full transition-all duration-300 ease-in-out transform 
                ${useDifferent ? "bg-black scale-100" : "bg-white border border-gray-400 scale-100"}`}
            />
            <span className="font-medium">Use a different billing address</span>
          </label>

          {/* Expandable billing form */}
          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${useDifferent
              ? "max-h-[400px] opacity-100 py-4 px-4 border-t border-gray-300 bg-gray-50"
              : "max-h-0 opacity-0"}`}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                { id: "billing-first-name", label: "First name" },
                { id: "billing-last-name", label: "Last name" },
                { id: "billing-address", label: "Address", span: true },
                { id: "billing-city", label: "City" },
                { id: "billing-postal-code", label: "Postal code" },
              ].map(({ id, label, span }) => (
                <div key={id} className={`relative ${span ? "md:col-span-2" : ""}`}>
                  <input
                    type="text"
                    id={id}
                    placeholder={label}
                    className="peer w-full border border-gray-300 px-4 pt-5 pb-2 rounded-md text-[15px] mb-3 
                      placeholder-transparent text-gray-800 focus:outline-none focus:border-black"
                  />
                  <label
                    htmlFor={id}
                    className="absolute left-4 text-gray-500 text-xs transition-all duration-200 ease-in-out 
                      top-2 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 
                      peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs peer-focus:-translate-y-0"
                  >
                    {label}
                  </label>
                </div>
              ))}

              {/* Phone number field */}
              <div className="relative md:col-span-2">
                <div className="flex items-center w-full border border-gray-300 rounded-md px-4 pt-5 pb-2 mb-3">
                  <span className="flex items-center gap-2 text-[15px] text-gray-700">
                    <img
                      src="https://flagcdn.com/w40/lk.png"
                      alt="Sri Lanka"
                      className="w-5 h-4 object-cover"
                    />
                    +94
                  </span>
                  <input
                    type="tel"
                    id="billing-phone"
                    placeholder="Billing Contact No"
                    className="peer flex-1 bg-transparent border-none outline-none px-2 text-[15px] text-gray-800 placeholder-transparent"
                  />
                </div>
                <label
                  htmlFor="billing-phone"
                  className="absolute left-4 text-gray-500 text-xs transition-all duration-200 ease-in-out 
                    top-2 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 
                    peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs peer-focus:-translate-y-0"
                >
                  Billing Contact No
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BillingAddress;
