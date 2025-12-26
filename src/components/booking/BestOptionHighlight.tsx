/*
 * BestOptionHighlight Component
 * Magazine editorial style - Narrative recommendation
 * Soft emphasis, no bullet points, human-readable text
 * Trust built through design, not explanation
 */

import { motion } from "framer-motion";

interface BestOptionHighlightProps {
  mode: 'flight' | 'train' | 'bus';
  narrative: string;
  backgroundImage?: string;
}

const BestOptionHighlight = ({ mode, narrative, backgroundImage }: BestOptionHighlightProps) => {
  const getModeLabel = (mode: string) => {
    switch (mode) {
      case 'flight': return 'Flight';
      case 'train': return 'Train';
      case 'bus': return 'Bus';
      default: return '';
    }
  };

  return (
    <section className="relative w-full py-24 overflow-hidden">
      {/* Subtle background image */}
      {backgroundImage && (
        <div className="absolute inset-0">
          <img
            src={backgroundImage}
            alt="Background"
            className="w-full h-full object-cover opacity-5 blur-sm"
          />
        </div>
      )}
      
      {/* Soft gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/3 via-background to-background" />
      
      <div className="relative container max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          {/* Small editorial label */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-sm uppercase tracking-widest text-primary/80 font-light mb-6"
          >
            Recommended by JourneyX
          </motion.p>
          
          {/* Main headline - elegant, not shouty */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-5xl font-light text-foreground mb-12 leading-tight"
          >
            {getModeLabel(mode)} offers the best experience
          </motion.h2>
          
          {/* Narrative text - editorial style, not bullet points */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="max-w-2xl mx-auto"
          >
            <p className="text-xl md:text-2xl text-muted-foreground font-light leading-relaxed">
              {narrative}
            </p>
          </motion.div>
          
          {/* Subtle divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="w-24 h-px bg-primary/30 mx-auto mt-12"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default BestOptionHighlight;
