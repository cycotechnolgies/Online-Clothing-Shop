
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const CategoryPage = () => {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    axios
      .get(`http://localhost:5000/api/products/${categoryName}`)
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load products");
        setLoading(false);
      });
  }, [categoryName]);

  return (
  <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200">
      {/* Hero Section */}
  <div className="relative h-64 flex items-center justify-center mb-6">
        <img src="https://images.pexels.com/photos/2983464/pexels-photo-2983464.jpeg" alt="Category Hero" className="absolute inset-0 w-full h-full object-cover opacity-60" />
        <div className="relative z-10 text-center">
          <h1 className="text-5xl font-extrabold text-gray-700 drop-shadow-lg uppercase tracking-widest mb-2">{categoryName} Collection</h1>
          <p className="text-lg text-black-700 font-medium">Discover the latest trends in {categoryName.toLowerCase()} fashion</p>
        </div>
      </div>

  <div className="flex max-w-1xl mx-auto px-2 md:px-6 gap-8">
        {/* Sidebar Filters - bigger and always visible */}
        <aside className="w-2/5 max-w-xs pr-8">
          <div className="bg-white rounded-2xl shadow-xl p-5 mb-8 border border-gray-200">
            <h3 className="font-extrabold text-2xl mb-8 text-black tracking-wide">Filters</h3>
            <div className="mb-8">
              <p className="font-semibold mb-3 text-gray-700">Availability</p>
              <label className="flex items-center gap-3 text-black text-sm">
                <input type="checkbox" className="accent-black w-5 h-5" /> In Stock
              </label>
            </div>
            <div className="mb-8">
              <p className="font-semibold mb-3 text-gray-700">Product Type</p>
              {["SKIRT", "FROCK", "BLOUSE"].map(type => (
                <label key={type} className="flex items-center gap-3 text-black text-sm mb-2">
                  <input type="checkbox" className="accent-black w-5 h-5" /> {type}
                </label>
              ))}
            </div>
            <div>
              <p className="font-semibold mb-3 text-gray-700">Size</p>
              {["S", "M", "L", "XL"].map(size => (
                <label key={size} className="flex items-center gap-3 text-black text-sm mb-2">
                  <input type="checkbox" className="accent-black w-5 h-5" /> {size}
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <main>
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <div className="w-10 h-10 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : error ? (
            <div className="text-center text-red-500 font-medium py-4">{error}</div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 w-full">
              {products.map((product) => (
                <div key={product._id} className="bg-white shadow-md overflow-hidden cursor-pointer hover:shadow-xl transition duration-300">
                  <div className="relative w-full h-[600px] group">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                    <span
                      className={`absolute top-2 left-2 text-xs px-2 py-1 font-medium rounded ${product.inStock ? "bg-[#2db6ad] text-white" : "bg-[#e94d4d] text-white"}`}
                    >
                      {product.inStock ? "In stock" : "Out of stock"}
                    </span>
                    {product.oldPrice && (
                      <span className="absolute top-2 right-2 bg-black text-white text-xs px-2 py-1 rounded">
                        -{Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%
                      </span>
                    )}
                    <div className="absolute top-12 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition">
                      <button className="bg-white hover:bg-gray-200 text-black p-2 rounded-full shadow">
                        {/* Heart icon placeholder */}
                        ♥
                      </button>
                      <button className="bg-white hover:bg-gray-200 text-black p-2 rounded-full shadow">
                        {/* Eye icon placeholder */}
                        👁
                      </button>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 opacity-0 group-hover:opacity-100 transition">
                      <button className="w-full bg-white border border-black text-xs font-semibold text-black text-center py-2 tracking-wide hover:bg-black hover:text-white transition rounded-none">
                        QUICK ADD
                      </button>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-sm font-normal text-black mb-1 lettercase">{product.name}</h3>
                    <div className="text-base font-semibold text-black">
                      Rs {product.price.toFixed(2)}
                      {product.oldPrice && (
                        <span className="text-sm font-normal line-through text-gray-500 ml-2">
                          Rs {product.oldPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {product.sizes.map((size) => (
                        <span
                          key={size}
                          className="border border-gray-300 text-sm font-medium px-3 py-1 text-center text-gray-700 hover:border-black hover:font-semibold transition duration-1000"
                        >
                          {size}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 py-10">No products found in {categoryName}.</div>
          )}
        </main>
      </div>
      <br />
    </div>
  );
};

export default CategoryPage;
