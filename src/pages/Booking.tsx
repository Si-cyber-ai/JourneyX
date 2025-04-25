
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import SearchForm from "@/components/booking/SearchForm";
import FlightCard from "@/components/booking/FlightCard";
import HotelCard from "@/components/booking/HotelCard";
import { mockFlights, mockHotels } from "@/data/bookingData";

const Booking = () => {
  const [activeTab, setActiveTab] = useState<string>("flights");
  
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <header className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Book Your Journey</h1>
            <p className="text-muted-foreground">Find the best flights, hotels, and more for your next adventure</p>
          </header>
          
          <div className="mb-8">
            <SearchForm />
          </div>
          
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
