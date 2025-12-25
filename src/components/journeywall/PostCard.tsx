
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
        className="bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer border border-border"
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
              {/* UX: Trust badge to show verified journey - builds confidence for solo travelers */}
              <ShieldCheck className="h-3.5 w-3.5 text-green-500" title="Verified Visit" />
            </div>
            <span className="text-xs text-muted-foreground">{post.date}</span>
          </div>
          
          {/* UX: Journey context helps solo travelers understand trip type and feasibility */}
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
            <span className="font-medium">Solo • Budget • 3 Days</span>
          </div>
          
          {/* UX: Decision label helps solo travelers quickly assess if this journey suits them */}
          <div className={`flex items-center gap-1.5 px-2 py-1 rounded-md mb-2 text-xs border ${decisionLabel.color}`}>
            <decisionLabel.icon className="h-3.5 w-3.5" />
            <span className="font-medium">{decisionLabel.text}</span>
          </div>
          
          <p className="line-clamp-2 mb-2 text-sm">{post.caption}</p>
          
          <div className="flex gap-1 mb-3 flex-wrap">
            {post.tags.map(tag => (
              <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
            ))}
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex gap-4">
              {/* UX: Changed from Like to Save - more actionable for solo trip planning */}
              <Button 
                variant="ghost" 
                size="sm" 
                className="p-0 h-auto text-primary hover:text-primary/80" 
                onClick={handleLike}
              >
                <motion.div
                  whileTap={{ scale: 1.2 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-1"
                >
                  <Bookmark 
                    className={`h-4 w-4 ${post.liked ? 'fill-primary' : ''}`} 
                  />
                  <span className="text-xs font-medium">
                    {post.liked ? 'Saved' : 'Save to My Journey'}
                  </span>
                </motion.div>
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
