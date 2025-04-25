
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import HeroCarousel from "@/components/HeroCarousel";
import FeaturedDestinations from "@/components/FeaturedDestinations";
import { 
  Camera, 
  Map, 
  CloudSun, 
  Plane, 
  MapPin 
} from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative h-screen">
        <div className="absolute inset-0">
          <HeroCarousel />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70 flex items-center justify-center">
            <div className="container mx-auto px-4 text-center text-white">
              <motion.h1 
                className="text-4xl md:text-6xl font-bold mb-4"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Discover Your Next Adventure
              </motion.h1>
              <motion.p 
                className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Explore hidden gems and extraordinary journeys around the world
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex flex-wrap justify-center gap-4"
              >
                <Button asChild size="lg">
                  <Link to="/journey-wall">
                    <Camera className="mr-2" />
                    View Journey Wall
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link to="/secret-spots">
                    <Map className="mr-2" />
                    Discover Secret Spots
                  </Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Experience JourneyX</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center"
            >
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Map className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Journey Wall</h3>
              <p className="text-muted-foreground">Share your adventures and discover stories from travelers around the world.</p>
              <Button asChild variant="link" className="mt-4">
                <Link to="/journey-wall">Explore Wall</Link>
              </Button>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center"
            >
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <CloudSun className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Travel Assistant</h3>
              <p className="text-muted-foreground">Get real-time weather updates and travel news for any destination.</p>
              <Button asChild variant="link" className="mt-4">
                <Link to="/travel-assistant">Check Weather</Link>
              </Button>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center"
            >
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <MapPin className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Secret Spots</h3>
              <p className="text-muted-foreground">Access exclusive hidden gems and off-the-beaten-path locations.</p>
              <Button asChild variant="link" className="mt-4">
                <Link to="/secret-spots">Unlock Secrets</Link>
              </Button>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center"
            >
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Plane className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Booking</h3>
              <p className="text-muted-foreground">Find and book flights, hotels, and experiences all in one place.</p>
              <Button asChild variant="link" className="mt-4">
                <Link to="/booking">Book Now</Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-2 text-center">Featured Destinations</h2>
          <p className="text-center text-muted-foreground mb-12">Handpicked locations for your next adventure</p>
          <FeaturedDestinations />
        </div>
      </section>
    </div>
  );
};

export default Index;
