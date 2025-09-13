import { useState } from "react";

const ProductCard = ({ product, onClick }) => {
  const [selectedSize, setSelectedSize] = useState(null);

  return (
    <div
      className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition cursor-pointer flex flex-col h-full"
      onClick={() => onClick && onClick(product.id)}
    >
      {/* Image Section - full height */}
           <div className="relative w-full h-[450px] group">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      {/* <div className="w-full max-h-[450px] bg-gray-100 flex items-center justify-center overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="max-w-full max-h-[450px] object-contain"
        /> */}
      </div>

      {/* Product Details */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-lg font-semibold truncate">{product.name}</h3>
        <p className="text-gray-600 mb-3">Rs {product.price.toFixed(2)}</p>

        {/* Size Selector */}
        <div className="flex gap-2 mb-4">
          {product.sizes.map((size) => (
            <button
              key={size}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedSize(size);
              }}
              className={`w-8 h-8 border rounded text-sm font-medium flex items-center justify-center 
                ${selectedSize === size ? "bg-black text-white border-black" : "bg-gray-100 text-gray-800"}
                hover:bg-black hover:text-white transition`}
            >
              {size}
            </button>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-2 mt-auto">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClick && onClick(product.id);
            }}
            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
          >
            View Product
          </button>
          <button
            onClick={(e) => e.stopPropagation()}
            className="bg-gray-200 text-black px-4 py-2 rounded hover:bg-gray-300 transition"
          >
            Quick Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;




// import { useState } from "react";

// const ProductCard = ({ product, onClick }) => {
//   const [selectedSize, setSelectedSize] = useState(null);

//   return (
//     <div
//       className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition cursor-pointer"
//       onClick={() => onClick && onClick(product.id)}
//     >
//       {/* Product Image */}
//       <div className="w-full flex h-[450px]  items-center justify-center">
//         <img
//           src={product.image}
//           alt={product.name}
//           className="w-full h-[450px] object-contain"
//         />
//       </div>

//       {/* Product Details */}
//       <div className="p-4">
//         <h3 className="text-lg font-semibold truncate">{product.name}</h3>
//         <p className="text-gray-600 mb-3">Rs {product.price.toFixed(2)}</p>

//         {/* Size Selector */}
//         <div className="flex gap-2 mb-4">
//           {product.sizes.map((size) => (
//             <button
//               key={size}
//               onClick={(e) => {
//                 e.stopPropagation();
//                 setSelectedSize(size);
//               }}
//               className={`w-8 h-8 border rounded text-sm font-medium flex items-center justify-center 
//                 ${selectedSize === size ? "bg-black text-white border-black" : "bg-gray-100 text-gray-800"}
//                 hover:bg-black hover:text-white transition`}
//             >
//               {size}
//             </button>
//           ))}
//         </div>

//         {/* Actions */}
//         <div className="flex gap-2">
//           <button
//             onClick={(e) => {
//               e.stopPropagation();
//               onClick && onClick(product.id);
//             }}
//             className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
//           >
//             View Product
//           </button>
//           <button
//             onClick={(e) => e.stopPropagation()}
//             className="bg-gray-200 text-black px-4 py-2 rounded hover:bg-gray-300 transition"
//           >
//             Quick Add
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductCard;




// // import { useState } from "react";

// // const ProductCard = ({ product, onClick }) => {
// //   const [selectedSize, setSelectedSize] = useState(null);

// //   return (
// //     <div
// //       className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition cursor-pointer"
// //       onClick={() => onClick && onClick(product.id)}
// //     >
// //       {/* Product Image */}

// // <div className="w-full h-56 bg-gray-100 flex items-center justify-center overflow-hidden">
// //   <img
// //     src={product.image}
// //     alt={product.name}
// //     className="max-w-full max-h-full object-contain"
// //   />
// // </div>




// //       {/* <img
// //         src={product.image}
// //         alt={product.name}
// //         className="w-full h-56 object-cover bg-gray-100"
// //       /> */}

// //       {/* Product Details */}
// //       <div className="p-4">
// //         <h3 className="text-lg font-semibold truncate">{product.name}</h3>
// //         <p className="text-gray-600 mb-3"> Rs {product.price.toFixed(2)}</p>

// //         {/* Size Selector */}
// //         <div className="flex gap-2 mb-4">
// //           {product.sizes.map((size) => (
// //             <button
// //               key={size}
// //               onClick={(e) => {
// //                 e.stopPropagation(); // stop triggering card click
// //                 setSelectedSize(size);
// //               }}
// //               className={`w-8 h-8 border rounded text-sm font-medium flex items-center justify-center 
// //                 ${selectedSize === size ? "bg-black text-white border-black" : "bg-gray-100 text-gray-800"}
// //                 hover:bg-black hover:text-white transition`}
// //             >
// //               {size}
// //             </button>
// //           ))}
// //         </div>

// //         {/* Actions */}
// //         <div className="flex gap-2">
// //           <button
// //             onClick={(e) => {
// //               e.stopPropagation();
// //               onClick && onClick(product.id);
// //             }}
// //             className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
// //           >
// //             View Product
// //           </button>
// //           <button
// //             onClick={(e) => e.stopPropagation()}
// //             className="bg-gray-200 text-black px-4 py-2 rounded hover:bg-gray-300 transition"
// //           >
// //             Quick Add
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default ProductCard;






// // // import  { useState } from "react";

// // // const ProductCard = ({ product }) => {
// // //   const [selectedSize, setSelectedSize] = useState(null);

// // //   return (
// // //     <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
// // //       {/* Product Image */}
// // //         <img
// // //     src={product.image}
// // //     alt={product.name}
// // //     className="w-full h-56 object-cover rounded-t-lg"
// // //     />



// // //       {/* Product Details */}
// // //       <div className="p-4">
// // //         <h3 className="text-lg font-semibold truncate">{product.name}</h3>
// // //         <p className="text-gray-600 mb-3"> Rs {product.price.toFixed(2)}</p>

// // //         {/* Size Selector */}
// // //         <div className="flex gap-2 mb-4">
// // //           {product.sizes.map((size) => (
// // //             <button
// // //               key={size}
// // //               onClick={() => setSelectedSize(size)}
// // //               className={`w-8 h-8 border rounded text-sm font-medium flex items-center justify-center 
// // //                 ${selectedSize === size ? "bg-black text-white border-black" : "bg-gray-100 text-gray-800"}
// // //                 hover:bg-black hover:text-white transition`}
// // //             >
// // //               {size}
// // //             </button>
// // //           ))}
// // //         </div>

// // //         {/* Actions */}
// // //         <div className="flex gap-2">
// // //           <button className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition">
// // //             View Product
// // //           </button>
// // //           <button className="bg-gray-200 text-black px-4 py-2 rounded hover:bg-gray-300 transition">
// // //             Quick Add
// // //           </button>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default ProductCard;
