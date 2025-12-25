/*
 * SafetyIntelligenceMap Component
 * UX Purpose: Provides visual safety intelligence for solo travelers
 * Frontend only - uses mock data and static configuration
 */

import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  CloudRain, 
  Waves, 
  Activity, 
  AlertTriangle,
  Info,
  MapPin,
  Eye,
  EyeOff
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface RiskLayer {
  id: string;
  name: string;
  icon: any;
  enabled: boolean;
  color: string;
  description: string;
}

const SafetyIntelligenceMap = () => {
  const [layers, setLayers] = useState<RiskLayer[]>([
    {
      id: "weather",
      name: "Weather Risk",
      icon: CloudRain,
      enabled: false,
      color: "blue",
      description: "Seasonal patterns and extreme weather zones"
    },
    {
      id: "flood",
      name: "Flood Risk",
      icon: Waves,
      enabled: false,
      color: "cyan",
      description: "Areas prone to seasonal flooding"
    },
    {
      id: "seismic",
      name: "Seismic Activity",
      icon: Activity,
      enabled: false,
      color: "red",
      description: "Earthquake-prone regions"
    }
  ]);

  const toggleLayer = (id: string) => {
    setLayers(prev => 
      prev.map(layer => 
        layer.id === id ? { ...layer, enabled: !layer.enabled } : layer
      )
    );
  };

  // Mock region data for demonstration
  const mockRegions = [
    {
      name: "Southeast Asia Coastal",
      risk: "yellow",
      riskLevel: "Caution",
      details: "Monsoon season July–September. Indoor alternatives recommended for afternoons."
    },
    {
      name: "Western Mediterranean",
      risk: "green",
      riskLevel: "Safe",
      details: "Optimal conditions. Low risk for natural events during this season."
    },
    {
      name: "Caribbean Islands",
      risk: "yellow",
      riskLevel: "Caution",
      details: "Hurricane season active June–November. Monitor weather alerts daily."
    },
    {
      name: "Japanese Coastal Regions",
      risk: "yellow",
      riskLevel: "Caution",
      details: "Active seismic zone. Familiarize yourself with earthquake safety procedures."
    }
  ];

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Overall Safety Status Summary */}
        <Card className="p-5 mb-6 bg-green-50 border-2 border-green-300 dark:bg-green-950/20">
          <div className="flex items-start gap-4">
            <div className="text-3xl">🟢</div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-1">Area currently safe for travel</h3>
              <p className="text-sm text-muted-foreground">
                Most regions show normal conditions. Monitor seasonal patterns in highlighted areas.
              </p>
            </div>
          </div>
        </Card>

        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold mb-1">Safety Intelligence</h2>
            <p className="text-muted-foreground text-sm">
              Regional risks and seasonal patterns
            </p>
          </div>
        </div>

        {/* Risk Legend */}
        <Card className="p-4 mb-6 bg-muted/30">
          <h3 className="text-sm font-semibold mb-3">Risk Levels</h3>
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-green-500 shadow-sm" />
              <span className="text-sm">Safe</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-yellow-500 shadow-sm" />
              <span className="text-sm">Caution</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-red-500 shadow-sm" />
              <span className="text-sm">Avoid</span>
            </div>
          </div>
        </Card>

        {/* Layer Controls */}
        <Card className="p-4 mb-6">
          <h3 className="text-sm font-semibold mb-4">Optional Risk Layers</h3>
          <div className="space-y-3">
            {layers.map((layer) => (
              <div key={layer.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <layer.icon className={`h-4 w-4 text-${layer.color}-500`} />
                  <div>
                    <Label htmlFor={layer.id} className="text-sm font-medium cursor-pointer">
                      {layer.name}
                    </Label>
                    <p className="text-xs text-muted-foreground">{layer.description}</p>
                  </div>
                </div>
                <Switch
                  id={layer.id}
                  checked={layer.enabled}
                  onCheckedChange={() => toggleLayer(layer.id)}
                />
              </div>
            ))}
          </div>
        </Card>

        {/* Map Placeholder - UX: Shows concept without real mapping API */}
        <Card className="relative overflow-hidden">
          <div className="aspect-video bg-gradient-to-br from-blue-50 to-green-50 dark:from-blue-950 dark:to-green-950 relative">
            {/* Simulated map overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center space-y-2 p-8">
                <MapPin className="h-12 w-12 mx-auto text-muted-foreground/50" />
                <p className="text-sm text-muted-foreground">
                  Interactive map visualization
                </p>
                <p className="text-xs text-muted-foreground max-w-md">
                  Production version integrates with mapping service for regional risk overlays
                </p>
              </div>
            </div>

            {/* Simulated region markers */}
            <div className="absolute top-1/4 left-1/4 w-16 h-16 rounded-full bg-yellow-500/20 border-2 border-yellow-500 flex items-center justify-center cursor-pointer hover:bg-yellow-500/30 transition-colors">
              <AlertTriangle className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="absolute top-1/3 right-1/4 w-16 h-16 rounded-full bg-green-500/20 border-2 border-green-500 flex items-center justify-center cursor-pointer hover:bg-green-500/30 transition-colors">
              <Info className="h-6 w-6 text-green-600" />
            </div>
            <div className="absolute bottom-1/4 left-1/2 w-16 h-16 rounded-full bg-yellow-500/20 border-2 border-yellow-500 flex items-center justify-center cursor-pointer hover:bg-yellow-500/30 transition-colors">
              <AlertTriangle className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </Card>

        {/* Regional Risk Details */}
        <div className="mt-6 space-y-3">
          <h3 className="text-sm font-semibold mb-3">Regional Assessments</h3>
          {mockRegions.map((region, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className={`p-4 border-l-4 ${
                region.risk === 'green' 
                  ? 'border-green-500 bg-green-50/50 dark:bg-green-950/20' 
                  : region.risk === 'yellow'
                  ? 'border-yellow-500 bg-yellow-50/50 dark:bg-yellow-950/20'
                  : 'border-red-500 bg-red-50/50 dark:bg-red-950/20'
              }`}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-sm">{region.name}</h4>
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${
                          region.risk === 'green' 
                            ? 'bg-green-100 text-green-700 border-green-300' 
                            : region.risk === 'yellow'
                            ? 'bg-yellow-100 text-yellow-700 border-yellow-300'
                            : 'bg-red-100 text-red-700 border-red-300'
                        }`}
                      >
                        {region.riskLevel}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{region.details}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Disclaimer */}
        <Card className="p-4 mt-6 bg-muted/30 border-muted">
          <p className="text-xs text-muted-foreground text-center">
            Based on historical patterns and forecasts. Check local authorities before your trip.
          </p>
        </Card>
      </motion.div>
    </div>
  );
};

export default SafetyIntelligenceMap;
