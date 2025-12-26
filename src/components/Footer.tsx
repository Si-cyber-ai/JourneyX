import { Link } from "react-router-dom";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface FooterProps {
  images?: string[];
  currentIndex?: number;
}

const Footer = ({ images = [], currentIndex = 0 }: FooterProps) => {
  // Parallax effect for footer
  const footerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end start"]
  });
  
  // Move background DOWN when scrolling UP (opposite direction for parallax effect)
  const backgroundY = useTransform(scrollYProgress, [0, 1], [-100, 100]);

  return (
    <footer ref={footerRef} className="relative overflow-hidden" style={{ minHeight: '45vh' }}>
        {/* Parallax background images with rotation */}
        {images.length > 0 && (
          <div className="absolute inset-0" style={{ zIndex: 0 }}>
            {images.map((image, index) => (
              <motion.div
                key={index}
                className="absolute inset-0 transition-opacity duration-500"
                style={{
                  backgroundImage: `url(${image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  opacity: index === currentIndex ? 1 : 0,
                  y: backgroundY // Parallax effect
                }}
              />
            ))}
          </div>
        )}

        {/* Fallback solid background if no images */}
        {images.length === 0 && (
          <div className="absolute inset-0 bg-gradient-to-b from-muted to-background" style={{ zIndex: 0 }} />
        )}

        {/* Dark overlay for readability */}
        <div 
          className="absolute inset-0" 
          style={{ 
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.8) 100%)',
            zIndex: 1
          }}
        />

        {/* Footer content */}
        <div className="relative container mx-auto px-8 py-16 max-w-4xl" style={{ zIndex: 2 }}>
          {/* Brand & Positioning */}
          <div className="mb-8">
            <h3 className="text-xl font-medium text-white/95 mb-2">
              JourneyX
            </h3>
            <p className="text-sm text-white/70 mb-3">
              Travel intelligence for solo explorers.
            </p>
            <p className="text-sm text-white/60 flex items-center gap-1">
              <span>📍</span>
              <span>Based in India • Built for global travelers</span>
            </p>
          </div>

          {/* Essential Links */}
          <div className="mb-8">
            <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
              <Link 
                to="/journey-wall" 
                className="text-white/60 hover:text-white/90 transition-colors"
              >
                Journey Wall
              </Link>
              <Link 
                to="/travel-assistant" 
                className="text-white/60 hover:text-white/90 transition-colors"
              >
                Travel Assistant
              </Link>
              <Link 
                to="/secret-spots" 
                className="text-white/60 hover:text-white/90 transition-colors"
              >
                Secret Spots
              </Link>
              <Link 
                to="/booking" 
                className="text-white/60 hover:text-white/90 transition-colors"
              >
                Smart Booking
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div className="mb-8">
            <a 
              href="mailto:hello@journeyx.travel" 
              className="text-sm text-white/70 hover:text-white/90 transition-colors"
            >
              hello@journeyx.travel
            </a>
            <p className="text-xs text-white/50 mt-1">
              We reply thoughtfully, not instantly.
            </p>
          </div>

          {/* Legal & Trust */}
          <div className="pt-6 border-t border-white/10">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-white/50">
              <span>© JourneyX 2025</span>
              <button className="hover:text-white/70 transition-colors">
                Privacy
              </button>
              <span className="text-white/30">·</span>
              <button className="hover:text-white/70 transition-colors">
                Terms
              </button>
            </div>
          </div>
        </div>
    </footer>
  );
};

export default Footer;
