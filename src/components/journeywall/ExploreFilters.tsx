
import { useState } from "react";
import { Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

// Sample data
const trendingTags = [
  "BeachParadise", "MountainViews", "StreetFood", "HiddenGem", 
  "CityEscape", "NatureTrail", "LocalCuisine", "RoadTrip"
];

const categories = [
  "Beaches", "Mountains", "Cities", "Food", "Adventure", 
  "Culture", "Wildlife", "Architecture"
];

const creators = [
  {
    id: "1",
    name: "Alex Chen",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    posts: 145
  },
  {
    id: "2",
    name: "Maya Johnson",
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36",
    posts: 89
  },
  {
    id: "3",
    name: "Liam Wilson",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde",
    posts: 67
  }
];

const ExploreFilters = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Search</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search posts, places, tags..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Trending Tags</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {trendingTags.map(tag => (
              <Button key={tag} variant="outline" size="sm" className="rounded-full">
                #{tag}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-2">
            {categories.map(category => (
              <Button key={category} variant="outline" className="justify-start">
                {category}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Top Creators</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y">
            {creators.map(creator => (
              <div key={creator.id} className="flex items-center justify-between p-4">
                <div className="flex items-center gap-2">
                  <Avatar>
                    <AvatarImage src={creator.avatar} alt={creator.name} />
                    <AvatarFallback>{creator.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{creator.name}</p>
                    <p className="text-xs text-muted-foreground">{creator.posts} posts</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">Follow</Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExploreFilters;
