import { motion } from "framer-motion";

interface QuoteCardProps {
  quote: string;
  author: string;
  authorImage?: string;
}

const QuoteCard = ({ quote, author, authorImage }: QuoteCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true }}
      className="relative w-full"
    >
      {/* Editorial inline quote card - calm, no shadow */}
      <div className="relative border-l-4 border-primary/30 bg-primary/[0.04] pl-6 pr-4 py-5 rounded-r-[var(--radius)]">
        {/* Quote Text - Body text scale */}
        <p className="text-body text-foreground/80 mb-3 leading-relaxed">
          "{quote}"
        </p>

        {/* Author Section - Meta text */}
        <div className="flex items-center gap-3">
          {authorImage && (
            <div className="h-8 w-8 rounded-full overflow-hidden border border-primary/10 flex-shrink-0">
              <img 
                src={authorImage} 
                alt={author} 
                className="h-full w-full object-cover"
              />
            </div>
          )}
          <p className="text-meta text-muted-foreground font-medium">— {author}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default QuoteCard;