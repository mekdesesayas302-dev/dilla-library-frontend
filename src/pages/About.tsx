import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// FIXED: Added 'Search' to the imports to resolve "ReferenceError: Search is not defined"
import { BookOpen, Users, Target, Award, History, Globe, TrendingUp, MonitorPlay, Library, ShieldCheck, Zap, Search } from "lucide-react";

// Importing Images (Ensure these paths are correct in your project)
import adminBuilding from "@/assets/dl1.jpg";
import campusLayout from "@/assets/dl2.jpg";
import dlImage from "@/assets/dl2.jpg";
import graduationImage from "@/assets/graduation.jpg";
import mainGate2 from "@/assets/grad1.jpg";
import mainGate from "@/assets/grad1.jpg";
import digitalLibHero from "@/assets/digital-library.jpg";
import libraryImage from "@/assets/library.jpg";

const rawImages = [mainGate, adminBuilding, dlImage, campusLayout, graduationImage, mainGate2, digitalLibHero];
const marqueeImages = [...rawImages, ...rawImages];

const About = () => {
  return (
    <div className="flex flex-col min-h-screen relative bg-slate-50 font-sans">
      <Navbar />
      
      <main className="flex-1">
        {/* --- HERO SECTION --- */}
        <section className="relative min-h-[450px] flex items-center justify-center overflow-hidden hero-section bg-[#0f2918]">
          <style>{`
            @keyframes scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
            .animate-marquee { animation: scroll 50s linear infinite; }
            .hero-section:hover .animate-marquee { animation-play-state: paused; }
          `}</style>
          <div className="absolute inset-0 z-0">
            <div className="flex h-full w-max animate-marquee">
              {marqueeImages.map((img, index) => (
                <div key={index} className="relative h-full w-[600px] flex-shrink-0 border-r border-[#1d4e2f]/20">
                  <img src={img} alt={`Visual ${index}`} className="h-full w-full object-cover opacity-60" />
                </div>
              ))}
            </div>
          </div>
          <div className="relative z-10 text-center px-4">
            <h1 className="text-5xl md:text-7xl font-black text-white mb-4 drop-shadow-2xl">
              Our <span className="text-yellow-500">Legacy</span>
            </h1>
            <p className="text-xl text-gray-200 max-w-2xl mx-auto font-medium bg-black/20 backdrop-blur-sm p-4 rounded-lg">
              Empowering Knowledge, Enriching Minds, Advancing Excellence.
            </p>
          </div>
        </section>

        {/* --- OFFICIAL MISSION & VISION --- */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8">
            <div className="p-8 bg-green-50 rounded-2xl border-l-8 border-[#1d4e2f]">
              <h3 className="text-2xl font-bold text-[#1d4e2f] mb-4 flex items-center gap-2"><Target /> Our Vision</h3>
              <p className="text-slate-700 italic">
                "To contribute to the academic and scholarly excellence of the university by providing world-class information resources, facilities, and innovative services that will advance teaching, learning, and research." 
              </p>
            </div>
            <div className="p-8 bg-yellow-50 rounded-2xl border-l-8 border-yellow-500">
              <h3 className="text-2xl font-bold text-yellow-700 mb-4 flex items-center gap-2"><Zap /> Our Mission</h3>
              <p className="text-slate-700 italic">
                "To foster intellectual growth, academic success, and lifelong learning for the students and staff of the university."
              </p>
            </div>
          </div>
        </section>

        {/* --- ABOUT CONTENT --- */}
        <section className="py-20">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 text-[#1d4e2f] rounded-full text-sm font-bold uppercase">
                  <History size={16} /> Established 1996 (1987 E.C.)
                </div>
                <h2 className="text-4xl font-black text-[#1d4e2f]">The Gateway to Knowledge</h2>
                <div className="text-slate-600 space-y-4 text-lg leading-relaxed text-justify">
                  <p>
                    Established in 1996 (1987 E.C.), the **Dilla University Library and Information Service** began with limited resources and has since grown into a vital pillar supporting the university's academic mission. 
                  </p>
                  <p>
                    Operating under the Vice President for Academic Affairs, the library provides both traditional and technology-driven services, including digital library access and an institutional repository.
                  </p>
                </div>
              </div>
              <div className="relative">
                <img src={adminBuilding} className="rounded-[2rem] shadow-2xl border-4 border-white object-cover h-[400px] w-full" />
                <div className="absolute -bottom-6 -left-6 bg-[#1d4e2f] p-6 rounded-2xl text-white shadow-xl">
                  <p className="text-3xl font-bold text-yellow-500">24/7</p>
                  <p className="text-xs uppercase tracking-widest">Service Provided </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- BRANCHES SECTION --- */}
        <section className="py-20 bg-slate-100">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-10 text-[#1d4e2f]">Official Library Branches </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {[
                { name: "Engineering Library", loc: "Odaya'a Campus" },
                { name: "Natural Science Library", loc: "Old Campus" },
                { name: "Freshman Library", loc: "Old Campus" },
                { name: "Social Science Library", loc: "Odaya'a Campus" },
                { name: "Law Library", loc: "Odaya'a Campus" },
                { name: "Health Science Library", loc: "Referral Hospital Campus" },
                { name: "Business & Economics Library", loc: "Hasedela Campus" },
                { name: "Institute of Behavioral Library", loc: "Odaya'a Campus" }
              ].map((branch, i) => (
                <div key={i} className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                  <p className="font-bold text-[#1d4e2f]">{branch.name}</p>
                  <p className="text-xs text-slate-500">{branch.loc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
