
import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, MessageSquare, MapPin, Bookmark, ShieldCheck, UserCheck, CheckCircle2, AlertTriangle, XCircle } from "lucide-react";
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
  
  // Generate decision label based on post context
  const getDecisionLabel = () => {
    const location = post.location.toLowerCase();
    const tags = post.tags.map(t => t.toLowerCase());
    
    // Check for monsoon/weather concerns
    if (tags.some(t => t.includes('rain') || t.includes('monsoon'))) {
      return {
        icon: AlertTriangle,
        text: 'Check weather before visiting',
        color: 'text-yellow-600 bg-yellow-50 border-yellow-200'
      };
    }
    
    // Check for beaches (generally solo-friendly)
    if (tags.some(t => t.includes('beach') || t.includes('paradise'))) {
      return {
        icon: CheckCircle2,
        text: 'Good for first-time solo travelers',
        color: 'text-green-600 bg-green-50 border-green-200'
      };
    }
    
    // Check for hiking/remote (needs guide)
    if (tags.some(t => t.includes('hike') || t.includes('trail') || t.includes('mountain'))) {
      return {
        icon: AlertTriangle,
        text: 'Better with a local guide',
        color: 'text-orange-600 bg-orange-50 border-orange-200'
      };
    }
    
    // Default positive label
    return {
      icon: CheckCircle2,
      text: 'Solo-friendly destination',
      color: 'text-blue-600 bg-blue-50 border-blue-200'
    };
  };
  
  const decisionLabel = getDecisionLabel();
  
  return (
    <>
      <div 
        className="premium-card overflow-hidden cursor-pointer"
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
              <span className="text-white text-meta font-medium">{post.location}</span>
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
              <span className="text-meta font-medium">{post.user.name}</span>
              {/* UX: Trust badge to show verified journey - builds confidence for solo travelers */}
              <ShieldCheck className="h-3.5 w-3.5 text-green-500" title="Verified Visit" />
            </div>
            <span className="text-meta text-muted-foreground">{post.date}</span>
          </div>
          
          {/* Decision confidence micro-copy: Limit to 3 visible signals */}
          <div className={`flex items-center gap-1.5 px-2 py-1 rounded-[calc(var(--radius)*0.5)] mb-3 text-meta border ${decisionLabel.color}`}>
            <decisionLabel.icon className="h-3.5 w-3.5" />
            <span className="font-medium">{decisionLabel.text}</span>
          </div>
          
          {/* Body text: Caption */}
          <p className="line-clamp-2 mb-3 text-body">{post.caption}</p>
          
          {/* Tags: Meta text */}
          <div className="flex gap-1 mb-3 flex-wrap">
            {post.tags.slice(0, 3).map(tag => (
              <Badge key={tag} variant="secondary" className="text-meta">{tag}</Badge>
            ))}
          </div>
          
          {/* Actions: Quiet buttons */}
          <div className="flex justify-between items-center pt-2 border-t border-border">
            <Button 
              variant="ghost" 
              size="sm" 
              className="p-0 h-auto hover:bg-transparent" 
              onClick={handleLike}
            >
              <motion.div
                whileTap={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-1.5"
              >
                <Bookmark 
                  className={`h-4 w-4 ${post.liked ? 'fill-primary text-primary' : 'text-muted-foreground'}`} 
                />
                <span className="text-meta font-medium text-muted-foreground">
                  {post.liked ? 'Saved' : 'Save'}
                </span>
              </motion.div>
            </Button>
            
            <Button variant="ghost" size="sm" className="p-0 h-auto hover:bg-transparent">
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
              <span className="ml-1.5 text-meta text-muted-foreground">{post.comments.length}</span>
            </Button>
          </div>
        </div>
      </div>
      
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden rounded-[var(--radius)]">
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
                <DialogTitle className="flex items-center gap-2 text-subsection">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={post.user.avatar} alt={post.user.name} />
                    <AvatarFallback>{post.user.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <span>{post.user.name}</span>
                </DialogTitle>
              </DialogHeader>
              
              <div className="mt-4">
                <div className="flex items-center gap-2 text-meta text-muted-foreground mb-4">
                  <MapPin className="h-4 w-4" />
                  <span>{post.location}</span>
                </div>
                
                <p className="mb-4 text-body">{post.caption}</p>
                
                <div className="flex gap-1 mb-6 flex-wrap">
                  {post.tags.map(tag => (
                    <Badge key={tag} variant="secondary" className="text-meta">{tag}</Badge>
                  ))}
                </div>
                
                <div className="flex gap-4 mb-6 pb-4 border-b border-border">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => onLike(post.id)}
                    className="hover:bg-transparent"
                  >
                    <Heart 
                      className={`h-5 w-5 mr-1 ${post.liked ? 'fill-red-500 text-red-500' : ''}`} 
                    />
                    <span className="text-meta">{post.likes}</span>
                  </Button>
                  
                  <Button variant="ghost" size="sm" className="hover:bg-transparent">
                    <MessageSquare className="h-5 w-5 mr-1" />
                    <span className="text-meta">{post.comments.length}</span>
                  </Button>
                </div>
                
                <h3 className="text-subsection mb-3">Comments</h3>
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
                            <span className="text-meta font-medium">{comment.user.name}</span>
                            <span className="text-meta text-muted-foreground">{comment.date}</span>
                          </div>
                          <p className="text-body">{comment.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  /* Empty state: Calm, one sentence */
                  <div className="text-center py-8">
                    <MessageSquare className="h-8 w-8 mx-auto mb-2 text-muted-foreground/40" />
                    <p className="text-body text-muted-foreground mb-3">No comments yet</p>
                    <Button variant="secondary" size="sm">Be the first to comment</Button>
                  </div>
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
