
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import LocationSelector from "@/components/travel/LocationSelector";
import WeatherCard from "@/components/travel/WeatherCard";
import NewsCard from "@/components/travel/NewsCard";
import ProactiveInsights from "@/components/travel/ProactiveInsights";
import SafetyIntelligenceMap from "@/components/travel/SafetyIntelligenceMap";
import { mockWeatherData } from "@/data/weatherData";
import { mockNewsData } from "@/data/newsData";

const TravelAssistant = () => {
  const [selectedLocation, setSelectedLocation] = useState("Paris");
  const [loading, setLoading] = useState(false);
  const [weather, setWeather] = useState(mockWeatherData[0]);
  const [news, setNews] = useState(mockNewsData);
  
  const locations = mockWeatherData.map(w => w.city);
  
  const handleLocationChange = (location: string) => {
    setLoading(true);
    setSelectedLocation(location);
    
    // Simulate API call
    setTimeout(() => {
      const weatherData = mockWeatherData.find(w => w.city === location) || mockWeatherData[0];
      setWeather(weatherData);
      
      // Shuffle news for demo purposes
      const shuffledNews = [...mockNewsData].sort(() => 0.5 - Math.random());
      setNews(shuffledNews);
      
      setLoading(false);
    }, 1000);
  };
  
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <header className="mb-6 text-center">
            <h1 className="text-4xl font-bold mb-2">Travel Assistant</h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Real conditions and safety insights for confident travel
            </p>
          </header>
          
          <div className="flex justify-center mb-6">
            <LocationSelector 
              locations={locations} 
              onLocationChange={handleLocationChange} 
            />
          </div>
          
          {/* Travel Confidence Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-4xl mx-auto mb-8"
          >
            <div className={`p-6 rounded-xl border-2 ${
              weather.condition.toLowerCase().includes('rain') || weather.temperature > 32
                ? 'bg-yellow-50 border-yellow-300 dark:bg-yellow-950/20'
                : 'bg-green-50 border-green-300 dark:bg-green-950/20'
            }`}>
              <div className="flex items-start gap-4">
                <div className="text-3xl">
                  {weather.condition.toLowerCase().includes('rain') || weather.temperature > 32 ? '🟡' : '🟢'}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-1">
                    Today's Travel Confidence: {
                      weather.condition.toLowerCase().includes('rain') || weather.temperature > 32
                        ? 'Moderate'
                        : 'Good'
                    }
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {weather.condition.toLowerCase().includes('rain')
                      ? 'Rain expected—plan indoor alternatives for afternoon activities'
                      : weather.temperature > 32
                      ? 'High heat—stay hydrated and avoid midday outdoor activities'
                      : 'Conditions are favorable for outdoor exploration today'}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
          
          <Tabs defaultValue="insights" className="max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="insights">Today's Insights</TabsTrigger>
              <TabsTrigger value="safety">Safety Map</TabsTrigger>
              <TabsTrigger value="weather">Weather</TabsTrigger>
              <TabsTrigger value="news">Travel News</TabsTrigger>
            </TabsList>
            
            <TabsContent value="insights" className="mt-6">
              <ProactiveInsights weather={weather} />
            </TabsContent>
            
            <TabsContent value="safety" className="mt-6">
              <SafetyIntelligenceMap />
            </TabsContent>
            
            <TabsContent value="weather" className="mt-6">
              <div className="max-w-md mx-auto">
                <WeatherCard weather={weather} />
              </div>
            </TabsContent>
            
            <TabsContent value="news" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {news.slice(0, 4).map(item => (
                  <NewsCard key={item.id} news={item} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
};

export default TravelAssistant;
