/*
 * JourneyX Booking - Premium Travel Magazine Experience
 * 
 * Design Philosophy: Image-first editorial design, not dashboard
 * Inspiration: Monocle / Airbnb / High-end travel editorials
 * 
 * Flow:
 * 1. Destination Discovery - Full-width cinematic cards
 * 2. Route Visualizer - Elegant journey display
 * 3. Transport Options - Image-driven elegant cards
 * 4. Recommendation - Narrative editorial text
 * 5. Deep Dive - Collapsible optional details
 * 
 * Key Principles:
 * - Images lead emotionally
 * - Minimal visible text
 * - Generous spacing
 * - Smooth transitions & parallax
 * - Trust through design, not explanation
 */

import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Clock, MapPin, Plane, Train, Bus } from "lucide-react";
import SearchBar, { SearchData } from "@/components/booking/SearchBar";
import DestinationDiscovery from "@/components/booking/DestinationDiscovery";
import RouteVisualizer from "@/components/booking/RouteVisualizer";
import HorizontalTravelOptions from "@/components/booking/HorizontalTravelOptions";
import BestOptionHighlight from "@/components/booking/BestOptionHighlight";
import WorthKnowingCards from "@/components/booking/WorthKnowingCards";

// Mock destinations data
const destinations = [
  {
    id: '1',
    name: 'Amsterdam',
    country: 'Netherlands',
    startingPrice: 4100,
    imageUrl: 'https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=1600&auto=format&fit=crop',
    description: 'Charming canals, world-class museums, and vibrant culture await in this historic city.'
  },
  {
    id: '2',
    name: 'Barcelona',
    country: 'Spain',
    startingPrice: 5200,
    imageUrl: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=1600&auto=format&fit=crop',
    description: 'Mediterranean coastline meets modernist architecture in this captivating Catalan capital.'
  },
  {
    id: '3',
    name: 'Prague',
    country: 'Czech Republic',
    startingPrice: 3800,
    imageUrl: 'https://images.unsplash.com/photo-1541849546-216549ae216d?w=1600&auto=format&fit=crop',
    description: 'Medieval charm and fairy-tale architecture in the heart of Central Europe.'
  },
  {
    id: '4',
    name: 'Copenhagen',
    country: 'Denmark',
    startingPrice: 6500,
    imageUrl: 'https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?w=1600&auto=format&fit=crop',
    description: 'Scandinavian design, cycling culture, and hygge in this progressive Nordic city.'
  }
];

// Travel options with images
interface TravelOption {
  mode: 'flight' | 'train' | 'bus';
  price: number;
  duration: string;
  reliability: 'High' | 'Medium' | 'Low';
  delayRisk: string;
  comfort: string;
  soloFriendly: boolean;
  recommended?: boolean;
  imageUrl?: string;
}

// Mock attractions data for Worth Knowing section
const attractions = [
  {
    id: '1',
    name: 'Canal Walks',
    imageUrl: 'https://images.unsplash.com/photo-1584003789339-e49a27ceb55c?w=800&auto=format&fit=crop',
    reason: 'Amsterdam\'s canals are best explored by foot, offering a peaceful way to discover the city.',
    tip: {
      type: 'timing' as const,
      text: 'Early morning walks provide the best light and fewer crowds'
    }
  },
  {
    id: '2',
    name: 'Rijksmuseum',
    imageUrl: 'https://images.unsplash.com/photo-1551789323-9c5e89d0a4f1?w=800&auto=format&fit=crop',
    reason: 'Home to masterpieces by Rembrandt and Vermeer, this museum is essential for art lovers.',
    tip: {
      type: 'timing' as const,
      text: 'Book tickets online to skip the queue, especially during summer'
    }
  },
  {
    id: '3',
    name: 'Vondelpark',
    imageUrl: 'https://images.unsplash.com/photo-1551789323-9c5e89d0a4f1?w=800&auto=format&fit=crop',
    reason: 'A peaceful green escape in the city center, perfect for picnics and relaxation.',
    tip: {
      type: 'location' as const,
      text: 'Located near Museumplein, easy to combine with museum visits'
    }
  },
  {
    id: '4',
    name: 'Local Markets',
    imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop',
    reason: 'Experience authentic Dutch culture at Albert Cuyp Market and other local favorites.',
    tip: {
      type: 'safety' as const,
      text: 'Keep valuables secure in crowded market areas'
    }
  }
];

const Booking = () => {
  const [searchParams] = useSearchParams();
  const [selectedDestination, setSelectedDestination] = useState<typeof destinations[0] | null>(null);
  const [searchData, setSearchData] = useState<SearchData | null>(null);
  const [showDetailedComparison, setShowDetailedComparison] = useState(false);
  const [expandedOption, setExpandedOption] = useState<string | null>(null);
  
  // Mock travel options with recommendation
  const travelOptions: TravelOption[] = [
    {
      mode: 'train',
      price: 4100,
      duration: '4h 45m',
      reliability: 'High',
      delayRisk: 'Very reliable, rarely delayed',
      comfort: 'Spacious seating, WiFi, scenic views',
      soloFriendly: true,
      recommended: true,
      imageUrl: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=800&auto=format&fit=crop'
    },
    {
      mode: 'flight',
      price: 6200,
      duration: '2h 15m',
      reliability: 'Medium',
      delayRisk: 'Possible weather delays',
      comfort: 'Fast but airport security adds time',
      soloFriendly: true,
      imageUrl: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&auto=format&fit=crop'
    },
    {
      mode: 'bus',
      price: 2300,
      duration: '9h',
      reliability: 'Medium',
      delayRisk: 'Traffic-dependent',
      comfort: 'Economical but tiring',
      soloFriendly: false,
      imageUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&auto=format&fit=crop'
    }
  ];

  // Handle search
  const handleSearch = (data: SearchData) => {
    setSearchData(data);
    // In a real app, this would trigger API calls
    console.log('Search data:', data);
  };

  // Handle destination selection - auto-populate search
  const handleDestinationSelect = (dest: typeof destinations[0]) => {
    setSelectedDestination(dest);
    // Auto-populate search data when destination is selected
    if (!searchData) {
      setSearchData({
        from: 'Paris', // Default starting point
        to: dest.name,
        date: new Date(),
        time: 'Morning',
        travellers: 1
      });
    }
  };

  // Show destination discovery if no search performed
  if (!searchData || !selectedDestination) {
    return (
      <div className="min-h-screen bg-background">
        {/* Hero with search bar */}
        <div 
          className="relative min-h-[60vh] flex items-center justify-center bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1600&auto=format&fit=crop)',
          }}
        >
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-background" />
          
          {/* Content */}
          <div className="relative z-10 w-full pt-20">
            <div className="container max-w-5xl mx-auto px-4 text-center mb-12">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-5xl md:text-6xl font-light text-white mb-4"
              >
                Where to next?
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-xl text-white/90 font-light"
              >
                Compare travel options and find your perfect journey
              </motion.p>
            </div>
            
            {/* Search bar */}
            <SearchBar onSearch={handleSearch} sticky={false} />
          </div>
        </div>

        {/* Destination discovery below */}
        <div className="relative">
          <DestinationDiscovery
            destinations={destinations}
            onSelect={handleDestinationSelect}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Sticky search bar */}
      <div className="pt-4">
        <SearchBar 
          onSearch={handleSearch}
          defaultFrom={searchData?.from}
          defaultTo={searchData?.to}
          sticky={true}
        />
      </div>

      {/* ROUTE VISUALIZER - Cinematic journey display */}
      <div className="mt-8">
        <RouteVisualizer
          from={searchData?.from || "Paris"}
          to={selectedDestination.name}
          date={searchData?.date ? searchData.date.toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long' }) : "Tuesday, 12 August"}
          backgroundImage={selectedDestination.imageUrl}
        />
      </div>

      {/* TRANSPORT OPTIONS - Expandable cards */}
      <section className="relative py-12">
        <div className="container max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-light text-foreground mb-8">
              Compare options
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {travelOptions.map((option) => (
                <motion.div
                  key={option.mode}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className={`relative rounded-2xl overflow-hidden bg-card border-2 transition-all cursor-pointer ${
                    option.recommended 
                      ? 'border-primary shadow-lg shadow-primary/20' 
                      : 'border-border hover:border-border/80'
                  }`}
                  onClick={() => setExpandedOption(expandedOption === option.mode ? null : option.mode)}
                >
                  {/* Image header */}
                  {option.imageUrl && (
                    <div className="relative h-32 overflow-hidden">
                      <img 
                        src={option.imageUrl} 
                        alt={option.mode}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-transparent" />
                      
                      {/* Icon overlay */}
                      <div className="absolute top-4 left-4">
                        {option.mode === 'flight' && <Plane className="w-6 h-6 text-white" />}
                        {option.mode === 'train' && <Train className="w-6 h-6 text-white" />}
                        {option.mode === 'bus' && <Bus className="w-6 h-6 text-white" />}
                      </div>
                      
                      {/* Recommended badge */}
                      {option.recommended && (
                        <div className="absolute top-4 right-4 px-3 py-1 bg-primary text-primary-foreground text-xs font-light rounded-full">
                          Recommended
                        </div>
                      )}
                    </div>
                  )}
                  
                  {/* Content */}
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-2xl font-light capitalize mb-1">{option.mode}</h3>
                        <p className="text-sm text-muted-foreground font-light">{option.duration}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-light">₹{option.price.toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground font-light">per person</p>
                      </div>
                    </div>
                    
                    {/* Quick stats */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className={`px-2 py-1 text-xs rounded-full font-light ${
                        option.reliability === 'High' 
                          ? 'bg-green-500/10 text-green-600 dark:text-green-400'
                          : 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400'
                      }`}>
                        {option.reliability} reliability
                      </span>
                      {option.soloFriendly && (
                        <span className="px-2 py-1 text-xs rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 font-light">
                          Solo-friendly
                        </span>
                      )}
                      {option.price === Math.min(...travelOptions.map(o => o.price)) && (
                        <span className="px-2 py-1 text-xs rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 font-light">
                          Cheapest
                        </span>
                      )}
                    </div>
                    
                    {/* Expanded details */}
                    <AnimatePresence>
                      {expandedOption === option.mode && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="pt-4 border-t border-border/50 space-y-3"
                        >
                          <div>
                            <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1 font-light">
                              Delay Risk
                            </p>
                            <p className="text-sm font-light">{option.delayRisk}</p>
                          </div>
                          <div>
                            <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1 font-light">
                              Comfort
                            </p>
                            <p className="text-sm font-light">{option.comfort}</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                    
                    {/* Expand indicator */}
                    <div className="mt-4 text-center">
                      <ChevronDown 
                        className={`w-4 h-4 mx-auto text-muted-foreground transition-transform ${
                          expandedOption === option.mode ? 'rotate-180' : ''
                        }`}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* RECOMMENDATION - Narrative editorial style */}
      <BestOptionHighlight
        mode="train"
        narrative="Train offers the best balance of comfort and reliability today. With centrally located stations, spacious seating, and consistent on-time performance, it provides a relaxed journey perfect for solo travelers. The scenic route through the countryside adds to the experience, making it more than just transportation."
        backgroundImage="https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=1600&auto=format&fit=crop"
      />

      {/* WORTH KNOWING - Visual attraction cards */}
      <WorthKnowingCards attractions={attractions} />

      {/* DEEP DIVE - Collapsible optional details */}
      <section className="relative py-16 border-t border-border/50">
        <div className="container max-w-5xl mx-auto px-4">
          <button
            onClick={() => setShowDetailedComparison(!showDetailedComparison)}
            className="flex items-center gap-3 text-foreground hover:text-foreground/70 transition-colors group mb-8"
          >
            <span className="text-xl font-light">
              More details
            </span>
            <ChevronDown 
              className={`w-5 h-5 transition-transform duration-300 ${showDetailedComparison ? 'rotate-180' : ''}`}
            />
          </button>
          
          <AnimatePresence>
            {showDetailedComparison && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                className="space-y-12 overflow-hidden"
              >
                {/* Time breakdown */}
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <Clock className="w-5 h-5 text-muted-foreground" />
                    <h3 className="text-2xl font-light text-foreground">
                      Time breakdown
                    </h3>
                  </div>
                  <div className="space-y-3">
                    {travelOptions.map((option) => (
                      <div key={option.mode} className="flex justify-between items-center p-5 rounded-xl bg-card border border-border/50">
                        <span className="text-body font-light capitalize">{option.mode}</span>
                        <div className="text-right">
                          <p className="text-body font-light">{option.duration}</p>
                          <p className="text-sm text-muted-foreground font-light">Door to door</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Location context */}
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <MapPin className="w-5 h-5 text-muted-foreground" />
                    <h3 className="text-2xl font-light text-foreground">
                      Location context
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-6 rounded-xl bg-card border border-border/50">
                      <p className="text-sm text-muted-foreground mb-2 font-light">Flight</p>
                      <p className="text-body font-light mb-3">Airports outside city centers</p>
                      <p className="text-sm text-muted-foreground font-light">+1h travel time each way</p>
                    </div>
                    <div className="p-6 rounded-xl bg-card border border-border/50">
                      <p className="text-sm text-muted-foreground mb-2 font-light">Train</p>
                      <p className="text-body font-light mb-3">Central stations in both cities</p>
                      <p className="text-sm text-muted-foreground font-light">Walking distance to hotels</p>
                    </div>
                    <div className="p-6 rounded-xl bg-card border border-border/50">
                      <p className="text-sm text-muted-foreground mb-2 font-light">Bus</p>
                      <p className="text-body font-light mb-3">Stations vary by operator</p>
                      <p className="text-sm text-muted-foreground font-light">May require transfers</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Back to destinations - subtle footer action */}
      <section className="py-16">
        <div className="container max-w-5xl mx-auto px-4 text-center">
          <button
            onClick={() => setSelectedDestination(null)}
            className="text-muted-foreground hover:text-foreground transition-colors font-light"
          >
            ← Explore other destinations
          </button>
        </div>
      </section>

      {/* Bottom breathing room */}
      <div className="h-20" />
    </div>
  );
};

export default Booking;
