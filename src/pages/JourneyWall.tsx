
import { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PostGrid from "@/components/journeywall/PostGrid";
import ExploreFilters from "@/components/journeywall/ExploreFilters";
import { Post } from "@/types/post";
import { mockPosts } from "@/data/mockPosts";

const JourneyWall = () => {
  const { toast } = useToast();
  const [posts, setPosts] = useState<Post[]>(mockPosts);
  const [activeTab, setActiveTab] = useState<string>("for-you");
  const [loading, setLoading] = useState<boolean>(false);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      // For demonstration, just shuffle the posts for different tabs
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
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main Content */}
          <div className="flex-1">
            <header className="mb-6">
              <h1 className="text-3xl font-bold mb-2">Journey Wall</h1>
              <p className="text-muted-foreground">Discover amazing travel experiences from our community</p>
            </header>
            
            <Tabs defaultValue="for-you" className="mb-6" onValueChange={handleTabChange}>
              <TabsList className="w-full sm:w-auto">
                <TabsTrigger value="for-you">For You</TabsTrigger>
                <TabsTrigger value="trending">Trending</TabsTrigger>
                <TabsTrigger value="following">Following</TabsTrigger>
              </TabsList>
              <TabsContent value="for-you" className="mt-4">
                <PostGrid 
                  posts={posts} 
                  loading={loading} 
                  onLike={handlePostLike}
                />
              </TabsContent>
              <TabsContent value="trending" className="mt-4">
                <PostGrid 
                  posts={posts} 
                  loading={loading} 
                  onLike={handlePostLike}
                />
              </TabsContent>
              <TabsContent value="following" className="mt-4">
                <PostGrid 
                  posts={posts} 
                  loading={loading} 
                  onLike={handlePostLike}
                />
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-80 shrink-0">
            <ExploreFilters />
          </div>
        </div>
      </div>
    </div>
  );
};

export default JourneyWall;
