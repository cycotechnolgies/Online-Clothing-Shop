import  { useState } from "react";

const ProductCard = ({ product }) => {
  const [selectedSize, setSelectedSize] = useState(null);

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Product Image */}
        <img
    src={product.image}
    alt={product.name}
    className="w-full h-56 object-contain bg-gray-100"
    />



      {/* Product Details */}
      <div className="p-4">
        <h3 className="text-lg font-semibold truncate">{product.name}</h3>
        <p className="text-gray-600 mb-3"> Rs {product.price.toFixed(2)}</p>

        {/* Size Selector */}
        <div className="flex gap-2 mb-4">
          {product.sizes.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`w-8 h-8 border rounded text-sm font-medium flex items-center justify-center 
                ${selectedSize === size ? "bg-black text-white border-black" : "bg-gray-100 text-gray-800"}
                hover:bg-black hover:text-white transition`}
            >
              {size}
            </button>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <button className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition">
            View Product
          </button>
          <button className="bg-gray-200 text-black px-4 py-2 rounded hover:bg-gray-300 transition">
            Quick Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
