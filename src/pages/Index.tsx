
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import HeroCarousel from "@/components/HeroCarousel";
import FeaturedDestinations from "@/components/FeaturedDestinations";
import AuthModal from "@/components/auth/AuthModal";

const Index = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");

  const openAuthModal = (mode: "login" | "signup") => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  const handleExploreClick = () => {
    // For now just toast a message
    toast({
      title: "Coming soon!",
      description: "Explore feature is under development.",
    });
  };

  const navigateToJourneyWall = () => {
    navigate("/journey-wall");
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <HeroCarousel />
        </div>
        <div className="absolute inset-0 bg-black/30 z-0" />
        
        <div className="container mx-auto px-4 h-full flex flex-col justify-center relative z-10">
          <div className="max-w-xl">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Discover the world's hidden gems
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Join our community of travelers sharing authentic experiences and secret spots around the globe.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                onClick={() => openAuthModal("signup")}
                className="bg-primary hover:bg-primary/90 text-white px-8"
              >
                Sign Up <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => openAuthModal("login")}
                className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20"
              >
                Log In
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Destinations Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Featured Destinations</h2>
            <Button variant="ghost" onClick={handleExploreClick}>
              View all <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          <FeaturedDestinations />
        </div>
      </section>

      {/* Journey Wall Preview Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Explore the Journey Wall</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Discover travel stories, hidden gems, and connect with fellow explorers on our community feed.
          </p>
          <Button 
            size="lg" 
            onClick={navigateToJourneyWall}
            className="px-8"
          >
            Visit Journey Wall <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How JourneyX Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Discover",
                description: "Find unique travel spots shared by our global community of explorers."
              },
              {
                title: "Plan",
                description: "Create personalized itineraries with our AI-powered trip planner."
              },
              {
                title: "Experience",
                description: "Travel confidently with local insights and real-time updates."
              }
            ].map((step, index) => (
              <div key={index} className="bg-card rounded-xl p-8 shadow-md">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <span className="text-primary font-bold">{index + 1}</span>
                </div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to start your journey?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of travelers discovering hidden gems and sharing authentic experiences.
          </p>
          <Button 
            size="lg" 
            variant="secondary" 
            onClick={() => openAuthModal("signup")}
            className="px-8"
          >
            Join JourneyX Today
          </Button>
        </div>
      </section>

      {/* Auth Modal */}
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)}
        defaultMode={authMode}
      />
    </div>
  );
};

export default Index;
