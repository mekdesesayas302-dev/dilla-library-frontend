import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Search, BookOpen, Library, Wifi, ArrowRight, Database, Bookmark, Clock 
} from "lucide-react";

// --- IMAGE IMPORTS ---
import adminBuilding from "@/assets/dl1.jpg";
import campusLayout from "@/assets/dl2.jpg";
import dlImage from "@/assets/dl2.jpg";
import graduationImage from "@/assets/graduation.jpg";
import mainGate2 from "@/assets/grad1.jpg";
import mainGate from "@/assets/grad1.jpg";
import digitalLibHero from "@/assets/digital-library.jpg";

// --- HERO CONFIG ---
const rawImages = [
  mainGate, adminBuilding, dlImage, campusLayout, graduationImage, mainGate2, digitalLibHero
];
const marqueeImages = [...rawImages, ...rawImages];

const Opac = () => {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-sans">
      <Navbar />

      <main className="flex-1">
        {/* ================= HERO (UPDATED: BRIGHT MARQUEE STYLE) ================= */}
        <section className="relative min-h-[480px] flex items-center justify-center overflow-hidden bg-[#0f2918]">
          <style>{`
            @keyframes scroll { 
              0% { transform: translateX(0); } 
              100% { transform: translateX(-50%); } 
            }
            .animate-scroll { 
              animation: scroll 65s linear infinite; 
            }
          `}</style>

          {/* Marquee Layer */}
          <div className="absolute inset-0 z-0">
            <div className="flex h-full w-max animate-scroll">
              {marqueeImages.map((img, index) => (
                <div key={index} className="h-full w-[600px] flex-shrink-0">
                  <img
                    src={img}
                    alt="Library Network"
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Vignette for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent z-10" />

          {/* Content Overlay */}
          <div className="relative z-20 text-center px-4 max-w-4xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/90 border border-yellow-600 rounded-full mb-6 shadow-xl">
              <Database className="w-4 h-4 text-yellow-700" />
              <span className="text-yellow-700 text-xs font-bold uppercase tracking-widest">
                Library Catalog System
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]">
              OPAC System
            </h1>

            <div className="max-w-2xl mx-auto bg-black/30 backdrop-blur-md p-5 rounded-3xl border border-white/10 shadow-2xl">
              <p className="text-white text-lg font-medium leading-relaxed">
                Seamlessly search books, academic theses, and research journals 
                available across the Dilla University Library network.
              </p>
            </div>
          </div>

          {/* Transition Curve to Content */}
          <div className="absolute bottom-0 left-0 w-full h-14 bg-slate-50 rounded-t-[50px] z-20" />
        </section>

        {/* MAIN CARD SECTION */}
        <section className="-mt-16 px-4 pb-16 relative z-30">
          <div className="max-w-5xl mx-auto bg-white rounded-[40px] shadow-2xl overflow-hidden grid md:grid-cols-2 border border-gray-100">
            
            {/* LEFT: INFO */}
            <div className="p-10 md:p-14">
              <div className="flex items-center gap-2 text-sm text-[#1d4e2f] font-black mb-4 uppercase tracking-tighter">
                <Wifi className="w-4 h-4 text-green-600" />
                Campus Network Service
              </div>

              <h2 className="text-3xl font-extrabold text-[#1d4e2f] mb-6 leading-tight">
                Online Public Access Catalog
              </h2>

              <p className="text-slate-600 mb-8 text-lg leading-relaxed">
                Our future OPAC system will allow students and staff to search and 
                locate physical materials available in our libraries with 
                real-time availability tracking.
              </p>

              {/* STATUS BOX */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6 mb-8 flex items-start gap-4">
                <div className="bg-yellow-400 p-2 rounded-lg shadow-sm">
                  <Clock className="text-[#1d4e2f] w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-yellow-900 font-bold text-sm uppercase mb-1">Status Update</h4>
                  <p className="text-sm text-yellow-800 font-medium">
                    The OPAC system is currently under technical development. 
                    We are working to bring our full physical collection online soon.
                  </p>
                </div>
              </div>

              {/* BUTTON (DISABLED) */}
              <Button 
                disabled
                className="w-full h-14 bg-gray-200 text-gray-500 font-bold text-lg rounded-2xl border-2 border-gray-300 transition-none"
              >
                System Integration in Progress
              </Button>
            </div>

            {/* RIGHT: FEATURES */}
            <div className="bg-slate-50 p-10 md:p-14 border-l border-gray-100 flex flex-col justify-center">
              <h3 className="font-extrabold text-xl mb-8 text-slate-800 border-b pb-4 border-slate-200">
                Core Capabilities
              </h3>

              <div className="grid gap-6">
                <Feature icon={Search} title="Advanced Search" desc="Filter by title, author, ISBN or subject." />
                <Feature icon={BookOpen} title="Real-time Status" desc="Instantly see if a book is on the shelf." />
                <Feature icon={Bookmark} title="Digital Reservations" desc="Hold items for pickup from your device." />
                <Feature icon={Library} title="Borrowing History" desc="Manage your personal library account." />
              </div>
            </div>
          </div>
        </section>

        {/* HOW TO USE */}
        <section className="py-24 bg-slate-100">
          <div className="max-w-5xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-black text-[#1d4e2f] mb-4">
                How it will Work
              </h2>
              <div className="w-20 h-1.5 bg-yellow-500 mx-auto rounded-full" />
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Step number="1" title="Network Login" desc="Access the system via the secure Dilla University Intranet." />
              <Step number="2" title="Keyword Search" desc="Use keywords to find specific titles or research materials." />
              <Step number="3" title="Locate on Shelf" desc="Use the generated Call Number to find the exact shelf location." />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

// --- SUB-COMPONENTS ---
const Feature = ({ icon: Icon, title, desc }) => (
  <div className="flex gap-4 group">
    <div className="bg-white p-3 rounded-xl shadow-sm border border-slate-200 group-hover:bg-[#1d4e2f] transition-colors duration-300">
      <Icon className="w-5 h-5 text-[#1d4e2f] group-hover:text-white transition-colors" />
    </div>
    <div>
      <h4 className="font-bold text-slate-800">{title}</h4>
      <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
    </div>
  </div>
);

const Step = ({ number, title, desc }) => (
  <Card className="border-none shadow-lg rounded-[32px] overflow-hidden hover:shadow-2xl transition-shadow duration-300">
    <CardContent className="p-10 text-center">
      <div className="bg-[#1d4e2f] text-white w-14 h-14 flex items-center justify-center rounded-2xl mx-auto mb-6 text-xl font-black shadow-lg shadow-green-900/20">
        {number}
      </div>
      <h4 className="font-extrabold text-[#1d4e2f] mb-3 text-lg">{title}</h4>
      <p className="text-gray-500 font-medium text-sm leading-relaxed">{desc}</p>
    </CardContent>
  </Card>
);

export default Opac;