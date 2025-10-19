import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { PWAInstallPrompt } from "@/components/pwa/PWAInstallPrompt";
import { PWAUpdatePrompt } from "@/components/pwa/PWAUpdatePrompt";
import { BottomNavigation } from "@/components/mobile/BottomNavigation";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Test from "./pages/Test";
import BigFiveTest from "./pages/BigFiveTest";
import EnneagramTest from "./pages/EnneagramTest";
import About from "./pages/About";
import Journal from "./pages/Journal";
import Blog from "./pages/Blog";
import BlogArticle from "./pages/BlogArticle";
import Compatibility from "./pages/Compatibility";
import Premium from "./pages/Premium";
import MBTIGuide from "./pages/MBTIGuide";
import MBTIType from "./pages/MBTIType";
import PersonalityResultPage from "./pages/PersonalityResultPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <PWAInstallPrompt />
        <PWAUpdatePrompt />
        <BrowserRouter>
          <BottomNavigation />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/test/mbti" element={<Test />} />
            <Route path="/test/bigfive" element={<BigFiveTest />} />
            <Route path="/test/enneagram" element={<EnneagramTest />} />
            <Route path="/about" element={<About />} />
            <Route path="/journal" element={<Journal />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:articleId" element={<BlogArticle />} />
            <Route path="/compatibility/:type1/:type2" element={<Compatibility />} />
            <Route path="/premium" element={<Premium />} />
            <Route path="/mbti" element={<MBTIGuide />} />
            <Route path="/mbti/:type" element={<MBTIType />} />
            <Route path="/results/mbti/:type" element={<PersonalityResultPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
