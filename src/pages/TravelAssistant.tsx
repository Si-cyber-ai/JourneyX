/*
 * Travel Assistant - Apple Store-inspired Editorial Experience
 * 
 * Design Philosophy: Editorial intelligence magazine, not dashboard
 * Reference: Apple Store homepage (horizontal carousels, full-width sections, calm motion)
 * 
 * Structure:
 * 1. Full-screen hero with background image
 * 2. Horizontal scrolling insights rail
 * 3. Editorial safety overview
 * 4. Regional conditions (vertical list)
 * 5. Travel updates (horizontal scroll)
 * 
 * Key Principles:
 * - Full-width sections
 * - Large typography
 * - Minimal borders
 * - Content floats above background
 * - Calm, confident, premium
 */

import { useState } from 'react';
import { motion } from "framer-motion";
import { ChevronDown, MapPin } from "lucide-react";
import HorizontalInsightRail from "@/components/travel/HorizontalInsightRail";
import NewsCard from "@/components/travel/NewsCard";
import { mockWeatherData } from "@/data/weatherData";
import { mockNewsData } from "@/data/newsData";

const TravelAssistant = () => {
  const [selectedLocation, setSelectedLocation] = useState("Paris");
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [weather, setWeather] = useState(mockWeatherData[0]);
  const [news, setNews] = useState(mockNewsData);
  
  const handleLocationChange = (location: string) => {
    setSelectedLocation(location);
    setIsLocationOpen(false);
    
    const weatherData = mockWeatherData.find(w => w.city === location) || mockWeatherData[0];
    setWeather(weatherData);
    
    const shuffledNews = [...mockNewsData].sort(() => 0.5 - Math.random());
    setNews(shuffledNews);
  };
  
  // Get condition emoji
  const getWeatherEmoji = () => {
    if (weather.condition.toLowerCase().includes('rain')) return '🌧️';
    if (weather.condition.toLowerCase().includes('cloud')) return '⛅';
    return '☀️';
  };
  
  // Regional data for editorial list
  const regionalConditions = [
    {
      name: "Southeast Asia Coastal",
      risk: "Moderate",
      description: "Monsoon season July–September. Indoor alternatives recommended for afternoons."
    },
    {
      name: "Western Mediterranean",
      risk: "Low risk",
      description: "Optimal conditions. Low risk for natural events during this season."
    },
    {
      name: "Caribbean Islands",
      risk: "Moderate",
      description: "Hurricane season active June–November. Monitor weather alerts daily."
    },
    {
      name: "Japanese Coastal Regions",
      risk: "Moderate",
      description: "Active seismic zone. Familiarize yourself with earthquake safety procedures."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* SECTION 1: FULL-SCREEN HERO */}
      <section className="hero-section">
        {/* Background Image - changes based on selected location */}
        <motion.div 
          key={selectedLocation}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="hero-bg"
          style={{
            backgroundImage: `url(${weather.imageUrl})`
          }}
        />
        
        {/* Dark overlay for text contrast */}
        <div className="hero-overlay" />
        
        {/* Content - Bottom left aligned */}
        <div className="hero-content container max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-2xl"
          >
            {/* Location selector - subtle in hero */}
            <div className="relative mb-6">
              <button
                onClick={() => setIsLocationOpen(!isLocationOpen)}
                className="group flex items-center gap-2 text-white/90 hover:text-white transition-colors"
              >
                <MapPin className="w-5 h-5" />
                <span className="text-lg font-medium">{selectedLocation}, {weather.country}</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              
              {isLocationOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-full left-0 mt-3 w-64 bg-white/95 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl py-2 z-10"
                >
                  {mockWeatherData.map((city, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleLocationChange(city.city)}
                      className="w-full px-4 py-3 text-left text-body text-foreground hover:bg-black/5 transition-colors"
                    >
                      {city.city}, {city.country}
                    </button>
                  ))}
                </motion.div>
              )}
            </div>
            
            {/* Main hero text */}
            <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Travel conditions today are excellent.
            </h1>
            
            {/* Weather inline - large, minimal */}
            <div className="flex items-center gap-6 text-white/90 text-xl">
              <span className="text-3xl">{getWeatherEmoji()}</span>
              <span className="font-semibold">{weather.temperature}°C</span>
              <span>·</span>
              <span>{weather.condition}</span>
              <span>·</span>
              <span>Wind {weather.windSpeed} km/h</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: HORIZONTAL INSIGHTS RAIL */}
      <section className="editorial-section bg-background">
        <HorizontalInsightRail weather={weather} />
      </section>

      {/* SECTION 3: SAFETY OVERVIEW - EDITORIAL */}
      <section className="editorial-section bg-muted/30">
        <div className="container max-w-5xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Editorial heading */}
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Safety overview
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl">
                Current threat assessment based on public safety data, traveler reports, 
                and local conditions. Most regions show normal patterns with seasonal considerations 
                in highlighted areas.
              </p>
            </div>
            
            {/* Map - treated as editorial image, minimal */}
            <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
              <div className="aspect-[21/9] relative grayscale-[40%] flex items-center justify-center">
                <MapPin className="h-16 w-16 text-muted-foreground/30" />
                <p className="absolute bottom-8 left-8 text-sm text-muted-foreground bg-white/80 dark:bg-black/80 px-4 py-2 rounded-full backdrop-blur-sm">
                  Interactive map visualization
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 4: REGIONAL CONDITIONS - APPLE LIST STYLE */}
      <section className="editorial-section">
        <div className="container max-w-5xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-3xl font-bold text-foreground mb-8">
              Regional conditions
            </h2>
            
            {/* Vertical list with subtle dividers */}
            <div className="space-y-0">
              {regionalConditions.map((region, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 * index }}
                  className="border-b border-border last:border-b-0 py-6"
                >
                  <div className="flex items-baseline justify-between mb-2">
                    <h3 className="text-xl font-semibold text-foreground">
                      {region.name}
                    </h3>
                    <span className="text-sm text-muted-foreground uppercase tracking-wide ml-4">
                      {region.risk}
                    </span>
                  </div>
                  <p className="text-body text-muted-foreground leading-relaxed">
                    {region.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 5: TRAVEL UPDATES - HORIZONTAL SCROLL */}
      <section className="editorial-section bg-muted/30 pb-20">
        <div className="container max-w-7xl mx-auto px-4 mb-8">
          <h2 className="text-4xl font-bold text-foreground mb-2">
            Recent updates
          </h2>
          <p className="text-lg text-muted-foreground">
            Latest travel intelligence and news
          </p>
        </div>
        
        {/* Horizontal scrolling news */}
        <div className="relative">
          <div className="horizontal-scroll pl-4 md:pl-[max(1rem,calc((100vw-1280px)/2))]">
            {news.slice(0, 5).map((item) => (
              <div key={item.id} className="horizontal-scroll-item w-[340px] md:w-[400px]">
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group"
                >
                  <div className="bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300">
                    {/* Large image */}
                    <div className="relative h-56 overflow-hidden">
                      <img 
                        src={item.imageUrl} 
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {/* Category badge */}
                      <div className="absolute top-4 left-4">
                        <span className="text-xs uppercase tracking-wider font-semibold text-white bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-full">
                          {item.category}
                        </span>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-foreground mb-3 line-clamp-2 group-hover:text-foreground/80 transition-colors">
                        {item.title}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>{item.source}</span>
                        <span>·</span>
                        <span>{item.date}</span>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default TravelAssistant;
