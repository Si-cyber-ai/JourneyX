
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { SecretSpot } from "@/types/secretSpot";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, ShieldAlert, UserCheck, Users, Eye, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface SpotCardProps {
  spot: SecretSpot;
}

const SpotCard = ({ spot }: SpotCardProps) => {
  const navigate = useNavigate();
  const [showLocation, setShowLocation] = useState(false);

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
  
  const handleSaveToJourney = () => {
    // UX: Intent friction - user must commit before seeing exact location
    setShowLocation(true);
    // In production, this would save to user's journey list
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="overflow-hidden h-full shadow-md hover:shadow-xl transition-shadow duration-300">
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
          {/* UX: Curator tag shows trust and source - important for solo travelers */}
          <Badge 
            variant="secondary"
            className="absolute top-2 left-2 bg-black/60 text-white border-none backdrop-blur-sm"
          >
            <UserCheck className="h-3 w-3 mr-1" />
            Shared by local
          </Badge>
        </div>
        
        <CardContent className="p-4 space-y-3">
          <h3 className="font-bold text-lg mb-1">{spot.title}</h3>
          
          {/* UX: Why hidden - builds context and respect for local spaces */}
          <div className="flex items-start gap-2 text-xs text-muted-foreground bg-muted/50 p-2 rounded-md">
            <ShieldAlert className="h-3.5 w-3.5 mt-0.5 flex-shrink-0" />
            <span>
              <strong>Why hidden:</strong> Protected to preserve authenticity
            </span>
          </div>
          
          {/* UX: Enhanced difficulty display with clearer warning for solo travelers */}
          <div className="flex items-center gap-2">
            <Badge variant="outline" className={`${getDifficultyColor(spot.difficulty)} font-medium`}>
              {spot.difficulty}
            </Badge>
            <span className="text-sm text-muted-foreground">{spot.distance}</span>
            {spot.difficulty === 'Expert' && (
              <Badge variant="outline" className="text-xs text-orange-600 border-orange-600">
                Group recommended
              </Badge>
            )}
          </div>
          
          <p className="text-sm text-muted-foreground line-clamp-2">
            {spot.description}
          </p>
          
          <div className="mt-auto space-y-2">
            {/* UX: Intent friction - exact location hidden until user commits */}
            <div className="relative">
              <div className={`text-sm p-3 bg-muted rounded-md transition-all ${
                !showLocation ? 'blur-sm select-none' : ''
              }`}>
                <p className="font-medium mb-1">{spot.location.name}</p>
                <p className="text-xs text-muted-foreground">
                  GPS: {spot.location.latitude.toFixed(4)}, {spot.location.longitude.toFixed(4)}
                </p>
              </div>
              
              {!showLocation && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Button
                    variant="default"
                    size="sm"
                    onClick={handleSaveToJourney}
                    className="shadow-lg"
                  >
                    <Bookmark className="h-4 w-4 mr-2" />
                    Save to See Location
                  </Button>
                </div>
              )}
            </div>
            
            {/* Ethical explanation - only show when location is hidden */}
            {!showLocation && (
              <p className="text-xs text-muted-foreground text-center px-2">
                Shared responsibly to protect local communities
              </p>
            )}
            
            {/* Show booking button only after location is revealed */}
            {showLocation && (
              <Button
                variant="default"
                size="sm"
                className="w-full flex items-center gap-2"
                onClick={handleBooking}
              >
                <MapPin className="h-4 w-4" />
                Book Trip
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default SpotCard;
