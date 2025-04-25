
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
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array(6).fill(0).map((_, index) => (
          <div key={index} className="rounded-xl overflow-hidden">
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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post, index) => (
        <motion.div
          key={post.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="h-fit"
        >
          <PostCard post={post} onLike={onLike} />
        </motion.div>
      ))}
    </div>
  );
};

export default PostGrid;
