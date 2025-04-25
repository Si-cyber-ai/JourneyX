
import { useState } from "react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface LocationSelectorProps {
  locations: string[];
  onLocationChange: (location: string) => void;
}

const LocationSelector = ({ locations, onLocationChange }: LocationSelectorProps) => {
  const [selectedLocation, setSelectedLocation] = useState(locations[0]);

  const handleLocationChange = (value: string) => {
    setSelectedLocation(value);
    onLocationChange(value);
  };

  return (
    <div className="w-full max-w-xs">
      <Select
        value={selectedLocation}
        onValueChange={handleLocationChange}
      >
        <SelectTrigger className="w-full bg-white/80 dark:bg-black/50 backdrop-blur-sm">
          <SelectValue placeholder="Select a location" />
        </SelectTrigger>
        <SelectContent>
          {locations.map((location) => (
            <SelectItem key={location} value={location}>
              {location}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default LocationSelector;
