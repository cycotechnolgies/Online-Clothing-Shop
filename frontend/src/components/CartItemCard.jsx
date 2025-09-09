import React from "react";
import minus from "../assets/minus.svg";
import plus from "../assets/plus.svg";
import trash from "../assets/bin.svg";

const CartItemCard = ({ product }) => {
  return (
    <div className="flex items-center justify-between border rounded-lg p-4 shadow-sm mb-4">
      {/* Product Image */}
      <div className="flex items-center gap-4">
        <img
          src="https://zigzag.lk/cdn/shop/files/workwearAlbum-Web-01-G_575x.progressive.jpg?v=1755837393"   // ✅ Make sure product.image is a valid path
          alt={product.name}
          className="w-20 h-24 object-cover rounded-md"
        />

        {/* Product Info in Horizontal Layout */}
        <div className="flex flex-col">
          <h2 className="text-sm font-medium">{product.name}</h2>
          <p className="text-xs text-gray-500">{product.size}</p>
        </div>
      </div>

      {/* Price, Quantity, Total in one row */}
      <div className="flex items-center gap-6">
        {/* Price */}
        <p className="text-sm font-semibold">Rs {product.price.toLocaleString()}</p>

        {/* Quantity Control */}
        <div className="flex items-center border rounded-md">
          <button className="px-2">
            <img src={minus} alt="minus" className="w-3 h-3" />
          </button>
          <span className="px-3">{product.quantity}</span>
          <button className="px-2">
            <img src={plus} alt="plus" className="w-3 h-3" />
          </button>
        </div>

        {/* Total Price */}
        <p className="text-sm font-semibold">Rs {(product.price * product.quantity).toLocaleString()}</p>
      </div>

      {/* Delete Button */}
      <img src={trash} alt="Remove" className="w-5 h-5 cursor-pointer" />
    </div>
  );
};

export default CartItemCard;
