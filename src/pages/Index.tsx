
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import HeroCarousel from "@/components/HeroCarousel";
import FeaturedDestinations from "@/components/FeaturedDestinations";
import StatsSection from "@/components/StatsSection";
import QuoteCard from "@/components/QuoteCard";
import { 
  Camera, 
  Map, 
  CloudSun, 
  Plane, 
  MapPin,
  ArrowRight,
  Globe,
  Users,
  TrendingUp
} from "lucide-react";
import { useRef } from "react";
import { cn } from "@/lib/utils";

const ExperienceSection = () => {
  const features = [
    {
      icon: Map,
      title: "Journey Wall",
      description: "Immerse yourself in a tapestry of global adventures. Share your stories and discover hidden narratives from fellow wanderers across continents.",
      link: "/journey-wall",
      color: "bg-blue-500/10",
      gradient: "from-blue-500 to-indigo-500",
      image: "https://images.unsplash.com/photo-1488085061387-422e29b40080?q=80&w=3731&auto=format&fit=crop",
    },
    {
      icon: CloudSun,
      title: "Travel Assistant",
      description: "Your intelligent companion for seamless journeys. Get personalized weather insights, local recommendations, and real-time travel updates.",
      link: "/travel-assistant",
      color: "bg-yellow-500/10",
      gradient: "from-amber-500 to-yellow-500",
      image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=3724&auto=format&fit=crop",
    },
    {
      icon: MapPin,
      title: "Secret Spots",
      description: "Unlock extraordinary destinations curated by local experts. Discover breathtaking locations that remain untouched by traditional tourism.",
      link: "/secret-spots",
      color: "bg-green-500/10",
      gradient: "from-emerald-500 to-green-500",
      image: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?q=80&w=3687&auto=format&fit=crop",
    },
    {
      icon: Plane,
      title: "Smart Booking",
      description: "Experience AI-powered travel planning that understands your preferences. Find and book the perfect flights, stays, and experiences effortlessly.",
      link: "/booking",
      color: "bg-purple-500/10",
      gradient: "from-purple-500 to-violet-500",
      image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=3724&auto=format&fit=crop",
    }
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background">
        <div className="absolute inset-0 bg-grid-white/10 bg-[size:60px_60px] opacity-20" />
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
              Discover Your Next Adventure
            </span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
            Experience JourneyX
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Embark on a journey where every destination tells a story and every moment becomes a cherished memory
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
              <div className="relative h-full rounded-3xl bg-gradient-to-b from-white/5 to-white/[0.02] border border-white/10 p-6 overflow-hidden">
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
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -100]);

  const stats = [
    { number: "50K+", label: "Happy Travelers", icon: Users },
    { number: "100+", label: "Destinations", icon: Globe },
    { number: "4.9", label: "User Rating", icon: TrendingUp },
  ];

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Hero Section */}
      <div ref={targetRef} className="relative h-screen">
        <motion.div 
          style={{ opacity, scale, y }}
          className="absolute inset-0"
        >
          <HeroCarousel />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-transparent">
            <div className="container mx-auto px-4 h-full flex items-center">
              <div className="max-w-4xl">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="bg-white/10 backdrop-blur-lg rounded-lg p-8 border border-white/20"
                >
                  <motion.span 
                    className="text-primary font-semibold mb-4 block"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    EXPLORE THE WORLD
                  </motion.span>
                  <motion.h1 
                    className="text-5xl md:text-7xl font-bold mb-6 text-white leading-tight"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                  >
                    Discover Your Next{" "}
                    <span className="text-primary">Adventure</span>
                  </motion.h1>
                  <motion.p 
                    className="text-xl text-white/90 mb-8 max-w-2xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                  >
                    Embark on extraordinary journeys to hidden gems and breathtaking destinations around the world. Create unforgettable memories with our curated travel experiences.
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="flex flex-wrap gap-4"
                  >
                    <Link to="/journey-wall">
                      <Button size="lg" className="group">
                        <span>Start Your Journey</span>
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                    <Button size="lg" variant="outline" className="bg-white/10 hover:bg-white/20">
                      Watch Video
                    </Button>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Quote Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background">
          <div className="absolute inset-0 bg-grid-white/10 bg-[size:60px_60px] opacity-20" />
        </div>
        
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-block"
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                Quote of the Week
              </span>
            </motion.div>
          </motion.div>

          <QuoteCard
            quote="The world is a book, and those who do not travel read only one page."
            author="Saint Augustine"
            authorImage="https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=2070&auto=format&fit=crop"
          />
        </div>
      </section>

      {/* Stats Section */}
      <StatsSection />

      {/* Experience Section */}
      <ExperienceSection />

      {/* Featured Destinations */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Featured Destinations</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Handpicked locations that will take your breath away
            </p>
          </motion.div>
          <FeaturedDestinations />
        </div>
      </section>
    </div>
  );
};

export default Index;
