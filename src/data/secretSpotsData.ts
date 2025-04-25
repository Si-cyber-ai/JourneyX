
import { SecretSpot } from "@/types/secretSpot";

export const mockSecretSpots: SecretSpot[] = [
  {
    id: "1",
    title: "Hidden Waterfall Cove",
    description: "A secluded waterfall hidden behind dense jungle foliage. Requires a 2-hour hike through unmarked trails to reach this pristine location.",
    imageUrl: "https://images.unsplash.com/photo-1564574662330-73fb2940ff5d",
    type: "Waterfall",
    difficulty: "Medium",
    distance: "2.5 km",
    accessible: false,
    location: {
      latitude: 8.5021,
      longitude: 115.2631,
      name: "North Bali, Indonesia"
    },
    createdBy: {
      id: "user123",
      name: "Maya Explorer",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80"
    }
  },
  {
    id: "2",
    title: "Abandoned Lighthouse View",
    description: "An old lighthouse with panoramic ocean views. The surrounding cliffs offer the best sunset spot on the entire coastline.",
    imageUrl: "https://images.unsplash.com/photo-1507492149903-3748ce54d72d",
    type: "Viewpoint",
    difficulty: "Easy",
    distance: "1 km",
    accessible: true,
    location: {
      latitude: 43.0962,
      longitude: -9.2634,
      name: "Galicia, Spain"
    },
    createdBy: {
      id: "user456",
      name: "Alex Wanderer",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e"
    }
  },
  {
    id: "3",
    title: "Midnight Mountain Cave",
    description: "A natural cave with bioluminescent organisms that glow at night. The effect creates a magical starry ceiling inside the cave.",
    imageUrl: "https://images.unsplash.com/photo-1496497243254-68011cbfb855",
    type: "Cave",
    difficulty: "Expert",
    distance: "4.2 km",
    accessible: false,
    location: {
      latitude: -38.5428,
      longitude: 175.7006,
      name: "North Island, New Zealand"
    },
    createdBy: {
      id: "user789",
      name: "Sarah Trekker",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330"
    }
  },
  {
    id: "4",
    title: "Locals Only Beach Cove",
    description: "A pristine beach accessible only by a hidden path through private property (get permission from local cafe owner).",
    imageUrl: "https://images.unsplash.com/photo-1501950183564-3c8b840a39a3",
    type: "Beach",
    difficulty: "Easy",
    distance: "0.5 km",
    accessible: true,
    location: {
      latitude: 36.4335,
      longitude: 28.2176,
      name: "Rhodes, Greece"
    },
    createdBy: {
      id: "user101",
      name: "Marco Islander",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
    }
  },
  {
    id: "5",
    title: "Hidden Mountain Shrine",
    description: "Ancient shrine tucked away on a cliff-side that few tourists know about. Offers incredible views and spiritual atmosphere.",
    imageUrl: "https://images.unsplash.com/photo-1509195070461-8ad18d5af8a1",
    type: "Viewpoint",
    difficulty: "Medium",
    distance: "3.1 km",
    accessible: false,
    location: {
      latitude: 34.9387,
      longitude: 135.2173,
      name: "Kyoto Prefecture, Japan"
    },
    createdBy: {
      id: "user202",
      name: "Hana Photographer",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb"
    }
  }
];
