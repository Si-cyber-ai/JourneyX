import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import FeaturedDestinations from "@/components/FeaturedDestinations";
import StatsSection from "@/components/StatsSection";
import QuoteCard from "@/components/QuoteCard";
import Footer from "@/components/Footer";
import { 
  Map, 
  CloudSun, 
  Plane, 
  MapPin,
  ArrowRight
} from "lucide-react";
import { cn } from "@/lib/utils";

const ExperienceSection = () => {
  const features = [
    {
      icon: Map,
      title: "Journey Wall",
      description: "Real journeys from real travelers—not influencer highlights. See what actually happened, where things went wrong, and what made the trip unforgettable.",
      link: "/journey-wall",
      color: "bg-blue-500/10",
      gradient: "from-blue-500 to-indigo-500",
      image: "https://images.unsplash.com/photo-1488085061387-422e29b40080?q=80&w=3731&auto=format&fit=crop",
    },
    {
      icon: CloudSun,
      title: "Travel Assistant",
      description: "Know before you go. Weather patterns, safety alerts, and local conditions in plain English—so you can plan with confidence, not guesswork.",
      link: "/travel-assistant",
      color: "bg-yellow-500/10",
      gradient: "from-amber-500 to-yellow-500",
      image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=3724&auto=format&fit=crop",
    },
    {
      icon: MapPin,
      title: "Secret Spots",
      description: "Places locals protect—shared responsibly. Authentic experiences off the beaten path, with context on why they're hidden and how to visit respectfully.",
      link: "/secret-spots",
      color: "bg-green-500/10",
      gradient: "from-emerald-500 to-green-500",
      image: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?q=80&w=3687&auto=format&fit=crop",
    },
    {
      icon: Plane,
      title: "Smart Booking",
      description: "Book what fits your journey—not just the cheapest option. Flights and stays matched to your travel style, budget, and safety priorities.",
      link: "/booking",
      color: "bg-purple-500/10",
      gradient: "from-purple-500 to-violet-500",
      image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=3724&auto=format&fit=crop",
    }
  ];

  return (
    <section className="py-16 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-grid-white/10 bg-[size:60px_60px] opacity-10" />
      </div>

      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-block"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              Built for Solo Travelers
            </span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
            Travel Smart, Not Scared
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to explore confidently—from real journey insights to safety intelligence
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative"
            >
              <div className="relative h-full rounded-3xl bg-gradient-to-b from-white/5 to-white/[0.02] border border-white/10 p-8 overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500">
                {/* Feature Image Background */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500">
                  <img 
                    src={feature.image} 
                    alt="" 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Gradient Overlay */}
                <div className={cn(
                  "absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500",
                  "bg-gradient-to-br",
                  feature.gradient
                )} />

                {/* Content */}
                <div className="relative z-10">
                  <div className={cn(
                    "inline-flex items-center justify-center w-12 h-12 rounded-2xl mb-6",
                    "bg-gradient-to-br border border-white/10",
                    feature.gradient
                  )}>
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>

                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground mb-6">{feature.description}</p>

                  <motion.a
                    href={feature.link}
                    whileHover={{ x: 5 }}
                    className="inline-flex items-center text-primary hover:text-primary/80 transition-colors"
                  >
                    Explore more
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </motion.a>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 -mt-6 -mr-6 w-24 h-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors" />
                <div className="absolute bottom-0 left-0 -mb-6 -ml-6 w-24 h-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Index = () => {
  // Shared image state for hero and footer synchronization
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [
    "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb",
    "https://images.unsplash.com/photo-1472396961693-142e6e269027",
    "https://images.unsplash.com/photo-1500375592092-40eb2168fd21",
    "https://images.unsplash.com/photo-1488085061387-422e29b40080?q=80&w=3731&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=3724&auto=format&fit=crop"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 7000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div style={{ backgroundColor: '#F4F7F9' }}>
      {/* HERO SECTION - Fixed background that stays in place while scrolling */}
      <section className="relative min-h-screen flex flex-col overflow-hidden" style={{ zIndex: 1 }}>
        {/* Hero background images - fixed position */}
        <div className="fixed inset-0" style={{ zIndex: -2 }}>
          {images.map((image, index) => (
            <div
              key={index}
              className="absolute inset-0 transition-opacity duration-500"
              style={{
                backgroundImage: `url(${image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                opacity: index === currentImageIndex ? 1 : 0
              }}
            />
          ))}
        </div>

        {/* Dark overlay for readability */}
        <div className="fixed inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" style={{ zIndex: -1 }} />

        {/* Top Navigation Bar */}
        <nav className="relative z-10 flex items-center justify-between px-8 py-6">
          <div className="text-2xl font-bold text-white tracking-tight">
            JourneyX
          </div>
          <Button variant="outline" size="sm" className="bg-transparent border-white/30 text-white hover:bg-white/10">
            Login
          </Button>
        </nav>

        {/* Hero Content - Center */}
        <div className="relative z-10 flex-1 flex items-center justify-center px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-center max-w-3xl"
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight">
              Experience Journey
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-10 max-w-2xl mx-auto">
              Real journeys. Local knowledge. Safety intelligence for solo explorers.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/journey-wall">
                <Button size="lg" className="text-lg px-8 py-6 shadow-2xl hover:shadow-3xl transition-all">
                  Start Exploring
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/travel-assistant" className="text-white/80 hover:text-white text-lg underline underline-offset-4">
                Learn More
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <div className="relative z-10 pb-8 flex justify-center">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-white/60 text-sm"
          >
            ↓ Scroll to explore
          </motion.div>
        </div>
      </section>

      {/* MAIN CONTENT SECTION - Solid background, NO image */}
      <div style={{ backgroundColor: '#F4F7F9', position: 'relative', zIndex: 2 }}>
        {/* Journey Insight Quote - Editorial inline treatment */}
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          <QuoteCard
            quote="The world is a book, and those who do not travel read only one page."
            author="Saint Augustine"
            authorImage="https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=2070&auto=format&fit=crop"
          />
        </div>

        {/* Stats Section */}
        <StatsSection />

        {/* Experience Section */}
        <ExperienceSection />

        {/* Featured Destinations */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-4">Verified Solo-Friendly Destinations</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Curated spots where solo travelers feel welcome, safe, and inspired
              </p>
            </motion.div>
            <FeaturedDestinations />
          </div>
        </section>
      </div>

      {/* Gradient transition to footer */}
      <div 
        style={{ 
          height: '120px',
          background: 'linear-gradient(to bottom, #F4F7F9 0%, rgba(244, 247, 249, 0.7) 40%, rgba(244, 247, 249, 0) 100%)'
        }} 
      />

      {/* Footer with image background - synchronized with hero images */}
      <Footer images={images} currentIndex={currentImageIndex} />
    </div>
  );
};

export default Index;
