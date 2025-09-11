import bin from '../assets/bin.svg'
import arrow from '../assets/l-arrow.svg'
import refresh from '../assets/refresh.svg'
import plus from '../assets/plus.svg'
import minus from '../assets/minus.svg'
import React, { useState } from "react";

const Table = () => {
   const [quantity, setQuantity] = useState(1);

   const decrease = () => {
    setQuantity((prev) => (prev > 0 ? prev - 1 : 0));
  };

  const increase = () => {
    setQuantity((prev) => prev + 1);
  };
  
  return (
    <div>
      
      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px]">
          <thead>
            <tr>

              <th className=" border-b border-gray-300 px-4 py-2 text-left w-1/2 text-gray-400 font-normal text-sm">
                PRODUCT
              </th>
              <th className="hidden md:table-cell border-b border-gray-300 px-4 py-2 text-left text-gray-400 font-normal text-sm">
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

              <td className="border-b-0 md:border-b md:border-gray-300 px-4 py-5 w-1/2">
                <div className="flex items-center gap-3">
                  <button className="cursor-pointer">
                    <img src={bin} className="h-5 w-auto" alt="bin" />
                  </button>
                  <div>

                    <a href="#">
                      <img
                        src="https://zigzag.lk/cdn/shop/files/workwearAlbum-Web-01-G_575x.progressive.jpg?v=1755837393"
                        className="w-6 h-10 md:w-20 md:h-30 object-cover"
                        alt="product"
                      />
                    </a>
                    

                  </div>

                  <div className="text-xs sm:text-sm">
                    <a href="#" className="block">
                      V Neck Mandarine Collar Top-Blue
                    </a>
                    <p className="text-gray-400">XS</p>
                  </div>
                </div>
              </td>
             <td className="hidden md:table-cell border-b-0 md:border-b md:border-gray-300 px-4 py-2 text-xs sm:text-sm">
                  <p className="font-black">Rs 3,690.00</p>
                  <p className="text-gray-400">
                    or 3 installments of Rs 1,230.00 with Mintpay or Koko
                  </p>
              </td>
              <td className="border-b-0 md:border-b md:border-gray-300 px-4 py-2">
                <div className="flex items-center justify-center gap-2">
                  
                  <button
                    type="button"
                    onClick={decrease}
                    className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300  h-7 w-7"
                  >
                   <img src={minus} className=''/>
                  </button>

               
                  <input
                    type="number"
                    className="border-0 w-16 text-center text-sm rounded bg-gray-200 h-7"
                    min="0"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(0, Number(e.target.value)))}
                  />

                 
                  <button
                    type="button"
                    onClick={increase}
                    className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300  h-7 w-7"
                  >
                  <img src={plus} className=''/>
                  </button>
                </div>
              </td>
              <td className="border-b-0 md:border-b md:border-gray-300 px-4 py-2 text-xs sm:text-sm">
                <p className="font-black">Rs 3,690.00</p>
                <p className="text-gray-400">
                  or 3 installments of Rs 1,230.00 with Mintpay or Koko
                </p>
              </td>
            </tr>
            <tr>
              <td className="border-b border-gray-300 px-4 py-2 text-xs sm:text-sm md:hidden">
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
