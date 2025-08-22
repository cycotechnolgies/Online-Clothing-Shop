import React from 'react'
import bin from '../assets/bin.svg'
import arrow from '../assets/l-arrow.svg'
import refresh from '../assets/refresh.svg'

const Table = () => {
  return (
    <div>
      
      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px]">
          <thead>
            <tr>
              <th className="border-b border-gray-300 px-4 py-2 text-left w-1/2 text-gray-400 font-normal text-sm">
                PRODUCT
              </th>
              <th className="border-b border-gray-300 px-4 py-2 text-left text-gray-400 font-normal text-sm">
                PRICE
              </th>
              <th className="border-b border-gray-300 px-4 py-2 text-left text-gray-400 font-normal text-sm">
                QUANTITY
              </th>
              <th className="border-b border-gray-300 px-4 py-2 text-left text-gray-400 font-normal text-sm">
                TOTAL
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border-b border-gray-300 px-4 py-5 w-1/2">
                <div className="flex items-center gap-3">
                  <button className="cursor-pointer">
                    <img src={bin} className="h-5 w-auto" alt="bin" />
                  </button>
                  <a href="#">
                    <img
                      src="https://zigzag.lk/cdn/shop/products/10_aea75db6-d62f-4d8c-b07d-d297f40d1a87.jpg?v=1663833565"
                      className="w-30 h-50 object-cover"
                      alt="product"
                    />
                  </a>

                  <div className="text-xs sm:text-sm">
                    <a href="#" className="block">
                      V Neck Mandarine Collar Top-Blue
                    </a>
                    <p className="text-gray-400">XS</p>
                  </div>
                </div>
              </td>
              <td className="border-b border-gray-300 px-4 py-2 text-xs sm:text-sm">
                <p className="font-black">Rs 3,690.00</p>
                <p className="text-gray-400">
                  or 3 installments of Rs 1,230.00 with Mintpay or Koko
                </p>
              </td>
              <td className="border-b border-gray-300 px-4 py-2">
                <input
                  type="number"
                  className="border w-16 text-center text-sm"
                  min="0"
                />
              </td>
              <td className="border-b border-gray-300 px-4 py-2 text-xs sm:text-sm">
                <p className="font-black">Rs 3,690.00</p>
                <p className="text-gray-400">
                  or 3 installments of Rs 1,230.00 with Mintpay or Koko
                </p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      
      <div className="flex items-center justify-between mt-4 text-sm flex-col gap-3 sm:flex-row">
        <button className="flex items-center gap-2 cursor-pointer">
          <img src={arrow} alt="arrow" className="w-auto h-5" />
          <p>CONTINUE SHOPPING</p>
        </button>
        <button className="flex items-center gap-2 cursor-pointer">
          <img src={refresh} alt="refresh" className="w-auto h-5" />
          <p>UPDATE BAG</p>
        </button>
      </div>
    </div>
  )
}

export default Table
