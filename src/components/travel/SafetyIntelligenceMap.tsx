/*
 * SafetyIntelligenceMap Component
 * UX Purpose: Provides visual safety intelligence for solo travelers
 * Frontend only - uses mock data and static configuration
 */

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

const SafetyIntelligenceMap = () => {
  // Mock region data for demonstration
  const mockRegions = [
    {
      name: "Southeast Asia Coastal",
      risk: "yellow",
      riskLevel: "Moderate",
      details: "Monsoon season July–September. Indoor alternatives recommended for afternoons.",
      borderColor: "border-l-amber-400"
    },
    {
      name: "Western Mediterranean",
      risk: "green",
      riskLevel: "Low risk",
      details: "Optimal conditions. Low risk for natural events during this season.",
      borderColor: "border-l-emerald-400"
    },
    {
      name: "Caribbean Islands",
      risk: "yellow",
      riskLevel: "Moderate",
      details: "Hurricane season active June–November. Monitor weather alerts daily.",
      borderColor: "border-l-amber-400"
    },
    {
      name: "Japanese Coastal Regions",
      risk: "yellow",
      riskLevel: "Moderate",
      details: "Active seismic zone. Familiarize yourself with earthquake safety procedures.",
      borderColor: "border-l-amber-400"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Map Placeholder - Grayscale, minimal */}
      <div className="relative overflow-hidden rounded-[var(--radius)] border border-border bg-muted/20">
        <div className="aspect-[16/9] bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 relative grayscale-[60%]">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center space-y-2 p-8">
              <MapPin className="h-10 w-10 mx-auto text-muted-foreground/40" />
              <p className="text-meta text-muted-foreground">
                Interactive map visualization
              </p>
            </div>
          </div>

          {/* Simulated region markers - subtle */}
          <div className="absolute top-1/4 left-1/4 w-3 h-3 rounded-full bg-amber-500/60 border border-amber-600" />
          <div className="absolute top-1/3 right-1/4 w-3 h-3 rounded-full bg-emerald-500/60 border border-emerald-600" />
          <div className="absolute bottom-1/4 left-1/2 w-3 h-3 rounded-full bg-amber-500/60 border border-amber-600" />
        </div>
      </div>

      {/* Regional Risk Details - Minimal cards with left accent */}
      <div className="space-y-3">
        {mockRegions.map((region, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className={`border-l-2 ${region.borderColor} pl-4 py-3`}
          >
            <div className="flex items-baseline gap-3 mb-1">
              <h4 className="text-body font-medium text-foreground">{region.name}</h4>
              <span className="text-meta text-muted-foreground uppercase tracking-wide">
                {region.riskLevel}
              </span>
            </div>
            <p className="text-body text-muted-foreground leading-relaxed">
              {region.details}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SafetyIntelligenceMap;
