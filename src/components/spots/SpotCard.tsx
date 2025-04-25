
import { motion } from "framer-motion";
import { SecretSpot } from "@/types/secretSpot";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface SpotCardProps {
  spot: SecretSpot;
  isExplorer: boolean;
}

const SpotCard = ({ spot, isExplorer }: SpotCardProps) => {
  const [showLocation, setShowLocation] = useState(false);
  
  const getDifficultyColor = (difficulty: string) => {
    switch(difficulty) {
      case 'Easy':
        return 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900 dark:text-green-300';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900 dark:text-yellow-300';
      case 'Expert':
        return 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900 dark:text-red-300';
      default:
        return 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900 dark:text-blue-300';
    }
  };
  
  const getTypeColor = (type: string) => {
    switch(type) {
      case 'Hike':
        return 'bg-green-100 text-green-800';
      case 'Waterfall':
        return 'bg-blue-100 text-blue-800';
      case 'Viewpoint':
        return 'bg-purple-100 text-purple-800';
      case 'Pub':
        return 'bg-amber-100 text-amber-800';
      case 'Beach':
        return 'bg-cyan-100 text-cyan-800';
      case 'Cave':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className={`overflow-hidden h-full ${!isExplorer ? 'relative' : ''}`}>
        {!isExplorer && (
          <div className="absolute inset-0 backdrop-blur-lg z-10 flex flex-col items-center justify-center bg-black/25">
            <Lock className="w-10 h-10 text-white" />
            <p className="text-white font-bold mt-2">Explorer Access Only</p>
          </div>
        )}
        
        <div className="relative h-48">
          <img 
            src={spot.imageUrl} 
            alt={spot.title} 
            className={`w-full h-full object-cover ${!isExplorer ? 'filter blur-sm' : ''}`}
          />
          <Badge 
            className={`absolute top-2 right-2 ${getTypeColor(spot.type)}`}
          >
            {spot.type}
          </Badge>
        </div>
        
        <CardContent className={`p-4 ${!isExplorer ? 'blur-sm' : ''}`}>
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
          
          {isExplorer && (
            <div className="mt-auto">
              <Button
                variant="outline"
                size="sm"
                className="w-full flex items-center gap-2"
                onClick={() => setShowLocation(!showLocation)}
              >
                <MapPin className="h-4 w-4" />
                {showLocation ? 'Hide Location' : 'Show Location'}
              </Button>
              
              {showLocation && (
                <div className="mt-2 text-sm p-2 bg-muted rounded-md">
                  <p>{spot.location.name}</p>
                  <p className="text-xs text-muted-foreground">
                    GPS: {spot.location.latitude.toFixed(4)}, {spot.location.longitude.toFixed(4)}
                  </p>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default SpotCard;
