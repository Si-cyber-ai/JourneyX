
import { useState, useEffect } from "react";

const images = [
  {
    src: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb",
    alt: "River between mountains under white clouds"
  },
  {
    src: "https://images.unsplash.com/photo-1472396961693-142e6e269027",
    alt: "Two brown deer beside trees and mountain"
  },
  {
    src: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21",
    alt: "Ocean wave at beach"
  }
];

const HeroCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full w-full">
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={image.src}
            alt={image.alt}
            className="h-full w-full object-cover object-center"
          />
        </div>
      ))}
    </div>
  );
};

export default HeroCarousel;
