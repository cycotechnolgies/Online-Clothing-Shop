import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaEye } from "react-icons/fa";
import dummyProducts from "../data/dummyproducts";



const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white shadow-md overflow-hidden cursor-pointer hover:shadow-xl transition duration-300"
      onClick={() => navigate(`/product/${product.id}`)}
    
    >
      

      <div className="relative w-full h-[450px] group">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />

        {/* Stock Badge */}
        <span
          className={`absolute top-2 left-2 text-xs px-2 py-1 font-medium rounded ${product.inStock ? "bg-[#2db6ad] text-white" : "bg-[#e94d4d] text-white"
            }`}
        >
          {product.inStock ? "In stock" : "Out of stock"}
        </span>


        {/* Discount Badge */}
        {product.oldPrice && (
          <span className="absolute top-2 right-2 bg-black text-white text-xs px-2 py-1 rounded">
            -{Math.round(
              ((product.oldPrice - product.price) / product.oldPrice) * 100
            )}
            %
          </span>
        )}

        {/* Hover Icons */}
        <div className="absolute top-12 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition">
          <button className="bg-white hover:bg-gray-200 text-black p-2 rounded-full shadow">
            <FaHeart size={16} />
          </button>
          <button className="bg-white hover:bg-gray-200 text-black p-2 rounded-full shadow">
            <FaEye size={16} />
          </button>
        </div>

        {/* Quick Add Button */}
        <div className="absolute bottom-0 left-0 right-0 opacity-0 group-hover:opacity-100 transition">
          <button
            className="w-full bg-white border border-black text-xs font-semibold text-black text-center py-2 tracking-wide hover:bg-black hover:text-white transition rounded-none"
          >
            QUICK ADD
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="text-sm font-normal text-black mb-1 lettercase">
          {product.name}
        </h3>
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
              className="border border-gray-300 text-sm font-medium px-3 py-1 text-center text-gray-700 hover:border-black hover:font-semibold transition transition duration-1000"
            >
              {size}
            </span>
          ))}

        </div>
      </div>
    </div>
  );
};


const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setProducts(dummyProducts);
      } catch (err) {
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className="py-10 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-extrabold tracking-wider uppercase mb-6 text-center text-black">
          Featured Products
        </h2>


        {loading && (
          <div className="flex justify-center items-center h-40">
            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {error && <div className="text-center text-red-500 font-medium py-4">{error}</div>}

        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;
