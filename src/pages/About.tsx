import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Users, Target, Award, History, Globe, TrendingUp, MonitorPlay, Library } from "lucide-react";

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
            @keyframes scanline {
              0% { transform: translateY(-100%); }
              100% { transform: translateY(100%); }
            }
            .animate-marquee {
              animation: scroll 50s linear infinite;
            }
            .hero-section:hover .animate-marquee {
              animation-play-state: paused;
            }
            .scanline {
              background: linear-gradient(to bottom, transparent, rgba(34, 197, 94, 0.2), transparent);
              animation: scanline 6s linear infinite;
            }
            .tech-grid {
              background-image: linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
              background-size: 30px 30px;
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
                    className="h-full w-full object-cover opacity-100"
                    loading="eager"
                  />
                </div>
              ))}
            </div>
          </div>
</section>
          


        {/* --- LIBRARY DEPARTMENTS --- */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold mb-12 text-center text-[#1d4e2f]">Library Departments</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="hover:border-[#1d4e2f] transition-colors bg-slate-50 border border-slate-200">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-xl">
                      <Users className="h-6 w-6 text-[#1d4e2f]" />
                      Circulation Department
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600">
                      Manages lending and borrowing services, membership registration, and book reservations. Our friendly staff ensure smooth access to library materials.
                    </p>
                  </CardContent>
                </Card>

                <Card className="hover:border-[#1d4e2f] transition-colors bg-slate-50 border border-slate-200">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-xl">
                      <BookOpen className="h-6 w-6 text-[#1d4e2f]" />
                      Reference & Research
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600">
                      Provides research assistance, reference services, and information literacy instruction. Expert librarians help navigate complex research challenges.
                    </p>
                  </CardContent>
                </Card>

                <Card className="hover:border-[#1d4e2f] transition-colors bg-slate-50 border border-slate-200">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-xl">
                      <Target className="h-6 w-6 text-[#1d4e2f]" />
                      ICT & Digital Services
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600">
                      Manages our digital infrastructure, online resources, and technology support. Ensures seamless access to electronic resources and digital platforms.
                    </p>
                  </CardContent>
                </Card>

                <Card className="hover:border-[#1d4e2f] transition-colors bg-slate-50 border border-slate-200">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-xl">
                      <Award className="h-6 w-6 text-[#1d4e2f]" />
                      Special Collections & Archives
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600">
                      Preserves rare books, manuscripts, university archives, and historical materials. Provides access to unique research materials and institutional memory.
                    </p>
                  </CardContent>
                </Card>
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