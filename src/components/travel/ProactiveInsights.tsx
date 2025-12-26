/* 
 * ProactiveInsights Component
 * UX Purpose: Provides contextual safety and planning insights for solo travelers
 * Simulates intelligence using existing weather data - no backend changes required
 */

import { motion } from "framer-motion";
import { AlertTriangle, CloudRain, Clock, Shield, Lightbulb } from "lucide-react";
import { WeatherData } from "@/types/weather";

interface ProactiveInsightsProps {
  weather: WeatherData;
}

const ProactiveInsights = ({ weather }: ProactiveInsightsProps) => {
  // Generate contextual insights based on weather data
  const generateInsights = () => {
    const insights = [];
    
    // Rain-related insight
    if (weather.condition.toLowerCase().includes('rain') || weather.condition.toLowerCase().includes('rainy')) {
      insights.push({
        type: "weather",
        severity: "caution",
        icon: CloudRain,
        title: "Rain expected today",
        message: "Indoor plans recommended for afternoon. Museums and covered markets are good options.",
        color: "text-blue-600",
        bgColor: "bg-blue-50 dark:bg-blue-950/20",
        borderColor: "border-blue-200"
      });
    }
    
    // High temperature warning
    if (weather.temperature > 32) {
      insights.push({
        type: "health",
        severity: "warning",
        icon: AlertTriangle,
        title: "High heat advisory",
        message: "Stay hydrated. Avoid outdoor activities 11 AM - 3 PM. Carry sunscreen.",
        color: "text-orange-600",
        bgColor: "bg-orange-50 dark:bg-orange-950/20",
        borderColor: "border-orange-200"
      });
    }
    
    // High wind alert
    if (weather.windSpeed > 20) {
      insights.push({
        type: "safety",
        severity: "caution",
        icon: AlertTriangle,
        title: "Strong winds forecasted",
        message: "Outdoor activities may be challenging. Secure loose items and avoid coastal areas.",
        color: "text-yellow-600",
        bgColor: "bg-yellow-50 dark:bg-yellow-950/20",
        borderColor: "border-yellow-200"
      });
    }
    
    // Good weather insight
    if (weather.condition.toLowerCase().includes('sunny') || weather.condition.toLowerCase().includes('clear')) {
      if (weather.temperature >= 18 && weather.temperature <= 28) {
        insights.push({
          type: "opportunity",
          severity: "info",
          icon: Lightbulb,
          title: "Perfect for outdoor exploration",
          message: "Ideal for hiking, sightseeing, and photography. Sunrise 6:15 AM, sunset 7:45 PM.",
          color: "text-green-600",
          bgColor: "bg-green-50 dark:bg-green-950/20",
          borderColor: "border-green-200"
        });
      }
    }
    
    // High humidity
    if (weather.humidity > 75) {
      insights.push({
        type: "comfort",
        severity: "info",
        icon: Clock,
        title: "High humidity levels",
        message: "Pace yourself during activities. Lightweight clothing recommended.",
        color: "text-indigo-600",
        bgColor: "bg-indigo-50 dark:bg-indigo-950/20",
        borderColor: "border-indigo-200"
      });
    }
    
    // Always include a safety tip
    insights.push({
      type: "safety",
      severity: "info",
      icon: Shield,
      title: "Solo traveler safety tip",
      message: "Share your itinerary with someone you trust. Keep emergency contacts saved offline.",
      color: "text-purple-600",
      bgColor: "bg-purple-50 dark:bg-purple-950/20",
      borderColor: "border-purple-200"
    });
    
    return insights;
  };

  const insights = generateInsights();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-3"
    >
      {insights.map((insight, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
          className={`border-l-2 ${insight.borderColor} pl-4 py-3`}
        >
          <p className="text-body text-foreground leading-relaxed">
            {insight.message}
          </p>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ProactiveInsights;
