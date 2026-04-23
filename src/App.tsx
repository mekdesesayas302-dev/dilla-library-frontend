import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

/* ================= PAGES ================= */
import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import ELibrary from "./pages/ELibrary";
import Catalog from "./pages/Catalog";
import News from "./pages/News";
import Contact from "./pages/Contact";
import Staff from "./pages/Staff";
import StaffDetails from "./pages/StaffDetails"; // ✅ FIX ADDED
import Policies from "./pages/Policies";
import Opac from "./pages/Opac";
import LibraryBranches from "./pages/LibraryBranches";
import NewsDetails from "./pages/NewsDetails";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />

      <BrowserRouter
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <Routes>

          {/* ================= MAIN ROUTES ================= */}
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/e-library" element={<ELibrary />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/news" element={<News />} />
          <Route path="/news/:id" element={<NewsDetails />} />
          <Route path="/contact" element={<Contact />} />

          {/* ================= STAFF ROUTES (FIXED) ================= */}
          <Route path="/staff" element={<Staff />} />
          <Route path="/staff/:id" element={<StaffDetails />} /> {/* ✅ IMPORTANT FIX */}

          {/* ================= OTHER ROUTES ================= */}
          <Route path="/policies" element={<Policies />} />
          <Route path="/opac" element={<Opac />} />
          <Route path="/branches" element={<LibraryBranches />} />

          {/* ================= 404 ================= */}
          <Route path="*" element={<NotFound />} />

        </Routes>
      </BrowserRouter>

    </TooltipProvider>
  </QueryClientProvider>
);

export default App;