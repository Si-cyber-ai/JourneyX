
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const destinations = [
  {
    id: "1",
    name: "Hidden Cove, Bali",
    description: "A secluded beach paradise away from tourist crowds",
    image: "https://images.unsplash.com/photo-1426604966848-d7adac402bff",
    location: "Bali, Indonesia",
    tags: ["beach", "hidden", "peaceful"]
  },
  {
    id: "2",
    name: "Mountain Sanctuary",
    description: "Breathtaking views from this mountain retreat",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    location: "Swiss Alps, Switzerland",
    tags: ["mountains", "hiking", "views"]
  },
  {
    id: "3",
    name: "Whale Watching Point",
    description: "The best spot to see humpback whales up close",
    image: "https://images.unsplash.com/photo-1518877593221-1f28583780b4",
    location: "Maui, Hawaii",
    tags: ["wildlife", "ocean", "photography"]
  }
];

const FeaturedDestinations = () => {
  const navigate = useNavigate();

  const handleClick = (id: string) => {
    // Will navigate to detail page in the future
    console.log(`Clicked destination ${id}`);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {destinations.map((destination) => (
        <Card 
          key={destination.id} 
          className="overflow-hidden group transition-all duration-300 hover:shadow-lg cursor-pointer"
          onClick={() => handleClick(destination.id)}
        >
          <div className="h-48 overflow-hidden">
            <img
              src={destination.image}
              alt={destination.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <CardContent className="p-5">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-bold text-lg">{destination.name}</h3>
                <p className="text-sm text-muted-foreground mb-2">{destination.location}</p>
              </div>
            </div>
            <p className="line-clamp-2 text-muted-foreground mb-3">{destination.description}</p>
            <div className="flex flex-wrap gap-1">
              {destination.tags.map(tag => (
                <span 
                  key={tag} 
                  className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default FeaturedDestinations;
