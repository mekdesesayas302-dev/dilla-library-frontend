import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  Library, 
  ArrowRight, 
  CheckCircle, 
  ArrowUp, 
  Star, 
  BookOpen, 
  Globe, 
  Zap 
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

// --- ASSET IMPORTS ---
import adminBuilding from "@/assets/dl1.jpg";
import campusLayout from "@/assets/dl2.jpg";
import graduationImage from "@/assets/graduation.jpg";
import dlImage from "@/assets/dl2.jpg";
import mainGate2 from "@/assets/grad1.jpg";
import mainGate from "@/assets/ebook1.png";
import digitalLibHero from "@/assets/digital-library.jpg";
import ebookImage from "@/assets/ebook.png";

const Index = () => {
  // --- STATE ---
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [newsItems, setNewsItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- CONFIGURATION ---
  const API_BASE = "https://dilla-library-backend.onrender.com";

  // Marquee Images Array
  const rawImages = [
    mainGate,
    adminBuilding,
    dlImage,
    campusLayout,
    graduationImage,
    mainGate2,
    digitalLibHero
  ];
  const marqueeImages = [...rawImages, ...rawImages];

  // --- LOGIC HELPERS ---
  
  // Intercepts URLs to fix localhost vs production paths
  const getImageUrl = (url) => {
    if (!url) return digitalLibHero;
    if (url.includes("localhost:5000")) {
      return url.replace("http://localhost:5000", API_BASE);
    }
    if (url.startsWith("/uploads")) {
      return `${API_BASE}${url}`;
    }
    return url;
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // --- EFFECTS ---

  // Scroll visibility for Top Button
  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // API Data Fetching
  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${API_BASE}/api/news`);
        if (!response.ok) throw new Error("Failed to sync news");
        const data = await response.json();
        setNewsItems(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Fetch Error:", err);
        setError("Could not load latest news.");
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  return (
    <div className="flex flex-col min-h-screen font-sans bg-white text-slate-900 overflow-x-hidden">
      <Navbar />
      
      {/* CUSTOM ANIMATION STYLES */}
      <style>{`
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .animate-marquee { animation: marquee 70s linear infinite; }
        .hero-section:hover .animate-marquee { animation-play-state: paused; }
        
        .clip-curve-left { clip-path: polygon(0 0, 100% 0, 85% 100%, 0% 100%); }
        @media (max-width: 1024px) { .clip-curve-left { clip-path: none; } }

        @keyframes pulse-slow { 0%, 100% { opacity: 0.3; } 50% { opacity: 0.6; } }
        .bg-pulse { animation: pulse-slow 4s ease-in-out infinite; }
        
        @keyframes border-rotate { 100% { transform: rotate(360deg); } }
        .animate-border-rotate { animation: border-rotate 8s linear infinite; }
      `}</style>

      <main>
        {/* --- SECTION 1: HERO MARQUEE --- */}
        <section className="relative h-[85vh] min-h-[600px] flex items-center justify-center overflow-hidden hero-section bg-[#0f2918]">
          <div className="absolute inset-0 z-0">
            <div className="flex h-full w-max animate-marquee">
              {marqueeImages.map((img, i) => (
                <div key={i} className="relative h-full w-[450px] md:w-[750px] flex-shrink-0 border-r border-white/5">
                  <img src={img} alt="Campus" className="w-full h-full object-cover opacity-40 brightness-75" />
                </div>
              ))}
            </div>
          </div>
          
          <div className="absolute inset-0 z-10 bg-gradient-to-b from-[#0f2918]/60 via-transparent to-[#0f2918]" />
          <div className="absolute inset-0 z-10 bg-black/20" />

          <div className="container mx-auto px-6 relative z-30 text-center">
            <div className="inline-flex items-center gap-2 px-5 py-2 mb-8 bg-white/10 backdrop-blur-xl rounded-full border border-yellow-500/30 shadow-2xl">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              <span className="text-yellow-400 font-black tracking-widest uppercase text-xs">Academic Excellence Center</span>
            </div>
            
            <h1 className="text-white text-5xl md:text-8xl font-black mb-6 tracking-tighter leading-none drop-shadow-2xl">
              DILLA <span className="text-yellow-500 underline decoration-white/20">LIBRARY</span>
            </h1>
            
            <p className="text-lg md:text-2xl text-gray-200 mb-12 max-w-3xl mx-auto font-medium leading-relaxed drop-shadow-lg">
              Empowering knowledge, enriching minds, and advancing research through 
              world-class digital and physical resource centers.
            </p>

            <div className="flex flex-col sm:flex-row gap-5 justify-center">
              <Link to="/services">
                <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-[#0f2918] font-black h-14 px-12 rounded-2xl shadow-[0_10px_30px_rgba(234,179,8,0.3)] transition-all hover:-translate-y-1">
                  Explore Services
                </Button>
              </Link>
              <Link to="/e-library">
                <Button variant="outline" size="lg" className="bg-white/5 backdrop-blur-md text-white border-white/40 hover:bg-white hover:text-black font-black h-14 px-12 rounded-2xl transition-all">
                  Digital Portal
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* --- SECTION 2: THE ABOUT ARC --- */}
        <section className="py-32 bg-white relative overflow-hidden">
          <div className="container mx-auto px-6">
            <div className="flex flex-col lg:flex-row items-stretch bg-slate-50 rounded-[60px] shadow-2xl border border-slate-100 overflow-hidden">
              <div className="lg:w-1/2 relative min-h-[500px]">
                <img src={adminBuilding} alt="Building" className="absolute inset-0 w-full h-full object-cover clip-curve-left z-10" />
                <div className="absolute top-10 left-10 z-20 bg-white/90 backdrop-blur-md p-6 rounded-3xl shadow-xl">
                  <p className="text-4xl font-black text-[#1d4e2f]">1996</p>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Year Established</p>
                </div>
              </div>

              <div className="lg:w-1/2 p-12 md:p-24 flex flex-col justify-center">
                <h2 className="text-4xl md:text-6xl font-black text-[#1d4e2f] mb-8 leading-tight">
                  Innovation in <br/>
                  <span className="text-yellow-600">Every Page.</span>
                </h2>
                <p className="text-gray-600 text-xl leading-relaxed mb-10 text-justify">
                  The <span className="font-bold text-[#1d4e2f]">Dilla University Library</span> serves as the intellectual heart 
                  of our campus. From physical archives to massive digital repositories, we provide 
                  the tools necessary for academic breakthroughs.
                </p>
                <div className="grid grid-cols-2 gap-6">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="text-green-600" size={24} />
                    <span className="font-bold text-gray-700">Open Access</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="text-green-600" size={24} />
                    <span className="font-bold text-gray-700">24/7 Labs</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- SECTION 3: VISION/MISSION (NEOMORPHIC) --- */}
        <section className="py-24 bg-gray-50">
          <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Vision */}
            <div className="relative group bg-[#020617] rounded-[40px] p-10 overflow-hidden transition-all hover:shadow-[0_20px_60px_rgba(0,0,0,0.3)]">
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-green-500/10 blur-[80px]" />
              <Globe className="text-yellow-500 mb-6" size={40} />
              <h3 className="text-white text-2xl font-black mb-4">Our Vision</h3>
              <p className="text-gray-400 leading-relaxed text-lg">
                To become a nationally competitive and internationally recognized academic 
                hub for innovation by 2030.
              </p>
            </div>

            {/* Mission */}
            <div className="relative group bg-gradient-to-br from-[#1d4e2f] to-[#0a1e12] rounded-[40px] p-10 shadow-2xl scale-105 z-10">
              <Zap className="text-yellow-400 mb-6" size={40} />
              <h3 className="text-white text-2xl font-black mb-4">Our Mission</h3>
              <p className="text-green-50/80 leading-relaxed text-lg">
                Delivering automated, organized, and comfortable services that simplify 
                research and promote lifelong learning.
              </p>
            </div>

            {/* Goals */}
            <div className="relative group bg-[#020617] rounded-[40px] p-10 overflow-hidden">
              <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-yellow-500/10 blur-[80px]" />
              <BookOpen className="text-yellow-500 mb-6" size={40} />
              <h3 className="text-white text-2xl font-black mb-4">Our Goals</h3>
              <ul className="text-gray-400 space-y-3">
                <li className="flex items-center gap-2">• Smart Data Access</li>
                <li className="flex items-center gap-2">• Faculty Partnerships</li>
                <li className="flex items-center gap-2">• Digital Archiving</li>
              </ul>
            </div>
          </div>
        </section>

        {/* --- SECTION 4: SERVICES PREVIEW --- */}
        <section className="py-32 bg-white">
          <div className="container mx-auto px-6">
            <div className="flex flex-col lg:flex-row items-center gap-20">
              <div className="lg:w-1/2">
                <div className="relative">
                  <div className="absolute -inset-4 bg-yellow-500/20 rounded-[50px] blur-2xl animate-pulse" />
                  <img src={ebookImage} alt="Digital Library" className="relative z-10 rounded-[50px] shadow-2xl border-4 border-white" />
                </div>
              </div>
              
              <div className="lg:w-1/2 space-y-8">
                <h2 className="text-5xl font-black text-[#1d4e2f] tracking-tight">Academic Tools & <br/>Research Support</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    "Loan Services", "Journal Portal", "Thesis Repo", 
                    "OPAC System", "IT Labs", "Reading Rooms"
                  ].map((s) => (
                    <div key={s} className="flex items-center gap-4 p-5 bg-slate-50 rounded-2xl border border-slate-100 hover:border-green-200 transition-colors">
                      <div className="p-2 bg-green-100 rounded-lg text-green-700">
                        <CheckCircle size={20} />
                      </div>
                      <span className="font-bold text-gray-700">{s}</span>
                    </div>
                  ))}
                </div>
                <Link to="/services" className="inline-block">
                  <Button className="bg-[#1d4e2f] text-white px-10 py-7 rounded-2xl font-black text-lg flex items-center gap-3">
                    Explore All Services <ArrowRight />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* --- SECTION 5: DYNAMIC NEWS & EVENTS --- */}
        <section className="py-32 bg-slate-50 relative">
          <div className="container mx-auto px-6">
            <div className="flex justify-between items-end mb-16">
              <div>
                <h2 className="text-4xl md:text-5xl font-black text-[#1d4e2f]">Latest Updates</h2>
                <p className="text-gray-500 mt-2 font-medium">What's happening in the library world.</p>
              </div>
              <Link to="/news" className="hidden md:block">
                <Button variant="ghost" className="font-black text-[#1d4e2f] hover:text-yellow-600 underline">
                  View All News
                </Button>
              </Link>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-96 bg-gray-200 rounded-[32px] animate-pulse" />
                ))}
              </div>
            ) : error ? (
              <div className="text-center py-20 bg-white rounded-3xl shadow-sm border">
                <p className="text-red-500 font-bold">{error}</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {newsItems.slice(0, 3).map((item) => (
                  <div key={item.id} className="group bg-white rounded-[40px] overflow-hidden shadow-lg border border-slate-100 hover:shadow-2xl transition-all duration-500 hover:-translate-y-3">
                    <div className="h-64 overflow-hidden relative">
                      <img src={getImageUrl(item.image)} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={item.title} />
                      <div className="absolute top-6 left-6 bg-yellow-500 text-black px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest shadow-xl">
                        News
                      </div>
                    </div>
                    <div className="p-10">
                      <p className="text-sm font-bold text-gray-400 mb-3">
                        {new Date(item.date || item.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </p>
                      <h3 className="text-2xl font-black text-[#1d4e2f] mb-4 leading-tight group-hover:text-green-700">
                        {item.title}
                      </h3>
                      <Link to={`/news/${item.id}`} className="inline-flex items-center gap-2 text-[#1d4e2f] font-black text-sm uppercase tracking-tighter hover:gap-4 transition-all">
                        Read Full Story <ArrowRight size={18} />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      {/* --- FLOATING ELEMENTS --- */}
      {showScrollTop && (
        <button 
          onClick={scrollToTop} 
          className="fixed bottom-10 right-10 z-[100] p-5 rounded-[20px] bg-yellow-500 text-black shadow-2xl hover:bg-yellow-400 transition-all hover:-translate-y-2 group"
        >
          <ArrowUp className="group-hover:animate-bounce" size={24} />
        </button>
      )}

      <Footer />
    </div>
  );
};

export default Index;
