import { Link } from "react-router-dom";

const DeliverySection = ({ formData, handleChange, errors }) => {
  return (
    <>
      {/* ----------------Contact Section-------------- */}
      <section>
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-base font-bold uppercase tracking-wide">Contact</h2>
          <Link to="/login" className="text-sm font-medium text-blue-600 hover:underline">
            Login
          </Link>
        </div>

        <div className="relative mb-4">
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="peer w-full border border-gray-300 px-4 pt-5 pb-2 rounded-md text-[15px] 
              placeholder-transparent text-gray-800 focus:outline-none focus:border-black"
          />
          <label
            htmlFor="email"
            className="absolute left-4 text-gray-500 text-xs transition-all duration-200 ease-in-out 
              top-2 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 
              peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs peer-focus:-translate-y-0"
          >
            Email
          </label>
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </div>

        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" className="accent-black" />
          Email me with news and offers
        </label>
      </section>

      <div className="h-px bg-white-200" />

      {/*------------- Delivery Section----------------- */}
      <section>
        <h2 className="text-base font-bold mb-3 uppercase tracking-wide">Delivery</h2>

        {/* Input Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[{ id: "firstName", label: "First name" },
            { id: "lastName", label: "Last name" },
            { id: "address", label: "Address", span: true },
            { id: "city", label: "City" },
            { id: "postalCode", label: "Postal code" }]
            .map(({ id, label, span }) => (
              <div key={id} className={`relative ${span ? "md:col-span-2" : ""}`}>
                <input
                  type="text"
                  id={id}
                  value={formData[id]}
                  onChange={handleChange}
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
                {errors[id] && <p className="text-red-500 text-xs mt-1">{errors[id]}</p>}
              </div>
            ))}
        </div>

        {/* Phone Numbers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
          {["phone1", "phone2"].map((id) => (
            <div key={id} className="relative mb-3">
              <div className="flex items-center w-full border border-gray-300 rounded-md px-4 pt-5 pb-2">
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
                  id={id}
                  value={formData[id]}
                  onChange={handleChange}
                  placeholder={id === "phone1" ? "Contact No 1" : "Contact No 2 (optional)"}
                  className="peer flex-1 bg-transparent border-none outline-none px-2 text-[15px] text-gray-800 placeholder-transparent"
                />
              </div>
              <label
                htmlFor={id}
                className="absolute left-4 text-gray-500 text-xs transition-all duration-200 ease-in-out 
                  top-2 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 
                  peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs peer-focus:-translate-y-0"
              >
                {id === "phone1" ? "Contact No 1" : "Contact No 2 (optional)"}
              </label>
              {errors[id] && <p className="text-red-500 text-xs mt-1">{errors[id]}</p>}
            </div>
          ))}
        </div>

        <label className="flex items-center gap-2 text-sm mt-4">
          <input type="checkbox" className="accent-black" />
          Save this information for next time
        </label>
      </section>
    </>
  );
};

export default DeliverySection;
