
export interface NewsItem {
  id: string;
  title: string;
  source: string;
  date: string;
  summary: string;
  imageUrl: string;
  category: 'Adventure' | 'Alerts' | 'Tips' | 'Visa' | 'Events';
  url: string;
}
