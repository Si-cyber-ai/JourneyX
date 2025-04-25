
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
    feelsLike: 24
  },
  {
    city: "Tokyo",
    country: "Japan",
    temperature: 28,
    condition: "Sunny",
    icon: "sun",
    windSpeed: 8,
    humidity: 70,
    feelsLike: 30
  },
  {
    city: "New York",
    country: "USA",
    temperature: 18,
    condition: "Rainy",
    icon: "cloud-rain",
    windSpeed: 15,
    humidity: 80,
    feelsLike: 16
  },
  {
    city: "Sydney",
    country: "Australia",
    temperature: 26,
    condition: "Clear",
    icon: "sun",
    windSpeed: 10,
    humidity: 55,
    feelsLike: 27
  },
  {
    city: "Cairo",
    country: "Egypt",
    temperature: 35,
    condition: "Hot",
    icon: "sun",
    windSpeed: 14,
    humidity: 40,
    feelsLike: 38
  }
];
