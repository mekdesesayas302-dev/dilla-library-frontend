import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, Library, Calendar, Clock, ArrowRight, CheckCircle, ArrowUp } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import "./global.css";
// Importing Images
import adminBuilding from "@/assets/dl1.jpg";
import campusLayout from "@/assets/dl2.jpg";
import graduationImage from "@/assets/graduation.jpg";
import dlImage from "@/assets/dl2.jpg";
import mainGate2 from "@/assets/grad1.jpg";
import mainGate from "@/assets/ebook1.png";
import digitalLibHero from "@/assets/digital-library.jpg";
import ebookImage from "@/assets/ebook.png";

const Index = () => {
  // 1. Image Array
  const rawImages = [
    mainGate,
    adminBuilding,
    dlImage,
    campusLayout,
    graduationImage,
    mainGate2,
    digitalLibHero
  ];

  // 2. Duplicate images for seamless loop
  const marqueeImages = [...rawImages, ...rawImages];

  // 3. Scroll to Top Logic
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [newsItems, setNewsItems] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ PRODUCTION API BASE
  const API_BASE = "https://dilla-library-backend.onrender.com";

  // ✅ HELPER: Fix Image URLs from DB
  const getImageUrl = (url) => {
    if (!url) return digitalLibHero;
    if (url.includes("localhost:5000")) return url.replace("http://localhost:5000", API_BASE);
    if (url.startsWith("/uploads")) return `${API_BASE}${url}`;
    return url;
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ✅ FIXED FETCH LOGIC
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [nRes, eRes] = await Promise.all([
          fetch(`${API_BASE}/api/news`),
          fetch(`${API_BASE}/api/events`)
        ]);
        
        const nData = await nRes.json();
        const eData = await eRes.json();

        // Ensure we always set an array even if the API fails or returns null
        setNewsItems(Array.isArray(nData) ? nData : []);
        setEvents(Array.isArray(eData) ? eData : []);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="flex flex-col min-h-screen font-sans bg-gray-50 text-slate-900">
      <Navbar />
      
      {/* CSS FOR MARQUEE ONLY */}
      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          animation: scroll 60s linear infinite;
        }
        .hero-section:hover .animate-scroll {
          animation-play-state: paused;
        }
        .clip-curve {
          clip-path: polygon(0 0, 100% 0, 85% 100%, 0% 100%);
        }
      `}</style>
      
      <main>
        {/* HERO SECTION */}
        <section className="relative min-h-[550px] flex items-center justify-center overflow-hidden hero-section bg-[#0f2918]">
          {/* Background Marquee */}
          <div className="absolute inset-0 z-0">
            <div className="flex h-full w-max animate-scroll">
              {marqueeImages.map((img, index) => (
                <div key={index} className="relative h-full w-[500px] md:w-[700px] flex-shrink-0 border-r border-[#1d4e2f]/20">
                  <img src={img} alt={`Dilla University Scenery ${index}`} className="w-full h-full object-cover" loading="eager" />
                </div>
              ))}
            </div>
          </div>
          
          <div className="absolute inset-0 z-10 bg-[#1d4e2f]/30 mix-blend-multiply" />
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#0f2918]/90 via-[#1d4e2f]/20 to-transparent" />

          {/* Hero Content */}
          <div className="container mx-auto px-4 relative z-30 py-12 flex flex-col items-center justify-center h-full">
            <div className="max-w-4xl mx-auto text-center animate-fade-in">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 bg-black/40 backdrop-blur-md rounded-full border border-yellow-500/50 shadow-lg">
                <Library className="w-4 h-4 text-yellow-400" />
                <span className="text-yellow-400 font-bold tracking-wide uppercase text-xs md:text-sm shadow-black drop-shadow-md">
                  Dilla University Library
                </span>
              </div>

              <h1 className="text-white mb-6 leading-tight drop-shadow-2xl">
                <span className="block text-4xl md:text-5xl font-bold tracking-tight mb-2 text-white drop-shadow-md">
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-white mb-8 max-w-2xl mx-auto font-medium leading-relaxed drop-shadow-lg bg-black/20 backdrop-blur-[2px] p-2 rounded-lg">
                "Empowering Knowledge, Enriching Minds, Advancing Excellence".
              </p>
              
              <div className="flex flex-wrap gap-4 justify-center">
                <Link to="/services">
                  <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-[#0f2918] font-bold border-none h-11 px-8 shadow-xl hover:shadow-2xl transition-all">
                    Browse services
                  </Button>
                </Link>
                <Link to="/e-library">
                  <Button variant="outline" size="lg" className="bg-black/30 text-white border-2 border-white/80 hover:bg-white hover:text-[#0f2918] font-bold h-11 px-8 backdrop-blur-md transition-all">
                    Digital Library
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

{/* ABOUT LIBRARY SECTION - CURVED STYLE */}
<section className="py-24 bg-gray-50 overflow-hidden">
  <div className="container mx-auto px-4">
    <div className="relative bg-white rounded-[40px] shadow-2xl overflow-hidden flex flex-col lg:flex-row items-stretch min-h-[500px]">
      
      {/* LEFT IMAGE */}
      <div className="relative w-full lg:w-1/2 min-h-[400px]">
        <img
          src={adminBuilding}
          alt="Library building"
          className="absolute inset-0 w-full h-full object-cover clip-curve z-10"
        />
        <div className="absolute inset-0 bg-[#1d4e2f]/10 clip-curve scale-105 z-0"></div>
      </div>

      {/* RIGHT CONTENT */}
      <div className="w-full lg:w-1/2 p-10 md:p-20 flex flex-col justify-center relative bg-white">
        
        {/* Pattern */}
        <div className="absolute top-0 right-0 w-full h-full opacity-[0.03] pointer-events-none z-0">
          <svg width="100%" height="100%">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1d4e2f" strokeWidth="2"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div className="relative z-10">
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#1d4e2f] mb-6 tracking-tight">
            About DU <br />
            <span className="text-yellow-600">Library</span>
          </h2>

                  <p className="text-gray-600 mb-6 text-lg leading-relaxed max-w-lg text-justify">
  <span className="font-bold text-[#1d4e2f]">
    Dilla University Library and Information Service
  </span>{" "}
  was established in 1996 (1987 E.C.) with limited resources. Since then, it has played a vital role in supporting teaching, learning, and research.

  Today, the library provides both traditional and digital services, including institutional repositories and modern research tools.
</p>

          
        </div>
      </div>
    </div>

    {/* AI ADVANCED CARDS */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-16">

  {/* VISION */}
  <div className="group relative p-[1px] rounded-3xl bg-gradient-to-r from-green-700 via-yellow-500 to-green-700 animate-border">
    
    <div className="relative bg-[#020617]/90 backdrop-blur-xl rounded-3xl p-8 h-full overflow-hidden">

      {/* AI Glow Orb */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-green-500/20 blur-3xl group-hover:scale-125 transition duration-500"></div>

      {/* AI Badge */}
      <div className="mb-5 inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold text-green-300 bg-green-900/40 rounded-full border border-green-500/30">
          ★ DU Library
      </div>

      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-yellow-400 transition">
        Vision
      </h3>

      <p className="text-gray-300 text-large leading-relaxed">
       To become a nationally competitive and internationally recognized library by 2030 (E.C.), contributing to being a university of innovation and connectivity.
	    
      </p>

      {/* Bottom line */}
      <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-yellow-400 group-hover:w-full transition-all duration-500"></div>
    </div>
  </div>


  {/* MISSION (FEATURED AI CARD) */}
  <div className="group relative p-[1px] rounded-3xl bg-gradient-to-r from-yellow-500 via-green-600 to-yellow-500 animate-border">
    
    <div className="relative bg-gradient-to-br from-[#1d4e2f] to-[#0f2918] rounded-3xl p-8 h-full overflow-hidden text-white shadow-2xl">

      {/* AI Pulse */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-green-500/10 to-yellow-500/10 transition"></div>

      {/* Floating glow */}
      <div className="absolute top-[-50px] left-1/2 -translate-x-1/2 w-56 h-56 bg-yellow-400/20 blur-[120px]"></div>

      {/* Badge */}
      <div className="mb-5 inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold text-yellow-300 bg-yellow-900/40 rounded-full border border-yellow-500/30">
        ★  DU Library
      </div>

      <h3 className="text-xl font-bold mb-3 group-hover:text-yellow-300 transition">
        Mission
      </h3>

      <p className="text-large text-green-100 leading-relaxed">
       To provide automated, organized, attractive, and comfortable library services centered on the university's mission through e-books, institutional repositories, and physical book collections.
      </p>

      {/* AI Pulse Line */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-yellow-400 to-transparent animate-pulse"></div>
    </div>
  </div>


  {/* OBJECTIVES */}
  <div className="group relative p-[1px] rounded-3xl bg-gradient-to-r from-green-700 via-yellow-500 to-green-700 animate-border">
    
    <div className="relative bg-[#020617]/90 backdrop-blur-xl rounded-3xl p-8 h-full overflow-hidden">

      {/* Glow orb */}
      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-yellow-500/20 blur-3xl group-hover:scale-125 transition duration-500"></div>

      {/* Badge */}
      <div className="mb-5 inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold text-yellow-300 bg-yellow-900/40 rounded-full border border-yellow-500/30">
          ★  DU Library
      </div>

      <h3 className="text-xl font-bold text-white mb-4 group-hover:text-yellow-400 transition">
        Objectives
      </h3>

      <ul className="text-gray-300 text-large space-y-3">
        <li className="flex items-center gap-3 group/item">
          <div className="w-2 h-2 bg-yellow-400 rounded-full group-hover/item:scale-150 transition"></div>
          Smart & fast information access.
        </li>
        <li className="flex items-center gap-3 group/item">
          <div className="w-2 h-2 bg-yellow-400 rounded-full group-hover/item:scale-150 transition"></div>
          Well-organized knowledge collections.
        </li>
        <li className="flex items-center gap-3 group/item">
          <div className="w-2 h-2 bg-yellow-400 rounded-full group-hover/item:scale-150 transition"></div>
          Adaptive academic resources.
        </li>
      </ul>

      {/* bottom animation */}
      <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-green-400 group-hover:w-full transition-all duration-500"></div>
    </div>
  </div>

</div>
  </div>
</section>

      {/* SERVICES SECTION */}
<section id="services" className="py-24 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
  <div className="container mx-auto px-4">
    <div className="flex flex-col lg:flex-row items-center gap-16">
      
      {/* LEFT CONTENT - 40% Width */}
      <div className="w-full lg:w-2/5 space-y-8 order-2 lg:order-1">
        <div>
          <h2 className="text-4xl font-extrabold text-[#1d4e2f] mb-4 tracking-tight">
            Our Library Services
          </h2>
          <div className="h-1.5 w-24 bg-yellow-500 rounded-full mb-8"></div>
          <p className="text-xl text-gray-600 leading-relaxed font-medium">
            The Dilla University Library provides comprehensive academic support
            through both physical and digital services.
          </p>
        </div>

        {/* GRID - Optimized for readability */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            "Loan Service", "Open Access Resources", "DU Library Catalog",
            "Ethiopian Journals Online", "Electronic Thesis (IR)",
            "Digital Library (E-Books)", "Online OPAC", "Research Support",
            "24/7 Reading Rooms", "High-Speed Internet Labs"
          ].map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:border-[#1d4e2f]/30 transition-colors"
            >
              <CheckCircle className="h-6 w-6 text-[#1d4e2f] flex-shrink-0" />
              <span className="text-sm font-semibold text-gray-700">{item}</span>
            </div>
          ))}
        </div>

        <div className="pt-6">
          <Link
            to="/services"
            className="inline-flex items-center gap-3 bg-[#1d4e2f] hover:bg-[#153a23] text-white font-bold px-10 py-4 rounded-xl shadow-lg transition-all transform hover:-translate-y-1"
          >
            Explore All Services
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>

      {/* RIGHT IMAGE - 60% Width & High Visibility */}
      <div className="w-full lg:w-3/5 order-1 lg:order-2">
        <div className="relative group">
          {/* Decorative background glow */}
          <div className="absolute -inset-10 bg-[#1d4e2f]/10 rounded-full blur-[80px] group-hover:bg-[#1d4e2f]/20 transition-all duration-700"></div>
          
          {/* Main Image Container */}
          <div className="relative z-10 p-2 bg-white/50 backdrop-blur-sm border border-white/20 rounded-[2rem] shadow-2xl overflow-hidden">
            <img
              src={ebookImage}
              alt="Dilla University Library Services"
              className="w-full h-auto object-cover rounded-[1.8rem] transition-transform duration-500 group-hover:scale-[1.03]"
              style={{
                /* Manual Sharpening & Vibrancy Filter */
                filter: 'contrast(1.08) saturate(1.15) brightness(1.02) drop-shadow(0 20px 30px rgba(0,0,0,0.1))',
              }}
            />
            
            {/* Glossy Overlay effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#1d4e2f]/10 via-transparent to-white/20 pointer-events-none"></div>
          </div>
          
          {/* Floating Badge (Optional decorative element) */}
          <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl z-20 hidden md:flex items-center gap-3 border border-gray-100 animate-bounce-slow">
            <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center text-white">
              <CheckCircle className="w-7 h-7" />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Verified</p>
              <p className="text-sm font-bold text-[#1d4e2f]">Academic Excellence</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</section>

      {/* NEWS & EVENTS SECTION - FIXED SECTION */}
<section className="py-20 bg-gradient-to-b from-green-50 to-white">
  <div className="container mx-auto px-4">

    {/* HEADER */}
    <div className="mb-14 text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-[#1d4e2f]">
        Library News & Events
      </h2>
      <p className="text-gray-500 mt-3">
        Latest announcements, trainings, and academic activities.
      </p>
    </div>

    {/* LOADING */}
    {loading ? (
      <div className="flex justify-center items-center min-h-[200px]">
        <p className="text-gray-500 animate-pulse text-lg">
          Loading updates...
        </p>
      </div>
    ) : newsItems.length === 0 ? (
      <p className="text-center text-gray-500">
        No news available at the moment.
      </p>
    ) : (

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

        {newsItems.slice(0, 3).map((item) => {

          // ✅ SAFE DATE HANDLING
          const rawDate =
            item.date ||
            item.createdAt ||
            item.created_at ||
            item.published_at;

          const formattedDate = rawDate
            ? new Date(rawDate).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })
            : "No date";

          return (
            <div
              key={item.id}
              className="group flex flex-col h-full bg-white rounded-2xl border border-green-100 shadow-md hover:shadow-xl transition duration-300 hover:-translate-y-2 overflow-hidden"
            >

              {/* IMAGE */}
              <div className="bg-green-50 p-4 flex items-center justify-center">
                <img
                  src={getImageUrl(item.image)}
                  alt={item.title}
                  className="w-full max-h-52 object-contain rounded-lg transition duration-300 group-hover:scale-105"
                />
              </div>

              {/* CONTENT */}
              <div className="flex flex-col flex-grow p-5">

                {/* DATE */}
                <span className="text-xs text-gray-400 mb-2">
                  {formattedDate}
                </span>

                {/* TITLE */}
                <h3 className="font-bold text-lg mb-2 text-[#1d4e2f] line-clamp-2 group-hover:text-green-800 transition">
                  {item.title}
                </h3>

                {/* DESCRIPTION */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">
                  {item.excerpt || item.content || "No description available."}
                </p>

                {/* FOOTER */}
                <div className="mt-auto flex items-center justify-between">

                  {/* TYPE BADGE */}
                  <span className="text-xs bg-green-100 text-[#1d4e2f] px-2 py-1 rounded">
                    Library Update
                  </span>

                  {/* BUTTON */}
                  <Link to={`/news/${item.id}`}>
                    <button className="text-sm font-semibold text-[#1d4e2f] hover:text-yellow-600 transition">
                      Read More →
                    </button>
                  </Link>

                </div>

              </div>

              {/* HOVER LINE */}
              <div className="h-[3px] w-0 bg-yellow-500 group-hover:w-full transition-all duration-500"></div>

            </div>
          );
        })}

      </div>
    )}

    {/* VIEW ALL */}
    <div className="mt-12 text-center">
      <Link to="/news">
        <button className="bg-[#1d4e2f] hover:bg-[#163d26] text-white px-8 py-3 rounded-lg shadow-md transition">
          View All News
        </button>
      </Link>
    </div>

  </div>
</section>

      </main>

      {/* --- SCROLL TO TOP BUTTON --- */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 p-3 rounded-full bg-yellow-500 text-[#0f2918] shadow-2xl hover:bg-yellow-600 transition-all duration-300 hover:-translate-y-1 group"
          aria-label="Back to Top"
        >
          <ArrowUp className="h-6 w-6 group-hover:animate-bounce" />
        </button>
      )}

      <Footer />
    </div>
  );
};

export default Index;
