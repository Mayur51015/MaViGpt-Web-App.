import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import BMICalculator from "./pages/BMICalculator";
import SymptomChecker from "./pages/SymptomChecker";
import DailyHealthTip from "./pages/DailyHealthTip";
import LocalFoods from "./pages/LocalFoods";
import NutritionEducation from "./pages/NutritionEducation";
import HomeRemedies from "./pages/HomeRemedies";
import DietPlanning from "./pages/DietPlanning";
import ExpertResources from "./pages/ExpertResources";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/bmi-calculator" element={<BMICalculator />} />
          <Route path="/symptom-checker" element={<SymptomChecker />} />
          <Route path="/daily-health-tip" element={<DailyHealthTip />} />
          <Route path="/local-foods" element={<LocalFoods />} />
          <Route path="/nutrition-education" element={<NutritionEducation />} />
          <Route path="/home-remedies" element={<HomeRemedies />} />
          <Route path="/diet-planning" element={<DietPlanning />} />
          <Route path="/expert-resources" element={<ExpertResources />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
