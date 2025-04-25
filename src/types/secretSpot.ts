
export interface SecretSpot {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  type: 'Hike' | 'Waterfall' | 'Viewpoint' | 'Pub' | 'Beach' | 'Cave';
  difficulty: 'Easy' | 'Medium' | 'Expert';
  distance: string;
  accessible: boolean;
  location: {
    latitude: number;
    longitude: number;
    name: string;
  };
  createdBy: {
    id: string;
    name: string;
    avatar: string;
  };
}
