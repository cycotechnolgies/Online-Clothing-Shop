import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const slides = [
  {
    id: 1,
    image: "https://images.pexels.com/photos/322207/pexels-photo-322207.jpeg",
    title: "WORKWEAR,",
    subtitle: "Redefined Daily",
    button: "FROCK",
    link: "/frock",
  },
  {
    id: 2,
    image: "https://images.pexels.com/photos/794064/pexels-photo-794064.jpeg",
    title: "MODERN STYLE,",
    subtitle: "For Every Occasion",
    button: "EXPLORE",
    link: "/skirt",
  },
  {
    id: 3,
    image: "https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg",
    title: "ELEGANCE,",
    subtitle: "Your Everyday Choice",
    button: "DISCOVER",
    link: "/blouse",
  },
];

export default function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  // Auto-slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="relative w-full h-[85vh] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? "opacity-100 z-20" : "opacity-0 z-0"
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
            draggable={false}
          />

          <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-start px-6 md:px-24 z-30">
            <h1 className="text-white text-4xl md:text-6xl font-extrabold drop-shadow-lg mb-2">
              <span className="text-white">OLLY</span> {slide.title}
            </h1>
            <p className="text-white text-xl md:text-3xl font-medium mb-6 drop-shadow">
              {slide.subtitle}
            </p>
            <button
              onClick={() => navigate(slide.link)}
              className="bg-white text-black px-6 py-3 text-lg font-bold hover:bg-black hover:text-white transition rounded-md"
            >
              {slide.button}
            </button>
          </div>
        </div>
      ))}

      {/* Dot Indicators */}
      <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex space-x-3 z-50">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full border border-white ${
              currentIndex === index ? "bg-white" : "bg-transparent"
            } transition-all duration-300`}
            aria-label={`Slide ${index + 1}`}
          ></button>
        ))}
      </div>
    </div>
  );
}
