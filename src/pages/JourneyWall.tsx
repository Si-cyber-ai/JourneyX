
import { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PostGrid from "@/components/journeywall/PostGrid";
import ExploreFilters from "@/components/journeywall/ExploreFilters";
import { Post } from "@/types/post";
import { mockPosts } from "@/data/mockPosts";
import { motion } from "framer-motion";
import { Compass, TrendingUp, Users } from "lucide-react";

const JourneyWall = () => {
  const { toast } = useToast();
  const [posts, setPosts] = useState<Post[]>(mockPosts);
  const [activeTab, setActiveTab] = useState<string>("for-you");
  const [loading, setLoading] = useState<boolean>(false);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setLoading(true);
    
    setTimeout(() => {
      if (value === "trending") {
        setPosts([...mockPosts].sort(() => Math.random() - 0.5));
      } else if (value === "following") {
        setPosts(mockPosts.slice(0, 5));
      } else {
        setPosts(mockPosts);
      }
      setLoading(false);
    }, 500);
  };

  const handlePostLike = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, liked: !post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 } 
        : post
    ));

    toast({
      title: "Post action",
      description: "Your interaction has been saved!",
      duration: 2000,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/95">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-b from-primary/10 to-background/95 pb-10">
        <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />
        <div className="container mx-auto px-4 pt-24 pb-12 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl"
          >
            <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
              Journey Wall
            </h1>
            <p className="text-lg text-muted-foreground">
              Discover extraordinary travel experiences shared by our global community of adventurers.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 -mt-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Posts Section */}
          <div className="flex-1">
            <div className="bg-card rounded-xl shadow-lg border border-border/50 overflow-hidden backdrop-blur-sm">
              <Tabs 
                defaultValue="for-you" 
                className="w-full" 
                onValueChange={handleTabChange}
              >
                <div className="px-6 pt-6">
                  <TabsList className="w-full sm:w-auto grid grid-cols-3 h-[48px]">
                    <TabsTrigger value="for-you" className="flex items-center gap-2">
                      <Compass className="h-4 w-4" />
                      <span className="hidden sm:inline">For You</span>
                    </TabsTrigger>
                    <TabsTrigger value="trending" className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4" />
                      <span className="hidden sm:inline">Trending</span>
                    </TabsTrigger>
                    <TabsTrigger value="following" className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      <span className="hidden sm:inline">Following</span>
                    </TabsTrigger>
                  </TabsList>
                </div>

                <div className="p-6">
                  <TabsContent value="for-you">
                    <PostGrid 
                      posts={posts} 
                      loading={loading} 
                      onLike={handlePostLike}
                    />
                  </TabsContent>
                  <TabsContent value="trending">
                    <PostGrid 
                      posts={posts} 
                      loading={loading} 
                      onLike={handlePostLike}
                    />
                  </TabsContent>
                  <TabsContent value="following">
                    <PostGrid 
                      posts={posts} 
                      loading={loading} 
                      onLike={handlePostLike}
                    />
                  </TabsContent>
                </div>
              </Tabs>
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-80 shrink-0">
            <div className="sticky top-24">
              <ExploreFilters />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JourneyWall;
