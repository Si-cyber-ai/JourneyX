
import { motion } from "framer-motion";
import { NewsItem } from "@/types/news";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface NewsCardProps {
  news: NewsItem;
}

const NewsCard = ({ news }: NewsCardProps) => {
  const [expanded, setExpanded] = useState(false);
  
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Adventure':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'Alerts':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'Tips':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'Visa':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      case 'Events':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="overflow-hidden h-full">
        <div className="relative h-48">
          <img 
            src={news.imageUrl} 
            alt={news.title} 
            className="w-full h-full object-cover"
          />
          <span className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(news.category)}`}>
            {news.category}
          </span>
        </div>
        <CardContent className="p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-muted-foreground">{news.source}</span>
            <span className="text-sm text-muted-foreground">{news.date}</span>
          </div>
          <h3 className="font-bold text-lg mb-2 line-clamp-2">{news.title}</h3>
          <p className={`text-muted-foreground text-sm ${expanded ? '' : 'line-clamp-2'}`}>
            {news.summary}
          </p>
          <div className="mt-4 flex justify-between">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? 'Show less' : 'Read more'}
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => window.open(news.url, '_blank')}
            >
              Full article
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default NewsCard;
