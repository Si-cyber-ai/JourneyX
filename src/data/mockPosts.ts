
import { Post } from "@/types/post";

export const mockPosts: Post[] = [
  {
    id: "1",
    user: {
      id: "u1",
      name: "Alex Chen",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330"
    },
    imageUrl: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4",
    caption: "Found this amazing hidden beach away from tourists. The crystal clear water and pristine sand made for a perfect day.",
    location: "Tulum, Mexico",
    tags: ["BeachParadise", "HiddenGem", "NoTourists"],
    likes: 124,
    liked: false,
    comments: [
      {
        user: {
          id: "u2",
          name: "Maya Johnson",
          avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36"
        },
        text: "This looks incredible! Adding to my bucket list.",
        date: "3 hours ago"
      },
      {
        user: {
          id: "u3",
          name: "Liam Wilson",
          avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde"
        },
        text: "Could you share the exact location? I'll be in Tulum next month!",
        date: "1 hour ago"
      }
    ],
    date: "2 days ago"
  },
  {
    id: "2",
    user: {
      id: "u2",
      name: "Maya Johnson",
      avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36"
    },
    imageUrl: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
    caption: "Hiked 3 hours to reach this viewpoint and it was totally worth it! The morning fog created such a mystical atmosphere.",
    location: "Swiss Alps, Switzerland",
    tags: ["MountainViews", "HikingTrails", "MorningFog"],
    likes: 235,
    liked: true,
    comments: [
      {
        user: {
          id: "u1",
          name: "Alex Chen",
          avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330"
        },
        text: "The fog makes it look magical! Great shot.",
        date: "1 day ago"
      }
    ],
    date: "4 days ago"
  },
  {
    id: "3",
    user: {
      id: "u3",
      name: "Liam Wilson",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde"
    },
    imageUrl: "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
    caption: "Discovered this local street food vendor who's been making the best pad thai for over 30 years. A true hidden gem!",
    location: "Bangkok, Thailand",
    tags: ["StreetFood", "LocalCuisine", "FoodieFind"],
    likes: 98,
    liked: false,
    comments: [],
    date: "1 week ago"
  },
  {
    id: "4",
    user: {
      id: "u4",
      name: "Emma Davis",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80"
    },
    imageUrl: "https://images.unsplash.com/photo-1499856871958-5b9357976b82",
    caption: "Stumbled upon this cute little coffee shop hidden in an alleyway. Amazing cappuccinos and the aesthetic is just perfect!",
    location: "Paris, France",
    tags: ["CafeHopping", "HiddenGem", "CoffeeLovers"],
    likes: 156,
    liked: false,
    comments: [
      {
        user: {
          id: "u2",
          name: "Maya Johnson",
          avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36"
        },
        text: "I need the name of this place asap!",
        date: "2 days ago"
      }
    ],
    date: "1 week ago"
  },
  {
    id: "5",
    user: {
      id: "u5",
      name: "Noah Taylor",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
    },
    imageUrl: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1",
    caption: "Rented a car and drove through the countryside. The autumn colors were absolutely breathtaking!",
    location: "Kyoto, Japan",
    tags: ["RoadTrip", "AutumnVibes", "CountrysideDrive"],
    likes: 210,
    liked: false,
    comments: [
      {
        user: {
          id: "u1",
          name: "Alex Chen",
          avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330"
        },
        text: "Those colors are unreal! Perfect time to visit Japan.",
        date: "5 days ago"
      }
    ],
    date: "2 weeks ago"
  },
  {
    id: "6",
    user: {
      id: "u6",
      name: "Olivia Kim",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2"
    },
    imageUrl: "https://images.unsplash.com/photo-1519451241324-20b4ea2c4220",
    caption: "Found this secluded spot after a local tipped us off. No tourists, just pure island vibes!",
    location: "Bali, Indonesia",
    tags: ["IslandLife", "SecretSpot", "TravelTips"],
    likes: 178,
    liked: true,
    comments: [],
    date: "3 weeks ago"
  }
];
