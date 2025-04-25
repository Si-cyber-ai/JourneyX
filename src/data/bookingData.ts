
import { Flight, Hotel, Review } from "@/types/booking";

export const mockFlights: Flight[] = [
  {
    id: "fl1",
    airline: "SkyWings",
    logo: "https://images.unsplash.com/photo-1577563908411-5077b6dc7624",
    from: "New York",
    to: "Paris",
    departureTime: "08:30 AM",
    arrivalTime: "9:45 PM",
    duration: "7h 15m",
    price: 450,
    direct: true
  },
  {
    id: "fl2",
    airline: "Global Air",
    logo: "https://images.unsplash.com/photo-1521727857535-28d2045b7641",
    from: "New York",
    to: "Paris",
    departureTime: "11:20 AM",
    arrivalTime: "2:35 AM",
    duration: "9h 15m",
    price: 380,
    direct: false
  },
  {
    id: "fl3",
    airline: "TransOcean",
    logo: "https://images.unsplash.com/photo-1464037866556-6812c9d1c72e",
    from: "New York",
    to: "Paris",
    departureTime: "2:45 PM",
    arrivalTime: "5:00 AM",
    duration: "8h 15m",
    price: 420,
    direct: true
  }
];

export const mockHotels: Hotel[] = [
  {
    id: "ht1",
    name: "Grand Riverside Hotel",
    imageUrl: "https://images.unsplash.com/photo-1561501900-3701fa6a0864",
    stars: 5,
    rating: 4.8,
    reviewsCount: 324,
    pricePerNight: 250,
    distance: "0.8 km from city center",
    facilities: ["wifi", "pool", "spa", "restaurant", "gym"],
    location: {
      latitude: 48.8566,
      longitude: 2.3522
    }
  },
  {
    id: "ht2",
    name: "Cozy Town Boutique",
    imageUrl: "https://images.unsplash.com/photo-1618773928121-c32242e63f39",
    stars: 4,
    rating: 4.5,
    reviewsCount: 186,
    pricePerNight: 180,
    distance: "1.2 km from city center",
    facilities: ["wifi", "restaurant", "bar"],
    location: {
      latitude: 48.8634,
      longitude: 2.3488
    }
  },
  {
    id: "ht3",
    name: "Urban Oasis Resort",
    imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945",
    stars: 5,
    rating: 4.9,
    reviewsCount: 412,
    pricePerNight: 320,
    distance: "0.5 km from city center",
    facilities: ["wifi", "pool", "spa", "restaurant", "gym", "parking"],
    location: {
      latitude: 48.8698,
      longitude: 2.3550
    }
  },
  {
    id: "ht4",
    name: "Traveler's Rest Inn",
    imageUrl: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4",
    stars: 3,
    rating: 4.2,
    reviewsCount: 245,
    pricePerNight: 120,
    distance: "2.1 km from city center",
    facilities: ["wifi", "restaurant"],
    location: {
      latitude: 48.8542,
      longitude: 2.3484
    }
  }
];

export const mockReviews: Review[] = [
  {
    id: "rv1",
    userName: "Emma T.",
    userPhoto: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    rating: 5,
    date: "2025-04-10",
    text: "Absolutely stunning location! The staff was incredibly accommodating and the room had the most amazing view of the city.",
    helpfulCount: 24,
    imageUrl: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa"
  },
  {
    id: "rv2",
    userName: "Jason M.",
    userPhoto: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
    rating: 4,
    date: "2025-04-05",
    text: "Great experience overall. The amenities were top-notch, but the restaurant was a bit pricey. Would still recommend though!",
    helpfulCount: 16
  },
  {
    id: "rv3",
    userName: "Sophie K.",
    userPhoto: "https://images.unsplash.com/photo-1534528741775-53994a69daeb",
    rating: 5,
    date: "2025-03-28",
    text: "This hotel exceeded all my expectations. The spa was world-class and the staff remembered my name from day one. Will definitely return!",
    helpfulCount: 31,
    imageUrl: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461"
  }
];
