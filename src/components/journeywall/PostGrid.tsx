
import { motion } from "framer-motion";
import PostCard from "./PostCard";
import { Post } from "@/types/post";
import { Skeleton } from "@/components/ui/skeleton";

interface PostGridProps {
  posts: Post[];
  loading: boolean;
  onLike: (postId: string) => void;
}

const PostGrid = ({ posts, loading, onLike }: PostGridProps) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array(6).fill(0).map((_, index) => (
          <div key={index} className="rounded-xl overflow-hidden bg-card/50 backdrop-blur-sm border border-border/50">
            <Skeleton className="h-64 w-full" />
            <div className="p-4 space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-full" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {posts.map((post, index) => (
        <motion.div
          key={post.id}
          variants={item}
          className="h-fit"
        >
          <PostCard post={post} onLike={onLike} />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default PostGrid;
