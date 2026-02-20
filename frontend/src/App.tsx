import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DataProvider } from "./context/DataContext";
import { Navigation } from "./components/Navigation";
import Index from "./pages/Index";
import Admin from "./pages/Admin";
import Gallery from "./pages/Gallery";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { ThemeProvider } from "@/components/theme-provider";
import { SmoothScroll } from "@/components/ui/SmoothScroll";

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <DataProvider>
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
          <SmoothScroll>
            <Toaster />
            <Sonner />
            <CustomCursor />
            <BrowserRouter>
              <ScrollProgress />
              <Navigation />
              <Routes>
                <Route path="/HeadOffice" element={<Admin />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/" element={<Index />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </SmoothScroll>
        </ThemeProvider>
      </DataProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
