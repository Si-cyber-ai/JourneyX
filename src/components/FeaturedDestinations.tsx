
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Calendar, Users, ArrowRight, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

const destinations = [
  {
    id: "1",
    name: "Hidden Cove, Bali",
    description: "A secluded beach paradise away from tourist crowds, featuring crystal clear waters and pristine white sand beaches.",
    image: "https://images.unsplash.com/photo-1426604966848-d7adac402bff",
    location: "Bali, Indonesia",
    tags: ["beach", "hidden", "peaceful"],
    price: "1,299",
    rating: 4.8,
    reviews: 127,
    startingDate: "Aug 2024",
    duration: "7 days",
    groupSize: "2-8",
  },
  {
    id: "2",
    name: "Mountain Sanctuary",
    description: "Breathtaking views from this mountain retreat, surrounded by alpine meadows and snow-capped peaks.",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    location: "Swiss Alps, Switzerland",
    tags: ["mountains", "hiking", "views"],
    price: "2,499",
    rating: 4.9,
    reviews: 89,
    startingDate: "Jul 2024",
    duration: "10 days",
    groupSize: "4-12",
  },
  {
    id: "3",
    name: "Whale Watching Point",
    description: "The best spot to see humpback whales up close, with expert marine biologists as your guides.",
    image: "https://images.unsplash.com/photo-1518877593221-1f28583780b4",
    location: "Maui, Hawaii",
    tags: ["wildlife", "ocean", "photography"],
    price: "1,899",
    rating: 4.7,
    reviews: 156,
    startingDate: "Sep 2024",
    duration: "5 days",
    groupSize: "6-15",
  }
];

const FeaturedDestinations = () => {
  const navigate = useNavigate();
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [likedDestinations, setLikedDestinations] = useState<string[]>([]);

  const handleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedDestinations(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <section>
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-cards"
      >
        {destinations.map((destination) => (
          <motion.div
            key={destination.id}
            variants={item}
            onHoverStart={() => setHoveredId(destination.id)}
            onHoverEnd={() => setHoveredId(null)}
            className="relative"
          >
            <Card 
              className="premium-card overflow-hidden cursor-pointer"
              onClick={() => navigate(`/destination/${destination.id}`)}
            >
              <div className="relative h-[300px] overflow-hidden">
                <motion.img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-full object-cover"
                  animate={{
                    scale: hoveredId === destination.id ? 1.05 : 1
                  }}
                  transition={{ duration: 0.4 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                
                {/* Quiet save button */}
                <motion.button
                  className={`absolute top-4 right-4 p-2 rounded-[var(--radius)] ${
                    likedDestinations.includes(destination.id) 
                      ? 'bg-primary text-white' 
                      : 'bg-white/80 text-gray-700'
                  }`}
                  onClick={(e) => handleLike(destination.id, e)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Heart 
                    className={`h-4 w-4 ${
                      likedDestinations.includes(destination.id) ? 'fill-current' : ''
                    }`}
                  />
                </motion.button>

                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center space-x-1 text-white/90 text-meta mb-2">
                    <MapPin className="h-4 w-4" />
                    <span>{destination.location}</span>
                  </div>
                  <h3 className="text-subsection text-white mb-1">{destination.name}</h3>
                  <div className="flex items-center space-x-2">
                    <span className="bg-white/20 backdrop-blur-sm text-white px-2 py-1 rounded-[calc(var(--radius)*0.5)] text-meta">
                      ⭐ {destination.rating}
                    </span>
                    <span className="text-white/80 text-meta">
                      ({destination.reviews} reviews)
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-5 space-y-3">
                <p className="text-body text-muted-foreground line-clamp-2">
                  {destination.description}
                </p>

                <div className="flex items-center justify-between text-meta text-muted-foreground">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4" />
                    <span>{destination.duration}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4" />
                    <span>{destination.groupSize}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span>From</span>
                    <span className="font-bold text-primary">${destination.price}</span>
                  </div>
                </div>

                {/* Decision confidence: Good for solo travelers */}
                <div className="pt-2 border-t border-border">
                  <p className="text-meta text-muted-foreground italic">
                    Well suited for first-time solo travelers
                  </p>
                </div>

                {/* Secondary button: Not primary since we have multiple cards */}
                <Button 
                  className="w-full group"
                  variant="secondary"
                >
                  <span>Explore Now</span>
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default FeaturedDestinations;
