
export interface User {
  id: string;
  name: string;
  avatar: string;
}

export interface Comment {
  user: User;
  text: string;
  date: string;
}

export interface Post {
  id: string;
  user: User;
  imageUrl: string;
  caption: string;
  location: string;
  tags: string[];
  likes: number;
  liked: boolean;
  comments: Comment[];
  date: string;
}
