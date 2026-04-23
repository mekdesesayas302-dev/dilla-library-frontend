import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Clock, Wifi } from "lucide-react";

/* IMAGES */
import adminBuilding from "@/assets/dl1.jpg";
import campusLayout from "@/assets/dl2.jpg";
import dlImage from "@/assets/dl2.jpg";
import graduationImage from "@/assets/graduation.jpg";
import mainGate from "@/assets/grad1.jpg";
import digitalLibHero from "@/assets/digital-library.jpg";

/* MARQUEE IMAGES (FIXED) */
const marqueeImages = [
  adminBuilding,
  dlImage,
  graduationImage,
  campusLayout,
  mainGate,
  digitalLibHero,
  adminBuilding,
  dlImage,
  graduationImage,
  campusLayout,
];

const Catalog = () => {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Navbar />

      <main className="flex-1">
        {/* ================= HERO (INFINITE MARQUEE) ================= */}
        <section className="relative min-h-[450px] flex items-center justify-center overflow-hidden bg-[#0f2918]">
          <style>{`
            @keyframes scroll {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            .animate-scroll {
              animation: scroll 60s linear infinite;
            }
          `}</style>

          {/* MARQUEE BACKGROUND */}
          <div className="absolute inset-0 z-0">
            <div className="flex h-full w-max animate-scroll">
              {marqueeImages.map((img, index) => (
                <div key={index} className="h-full w-[600px] flex-shrink-0">
                  <img
                    src={img}
                    alt={`Library Catalog ${index}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* DARK OVERLAY */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent z-10" />

          {/* HERO CONTENT */}
          <div className="relative z-20 text-center px-4 max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/90 border border-yellow-600 rounded-full mb-6 shadow-lg">
              <Wifi className="w-3.5 h-3.5 text-yellow-700" />
              <span className="text-yellow-700 text-xs font-bold uppercase tracking-widest">
                Search & Discover
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]">
              Library Catalog
            </h1>

            <div className="max-w-xl mx-auto bg-black/30 backdrop-blur-md p-4 rounded-2xl border border-white/10">
              <p className="text-white text-lg font-medium leading-relaxed">
                Explore our vast collection of physical and digital resources. 
                Our smart catalog system is on the way 🚀
              </p>
            </div>
          </div>
        </section>

        {/* ================= COMING SOON ================= */}
        <section className="py-20 px-4 -mt-10 relative z-30">
          <div className="max-w-3xl mx-auto">
            <Card className="text-center shadow-2xl border-none rounded-3xl bg-white/95 backdrop-blur-sm">
              <CardContent className="py-16">
                
                <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <BookOpen className="w-12 h-12 text-[#1d4e2f]" />
                </div>

                <h2 className="text-3xl font-bold mb-4 text-[#1d4e2f]">
                  Catalog System Coming Soon
                </h2>

                <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                  We are currently developing a modern Online Public Access Catalog (OPAC)
                  that will allow you to search, reserve, and access library materials 
                  from anywhere on campus.
                </p>

                <div className="flex items-center justify-center gap-2 text-yellow-600 font-bold mb-8 bg-yellow-50 w-fit mx-auto px-4 py-2 rounded-full border border-yellow-100">
                  <Clock className="w-5 h-5 animate-pulse" />
                  Development Phase
                </div>

                <Button
                  className="bg-[#1d4e2f] hover:bg-[#153a23] text-white px-10 h-14 rounded-xl text-lg font-semibold"
                  disabled
                >
                  🚧 Under Construction
                </Button>

              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Catalog;