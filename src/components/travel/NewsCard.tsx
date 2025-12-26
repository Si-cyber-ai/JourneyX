
import { motion } from "framer-motion";
import { NewsItem } from "@/types/news";
import { ExternalLink } from "lucide-react";

interface NewsCardProps {
  news: NewsItem;
}

const NewsCard = ({ news }: NewsCardProps) => {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Adventure':
        return 'text-emerald-700 dark:text-emerald-400';
      case 'Alerts':
        return 'text-orange-700 dark:text-orange-400';
      case 'Tips':
        return 'text-blue-700 dark:text-blue-400';
      case 'Visa':
        return 'text-purple-700 dark:text-purple-400';
      case 'Events':
        return 'text-amber-700 dark:text-amber-400';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <motion.a
      href={news.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="group block border border-border rounded-[var(--radius)] p-4 hover:bg-accent/50 transition-colors"
    >
      <div className="flex gap-3">
        {/* Thumbnail */}
        <div className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden bg-muted">
          <img 
            src={news.imageUrl} 
            alt={news.title} 
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <span className={`text-meta font-medium uppercase tracking-wide ${getCategoryColor(news.category)}`}>
              {news.category}
            </span>
            <ExternalLink className="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <h3 className="text-body font-medium text-foreground line-clamp-2 mb-1 group-hover:text-foreground/80 transition-colors">
            {news.title}
          </h3>
          <p className="text-meta text-muted-foreground">
            {news.source} • {news.date}
          </p>
        </div>
      </div>
    </motion.a>
  );
};

export default NewsCard;
