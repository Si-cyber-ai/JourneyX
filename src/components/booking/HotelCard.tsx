import { motion } from "framer-motion";
import { Hotel } from "@/types/booking";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Star, Wifi, Droplets } from "lucide-react";

interface HotelCardProps {
  hotel: Hotel;
}

const HotelCard = ({ hotel }: HotelCardProps) => {
  const renderFacilityIcon = (facility: string) => {
    switch (facility) {
      case 'wifi':
        return <Wifi className="h-4 w-4" />;
      case 'pool':
        return <Droplets className="h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full"
    >
      <Card className="overflow-hidden">
        <div className="relative h-48">
          <img 
            src={hotel.imageUrl} 
            alt={hotel.name} 
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
            <div className="flex items-center text-white">
              <MapPin className="h-4 w-4 mr-1" />
              <span className="text-sm">{hotel.distance}</span>
            </div>
          </div>
        </div>
        
        <CardContent className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-bold text-lg">{hotel.name}</h3>
              <div className="flex items-center mt-1">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-4 w-4 ${i < hotel.stars ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                  />
                ))}
              </div>
            </div>
            <div className="text-right">
              <div className="font-bold text-lg">${hotel.pricePerNight}</div>
              <div className="text-xs text-muted-foreground">per night</div>
            </div>
          </div>
          
          <div className="flex items-center mt-2">
            <div className="bg-primary/10 text-primary rounded-full px-2 py-0.5 text-sm flex items-center">
              <Star className="h-3 w-3 mr-1 fill-primary" />
              <span>{hotel.rating.toFixed(1)}</span>
            </div>
            <span className="text-sm text-muted-foreground ml-2">
              ({hotel.reviewsCount} reviews)
            </span>
          </div>
          
          <div className="flex gap-2 mt-3">
            {hotel.facilities.slice(0, 4).map((facility, index) => (
              <div key={index} className="bg-secondary p-1 rounded-md" title={facility}>
                {renderFacilityIcon(facility)}
              </div>
            ))}
            {hotel.facilities.length > 4 && (
              <div className="bg-secondary p-1 rounded-md px-2 text-xs flex items-center">
                +{hotel.facilities.length - 4} more
              </div>
            )}
          </div>
          
          <div className="mt-4">
            <Button className="w-full">Book now</Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default HotelCard;
