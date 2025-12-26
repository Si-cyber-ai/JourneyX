
import { WeatherData } from "@/types/weather";

export const mockWeatherData: WeatherData[] = [
  {
    city: "Paris",
    country: "France",
    temperature: 22,
    condition: "Partly Cloudy",
    icon: "cloud-sun",
    windSpeed: 12,
    humidity: 65,
    feelsLike: 24,
    imageUrl: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=2000&q=80"
  },
  {
    city: "Tokyo",
    country: "Japan",
    temperature: 28,
    condition: "Sunny",
    icon: "sun",
    windSpeed: 8,
    humidity: 70,
    feelsLike: 30,
    imageUrl: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=2000&q=80"
  },
  {
    city: "New York",
    country: "USA",
    temperature: 18,
    condition: "Rainy",
    icon: "cloud-rain",
    windSpeed: 15,
    humidity: 80,
    feelsLike: 16,
    imageUrl: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=2000&q=80"
  },
  {
    city: "Sydney",
    country: "Australia",
    temperature: 26,
    condition: "Clear",
    icon: "sun",
    windSpeed: 10,
    humidity: 55,
    feelsLike: 27,
    imageUrl: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=2000&q=80"
  },
  {
    city: "Cairo",
    country: "Egypt",
    temperature: 35,
    condition: "Hot",
    icon: "sun",
    windSpeed: 14,
    humidity: 40,
    feelsLike: 38,
    imageUrl: "https://images.unsplash.com/photo-1572252009286-268acec5ca0a?auto=format&fit=crop&w=2000&q=80"
  }
];
