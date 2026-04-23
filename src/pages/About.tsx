import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Users, Target, Award, History, Globe, TrendingUp, MonitorPlay, Library, ShieldCheck, Zap } from "lucide-react";

// Importing Images
import adminBuilding from "@/assets/dl1.jpg";
import campusLayout from "@/assets/dl2.jpg";
import dlImage from "@/assets/dl2.jpg";
import graduationImage from "@/assets/graduation.jpg";
import mainGate2 from "@/assets/grad1.jpg";
import mainGate from "@/assets/grad1.jpg";
import digitalLibHero from "@/assets/digital-library.jpg";
import libraryImage from "@/assets/library.jpg";

// --- HERO CONFIGURATION ---
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

const About = () => {
  return (
    <div className="flex flex-col min-h-screen relative bg-slate-50 font-sans">
      <Navbar />
      
      <main className="flex-1">
        
        {/* --- HERO SECTION: MARQUEE ANIMATION --- */}
        <section className="relative min-h-[450px] flex items-center justify-center overflow-hidden hero-section bg-[#0f2918]">
          <style>{`
            @keyframes scroll {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            .animate-marquee {
              animation: scroll 50s linear infinite;
            }
            .hero-section:hover .animate-marquee {
              animation-play-state: paused;
            }
          `}</style>

          {/* Marquee Images */}
          <div className="absolute inset-0 z-0">
            <div className="flex h-full w-max animate-marquee">
              {marqueeImages.map((img, index) => (
                <div key={index} className="relative h-full w-[600px] flex-shrink-0 border-r border-[#1d4e2f]/20">
                  <img 
                    src={img} 
                    alt={`DU Visual ${index}`} 
                    className="h-full w-full object-cover opacity-60"
                    loading="eager"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Hero Overlay Content */}
          <div className="relative z-10 text-center px-4">
            <h1 className="text-5xl md:text-7xl font-black text-white mb-4 drop-shadow-2xl">
              Our <span className="text-yellow-500">Legacy</span>
            </h1>
            <p className="text-xl text-gray-200 max-w-2xl mx-auto font-medium bg-black/20 backdrop-blur-sm p-4 rounded-lg">
              The heartbeat of Dilla University's academic excellence and research innovation.
            </p>
          </div>
        </section>

        {/* --- ABOUT US CONTENT SECTION --- */}
        <section className="py-20 relative overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 text-[#1d4e2f] rounded-full text-sm font-bold uppercase tracking-wider">
                    <History size={16} /> Since 1996
                  </div>
                  <h2 className="text-4xl font-black text-[#1d4e2f] leading-tight">
                    Nurturing Knowledge in the <span className="text-yellow-600">Green University</span>
                  </h2>
                  <div className="w-20 h-2 bg-yellow-500 rounded-full"></div>
                  
                  <div className="text-slate-600 space-y-4 text-lg leading-relaxed text-justify">
                    <p>
                      Established in 1996 (1987 E.C.), the **Dilla University Library and Information Service** has evolved from a modest collection into a powerhouse of academic resources. As an integral part of the "Green University," we serve as the primary gateway to knowledge for over 30,000 students and 1,500 distinguished faculty members.
                    </p>
                    <p>
                      Our mission transcends traditional book lending. We are a dynamic hub for 24/7 research support, student-centered learning, and global knowledge transfer. By integrating the cutting-edge **Koha Library Management System**, we have digitalized our vast repository, making information access seamless and instant.
                    </p>
                    <p>
                      From our Main Campus central library to specialized branches in Health Sciences, Technology, and Law, we provide a comfortable, technology-driven environment designed to inspire the next generation of African innovators and researchers.
                    </p>
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute -inset-4 bg-yellow-500/10 rounded-[2rem] rotate-3"></div>
                  <img 
                    src={adminBuilding} 
                    alt="Dilla University Library" 
                    className="relative rounded-[2rem] shadow-2xl border-4 border-white object-cover h-[500px] w-full"
                  />
                  {/* Stats Overlay */}
                  <div className="absolute -bottom-10 -left-10 bg-[#1d4e2f] p-8 rounded-2xl shadow-xl text-white hidden md:block">
                    <div className="flex gap-8">
                      <div className="text-center">
                        <p className="text-3xl font-bold text-yellow-500">24/7</p>
                        <p className="text-xs uppercase tracking-widest opacity-80">Access</p>
                      </div>
                      <div className="w-px h-10 bg-white/20"></div>
                      <div className="text-center">
                        <p className="text-3xl font-bold text-yellow-500">8+</p>
                        <p className="text-xs uppercase tracking-widest opacity-80">Branches</p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* --- LIBRARY DEPARTMENTS --- */}
        <section className="py-20 bg-slate-100/50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold mb-4 text-[#1d4e2f]">Our Specialized Departments</h2>
                <p className="text-slate-500 max-w-2xl mx-auto">Providing professional services through dedicated units to ensure every researcher finds what they need.</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="hover:shadow-xl transition-all duration-300 bg-white border-none group">
                  <CardHeader>
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#1d4e2f] transition-colors">
                      <Users className="h-6 w-6 text-[#1d4e2f] group-hover:text-white" />
                    </div>
                    <CardTitle className="text-xl font-bold">Circulation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 text-sm">
                      Efficient management of lending, returns, and membership for our vast academic community.
                    </p>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-xl transition-all duration-300 bg-white border-none group">
                  <CardHeader>
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#1d4e2f] transition-colors">
                      <Search className="h-6 w-6 text-[#1d4e2f] group-hover:text-white" />
                    </div>
                    <CardTitle className="text-xl font-bold">Reference</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 text-sm">
                      Expert guidance for Selective Dissemination of Information (SDI) and research assistance.
                    </p>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-xl transition-all duration-300 bg-white border-none group">
                  <CardHeader>
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#1d4e2f] transition-colors">
                      <Zap className="h-6 w-6 text-[#1d4e2f] group-hover:text-white" />
                    </div>
                    <CardTitle className="text-xl font-bold">Digital Services</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 text-sm">
                      Maintaining our E-Library, Institutional Repository, and high-speed ICT infrastructure.
                    </p>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-xl transition-all duration-300 bg-white border-none group">
                  <CardHeader>
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#1d4e2f] transition-colors">
                      <ShieldCheck className="h-6 w-6 text-[#1d4e2f] group-hover:text-white" />
                    </div>
                    <CardTitle className="text-xl font-bold">Archives</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 text-sm">
                      Preserving the unique historical and cultural heritage of Dilla University and the Gedeo zone.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* --- BRANCHES LIST --- */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-10 text-[#1d4e2f]">Our Specialized Branch Libraries</h2>
              <div className="flex flex-wrap justify-center gap-4">
                {["Health & Medical Science", "Engineering & Technology", "College of Law", "Social Science & Humanities", "Agriculture & Natural Resources", "College of Business & Economics", "Digital Library", "Postgraduate Library"].map((branch, i) => (
                  <span key={i} className="px-6 py-3 bg-slate-50 border border-slate-200 rounded-full text-[#1d4e2f] font-semibold text-sm hover:border-[#1d4e2f] transition-colors">
                    {branch}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
};

export default About;
