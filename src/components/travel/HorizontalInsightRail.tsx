/*
 * HorizontalInsightRail Component
 * Apple Store-inspired horizontal scrolling experience
 * Editorial cards with smooth snap scrolling
 */

import { motion, useMotionValue, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { WeatherData } from "@/types/weather";

interface InsightCard {
  type: string;
  title: string;
  description: string;
  imageUrl: string;
  accentColor: string;
}

interface HorizontalInsightRailProps {
  weather: WeatherData;
}

const HorizontalInsightRail = ({ weather }: HorizontalInsightRailProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // Generate contextual insights as editorial cards
  const generateInsights = (): InsightCard[] => {
    const insights: InsightCard[] = [];
    
    // Rain-related insight
    if (weather.condition.toLowerCase().includes('rain')) {
      insights.push({
        type: "Weather Alert",
        title: "Rain expected this afternoon",
        description: "Indoor plans recommended. Museums and covered markets are excellent options.",
        imageUrl: "https://images.unsplash.com/photo-1428908728789-d2de25dbd4e2",
        accentColor: "text-blue-600"
      });
    }
    
    // High temperature
    if (weather.temperature > 32) {
      insights.push({
        type: "Health Advisory",
        title: "High heat today",
        description: "Stay hydrated. Avoid outdoor activities between 11 AM and 3 PM.",
        imageUrl: "https://images.unsplash.com/photo-1504370805625-d32c54b16100",
        accentColor: "text-orange-600"
      });
    }
    
    // Good weather
    if (weather.condition.toLowerCase().includes('sunny') || weather.condition.toLowerCase().includes('clear')) {
      if (weather.temperature >= 18 && weather.temperature <= 28) {
        insights.push({
          type: "Perfect Conditions",
          title: "Ideal for outdoor exploration",
          description: "Excellent weather for hiking, sightseeing, and photography today.",
          imageUrl: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800",
          accentColor: "text-emerald-600"
        });
      }
    }
    
    // Always include safety tip
    insights.push({
      type: "Solo Safety",
      title: "Stay connected while exploring",
      description: "Share your itinerary with someone you trust. Keep emergency contacts saved offline.",
      imageUrl: "https://images.unsplash.com/photo-1488646953014-85cb44e25828",
      accentColor: "text-purple-600"
    });
    
    // Travel tip
    insights.push({
      type: "Local Insight",
      title: "Best time to visit landmarks",
      description: "Major attractions are less crowded before 9 AM and after 5 PM.",
      imageUrl: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34",
      accentColor: "text-indigo-600"
    });
    
    return insights;
  };

  const insights = generateInsights();

  return (
    <div className="w-full py-12">
      <div className="container max-w-7xl mx-auto px-4 mb-8">
        <h2 className="text-4xl font-bold text-foreground mb-2">
          What you should know
        </h2>
        <p className="text-lg text-muted-foreground">
          Key insights for your journey
        </p>
      </div>
      
      {/* Horizontal scrolling rail */}
      <div className="relative">
        <div 
          ref={scrollRef}
          className="horizontal-scroll pl-4 md:pl-[max(1rem,calc((100vw-1280px)/2))]"
        >
          {insights.map((insight, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="horizontal-scroll-item w-[340px] md:w-[400px]"
            >
              {/* Editorial card - Apple style */}
              <div className="bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <img 
                    src={insight.imageUrl} 
                    alt={insight.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  {/* Type label */}
                  <div className="absolute top-4 left-4">
                    <span className="text-xs uppercase tracking-wider font-semibold text-white/90 bg-black/30 backdrop-blur-sm px-3 py-1.5 rounded-full">
                      {insight.type}
                    </span>
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {insight.title}
                  </h3>
                  <p className="text-body text-muted-foreground leading-relaxed">
                    {insight.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HorizontalInsightRail;
