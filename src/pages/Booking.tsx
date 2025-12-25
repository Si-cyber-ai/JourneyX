
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import SearchForm from "@/components/booking/SearchForm";
import FlightCard from "@/components/booking/FlightCard";
import HotelCard from "@/components/booking/HotelCard";
import JourneyCostComparison from "@/components/booking/JourneyCostComparison";
import { mockFlights, mockHotels } from "@/data/bookingData";

const Booking = () => {
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState<string>("flights");
  
  useEffect(() => {
    const destination = searchParams.get('destination');
    const lat = searchParams.get('lat');
    const lng = searchParams.get('lng');
    
    if (destination && lat && lng) {
      // Here you would typically fetch flights and hotels for this location
      console.log(`Searching for trips to ${destination} (${lat}, ${lng})`);
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <header className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Smart Booking</h1>
            <p className="text-muted-foreground">
              {searchParams.get('destination') 
                ? `Routes to ${searchParams.get('destination')}`
                : 'Compare options and book with confidence'}
            </p>
          </header>
          
          <div className="mb-8">
            <SearchForm initialDestination={searchParams.get('destination') || ''} />
          </div>
          
          {/* Journey Cost Intelligence */}
          {searchParams.get('destination') && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Compare Transport Options</h2>
              <JourneyCostComparison 
                from="Your Location"
                to={searchParams.get('destination') || 'Destination'}
                weatherCondition="moderate"
              />
            </div>
          )}
          
          <Tabs defaultValue="flights" className="max-w-4xl mx-auto" onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="flights">Flights</TabsTrigger>
              <TabsTrigger value="hotels">Hotels</TabsTrigger>
            </TabsList>
            
            <TabsContent value="flights" className="mt-6">
              <div className="grid grid-cols-1 gap-4">
                {mockFlights.map(flight => (
                  <FlightCard key={flight.id} flight={flight} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="hotels" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {mockHotels.map(hotel => (
                  <HotelCard key={hotel.id} hotel={hotel} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
};

export default Booking;
