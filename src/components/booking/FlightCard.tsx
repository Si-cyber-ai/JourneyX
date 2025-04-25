
import { motion } from "framer-motion";
import { Flight } from "@/types/booking";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plane } from "lucide-react";

interface FlightCardProps {
  flight: Flight;
}

const FlightCard = ({ flight }: FlightCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="w-full"
    >
      <Card className="overflow-hidden">
        <CardContent className="p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="h-12 w-12 rounded-full overflow-hidden mr-4 bg-muted">
                <img src={flight.logo} alt={flight.airline} className="h-full w-full object-cover" />
              </div>
              <div>
                <h3 className="font-bold">{flight.airline}</h3>
                {flight.direct ? (
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">Direct</span>
                ) : (
                  <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full">1+ Stops</span>
                )}
              </div>
            </div>
            <div>
              <span className="font-bold text-xl">${flight.price}</span>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div>
              <p className="text-sm text-muted-foreground">Departure</p>
              <p className="font-bold">{flight.departureTime}</p>
              <p className="text-sm">{flight.from}</p>
            </div>
            
            <div className="flex flex-col items-center justify-center">
              <div className="w-full border-t border-dashed border-muted-foreground relative">
                <Plane className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
              </div>
              <p className="text-xs text-muted-foreground mt-1">{flight.duration}</p>
            </div>
            
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Arrival</p>
              <p className="font-bold">{flight.arrivalTime}</p>
              <p className="text-sm">{flight.to}</p>
            </div>
          </div>
          
          <div className="mt-4 flex justify-end">
            <Button size="sm">Select</Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default FlightCard;
