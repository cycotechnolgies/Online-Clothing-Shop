import React, { useState, useEffect } from "react";
import minus from "../assets/minus.svg";
import plus from "../assets/plus.svg";
import trash from "../assets/bin.svg";

const CartItemCard = ({ product, onQuantityChange, onRemove }) => {
  // keep a local quantity so the UI updates instantly
  const [quantity, setQuantity] = useState(product.quantity || 1);

  // when parent product.quantity changes, sync local state
  useEffect(() => {
    setQuantity(product.quantity || 1);
  }, [product.quantity]);

  const increase = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    if (onQuantityChange) onQuantityChange(product.id, newQuantity);
  };

  const decrease = () => {
    if (quantity <= 1) return;
    const newQuantity = quantity - 1;
    setQuantity(newQuantity);
    if (onQuantityChange) onQuantityChange(product.id, newQuantity);
  };

  return (
    <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between border rounded-lg p-4 shadow-sm mb-4 bg-white">
      {/* Left: image + basic info */}
      <div className="flex items-start sm:items-center gap-4 w-full sm:w-auto min-w-0">
        <img
          src={product.image || "https://via.placeholder.com/150"}
          alt={product.name}
          className="w-20 h-24 object-cover rounded-md flex-shrink-0"
        />

        <div className="flex flex-col min-w-0">
          <h2 className="text-sm font-medium truncate">{product.name}</h2>
          <p className="text-xs text-gray-500 mt-1">
            Size: <span className="font-medium">{product.size}</span>
          </p>
          <p className="text-sm font-semibold mt-2 sm:mt-0">Rs {product.price.toLocaleString()}</p>
        </div>
      </div>

      {/* Right: quantity control, total and remove button */}
      <div className="flex items-center gap-3 mt-3 sm:mt-0 w-full sm:w-auto justify-between sm:justify-end">
        {/* Quantity control */}
        <div className="flex items-center border rounded-md">
          <button
            className="px-2 py-1"
            onClick={decrease}
            aria-label={`Decrease quantity for ${product.name}`}
          >
            <img src={minus} alt="minus" className="w-3 h-3" />
          </button>

          <span className="px-3 text-sm">{quantity}</span>

          <button
            className="px-2 py-1"
            onClick={increase}
            aria-label={`Increase quantity for ${product.name}`}
          >
            <img src={plus} alt="plus" className="w-3 h-3" />
          </button>
        </div>

        {/* Total */}
        <p className="text-sm font-semibold whitespace-nowrap">
          Rs {(product.price * quantity).toLocaleString()}
        </p>

        {/* Remove */}
        <button
          className="p-2"
          onClick={() => onRemove && onRemove(product.id)}
          aria-label={`Remove ${product.name} from cart`}
        >
          <img src={trash} alt="Remove" className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default CartItemCard;
