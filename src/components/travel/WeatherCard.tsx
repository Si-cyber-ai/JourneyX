
import { motion } from "framer-motion";
import { WeatherData } from "@/types/weather";
import { 
  CloudRain,
  CloudSun,
  Sun,
  Wind,
  Droplets
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface WeatherCardProps {
  weather: WeatherData;
}

const WeatherCard = ({ weather }: WeatherCardProps) => {
  const getWeatherIcon = (iconName: string) => {
    switch (iconName) {
      case 'cloud-rain':
        return <CloudRain className="w-10 h-10 text-blue-500" />;
      case 'cloud-sun':
        return <CloudSun className="w-10 h-10 text-yellow-500" />;
      case 'sun':
        return <Sun className="w-10 h-10 text-yellow-500" />;
      default:
        return <Sun className="w-10 h-10 text-yellow-500" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full"
    >
      <Card className="overflow-hidden backdrop-blur-lg bg-white/80 dark:bg-black/50 border-white/20">
        <CardContent className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-2xl font-bold">{weather.city}</h3>
              <p className="text-muted-foreground">{weather.country}</p>
            </div>
            <div className="text-3xl font-bold">{weather.temperature}°C</div>
          </div>
          
          <div className="flex items-center mt-4">
            {getWeatherIcon(weather.icon)}
            <span className="ml-2 text-lg">{weather.condition}</span>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="flex items-center">
              <Wind className="w-5 h-5 mr-2 text-muted-foreground" />
              <span>{weather.windSpeed} km/h</span>
            </div>
            <div className="flex items-center">
              <Droplets className="w-5 h-5 mr-2 text-muted-foreground" />
              <span>{weather.humidity}%</span>
            </div>
          </div>
          
          <p className="mt-4 text-sm text-muted-foreground">
            Feels like: {weather.feelsLike}°C
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default WeatherCard;
