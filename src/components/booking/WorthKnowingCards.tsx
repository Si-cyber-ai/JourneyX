/*
 * WorthKnowingCards - Visual Attraction/Place Cards
 * 
 * Design: Image-first horizontal scrolling cards
 * Features: Hover animations, 1-line descriptions, safety/timing tips
 */

import { motion } from 'framer-motion';
import { Clock, Shield, MapPin } from 'lucide-react';

interface Attraction {
  id: string;
  name: string;
  imageUrl: string;
  reason: string;
  tip?: {
    type: 'safety' | 'timing' | 'location';
    text: string;
  };
}

interface WorthKnowingCardsProps {
  attractions: Attraction[];
}

const WorthKnowingCards = ({ attractions }: WorthKnowingCardsProps) => {
  const getTipIcon = (type: 'safety' | 'timing' | 'location') => {
    switch (type) {
      case 'safety':
        return <Shield className="w-3 h-3" />;
      case 'timing':
        return <Clock className="w-3 h-3" />;
      case 'location':
        return <MapPin className="w-3 h-3" />;
    }
  };

  return (
    <section className="py-16 bg-muted/20">
      <div className="container max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-light text-foreground mb-2">
            Worth knowing
          </h2>
          <p className="text-body text-muted-foreground font-light mb-8">
            Places and experiences that make this journey special
          </p>
        </motion.div>

        {/* Horizontal scrolling container */}
        <div className="relative -mx-4 px-4">
          <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
            {attractions.map((attraction, index) => (
              <motion.div
                key={attraction.id}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex-shrink-0 w-80 snap-start"
              >
                <div className="group relative rounded-2xl overflow-hidden bg-card border border-border hover:shadow-xl transition-all duration-500 cursor-pointer">
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={attraction.imageUrl}
                      alt={attraction.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="text-xl font-light text-foreground mb-2 group-hover:text-primary transition-colors">
                      {attraction.name}
                    </h3>
                    <p className="text-body text-muted-foreground font-light leading-relaxed mb-4">
                      {attraction.reason}
                    </p>

                    {/* Tip */}
                    {attraction.tip && (
                      <div className="flex items-start gap-2 p-3 rounded-lg bg-muted/50">
                        <div className="flex-shrink-0 mt-0.5 text-muted-foreground">
                          {getTipIcon(attraction.tip.type)}
                        </div>
                        <p className="text-sm text-muted-foreground font-light leading-relaxed">
                          {attraction.tip.text}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>


    </section>
  );
};

export default WorthKnowingCards;
