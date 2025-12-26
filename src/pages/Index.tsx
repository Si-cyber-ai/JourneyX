/*
 * Index/Home Page - Booking.com-style Full-Screen Hero
 * 
 * Design: Full-screen parallax background with fade on scroll
 * Simplified hero: "Where to next?" + single CTA
 * Features below fold
 */

import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
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
    <section className="space-section relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-grid-white/10 bg-[size:60px_60px] opacity-10" />
      </div>

      <div className="container mx-auto px-4 relative content-width-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-block"
          >
            {/* Meta text: Small label */}
            <span className="inline-block px-4 py-1.5 rounded-[var(--radius)] bg-primary/10 text-primary text-meta font-medium mb-4">
              Built for Solo Travelers
            </span>
          </motion.div>
          {/* Section title: Clear hierarchy */}
          <h2 className="text-section-title mb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
            Travel Smart, Not Scared
          </h2>
          {/* Body text: Refined, readable */}
          <p className="text-body text-muted-foreground max-w-2xl mx-auto">
            Everything you need to explore confidently—from real journey insights to safety intelligence
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-cards">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative"
            >
              <div className="relative h-full premium-card p-8 overflow-hidden">
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
                    "inline-flex items-center justify-center w-12 h-12 rounded-[var(--radius)] mb-6",
                    "bg-gradient-to-br border border-white/10",
                    feature.gradient
                  )}>
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>

                  {/* Subsection title */}
                  <h3 className="text-subsection mb-2">{feature.title}</h3>
                  {/* Body text */}
                  <p className="text-body text-muted-foreground mb-6">{feature.description}</p>

                  {/* Tertiary action - quiet */}
                  <motion.a
                    href={feature.link}
                    whileHover={{ x: 5 }}
                    className="inline-flex items-center text-primary hover:text-primary/80 transition-colors text-meta font-medium"
                  >
                    Explore more
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </motion.a>
                </div>

                {/* Decorative Elements - subtle only */}
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
  // Parallax scroll effect
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Hero image fades and moves UP as user scrolls DOWN
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -200]); // Negative for upward movement
  
  // Scroll indicator fades and scales down as user scrolls
  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const scrollIndicatorScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.5]);

  // Footer image carousel - rotates every 3 seconds
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const footerImages = [
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&auto=format&fit=crop", // Mountain landscape
    "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1600&auto=format&fit=crop", // Road trip
    "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1600&auto=format&fit=crop", // Beach sunset
    "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1600&auto=format&fit=crop", // Lake and mountains
    "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1600&auto=format&fit=crop", // Mountain sunrise
    "https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=1600&auto=format&fit=crop", // Northern lights
    "https://images.unsplash.com/photo-1504870712357-65ea720d6078?w=1600&auto=format&fit=crop", // Desert landscape
    "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1600&auto=format&fit=crop", // Paris cityscape
    "https://images.unsplash.com/photo-1434725039720-aaad6dd32dfe?w=1600&auto=format&fit=crop", // Tropical waterfall
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&auto=format&fit=crop"  // Canyon view
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % footerImages.length);
    }, 12000); // Change every 12 seconds

    return () => clearInterval(interval);
  }, [footerImages.length]);

  return (
    <div ref={containerRef} className="min-h-screen">
      {/* FULL-SCREEN PARALLAX HERO */}
      <section className="relative h-screen flex flex-col">
        {/* Rotating background images with parallax - synced with footer */}
        <motion.div 
          className="fixed inset-0 z-0"
          style={{ y: heroY, opacity: heroOpacity }}
        >
          {footerImages.map((image, index) => (
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
          {/* Dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-background" />
        </motion.div>

        {/* Top Navigation - minimal, top-right login only */}
        <nav className="relative z-10 flex items-center justify-between px-8 py-6">
          <div className="text-2xl font-light text-white tracking-tight">
            JourneyX
          </div>
          <Button variant="ghost" size="sm" className="text-white/90 hover:text-white hover:bg-white/10">
            Login
          </Button>
        </nav>

        {/* Hero Content - Center */}
        <div className="relative z-10 flex-1 flex items-center justify-center px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-center max-w-4xl"
          >
            {/* Simple, confident hero text */}
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-light text-white mb-6 leading-tight">
              Where to next?
            </h1>
            {/* One calm subheading */}
            <p className="text-xl md:text-2xl text-white/90 font-light mb-12 max-w-2xl mx-auto leading-relaxed">
              Real journeys. Local knowledge. Confidence for solo explorers.
            </p>
            {/* Single CTA */}
            <Link to="/journey-wall">
              <Button size="lg" className="text-lg px-10 py-7 shadow-2xl font-light">
                Start exploring
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div 
          className="relative z-10 pb-12 flex flex-col items-center"
          style={{ opacity: scrollIndicatorOpacity, scale: scrollIndicatorScale }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [0, 10, 0] }}
            transition={{ 
              opacity: { duration: 1, delay: 1 },
              y: { duration: 2, repeat: Infinity, ease: "easeInOut" }
            }}
            className="text-white/70 text-xs font-light tracking-wider uppercase mb-1"
          >
            Scroll Down
          </motion.div>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="text-white/60 text-lg font-light"
          >
            ↓
          </motion.div>
        </motion.div>
      </section>

      {/* MAIN CONTENT - Solid background */}
      <div className="relative z-20 bg-background">
        {/* Stats Section */}
        <StatsSection />

        {/* Experience Section */}
        <ExperienceSection />

        {/* Featured Destinations */}
        <section className="py-20">
          <div className="container mx-auto px-4 max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-light mb-4">Solo-friendly destinations</h2>
              <p className="text-xl text-muted-foreground font-light max-w-2xl mx-auto">
                Curated spots where solo travelers feel welcome and inspired
              </p>
            </motion.div>
            <FeaturedDestinations />
          </div>
        </section>

        {/* Quote Section */}
        <div className="container mx-auto px-4 py-16 max-w-4xl">
          <QuoteCard
            quote="The world is a book, and those who do not travel read only one page."
            author="Saint Augustine"
            authorImage="https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=2070&auto=format&fit=crop"
          />
        </div>

        {/* Footer with parallax and rotating images */}
        <Footer images={footerImages} currentIndex={currentImageIndex} />
      </div>
    </div>
  );
};

export default Index;
