
import { useState } from 'react';
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SpotCard from "@/components/spots/SpotCard";
import SpotSubmissionForm from "@/components/spots/SpotSubmissionForm";
import { mockSecretSpots } from "@/data/secretSpotsData";
import { Lock } from "lucide-react";

const SecretSpots = () => {
  const [isExplorer, setIsExplorer] = useState(false);
  
  const handleUnlock = () => {
    setIsExplorer(true);
  };
  
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="relative mb-12">
          <div className="h-72 overflow-hidden rounded-xl">
            <div className={`w-full h-full bg-cover bg-center ${!isExplorer ? 'blur-sm' : ''}`} 
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
              Discover hidden gems and off-the-beaten-path locations shared by our exclusive community of explorers.
            </p>
            
            {!isExplorer && (
              <Button 
                size="lg" 
                variant="default" 
                className="flex items-center gap-2"
                onClick={handleUnlock}
              >
                <Lock className="h-4 w-4" />
                Unlock Secret Spots
              </Button>
            )}
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
                <SpotCard key={spot.id} spot={spot} isExplorer={isExplorer} />
              ))}
            </div>
            
            {!isExplorer && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mt-8 p-6 bg-muted/50 rounded-xl text-center"
              >
                <Lock className="h-8 w-8 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Explorer Access Required</h3>
                <p className="text-muted-foreground mb-4">
                  To view the full details of these secret spots, you need to become an Explorer.
                </p>
                <Button onClick={handleUnlock}>
                  Become an Explorer
                </Button>
              </motion.div>
            )}
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
