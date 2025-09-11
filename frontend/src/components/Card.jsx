import React from 'react'

const Card = () => {
  return (
    <div className="flex flex-col gap-4 border border-gray-300 w-full p-5 lg:w-[350px]">
      <div className="border-b border-gray-300 pb-4">
        <h3 className="font-semibold">CART TOTAL</h3>
      </div>

      <div className="border-b border-gray-300 pb-4">
        <p className="text-xs">Special Instructions For Seller</p>
        <p className="text-xs text-gray-400 mt-2">
          Add special instructions for your order...
        </p>
        <div className="mt-3">
          <textarea
            rows="4"
            className="border border-gray-100 bg-gray-100 focus:outline-none focus:bg-white p-2 text-xs focus:border-gray-200 w-full"
          ></textarea>
        </div>
      </div>

      <div>
        <h3 className="font-semibold">SUB TOTAL</h3>
        <p className="text-2xl">Rs 3,690.00</p>
        <p className="text-xs text-gray-400 mt-3">
          Shipping calculated at checkout
        </p>
        <button className="bg-black text-white w-full py-2 mt-5 cursor-pointer text-sm">
          PROCEED TO CHECKOUT
        </button>
      </div>
    </div>
  )
}

export default Card
