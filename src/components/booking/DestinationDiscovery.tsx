/*
 * DestinationDiscovery Component
 * Premium travel magazine aesthetic - Image-first design
 * Full-width destination cards with cinematic feel
 * Inspiration: Monocle / Airbnb / High-end travel editorials
 */

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";

interface Destination {
  id: string;
  name: string;
  country: string;
  startingPrice: number;
  imageUrl: string;
  description: string;
}

interface DestinationDiscoveryProps {
  destinations: Destination[];
  onSelect: (destination: Destination) => void;
}

const DestinationDiscovery = ({ destinations, onSelect }: DestinationDiscoveryProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  // Subtle parallax effect on hero text
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div ref={containerRef} className="relative">
      {/* Hero Section - Editorial introduction */}
      <motion.div 
        style={{ y: heroY, opacity: heroOpacity }}
        className="relative h-[60vh] flex items-center justify-center overflow-hidden"
      >
        {/* Background with gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background z-10" />
        
        <div className="relative z-20 text-center max-w-3xl px-4">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-5xl md:text-7xl font-light text-foreground mb-6 tracking-tight"
          >
            Where to next?
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-xl md:text-2xl text-muted-foreground font-light"
          >
            Discover your journey
          </motion.p>
        </div>
      </motion.div>

      {/* Destination Cards - Large, image-first */}
      <div className="space-y-0">
        {destinations.map((destination, index) => (
          <DestinationCard
            key={destination.id}
            destination={destination}
            index={index}
            onSelect={onSelect}
          />
        ))}
      </div>
    </div>
  );
};

// Individual destination card with parallax
const DestinationCard = ({ 
  destination, 
  index, 
  onSelect 
}: { 
  destination: Destination; 
  index: number;
  onSelect: (d: Destination) => void;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });
  
  // Parallax on image
  const imageY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.1]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className="relative h-[70vh] overflow-hidden cursor-pointer group"
      onClick={() => onSelect(destination)}
    >
      {/* Parallax background image */}
      <motion.div 
        style={{ y: imageY, scale: imageScale }}
        className="absolute inset-0"
      >
        <img
          src={destination.imageUrl}
          alt={destination.name}
          className="w-full h-full object-cover"
        />
      </motion.div>
      
      {/* Gradient overlay - darkens on hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent group-hover:from-black/80 transition-all duration-700" />
      
      {/* Content - Bottom aligned */}
      <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16 z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {/* Small label */}
            <p className="text-white/70 text-sm md:text-base uppercase tracking-widest mb-3 font-light">
              {destination.country}
            </p>
            
            {/* Large destination name */}
            <h2 className="text-5xl md:text-7xl font-light text-white mb-4 tracking-tight">
              {destination.name}
            </h2>
            
            {/* Description - subtle */}
            <p className="text-white/80 text-lg md:text-xl mb-6 max-w-2xl font-light leading-relaxed">
              {destination.description}
            </p>
            
            {/* Price and CTA */}
            <div className="flex items-center gap-8">
              <div>
                <p className="text-white/60 text-sm mb-1">From</p>
                <p className="text-white text-3xl font-light">
                  ₹{destination.startingPrice.toLocaleString()}
                </p>
              </div>
              
              <button className="flex items-center gap-3 text-white/90 hover:text-white transition-colors group/btn">
                <span className="text-lg font-light">Explore route</span>
                <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default DestinationDiscovery;
