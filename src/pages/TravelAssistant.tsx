
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import LocationSelector from "@/components/travel/LocationSelector";
import WeatherCard from "@/components/travel/WeatherCard";
import NewsCard from "@/components/travel/NewsCard";
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
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <header className="mb-8 text-center">
            <h1 className="text-4xl font-bold mb-2">Travel Assistant</h1>
            <p className="text-muted-foreground">Get up-to-date weather and news for your travel destination</p>
          </header>
          
          <div className="flex justify-center mb-8">
            <LocationSelector 
              locations={locations} 
              onLocationChange={handleLocationChange} 
            />
          </div>
          
          <Tabs defaultValue="weather" className="max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="weather">Weather</TabsTrigger>
              <TabsTrigger value="news">Travel News</TabsTrigger>
            </TabsList>
            
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
