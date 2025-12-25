interface HeroCarouselProps {
  images: string[];
  currentIndex: number;
}

const HeroCarousel = ({ images, currentIndex }: HeroCarouselProps) => {
  return (
    <>
      {/* LAYER 1: Fixed full-screen background image - z-index: -2 */}
      <div className="fixed inset-0 w-screen h-screen overflow-hidden" style={{ zIndex: -2 }}>
        {images.map((image, index) => (
          <div
            key={index}
            className="absolute inset-0 transition-opacity duration-500"
            style={{
              backgroundImage: `url(${image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              opacity: index === currentIndex ? 1 : 0
            }}
          />
        ))}
      </div>
      
      {/* LAYER 2: Static dark overlay for readability - z-index: -1 */}
      <div className="fixed inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" style={{ zIndex: -1 }} />
    </>
  );
};

export default HeroCarousel;
