/*
 * RouteVisualizer Component
 * Elegant visual route display - Magazine editorial style
 * Shows journey path with subtle background imagery
 * Horizontal layout, cinematic feel
 */

import { motion } from "framer-motion";
import { MapPin, ArrowRight } from "lucide-react";

interface RouteVisualizerProps {
  from: string;
  to: string;
  date: string;
  backgroundImage?: string;
}

const RouteVisualizer = ({ from, to, date, backgroundImage }: RouteVisualizerProps) => {
  return (
    <div className="relative w-full h-[50vh] min-h-[400px] overflow-hidden">
      {/* Subtle background image */}
      {backgroundImage && (
        <div className="absolute inset-0">
          <img
            src={backgroundImage}
            alt="Route background"
            className="w-full h-full object-cover opacity-20 blur-sm scale-105"
          />
        </div>
      )}
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background" />
      
      {/* Route content */}
      <div className="relative h-full flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row items-center gap-8 md:gap-16 max-w-6xl"
        >
          {/* From */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center md:text-right"
          >
            <div className="flex items-center justify-center md:justify-end gap-3 mb-3">
              <MapPin className="w-5 h-5 text-muted-foreground" />
              <p className="text-sm uppercase tracking-widest text-muted-foreground font-light">
                From
              </p>
            </div>
            <h2 className="text-5xl md:text-6xl font-light text-foreground">
              {from}
            </h2>
          </motion.div>
          
          {/* Arrow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col items-center gap-4"
          >
            <ArrowRight className="w-12 h-12 text-primary/60" />
            <div className="text-center">
              <p className="text-sm text-muted-foreground font-light">
                {date}
              </p>
            </div>
          </motion.div>
          
          {/* To */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center md:text-left"
          >
            <div className="flex items-center justify-center md:justify-start gap-3 mb-3">
              <p className="text-sm uppercase tracking-widest text-muted-foreground font-light">
                To
              </p>
              <MapPin className="w-5 h-5 text-muted-foreground" />
            </div>
            <h2 className="text-5xl md:text-6xl font-light text-foreground">
              {to}
            </h2>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </div>
  );
};

export default RouteVisualizer;
