import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  BookOpen,
  Database,
  ExternalLink,
  Search,
  Laptop,
  Server,
  Wifi,
  ChevronRight,
  Library,
  GraduationCap,
  Globe,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// --- IMAGES ---
import adminBuilding from "@/assets/dl1.jpg";
import campusLayout from "@/assets/dl2.jpg";
import dlImage from "@/assets/dl2.jpg";
import graduationImage from "@/assets/graduation.jpg";
import mainGate2 from "@/assets/grad1.jpg";
import mainGate from "@/assets/grad1.jpg";
import digitalLibHero from "@/assets/digital-library.jpg";

// --- LOGOS FROM ASSETS ---
import esheLogo from "@/assets/eshe-logo.png"; 
import ejedLogo from "@/assets/EJED.png";
import nadreLogo from "@/assets/nadre-logo.png"; // Added NADRE logo import

const images = [mainGate, adminBuilding, dlImage, campusLayout, graduationImage, mainGate2, digitalLibHero];
const marqueeImages = [...images, ...images];

const ELibrary = () => {
  /* ================= SEARCH LOGIC ================= */
  const [searchQuery, setSearchQuery] = useState("");
  const [showResults, setShowResults] = useState(false);

  const databases = [
    { name: "JSTOR", desc: "Academic journals & books", icon: BookOpen, link: "https://www.jstor.org" },
    { name: "ProQuest", desc: "Theses & dissertations", icon: Server, link: "https://www.proquest.com" },
    { name: "IEEE Xplore", desc: "Engineering & technology", icon: Laptop, link: "https://ieeexplore.ieee.org" },
    { name: "PubMed", desc: "Medical & life sciences", icon: Database, link: "https://pubmed.ncbi.nlm.nih.gov" },
    { name: "Digital Library", desc: "Internal campus books", icon: Library, link: "http://10.221.6.254:8080/digitals/" },
    { name: "Institutional Repository", desc: "DU Research & Thesis", icon: GraduationCap, link: "http://10.221.6.224:8080/ir/" },
    { name: "e-SHE", desc: "Empowering Ethiopian online education portal", icon: Globe, link: "https://courses.ethernet.edu.et/" }
  ];

  const filteredResults = databases.filter(db => 
    db.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    db.desc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-sans">
      <Navbar />

      <main className="flex-1">

        {/* ================= HERO ================= */}
        <section className="relative min-h-[500px] flex items-center justify-center overflow-hidden bg-[#0f2918]">
          <style>{`
            @keyframes scroll {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            .animate-scroll {
              animation: scroll 65s linear infinite;
            }
          `}</style>

          <div className="absolute inset-0 z-0">
            <div className="flex h-full w-max animate-scroll">
              {marqueeImages.map((img, index) => (
                <div key={index} className="h-full w-[600px] flex-shrink-0">
                  <img src={img} alt="Digital Resources" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent z-10" />

          <div className="relative z-20 text-center px-4 max-w-4xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/90 border border-yellow-600 rounded-full mb-6 shadow-xl">
              <Wifi className="w-4 h-4 text-yellow-700" />
              <span className="text-yellow-700 text-xs font-bold uppercase tracking-widest">
                24/7 Digital Access
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]">
              E-Library Services
            </h1>

            <div className="max-w-2xl mx-auto bg-black/30 backdrop-blur-md p-6 rounded-[32px] border border-white/10 shadow-2xl">
              <p className="text-white text-lg font-medium leading-relaxed">
                Connect to a world of knowledge. Access digital books, research papers, 
                high-impact journals, and national e-learning portals.
              </p>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-14 bg-slate-50 rounded-t-[50px] z-20" />
        </section>

        {/* ================= SEARCH SECTION ================= */}
        <section className="-mt-12 px-4 relative z-30">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white p-2 rounded-[28px] shadow-2xl flex gap-2 border border-gray-100">
              <div className="relative flex-1">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                <Input 
                  placeholder="Search e-books, journals, research databases..." 
                  className="h-14 pl-14 text-gray-900 border-none bg-transparent focus-visible:ring-0 text-lg"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowResults(e.target.value.length > 0);
                  }}
                />
              </div>
              <Button className="h-14 px-8 rounded-2xl bg-[#1d4e2f] hover:bg-[#153a23] text-white font-bold text-lg">
                Search
              </Button>
            </div>

            {showResults && (
              <div className="mt-3 bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden max-h-80 overflow-y-auto animate-in fade-in slide-in-from-top-4 duration-300">
                {filteredResults.length > 0 ? (
                  filteredResults.map((result, idx) => (
                    <a key={idx} href={result.link} target="_blank" className="flex items-center gap-5 p-5 hover:bg-slate-50 border-b border-slate-50 last:border-0 transition-colors group">
                      <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center group-hover:bg-[#1d4e2f]">
                        <result.icon className="w-5 h-5 text-[#1d4e2f] group-hover:text-white" />
                      </div>
                      <div>
                        <div className="font-bold text-slate-800 text-base">{result.name}</div>
                        <div className="text-sm text-slate-500">{result.desc}</div>
                      </div>
                      <ExternalLink className="ml-auto w-4 h-4 text-slate-300 group-hover:text-[#1d4e2f]" />
                    </a>
                  ))
                ) : (
                  <div className="p-8 text-slate-500 text-center font-medium">No databases found.</div>
                )}
              </div>
            )}
          </div>
        </section>

        {/* ================= CAMPUS LAN SERVICES ================= */}
        <section className="py-24">
          <div className="text-center mb-16 px-4">
            <h2 className="text-4xl font-black text-[#1d4e2f] tracking-tight mb-4">Campus Network Services</h2>
            <div className="flex items-center justify-center gap-2 text-slate-500 font-semibold uppercase text-xs tracking-widest">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Accessible only inside university (LAN)
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto px-4">
            <Card className="rounded-[40px] border-none shadow-xl hover:shadow-2xl transition-all duration-500 group overflow-hidden">
              <CardContent className="p-10">
                <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Library className="w-8 h-8 text-[#1d4e2f]" />
                </div>
                <h3 className="text-2xl font-black text-[#1d4e2f] mb-3">Digital Library</h3>
                <p className="text-slate-600 mb-8 text-lg leading-relaxed">Direct access to our locally hosted e-books and digitized faculty publications.</p>
                <a href="http://10.221.6.254:8080/digitals/" target="_blank" rel="noreferrer" className="block">
                  <Button className="w-full h-14 bg-[#1d4e2f] rounded-2xl font-bold text-lg">Open Digital Library <ExternalLink className="ml-2 w-5 h-5" /></Button>
                </a>
              </CardContent>
            </Card>

            <Card className="rounded-[40px] border-none shadow-xl hover:shadow-2xl transition-all duration-500 group overflow-hidden">
              <CardContent className="p-10">
                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <GraduationCap className="w-8 h-8 text-blue-800" />
                </div>
                <h3 className="text-2xl font-black text-blue-900 mb-3">Institutional Repository</h3>
                <p className="text-slate-600 mb-8 text-lg leading-relaxed">Browse historical theses and high-impact university research outputs.</p>
                <a href="http://10.221.6.224:8080/ir/" target="_blank" rel="noreferrer" className="block">
                  <Button className="w-full h-14 bg-blue-900 hover:bg-blue-950 rounded-2xl font-bold text-lg">Browse Research <ExternalLink className="ml-2 w-5 h-5" /></Button>
                </a>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* ================= NATIONAL & ONLINE EDUCATION ================= */}
        <section className="py-24 bg-slate-100/50">
          <div className="text-center mb-12 px-4">
             <h2 className="text-3xl font-black text-slate-800 tracking-tight">National Portals</h2>
          </div>
          <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-8">
            
            {/* E-SHE CARD */}
            <Card className="rounded-3xl border-none shadow-lg bg-white overflow-hidden">
              <CardHeader className="pb-2">
                <div className="h-10 mb-2">
                  <img src={esheLogo} alt="e-SHE Logo" className="h-full object-contain" />
                </div>
                <CardDescription className="text-orange-600 font-semibold uppercase text-xs tracking-widest">Online Education Portal</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-6 text-slate-600 leading-relaxed">
                  Empowering Ethiopian online education through shared digital resources and e-learning platforms.
                </p>
                <a href="https://courses.ethernet.edu.et/" target="_blank" rel="noreferrer">
                  <Button variant="outline" className="h-12 px-8 border-2 border-orange-600 text-orange-600 font-bold rounded-xl hover:bg-orange-600 hover:text-white transition-all">
                    Start Learning
                  </Button>
                </a>
              </CardContent>
            </Card>

            {/* NADRE LOGO CARD */}
            <Card className="rounded-3xl border-none shadow-lg bg-white overflow-hidden">
              <CardHeader className="pb-2">
                <div className="h-10 mb-2">
                  <img src={nadreLogo} alt="NADRE Logo" className="h-full object-contain" />
                </div>
                <CardDescription className="text-green-700 font-semibold uppercase text-xs tracking-widest">National Repository</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-6 text-slate-600 leading-relaxed">
                  Access aggregated research from various public universities across the FDRE.
                </p>
                <a href="http://ndl.ethernet.edu.et" target="_blank" rel="noreferrer">
                  <Button variant="outline" className="h-12 px-8 border-2 border-[#1d4e2f] text-[#1d4e2f] font-bold rounded-xl hover:bg-[#1d4e2f] hover:text-white transition-all">
                    Visit Portal
                  </Button>
                </a>
              </CardContent>
            </Card>

            {/* EJED LOGO CARD */}
            <Card className="rounded-3xl border-none shadow-lg bg-white overflow-hidden">
              <CardHeader className="pb-2">
                <div className="h-10 mb-2">
                  <img src={ejedLogo} alt="EJED Logo" className="h-full object-contain" />
                </div>
                <CardDescription className="text-blue-700 font-semibold uppercase text-xs tracking-widest">DU Journal</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-6 text-slate-600 leading-relaxed">
                  Dilla University's Journal of Environment and Development—showcasing local research.
                </p>
                <a href="https://journal.du.edu.et/index.php/ejed/about" target="_blank" rel="noreferrer">
                  <Button variant="outline" className="h-12 px-8 border-2 border-blue-900 text-blue-900 font-bold rounded-xl hover:bg-blue-900 hover:text-white transition-all">
                    Visit Site
                  </Button>
                </a>
              </CardContent>
            </Card>

          </div>
        </section>

        {/* ================= INTERNATIONAL DATABASES ================= */}
        <section className="py-24">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-3xl font-black text-slate-800 tracking-tight">Global Research Databases</h2>
              <div className="h-1 flex-1 mx-8 bg-slate-200 rounded-full hidden sm:block" />
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {databases.slice(0, 4).map((db, i) => {
                const Icon = db.icon;
                return (
                  <a key={i} href={db.link} target="_blank" rel="noopener noreferrer" className="group">
                    <Card className="h-full border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 rounded-[32px] overflow-hidden">
                      <CardContent className="p-8 text-center flex flex-col items-center justify-center h-full">
                        <div className="w-16 h-16 flex items-center justify-center rounded-2xl bg-slate-50 group-hover:bg-[#1d4e2f] transition-colors mb-6">
                          <Icon className="w-7 h-7 text-[#1d4e2f] group-hover:text-white transition-colors" />
                        </div>
                        <h3 className="font-extrabold text-xl text-slate-800 group-hover:text-[#1d4e2f] transition-colors">{db.name}</h3>
                        <p className="text-sm text-slate-500 mt-2 mb-6 font-medium leading-relaxed">{db.desc}</p>
                        <div className="flex items-center text-[#1d4e2f] text-sm font-bold uppercase tracking-widest">
                          Explore <ChevronRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </CardContent>
                    </Card>
                  </a>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ELibrary;