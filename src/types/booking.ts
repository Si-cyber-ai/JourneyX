
export interface Flight {
  id: string;
  airline: string;
  logo: string;
  from: string;
  to: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  price: number;
  direct: boolean;
}

export interface Hotel {
  id: string;
  name: string;
  imageUrl: string;
  stars: number;
  rating: number;
  reviewsCount: number;
  pricePerNight: number;
  distance: string;
  facilities: string[];
  location: {
    latitude: number;
    longitude: number;
  };
}

export interface Review {
  id: string;
  userName: string;
  userPhoto: string;
  rating: number;
  date: string;
  text: string;
  helpfulCount: number;
  imageUrl?: string;
}
