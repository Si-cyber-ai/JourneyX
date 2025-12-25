
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import JourneyWall from "./pages/JourneyWall";
import TravelAssistant from "./pages/TravelAssistant";
import SecretSpots from "./pages/SecretSpots";
import Booking from "./pages/Booking";
import BackToTop from "@/components/BackToTop";

const queryClient = new QueryClient();

const App = () => (
  <div style={{ backgroundColor: '#F4F7F9', minHeight: '100vh' }}>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/journey-wall" element={<JourneyWall />} />
            <Route path="/travel-assistant" element={<TravelAssistant />} />
            <Route path="/secret-spots" element={<SecretSpots />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <BackToTop />
          <Toaster />
          <Sonner />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </div>
);

export default App;
