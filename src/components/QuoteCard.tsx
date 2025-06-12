import { motion } from "framer-motion";
import { Quote } from "lucide-react";

interface QuoteCardProps {
  quote: string;
  author: string;
  authorImage?: string;
}

const QuoteCard = ({ quote, author, authorImage }: QuoteCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative group w-full max-w-2xl mx-auto"
    >
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-500/10 via-teal-500/10 to-blue-500/10 p-8 backdrop-blur-sm border border-white/10">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-grid-white/[0.02] opacity-50" />
        
        {/* Quote Icon */}
        <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-40 transition-opacity duration-500">
          <Quote className="w-12 h-12 text-primary" />
        </div>

        {/* Quote Text */}
        <div className="relative">
          <p className="text-xl md:text-2xl font-serif italic text-foreground/90 mb-6 leading-relaxed">
            "{quote}"
          </p>

          {/* Author Section */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center space-x-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          >
            {authorImage && (
              <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-primary/20">
                <img 
                  src={authorImage} 
                  alt={author} 
                  className="h-full w-full object-cover"
                />
              </div>
            )}
            <div>
              <p className="font-medium text-foreground/80">— {author}</p>
            </div>
          </motion.div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-24 h-24 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
      </div>
    </motion.div>
  );
};

export default QuoteCard;