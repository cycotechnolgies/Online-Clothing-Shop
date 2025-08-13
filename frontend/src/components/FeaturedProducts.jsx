import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

// Local image imports
import tshirt from "../assets/tshirt.jpg";
import denimJacket from "../assets/denim-jacket.jpg";
import frock from "../assets/frock.jpg";
import summerDress from "../assets/summer-dress.jpg";
import blouse from "../assets/blouse.jpg";
import saree from "../assets/saree.jpg";
import bra from "../assets/bra.jpeg";
import nighty from "../assets/nighty.jpg";

// Dummy product data with sizes
const dummyProducts = [
  { id: 1, name: "Classic White T-Shirt", price: 2000.0, image: tshirt, sizes: ["S", "M", "L", "XL"] },
  { id: 2, name: "Denim Jacket", price: 4500.0, image: denimJacket, sizes: ["S", "M", "L"] },
  { id: 3, name: "Summer Dress", price: 3000.0, image: summerDress, sizes: ["S", "M", "L"] },
  { id: 4, name: "Frock", price: 2800.0, image: frock, sizes: ["S", "M", "L"] },
  { id: 5, name: "Saree Blouse", price: 1000.0, image: blouse, sizes: ["S", "M", "L", "XL"] },
  { id: 6, name: "Women's Bra", price: 800.0, image: bra, sizes: ["S", "M", "L"] },
  { id: 7, name: "Saree", price: 4800.0, image: saree, sizes: ["S", "M", "L"] },
  { id: 8, name: "Women's Night Dress", price: 2800.0, image: nighty, sizes: ["S", "M", "L"] },
];

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");
        // Simulate API delay
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
        <h2 className="text-3xl font-bold mb-6 text-center">Featured Products</h2>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center h-40">
            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center text-red-500 font-medium py-4">
            {error}
          </div>
        )}

        {/* Products Grid */}
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


















