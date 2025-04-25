
import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, MessageSquare, MapPin } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Post } from "@/types/post";

interface PostCardProps {
  post: Post;
  onLike: (postId: string) => void;
}

const PostCard = ({ post, onLike }: PostCardProps) => {
  const [showModal, setShowModal] = useState(false);
  
  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    onLike(post.id);
  };
  
  return (
    <>
      <div 
        className="bg-card rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
        onClick={() => setShowModal(true)}
      >
        <div className="relative">
          <img 
            src={post.imageUrl} 
            alt={post.caption} 
            className="w-full h-64 object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-white" />
              <span className="text-white text-sm font-medium">{post.location}</span>
            </div>
          </div>
        </div>
        
        <div className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src={post.user.avatar} alt={post.user.name} />
                <AvatarFallback>{post.user.name.substring(0, 2)}</AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium">{post.user.name}</span>
            </div>
            <span className="text-xs text-muted-foreground">{post.date}</span>
          </div>
          
          <p className="line-clamp-2 mb-2 text-sm">{post.caption}</p>
          
          <div className="flex gap-1 mb-3 flex-wrap">
            {post.tags.map(tag => (
              <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
            ))}
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex gap-4">
              <Button 
                variant="ghost" 
                size="sm" 
                className="p-0 h-auto" 
                onClick={handleLike}
              >
                <motion.div
                  whileTap={{ scale: 1.4 }}
                  transition={{ duration: 0.2 }}
                >
                  <Heart 
                    className={`h-5 w-5 ${post.liked ? 'fill-red-500 text-red-500' : 'text-muted-foreground'}`} 
                  />
                </motion.div>
                <span className="ml-1 text-xs">{post.likes}</span>
              </Button>
              
              <Button variant="ghost" size="sm" className="p-0 h-auto">
                <MessageSquare className="h-5 w-5 text-muted-foreground" />
                <span className="ml-1 text-xs">{post.comments.length}</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden">
          <div className="grid md:grid-cols-2">
            <div className="bg-black flex items-center">
              <img 
                src={post.imageUrl} 
                alt={post.caption} 
                className="w-full h-auto"
              />
            </div>
            <div className="p-6 max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={post.user.avatar} alt={post.user.name} />
                    <AvatarFallback>{post.user.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <span>{post.user.name}</span>
                </DialogTitle>
              </DialogHeader>
              
              <div className="mt-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                  <MapPin className="h-4 w-4" />
                  <span>{post.location}</span>
                </div>
                
                <p className="mb-4">{post.caption}</p>
                
                <div className="flex gap-1 mb-6 flex-wrap">
                  {post.tags.map(tag => (
                    <Badge key={tag} variant="secondary">{tag}</Badge>
                  ))}
                </div>
                
                <div className="flex gap-4 mb-6">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => onLike(post.id)}
                  >
                    <Heart 
                      className={`h-5 w-5 mr-1 ${post.liked ? 'fill-red-500 text-red-500' : ''}`} 
                    />
                    {post.likes}
                  </Button>
                  
                  <Button variant="ghost" size="sm">
                    <MessageSquare className="h-5 w-5 mr-1" />
                    {post.comments.length}
                  </Button>
                </div>
                
                <h3 className="font-medium mb-2">Comments</h3>
                {post.comments.length > 0 ? (
                  <div className="space-y-3">
                    {post.comments.map((comment, index) => (
                      <div key={index} className="flex gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={comment.user.avatar} alt={comment.user.name} />
                          <AvatarFallback>{comment.user.name.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">{comment.user.name}</span>
                            <span className="text-xs text-muted-foreground">{comment.date}</span>
                          </div>
                          <p className="text-sm">{comment.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">No comments yet.</p>
                )}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PostCard;
