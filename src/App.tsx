
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { BlogProvider } from "@/contexts/BlogContext";
import { useEffect } from "react";
import { startBackendAvailabilityCheck } from "@/utils/backendConfig";

// Pages
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CreatePost from "./pages/CreatePost";
import BlogDetail from "./pages/BlogDetail";
import NotFound from "./pages/NotFound";
import Settings from "./pages/Settings";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  // Start background check for Supabase availability
  useEffect(() => {
    const intervalId = startBackendAvailabilityCheck();
    return () => clearInterval(intervalId);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BlogProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/create-post" element={<CreatePost />} />
                <Route path="/blog/:id" element={<BlogDetail />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </BlogProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
