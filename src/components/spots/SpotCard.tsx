
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { SecretSpot } from "@/types/secretSpot";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SpotCardProps {
  spot: SecretSpot;
}

const SpotCard = ({ spot }: SpotCardProps) => {
  const navigate = useNavigate();

  const getTypeColor = (type: string) => {
    const colors = {
      'Waterfall': 'bg-blue-500',
      'Viewpoint': 'bg-purple-500',
      'Cave': 'bg-amber-500',
      'Beach': 'bg-emerald-500',
      'Hike': 'bg-green-500',
      'Pub': 'bg-red-500'
    };
    return colors[type as keyof typeof colors] || 'bg-gray-500';
  };

  const getDifficultyColor = (difficulty: string) => {
    const colors = {
      'Easy': 'text-green-500 border-green-500',
      'Medium': 'text-yellow-500 border-yellow-500',
      'Expert': 'text-red-500 border-red-500'
    };
    return colors[difficulty as keyof typeof colors] || '';
  };

  const handleBooking = () => {
    // Navigate to booking page with location parameters
    navigate(`/booking?destination=${encodeURIComponent(spot.location.name)}&lat=${spot.location.latitude}&lng=${spot.location.longitude}`);
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="overflow-hidden h-full">
        <div className="relative h-48">
          <img 
            src={spot.imageUrl} 
            alt={spot.title} 
            className="w-full h-full object-cover"
          />
          <Badge 
            className={`absolute top-2 right-2 ${getTypeColor(spot.type)}`}
          >
            {spot.type}
          </Badge>
        </div>
        
        <CardContent className="p-4">
          <h3 className="font-bold text-lg mb-2">{spot.title}</h3>
          
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="outline" className={getDifficultyColor(spot.difficulty)}>
              {spot.difficulty}
            </Badge>
            <span className="text-sm text-muted-foreground">{spot.distance}</span>
          </div>
          
          <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
            {spot.description}
          </p>
          
          <div className="mt-auto">
            <div className="text-sm p-2 bg-muted rounded-md mb-2">
              <p>{spot.location.name}</p>
              <p className="text-xs text-muted-foreground">
                GPS: {spot.location.latitude.toFixed(4)}, {spot.location.longitude.toFixed(4)}
              </p>
            </div>
            
            <Button
              variant="default"
              size="sm"
              className="w-full flex items-center gap-2"
              onClick={handleBooking}
            >
              <MapPin className="h-4 w-4" />
              Book Trip to This Location
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default SpotCard;
