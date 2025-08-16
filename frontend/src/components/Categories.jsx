import React from "react";
import { useNavigate } from "react-router-dom";

const categories = [
  {
    id: 1,
    name: "BLOUSE",
    image: "https://images.pexels.com/photos/794064/pexels-photo-794064.jpeg",
    link: "/blouse",
  },
  {
    id: 2,
    name: "SKIRT",
    image: "https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg",
    link: "/skirt",
  },
  {
    id: 3,
    name: "FROCK",
    image: "https://images.pexels.com/photos/322207/pexels-photo-322207.jpeg",
    link: "/frock",
  },
];

export default function Categories() {
  const navigate = useNavigate();

  return (
    <section className="py-12 bg-white">
         <h2 className="text-3xl font-extrabold tracking-wider uppercase mb-6 text-center text-black">
          CATEGORIES
        </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto px-4">
        {categories.map((category) => (
          <div
            key={category.id}
            onClick={() => navigate(category.link)}
            className="cursor-pointer rounded shadow-md overflow-hidden"
          >
            <div className="relative group w-full h-[400px] overflow-hidden">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              <div className="absolute bottom-0 left-0 right-0 bg-white text-center py-3 text-sm font-semibold tracking-wider text-black group-hover:bg-black group-hover:text-white transition-all duration-300">
                {category.name}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
