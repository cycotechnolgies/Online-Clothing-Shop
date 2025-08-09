import React from "react";
import { useNavigate } from "react-router-dom";

const categories = [
  {
    id: 1,
    name: "BLOUSE",
    image: "https://images.pexels.com/photos/794064/pexels-photo-794064.jpeg?_gl=1*1x3mxl3*_ga*NTc1NDY5NzIzLjE3NDMyNzU2ODc.*_ga_8JE65Q40S6*czE3NTQ2NDk3NzckbzYkZzEkdDE3NTQ2NDk3OTQkajQzJGwwJGgw",
    link: "/blouse",
  },
  {
    id: 2,
    name: "SKIRT",
    image: "https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?_gl=1*1x3mxl3*_ga*NTc1NDY5NzIzLjE3NDMyNzU2ODc.*_ga_8JE65Q40S6*czE3NTQ2NDk3NzckbzYkZzEkdDE3NTQ2NDk3OTQkajQzJGwwJGgw",
    
    link: "/skirt",
  },
  {
    id: 3,
    name: "FROCK",
    image: "https://images.pexels.com/photos/322207/pexels-photo-322207.jpeg?_gl=1*uw40da*_ga*NTc1NDY5NzIzLjE3NDMyNzU2ODc.*_ga_8JE65Q40S6*czE3NTQ2NDk3NzckbzYkZzEkdDE3NTQ2NDk4NTMkajYwJGwwJGgw",
    link: "/frock",
  },
];

export default function Categories() {
  const navigate = useNavigate();

  return (
    <section>
      
  <h2 className="py-5 text-2xl font-bold mb-8 text-center">CATEGORIES</h2>
  <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-8">
    {categories.map((category) => (
      <div
  key={category.id}
  onClick={() => navigate(category.link)}
  className="relative group cursor-pointer overflow-hidden border border-gray-200 shadow-md"
>
  {/* Image */}
  <img
    src={category.image}
    alt={category.name}
    className="w-full h-100 object-cover transform transition-transform duration-500 group-hover:scale-105"
    style={{ maxHeight: "100vh" }}
  />

  {/* Floating label */}
  <div className="absolute left-1/2 bottom-4 transform -translate-x-1/2 w-[90%] bg-transparent backdrop-blur-md bg-white/20 text-white text-lg font-bold px-5 py-2 transition duration-300 group-hover:bg-black/40 rounded-lg text-center">
  {category.name}
</div>



</div>

    ))}
  </div>
</section>

  );
}
