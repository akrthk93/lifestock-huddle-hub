
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { SidebarProvider } from "@/components/ui/sidebar";

// Layouts
import MainLayout from "@/layouts/MainLayout";

// Pages
import Dashboard from "@/pages/Dashboard";
import Inventory from "@/pages/Inventory";
import Categories from "@/pages/Categories";
import ShoppingList from "@/pages/ShoppingList";
import Households from "@/pages/Households";
import Settings from "@/pages/Settings";
import NotFound from "@/pages/NotFound";
import HouseholdDetail from "@/pages/HouseholdDetail";
import History from "@/pages/History";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <SidebarProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<MainLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="inventory" element={<Inventory />} />
                <Route path="categories" element={<Categories />} />
                <Route path="shopping-list" element={<ShoppingList />} />
                <Route path="history" element={<History />} />
                <Route path="households" element={<Households />} />
                <Route path="households/:id" element={<HouseholdDetail />} />
                <Route path="settings" element={<Settings />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </SidebarProvider>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
