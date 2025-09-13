import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import dummyProducts from "../../data/dummyproducts.jsx";
import Footer from "../../components/Footer.jsx";
import Header from "../../components/Header.jsx";
import ProductCard from "../../components/ProductCard.jsx"; // reuse component
import { Facebook, Instagram, ChevronDown, ChevronUp } from "lucide-react";

const SingleProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [mainImage, setMainImage] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [showDetails, setShowDetails] = useState(false);

  const product = dummyProducts.find((p) => p.id === parseInt(id));

  if (!product) {
    return <p className="text-center text-red-500 mt-10">Product not found</p>;
  }

  const relatedProducts = dummyProducts
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <>
      <Header />

      {/* Single Product Section */}
      <section className="container mx-auto px-6 py-12 bg-white p-6 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Image Section */}
          <div className="flex gap-0.5">
            {/* Alternate Images - vertical on left */}
            <div className="flex flex-col gap-3">
              {[product.image, product.image, product.image].map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`thumb-${i}`}
                  onClick={() => setMainImage(img)}
                  className={`w-20 h-20 object-cover rounded-md border cursor-pointer 
                    ${
                      mainImage === img
                        ? "border-black"
                        : "border-gray-300 hover:border-black"
                    }`}
                />
              ))}
            </div>

            {/* Main Image */}
            <div className="flex-1 rounded-lg overflow-hidden">
              <img
                src={mainImage || product.image}
                alt={product.name}
                className="w-full max-h-[600px] object-contain rounded-lg"
              />
            </div>
          </div>

          {/* Product Info */}
          <div>
            <h2 className="text-xl md:text-2xl font-bold mb-3">
              {product.name}
            </h2>

            <p className="text-lg font-semibold text-black">
              Rs {product.price.toFixed(2)}
              {product.oldPrice && (
                <span className="ml-2 line-through text-gray-500 text-sm">
                  Rs {product.oldPrice.toFixed(2)}
                </span>
              )}
            </p>

            {/* Stock Info */}
            <p className="mt-3 text-sm">
              {product.inStock ? (
                <span className="text-green-600 font-medium">In Stock</span>
              ) : (
                <span className="text-red-600 font-medium">Out of Stock</span>
              )}
            </p>

            {/* Progress Bar + Stock Message */}
            {product.inStock && product.stock && (
              <div className="mt-2">
                <div className="w-1/2 bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-green-500 h-3 rounded-full"
                    style={{
                      width: `${Math.min(
                        (product.stock / (product.maxStock || 10)) * 100,
                        100
                      )}%`,
                    }}
                  />
                </div>
                <p className="text-xs text-gray-600 mt-1">
                  Only {product.stock} items left in stock
                </p>
              </div>
            )}

            {/* Extra Details */}
            <div className="mt-5 space-y-2 text-gray-700 text-sm">
              <p>
                <strong>Fit Type:</strong> {product.fitType}
              </p>
              <p>
                <strong>Wash & Care:</strong> {product.washCare}
              </p>
              <p>
                <strong>Stretch:</strong> {product.stretch}
              </p>
            </div>

            {/* Color Selection */}
            <div className="mt-5">
              <h3 className="font-semibold text-sm">Available Colors:</h3>
              <div className="flex gap-2 mt-2">
                {product.color.split(",").map((clr, idx) => (
                  <button
                    key={idx}
                    className="px-3 py-1 border text-xs rounded hover:bg-black hover:text-white"
                  >
                    {clr.trim()}
                  </button>
                ))}
              </div>
            </div>

            {/* Sizes */}
            <div className="mt-5">
              <h3 className="font-semibold text-sm">Available Sizes:</h3>
              <div className="flex gap-2 mt-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    className="px-4 py-2 border border-gray-400 rounded text-sm hover:bg-black hover:text-white"
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity & Add to Cart */}
            <div className="mt-6 flex items-center gap-4">
              <div className="flex items-center border border-gray-400 rounded">
                <button
                  type="button"
                  onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                  className="px-3 py-1 bg-gray-200 hover:bg-gray-300 text-lg font-bold"
                >
                  -
                </button>
                <input
                  type="text"
                  value={quantity}
                  readOnly
                  className="w-12 text-center p-2 text-sm"
                />
                <button
                  type="button"
                  onClick={() => setQuantity((prev) => prev + 1)}
                  className="px-3 py-1 bg-gray-200 hover:bg-gray-300 text-lg font-bold"
                >
                  +
                </button>
              </div>

              <button className="px-6 py-2 bg-black text-white rounded text-sm hover:bg-gray-800">
                Add to Cart
              </button>
            </div>

            {/* Share Buttons */}
            <div className="mt-6 flex gap-4">
              <button className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700">
                <Facebook className="w-4 h-4" />
              </button>
              <button className="p-2 bg-pink-500 text-white rounded-full hover:bg-pink-600">
                <Instagram className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Product Specific Info - Collapsible */}
      <section className="container mx-auto px-6 py-8 bg-white-50 rounded-lg">
        <button
          onClick={() => setShowDetails((prev) => !prev)}
          className="w-full flex justify-between items-center text-left font-bold text-lg focus:outline-none"
        >
          Additional Product Details
          {showDetails ? (
            <ChevronUp className="w-5 h-5" />
          ) : (
            <ChevronDown className="w-5 h-5" />
          )}
        </button>

        {showDetails && (
          <div className="mt-4 space-y-2 text-sm text-gray-700">
            <p>
              <strong>Material:</strong> {product.material}
            </p>
            <p>
              <strong>Style:</strong> {product.style}
            </p>
            <p>
              <strong>Accessories:</strong> {product.accessories}
            </p>
            <p>
              <strong>Model Size:</strong> {product.modelSize}
            </p>
            <p>
              <strong>Measurements:</strong>
            </p>
            <ul className="ml-6 list-disc">
              {product.measurements &&
                Object.entries(product.measurements).map(([key, value]) => (
                  <li key={key}>
                    <strong>{key}:</strong>{" "}
                    {typeof value === "object"
                      ? Object.entries(value)
                          .map(([size, val]) => `${size}: ${val} in`)
                          .join(", ")
                      : value}
                  </li>
                ))}
            </ul>
            <p className="mt-2 text-gray-500 text-xs">{product.note}</p>
          </div>
        )}
      </section>

      {/* Related Products Section */}
      <section className="container mx-auto px-6 py-12">
        <h2 className="text-xl font-bold mb-6">RELATED PRODUCTS</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {relatedProducts.map((item) => (
            <ProductCard
              key={item.id}
              product={item}
              onClick={handleProductClick}
            />
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
};

export default SingleProduct;




// import { useParams, useNavigate } from "react-router-dom";
// import { useState } from "react";
// import dummyProducts from "../../data/dummyproducts.jsx";
// import Footer from "../../components/Footer.jsx";
// import Header from "../../components/Header.jsx";
// import ProductCard from "../../components/ProductCard.jsx"; // reuse component
// import { Facebook, Instagram } from "lucide-react";
// import { ChevronDown, ChevronUp } from "lucide-react"; // add icons


// const SingleProduct = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [mainImage, setMainImage] = useState(null);
//   const [quantity, setQuantity] = useState(1);
//   const [showDetails, setShowDetails] = useState(false);


//   const product = dummyProducts.find((p) => p.id === parseInt(id));

//   if (!product) {
//     return <p className="text-center text-red-500 mt-10">Product not found</p>;
//   }

//   const relatedProducts = dummyProducts
//     .filter((p) => p.id !== product.id)
//     .slice(0, 4);

//   const handleProductClick = (productId) => {
//     navigate(`/product/${productId}`);
//   };

//   return (
//     <>
//       <Header />

//       {/* Single Product Section */}
//       <section className="container mx-auto px-6 py-12 bg-white p-6 rounded-lg">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
//           {/* Image Section */}
//           <div className="flex gap-0.5">
//             {/* Alternate Images - vertical on left */}
//             <div className="flex flex-col gap-3">
//               {[product.image, product.image, product.image].map((img, i) => (
//                 <img
//                   key={i}
//                   src={img}
//                   alt={`thumb-${i}`}
//                   onClick={() => setMainImage(img)}
//                   className={`w-20 h-20 object-cover rounded-md border cursor-pointer 
//                     ${mainImage === img ? "border-black" : "border-gray-300 hover:border-black"}`}
//                 />
//               ))}
//             </div>

//             {/* Main Image */}
//             <div className="flex-1 rounded-lg overflow-hidden">
//               <img
//                 src={mainImage || product.image}
//                 alt={product.name}
//                 className="w-full max-h-[600px] object-contain rounded-lg"
//               />
//             </div>
//           </div>

//           {/* Product Info */}
//           <div>
//             <h2 className="text-xl md:text-2xl font-bold mb-3">{product.name}</h2>

//             <p className="text-lg font-semibold text-black">
//               Rs {product.price.toFixed(2)}
//               {product.oldPrice && (
//                 <span className="ml-2 line-through text-gray-500 text-sm">
//                   Rs {product.oldPrice.toFixed(2)}
//                 </span>
//               )}
//             </p>

//             <p className="mt-3 text-sm">
//               {product.inStock ? (
//                 <span className="text-green-600 font-medium">In Stock</span>
//               ) : (
//                 <span className="text-red-600 font-medium">Out of Stock</span>
//               )}
//             </p>

//             {/* Extra Details */}
//             <div className="mt-5 space-y-2 text-gray-700 text-sm">
//               <p>
//                 <strong>Fit Type:</strong> {product.fitType}
//               </p>
//               <p>
//                 <strong>Wash & Care:</strong> {product.washCare}
//               </p>
//               <p>
//                 <strong>Stretch:</strong> {product.stretch}
//               </p>
//             </div>

//             {/* Color Selection */}
//             <div className="mt-5">
//               <h3 className="font-semibold text-sm">Available Colors:</h3>
//               <div className="flex gap-2 mt-2">
//                 {product.color.split(",").map((clr, idx) => (
//                   <button
//                     key={idx}
//                     className="px-3 py-1 border text-xs rounded hover:bg-black hover:text-white"
//                   >
//                     {clr.trim()}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* Sizes */}
//             <div className="mt-5">
//               <h3 className="font-semibold text-sm">Available Sizes:</h3>
//               <div className="flex gap-2 mt-2">
//                 {product.sizes.map((size) => (
//                   <button
//                     key={size}
//                     className="px-4 py-2 border border-gray-400 rounded text-sm hover:bg-black hover:text-white"
//                   >
//                     {size}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* Quantity & Add to Cart */}
//             <div className="mt-6 flex items-center gap-4">
//               <div className="flex items-center border border-gray-400 rounded">
//                 <button
//                   type="button"
//                   onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
//                   className="px-3 py-1 bg-gray-200 hover:bg-gray-300 text-lg font-bold"
//                 >
//                   -
//                 </button>
//                 <input
//                   type="text"
//                   value={quantity}
//                   readOnly
//                   className="w-12 text-center p-2 text-sm"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setQuantity((prev) => prev + 1)}
//                   className="px-3 py-1 bg-gray-200 hover:bg-gray-300 text-lg font-bold"
//                 >
//                   +
//                 </button>
//               </div>

//               <button className="px-6 py-2 bg-black text-white rounded text-sm hover:bg-gray-800">
//                 Add to Cart
//               </button>
//             </div>

//             {/* Share Buttons */}
//             <div className="mt-6 flex gap-4">
//               <button className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700">
//                 <Facebook className="w-4 h-4" />
//               </button>
//               <button className="p-2 bg-pink-500 text-white rounded-full hover:bg-pink-600">
//                 <Instagram className="w-4 h-4" />
//               </button>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Product Specific Info - Collapsible */}
// <section className="container mx-auto px-6 py-8 bg-white-50 rounded-lg">
//   <button
//     onClick={() => setShowDetails((prev) => !prev)}
//     className="w-full flex justify-between items-center text-left font-bold text-lg focus:outline-none"
//   >
//     Aditional Product Details
//     {showDetails ? (
//       <ChevronUp className="w-5 h-5" />
//     ) : (
//       <ChevronDown className="w-5 h-5" />
//     )}
//   </button>

//   {showDetails && (
//     <div className="mt-4 space-y-2 text-sm text-gray-700">
//       <p>
//         <strong>Material:</strong> {product.material}
//       </p>
//       <p>
//         <strong>Style:</strong> {product.style}
//       </p>
//       <p>
//         <strong>Accessories:</strong> {product.accessories}
//       </p>
//       <p>
//         <strong>Model Size:</strong> {product.modelSize}
//       </p>
//       <p>
//         <strong>Measurements:</strong>
//       </p>
//       <ul className="ml-6 list-disc">
//         {product.measurements &&
//           Object.entries(product.measurements).map(([key, value]) => (
//             <li key={key}>
//               <strong>{key}:</strong>{" "}
//               {typeof value === "object"
//                 ? Object.entries(value)
//                     .map(([size, val]) => `${size}: ${val} in`)
//                     .join(", ")
//                 : value}
//             </li>
//           ))}
//       </ul>
//       <p className="mt-2 text-gray-500 text-xs">{product.note}</p>
//     </div>
//   )}
// </section>

//       {/* Related Products Section */}
//       <section className="container mx-auto px-6 py-12">
//         <h2 className="text-xl font-bold mb-6">RELATED PRODUCTS</h2>

//         <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//           {relatedProducts.map((item) => (
//             <ProductCard
//               key={item.id}
//               product={item}
//               onClick={handleProductClick}
//             />
//           ))}
//         </div>
//       </section>

//       <Footer />
//     </>
//   );
// };

// export default SingleProduct;








































