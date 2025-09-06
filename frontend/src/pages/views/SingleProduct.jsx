import { useParams,useNavigate } from "react-router-dom";
import dummyProducts from "../../data/dummyproducts.jsx"; // use lowercase path
import Footer from "../../components/Footer.jsx";
import Header from "../../components/Header.jsx";
import { Facebook, Instagram } from "lucide-react";

const SingleProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate()
  const product = dummyProducts.find((p) => p.id === parseInt(id));

  if (!product) {
    return <p className="text-center text-red-500 mt-10">Product not found</p>;
  }

  const relatedProducts = dummyProducts
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  // Click handler placeholder for related products
  const handleRelatedClick = (productId) => {
    navigate(`/product/${productId}`);
    // Future functionality: navigate to product page or open modal
  };

  return (
    <>
      <Header />

      {/* Single Product Section */}
      <div className="container mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Product Images */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
          <img
            src={product.image}
            alt={product.name}
            className="w-full max-h-[600px] object-contain mx-auto rounded-lg"
          />
          <div className="flex gap-3 mt-4 justify-center">
            {[product.image, product.image, product.image].map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`thumb-${i}`}
                className="w-20 h-20 object-cover rounded-md border cursor-pointer hover:border-black"
              />
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{product.name}</h2>

          <p className="text-3xl md:text-4xl font-semibold text-black">
            Rs {product.price.toFixed(2)}
            {product.oldPrice && (
              <span className="ml-3 line-through text-gray-500 text-xl md:text-2xl">
                Rs {product.oldPrice.toFixed(2)}
              </span>
            )}
          </p>

          <p className="mt-5 text-lg md:text-xl">
            {product.inStock ? (
              <span className="text-green-600 font-medium">In Stock</span>
            ) : (
              <span className="text-red-600 font-medium">Out of Stock</span>
            )}
          </p>

          <div className="mt-7 space-y-3 text-gray-700 text-lg md:text-xl">
            <p>
              <strong>Fit Type:</strong> {product.fitType}
            </p>
            <p>
              <strong>Wash & Care:</strong> {product.washCare}
            </p>
            <p>
              <strong>Color:</strong> {product.color}
            </p>
            <p>
              <strong>Stretch:</strong> {product.stretch}
            </p>
          </div>

          {/* Sizes */}
          <div className="mt-7">
            <h3 className="font-semibold text-lg md:text-xl">Available Sizes:</h3>
            <div className="flex gap-3 mt-3">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  className="px-5 py-3 border border-gray-400 rounded hover:bg-black hover:text-white text-lg md:text-xl"
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity & Add to Cart */}
          <div className="mt-7 flex items-center gap-5">
            <input
              type="number"
              defaultValue={1}
              min={1}
              className="w-20 md:w-24 border border-gray-400 p-3 text-center text-lg"
            />
            <button className="px-8 py-3 bg-black text-white rounded hover:bg-gray-800 text-lg md:text-xl">
              Add to Cart
            </button>
          </div>

          {/* Share Buttons (icon only) */}
          <div className="mt-6 flex gap-4">
            <button className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700">
              <Facebook className="w-5 h-5" />
            </button>
            <button className="p-3 bg-pink-500 text-white rounded-full hover:bg-pink-600">
              <Instagram className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      <div className="container mx-auto px-6 py-10">
        <h2 className="text-2xl font-bold mb-6">RELATED PRODUCTS</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {relatedProducts.map((item) => (
            <div
              key={item.id}
              className="border rounded-lg shadow hover:shadow-lg transition flex flex-col cursor-pointer"
              onClick={() => handleRelatedClick(item.id)}
            >
              {/* Image fills most of the card */}
              <div className="flex-1">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover rounded-t-lg"
                />
              </div>

              {/* Bottom section for details */}
              <div className="p-4 bg-white">
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-gray-700">Rs {item.price.toFixed(2)}</p>
                {item.oldPrice && (
                  <p className="text-sm line-through text-gray-500">
                    Rs {item.oldPrice.toFixed(2)}
                  </p>
                )}
                <p className="mt-1 text-sm md:text-base">
                  {item.inStock ? (
                    <span className="text-green-600 font-medium">In Stock</span>
                  ) : (
                    <span className="text-red-600 font-medium">Out of Stock</span>
                  )}
                </p>
                <button className="mt-3 w-full px-4 py-2 bg-black text-white rounded hover:bg-gray-800">
                  View Product
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default SingleProduct;










// import { useParams } from "react-router-dom";
// import dummyProducts from "../../data/dummyproducts.jsx"; // use lowercase path
// import Footer from "../../components/Footer.jsx";
// import Header from "../../components/Header.jsx";
// import { Facebook, Instagram } from "lucide-react";

// const SingleProduct = () => {
//   const { id } = useParams();
//   const product = dummyProducts.find((p) => p.id === parseInt(id));

//   if (!product) {
//     return <p className="text-center text-red-500 mt-10">Product not found</p>;
//   }

//   // Get 4 related products (for now just filter out the current one and take first 4)
//   const relatedProducts = dummyProducts
//     .filter((p) => p.id !== product.id)
//     .slice(0, 4);

//   return (
//     <>
//       <Header />

//       {/* Single Product Section */}
//       <div className="container mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-2 gap-10">
//         {/* Product Images */}
//         <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
//           <img
//             src={product.image}
//             alt={product.name}
//             className="w-full max-h-[450px] object-contain mx-auto rounded-lg"
//           />
//           <div className="flex gap-3 mt-4 justify-center">
//             {[product.image, product.image, product.image].map((img, i) => (
//               <img
//                 key={i}
//                 src={img}
//                 alt={`thumb-${i}`}
//                 className="w-20 h-20 object-cover rounded-md border cursor-pointer hover:border-black"
//               />
//             ))}
//           </div>
//         </div>

//         {/* Product Info */}
//         <div>
//           <h1 className="text-4xl md:text-5xl font-bold mb-4">{product.name}</h1>

//           <p className="text-3xl md:text-4xl font-semibold text-black">
//             Rs {product.price.toFixed(2)}
//             {product.oldPrice && (
//               <span className="ml-3 line-through text-gray-500 text-xl md:text-2xl">
//                 Rs {product.oldPrice.toFixed(2)}
//               </span>
//             )}
//           </p>

//           <p className="mt-5 text-lg md:text-xl">
//             {product.inStock ? (
//               <span className="text-green-600 font-medium">In Stock</span>
//             ) : (
//               <span className="text-red-600 font-medium">Out of Stock</span>
//             )}
//           </p>

//           <div className="mt-7 space-y-3 text-gray-700 text-lg md:text-xl">
//             <p>
//               <strong>Fit Type:</strong> {product.fitType}
//             </p>
//             <p>
//               <strong>Wash & Care:</strong> {product.washCare}
//             </p>
//             <p>
//               <strong>Color:</strong> {product.color}
//             </p>
//             <p>
//               <strong>Stretch:</strong> {product.stretch}
//             </p>
//           </div>

//           {/* Sizes */}
//           <div className="mt-7">
//             <h3 className="font-semibold text-lg md:text-xl">Available Sizes:</h3>
//             <div className="flex gap-3 mt-3">
//               {product.sizes.map((size) => (
//                 <button
//                   key={size}
//                   className="px-5 py-3 border border-gray-400 rounded hover:bg-black hover:text-white text-lg md:text-xl"
//                 >
//                   {size}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Quantity & Add to Cart */}
//           <div className="mt-7 flex items-center gap-5">
//             <input
//               type="number"
//               defaultValue={1}
//               min={1}
//               className="w-20 md:w-24 border border-gray-400 p-3 text-center text-lg"
//             />
//             <button className="px-8 py-3 bg-black text-white rounded hover:bg-gray-800 text-lg md:text-xl">
//               Add to Cart
//             </button>
//           </div>

//           {/* Share Buttons (icon only) */}
//           <div className="mt-6 flex gap-4">
//             <button className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700">
//               <Facebook className="w-5 h-5" />
//             </button>
//             <button className="p-3 bg-pink-500 text-white rounded-full hover:bg-pink-600">
//               <Instagram className="w-5 h-5" />
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Related Products Section */}
//       <div className="container mx-auto px-6 py-10">
//         <h2 className="text-2xl font-bold mb-6">RELATED PRODUCTS</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
//           {relatedProducts.map((item) => (
//             <div
//               key={item.id}
//               className="border rounded-lg shadow hover:shadow-lg transition flex flex-col"
//             >
//               {/* Image fills most of the card */}
//               <div className="flex-1">
//                 <img
//                   src={item.image}
//                   alt={item.name}
//                   className="w-full h-full object-cover rounded-t-lg"
//                 />
//               </div>

//               {/* Bottom section for details */}
//               <div className="p-4 bg-white">
//                 <h3 className="text-lg font-semibold">{item.name}</h3>
//                 <p className="text-gray-700">Rs {item.price.toFixed(2)}</p>
//                 {item.oldPrice && (
//                   <p className="text-sm line-through text-gray-500">
//                     Rs {item.oldPrice.toFixed(2)}
//                   </p>
//                 )}
//                 <button className="mt-3 w-full px-4 py-2 bg-black text-white rounded hover:bg-gray-800">
//                   View Product
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       <Footer />
//     </>
//   );
// };

// export default SingleProduct;



// // import { useParams } from "react-router-dom";
// // import dummyProducts from "../../data/dummyproducts.jsx"; // use lowercase path
// // import Footer from "../../components/Footer.jsx";
// // import Header from "../../components/Header.jsx";
// // import { Facebook, Instagram } from "lucide-react"

// // const SingleProduct = () => {
// //   const { id } = useParams();
// //   const product = dummyProducts.find((p) => p.id === parseInt(id));

// //   if (!product) {
// //     return <p className="text-center text-red-500 mt-10">Product not found</p>;
// //   }

// //   // Get 4 related products (for now just filter out the current one and take first 4)
// //   const relatedProducts = dummyProducts
// //     .filter((p) => p.id !== product.id)
// //     .slice(0, 4);

// //   return (
// //     <>
// //       <Header />

// //       {/* Single Product Section */}
// //       <div className="container mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-2 gap-10">
// //         {/* Product Images */}
// // <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-400">
// //   <img
// //     src={product.image}
// //     alt={product.name}
// //     className="w-450px h-400px object-cover"
// //   />
// //   <div className="flex gap-3 mt-4">
// //     {[product.image, product.image, product.image].map((img, i) => (
// //       <img
// //         key={i}
// //         src={img}
// //         alt={`thumb-${i}`}
// //         className="w-40 h-40 object-cover rounded-md border cursor-pointer hover:border-black"
// //       />
// //     ))}
// //   </div>
// // </div>

// //         {/* Product Info */}
// //         <div>
// //           <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
// //           <p className="text-3xl font-semibold text-black">
// //             Rs {product.price.toFixed(2)}
// //             {product.oldPrice && (
// //               <span className="ml-2 line-through text-gray-500 text-lg">
// //                 Rs {product.oldPrice.toFixed(2)}
// //               </span>
// //             )}
// //           </p>

// //           <p className="mt-4">
// //             {product.inStock ? (
// //               <span className="text-green-600 font-medium">In Stock</span>
// //             ) : (
// //               <span className="text-red-600 font-medium">Out of Stock</span>
// //             )}
// //           </p>

// //           <div className="mt-6 space-y-2 text-gray-700">
// //             <p>
// //               <strong>Fit Type:</strong> {product.fitType}
// //             </p>
// //             <p>
// //               <strong>Wash & Care:</strong> {product.washCare}
// //             </p>
// //             <p>
// //               <strong>Color:</strong> {product.color}
// //             </p>
// //             <p>
// //               <strong>Stretch:</strong> {product.stretch}
// //             </p>
// //           </div>

// //           {/* Sizes */}
// //           <div className="mt-6">
// //             <h3 className="font-semibold">Available Sizes:</h3>
// //             <div className="flex gap-2 mt-2">
// //               {product.sizes.map((size) => (
// //                 <button
// //                   key={size}
// //                   className="px-4 py-2 border border-gray-400 rounded hover:bg-black hover:text-white"
// //                 >
// //                   {size}
// //                 </button>
// //               ))}
// //             </div>
// //           </div>

// //           {/* Quantity & Add to Cart */}
// //           <div className="mt-6 flex items-center gap-4">
// //             <input
// //               type="number"
// //               defaultValue={1}
// //               min={1}
// //               className="w-16 border border-gray-400 p-2 text-center"
// //             />
// //             <button className="px-6 py-2 bg-black text-white rounded hover:bg-gray-800">
// //               Add to Cart
// //             </button>
// //           </div>
// // {/* Share Buttons (icon only) */}
// //           <div className="mt-6 flex gap-4">
// //             <button className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700">
// //               <Facebook className="w-5 h-5" />
// //             </button>
// //             <button className="p-3 bg-pink-500 text-white rounded-full hover:bg-pink-600">
// //               <Instagram className="w-5 h-5" />
// //             </button>
// //           </div>
// //         </div>
// //       </div>

// //   {/* Related Products Section */}
// // <div className="container mx-auto px-6 py-10">
// //   <h2 className="text-2xl font-bold mb-6">RELATED PRODUCTS</h2>
// //   <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
// //     {relatedProducts.map((item) => (
// //       <div
// //         key={item.id}
// //         className="border rounded-lg shadow hover:shadow-lg transition flex flex-col"
// //       >
// //         {/* Image fills most of the card */}
// //         <div className="flex-1">
// //           <img
// //             src={item.image}
// //             alt={item.name}
// //             className="w-full h-full object-cover rounded-t-lg"
// //           />
// //         </div>

// //         {/* Bottom section for details */}
// //         <div className="p-4 bg-white">
// //           <h3 className="text-lg font-semibold">{item.name}</h3>
// //           <p className="text-gray-700">Rs {item.price.toFixed(2)}</p>
// //           {item.oldPrice && (
// //             <p className="text-sm line-through text-gray-500">
// //               Rs {item.oldPrice.toFixed(2)}
// //             </p>
// //           )}
// //           <button className="mt-3 w-full px-4 py-2 bg-black text-white rounded hover:bg-gray-800">
// //             View Product
// //           </button>
// //         </div>
// //       </div>
// //     ))}
// //   </div>
// // </div>

// //       <Footer />
// //     </>
// //   );
// // };

// // export default SingleProduct;












