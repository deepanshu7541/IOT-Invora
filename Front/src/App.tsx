import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { CoolingSystemProvider } from "@/contexts/CoolingSystemContext";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Auth from "./pages/Auth";
import Index from "./pages/Index";
import Rooms from "./pages/Rooms";
import BloodBank from "./pages/BloodBank";
import OrganRoom from "./pages/OrganRoom";
import Hospitals from "./pages/Hospitals";
import Shop from "./pages/Shop";
import Checkout from "./pages/Checkout";
import CheckoutSuccess from "./pages/CheckoutSuccess";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CoolingSystemProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              <Route path="/auth" element={<Auth />} />
              <Route
                path="/*"
                element={
                  <ProtectedRoute>
                    <SidebarProvider>
                      <div className="flex min-h-screen w-full">
                        <AppSidebar />
                        <div className="flex flex-1 flex-col">
                          <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b border-border bg-background px-6">
                            <SidebarTrigger />
                            <div className="flex-1" />
                          </header>
                          <main className="flex-1 overflow-auto p-6">
                            <Routes>
                              <Route path="/" element={<Index />} />
                              <Route path="/rooms" element={<Rooms />} />
                              <Route path="/blood-bank" element={<BloodBank />} />
                              <Route path="/organ-room" element={<OrganRoom />} />
                              <Route path="/hospitals" element={<Hospitals />} />
                              <Route path="/shop" element={<Shop />} />
                              <Route path="/checkout" element={<Checkout />} />
                              <Route path="/checkout-success" element={<CheckoutSuccess />} />
                              <Route path="/profile" element={<Profile />} />
                              <Route path="*" element={<NotFound />} />
                            </Routes>
                          </main>
                        </div>
                      </div>
                    </SidebarProvider>
                  </ProtectedRoute>
                }
              />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </CoolingSystemProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
