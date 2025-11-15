import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import Highlights from "./pages/Highlights";
import TouristSpots from "./pages/TouristSpots";
import Restaurants from "./pages/Restaurants";
import Weather from "./pages/Weather";
import SecurityAlerts from "./pages/SecurityAlerts";
import TouristGallery from "./pages/TouristGallery";
import Slang from "./pages/Slang";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/highlights" element={<Highlights />} />
          <Route path="/tourist-spots" element={<TouristSpots />} />
          <Route path="/restaurants" element={<Restaurants />} />
          <Route path="/weather" element={<Weather />} />
          <Route path="/security-alerts" element={<SecurityAlerts />} />
          <Route path="/gallery" element={<TouristGallery />} />
          <Route path="/slang" element={<Slang />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
