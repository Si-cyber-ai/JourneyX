
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SpotCard from "@/components/spots/SpotCard";
import SpotSubmissionForm from "@/components/spots/SpotSubmissionForm";
import { mockSecretSpots } from "@/data/secretSpotsData";

const SecretSpots = () => {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="relative mb-12">
          <div className="h-72 overflow-hidden rounded-xl">
            <div className="w-full h-full bg-cover bg-center" 
              style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1469854523086-cc02fe5d8800)' }}
            ></div>
          </div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 flex items-center justify-center flex-col text-white p-6 bg-black/40"
          >
            <h1 className="text-4xl font-bold mb-3 text-center">Secret Spots</h1>
            <p className="text-lg mb-6 text-center max-w-2xl">
              Discover hidden gems and off-the-beaten-path locations shared by our community of explorers.
            </p>
          </motion.div>
        </div>
        
        {/* Content Tabs */}
        <Tabs defaultValue="browse" className="max-w-6xl mx-auto">
          <div className="flex justify-center mb-6">
            <TabsList>
              <TabsTrigger value="browse">Browse Secrets</TabsTrigger>
              <TabsTrigger value="submit">Submit Spot</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="browse" className="mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockSecretSpots.map(spot => (
                <SpotCard key={spot.id} spot={spot} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="submit">
            <SpotSubmissionForm />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SecretSpots;
