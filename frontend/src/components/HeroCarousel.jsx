import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const slides = [
  {
    id: 1,
    image:
      "https://images.pexels.com/photos/322207/pexels-photo-322207.jpeg?_gl=1*uw40da*_ga*NTc1NDY5NzIzLjE3NDMyNzU2ODc.*_ga_8JE65Q40S6*czE3NTQ2NDk3NzckbzYkZzEkdDE3NTQ2NDk4NTMkajYwJGwwJGgw",
    title: "WORKWEAR,",
    subtitle: "Redefined Daily",
    button: "FROCK",
    link: "/frock",
  },
  {
    id: 2,
    image:
      "https://images.pexels.com/photos/794064/pexels-photo-794064.jpeg?_gl=1*1x3mxl3*_ga*NTc1NDY5NzIzLjE3NDMyNzU2ODc.*_ga_8JE65Q40S6*czE3NTQ2NDk3NzckbzYkZzEkdDE3NTQ2NDk3OTQkajQzJGwwJGgw",
    title: "MODERN STYLE,",
    subtitle: "For Every Occasion",
    button: "EXPLORE",
    link: "/skirt",
  },
  {
    id: 3,
    image:
      "https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?_gl=1*1x3mxl3*_ga*NTc1NDY5NzIzLjE3NDMyNzU2ODc.*_ga_8JE65Q40S6*czE3NTQ2NDk3NzckbzYkZzEkdDE3NTQ2NDk3OTQkajQzJGwwJGgw",
    title: "ELEGANCE,",
    subtitle: "Your Everyday Choice",
    button: "DISCOVER",
    link: "/blouse",
  },
];

export default function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  // Auto-slide every 5s
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

   return (
  <div className="relative w-full h-[60vh] overflow-hidden">
    {/* Carousel slides */}
    {slides.map((slide, index) => (
      <div
        key={slide.id}
        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
          index === currentIndex ? "opacity-100 z-20" : "opacity-0 z-0"
        }`}
      >
        {/* Background image */}
        <img
          src={slide.image}
          alt={slide.title}
          className="w-full h-full object-cover"
          draggable={false}
        />

        {/* Overlay with content */}
        <div className="absolute inset-0 bg-transparent bg-opacity-40 flex flex-col justify-center items-start p-6 md:p-16 max-w-[90%] text-white z-30">
          <h1 className="text-3xl md:text-5xl font-bold">
            <span className="uppercase font-extrabold">OLLY</span> {slide.title}
          </h1>
          <small className="text-lg md:text-2xl mb-4">{slide.subtitle}</small>
          <button
            onClick={() => navigate(slide.link)}
            className="px-6 py-3 bg-black backdrop-blur-md bg-black/80 text-white font-bold hover:bg-gray-200 hover:text-black transition relative z-40"
          >
            {slide.button}
          </button>
        </div>
      </div>
    ))}

    {/* Buttons overlay on the sides */}
    <button
      onClick={goToPrev}
      className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black/40 hover:bg-black/60 p-3 rounded-full text-white text-3xl z-40"
      aria-label="Previous Slide"
    >
      &#10094;
    </button>
    <button
      onClick={goToNext}
      className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black/40 hover:bg-black/60 p-3 rounded-full text-white text-3xl z-40"
      aria-label="Next Slide"
    >
      &#10095;
    </button>
  </div>
);

}