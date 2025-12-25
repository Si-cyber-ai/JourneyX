/*
 * JourneyCostComparison Component
 * UX Purpose: Help solo travelers make confident transport decisions
 * Shows smart recommendation with context, not just price comparison
 */

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Plane, 
  Train, 
  Bus, 
  Clock, 
  DollarSign,
  Shield,
  CloudRain,
  Star,
  CheckCircle2,
  AlertCircle
} from "lucide-react";

interface TransportOption {
  type: 'flight' | 'train' | 'bus';
  price: number;
  duration: string;
  comfort: 'Low' | 'Medium' | 'High';
  reliability: 'Stable' | 'Weather-sensitive' | 'Variable';
  soloFriendly: boolean;
  available: boolean;
}

interface JourneyCostComparisonProps {
  from: string;
  to: string;
  options?: TransportOption[];
  weatherCondition?: 'good' | 'moderate' | 'poor';
}

// Mock data generator
const generateMockOptions = (from: string, to: string): TransportOption[] => {
  return [
    {
      type: 'flight',
      price: 420,
      duration: '2h 30m',
      comfort: 'High',
      reliability: 'Weather-sensitive',
      soloFriendly: true,
      available: true
    },
    {
      type: 'train',
      price: 180,
      duration: '5h 45m',
      comfort: 'High',
      reliability: 'Stable',
      soloFriendly: true,
      available: true
    },
    {
      type: 'bus',
      price: 95,
      duration: '8h 20m',
      comfort: 'Medium',
      reliability: 'Stable',
      soloFriendly: false, // Night travel
      available: true
    }
  ];
};

const JourneyCostComparison = ({ 
  from, 
  to, 
  options,
  weatherCondition = 'good'
}: JourneyCostComparisonProps) => {
  const transportOptions = options || generateMockOptions(from, to);
  
  // Smart recommendation logic
  const getRecommendation = () => {
    const flight = transportOptions.find(o => o.type === 'flight');
    const train = transportOptions.find(o => o.type === 'train');
    const bus = transportOptions.find(o => o.type === 'bus');

    // Weather-sensitive decision
    if (weatherCondition === 'poor' && train) {
      return {
        type: 'train',
        icon: '🚆',
        title: 'Train is more reliable today',
        reasons: [
          'Not affected by weather delays',
          'Lower cost',
          'Comfortable for solo travelers'
        ],
        contextNote: 'Flights may face delays due to weather'
      };
    }

    // Price-conscious but safety-aware
    if (train && flight) {
      const priceDiff = flight.price - train.price;
      const timeDiff = parseFloat(train.duration) - parseFloat(flight.duration);
      
      if (priceDiff > 150 && timeDiff < 4) {
        return {
          type: 'train',
          icon: '🚆',
          title: 'Train is better value for solo travel',
          reasons: [
            `Save $${priceDiff} with similar time`,
            'Comfortable and safer for solo travelers',
            'Central station locations'
          ],
          contextNote: null
        };
      }
    }

    // Default to flight if very long distance
    if (flight) {
      return {
        type: 'flight',
        icon: '✈️',
        title: 'Flight is fastest for this route',
        reasons: [
          'Significantly shorter time',
          'Direct route available',
          'Best for long distances'
        ],
        contextNote: weatherCondition === 'moderate' 
          ? 'Monitor weather before departure'
          : null
      };
    }

    return {
      type: 'train',
      icon: '🚆',
      title: 'Train recommended',
      reasons: ['Reliable and comfortable'],
      contextNote: null
    };
  };

  const recommendation = getRecommendation();

  const getIcon = (type: string) => {
    switch(type) {
      case 'flight': return Plane;
      case 'train': return Train;
      case 'bus': return Bus;
      default: return Train;
    }
  };

  const getComfortColor = (comfort: string) => {
    switch(comfort) {
      case 'High': return 'text-green-600 bg-green-50 border-green-200';
      case 'Medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'Low': return 'text-orange-600 bg-orange-50 border-orange-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Smart Recommendation Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="p-6 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
          <div className="flex items-start gap-4">
            <div className="text-4xl">{recommendation.icon}</div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-2">{recommendation.title}</h3>
              <ul className="space-y-1.5 mb-3">
                {recommendation.reasons.map((reason, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>{reason}</span>
                  </li>
                ))}
              </ul>
              {recommendation.contextNote && (
                <div className="flex items-start gap-2 p-3 rounded-lg bg-yellow-50 border border-yellow-200 text-sm">
                  <AlertCircle className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                  <span className="text-yellow-800">{recommendation.contextNote}</span>
                </div>
              )}
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Transport Options Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {transportOptions.map((option, index) => {
          const Icon = getIcon(option.type);
          const isRecommended = option.type === recommendation.type;
          
          return (
            <motion.div
              key={option.type}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className={`relative overflow-hidden ${
                isRecommended 
                  ? 'border-2 border-primary shadow-lg' 
                  : 'border border-border'
              }`}>
                {isRecommended && (
                  <div className="absolute top-0 left-0 right-0 bg-primary text-primary-foreground py-1.5 text-center">
                    <span className="text-xs font-medium">Best for Your Journey</span>
                  </div>
                )}
                
                <div className={`p-5 ${isRecommended ? 'pt-10' : ''}`}>
                  {/* Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <span className="font-semibold capitalize">{option.type}</span>
                    </div>
                    {option.soloFriendly && (
                      <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                        <Shield className="h-3 w-3 mr-1" />
                        Solo-friendly
                      </Badge>
                    )}
                  </div>

                  {/* Price & Duration */}
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <DollarSign className="h-4 w-4" />
                        <span>Price</span>
                      </div>
                      <span className="text-2xl font-bold">${option.price}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>Duration</span>
                      </div>
                      <span className="font-medium">{option.duration}</span>
                    </div>
                  </div>

                  {/* Attributes */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Comfort</span>
                      <Badge variant="outline" className={`text-xs ${getComfortColor(option.comfort)}`}>
                        {option.comfort}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Reliability</span>
                      <span className="text-xs font-medium">
                        {option.reliability === 'Stable' && '✓ Stable'}
                        {option.reliability === 'Weather-sensitive' && (
                          <span className="flex items-center gap-1 text-yellow-600">
                            <CloudRain className="h-3 w-3" />
                            Weather-sensitive
                          </span>
                        )}
                        {option.reliability === 'Variable' && 'Variable'}
                      </span>
                    </div>
                  </div>

                  {/* Safety Notes */}
                  {option.type === 'bus' && !option.soloFriendly && (
                    <div className="p-2 rounded-lg bg-orange-50 border border-orange-200 mb-4">
                      <p className="text-xs text-orange-800">
                        Night travel — not ideal for solo
                      </p>
                    </div>
                  )}

                  {option.type === 'train' && (
                    <div className="p-2 rounded-lg bg-blue-50 border border-blue-200 mb-4">
                      <p className="text-xs text-blue-800">
                        Stations centrally located and safer
                      </p>
                    </div>
                  )}

                  {option.type === 'flight' && weatherCondition !== 'good' && (
                    <div className="p-2 rounded-lg bg-yellow-50 border border-yellow-200 mb-4">
                      <p className="text-xs text-yellow-800">
                        Weather disruptions possible
                      </p>
                    </div>
                  )}

                  {/* Action Button */}
                  <Button 
                    className="w-full" 
                    variant={isRecommended ? "default" : "outline"}
                  >
                    View {option.type} options
                  </Button>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Additional Context */}
      <Card className="p-4 bg-muted/30 border-muted">
        <p className="text-xs text-muted-foreground text-center">
          Recommendations based on price, time, safety, and conditions. Prices are estimates.
        </p>
      </Card>
    </div>
  );
};

export default JourneyCostComparison;
