import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BookOpen,
  Users,
  GraduationCap,
  FileText,
  FileArchive,
  Book,
  ClipboardCheck,
  Monitor,
  Globe,
  Library,
  CheckCircle2,
  Sparkles
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
const heroImages = [
  mainGate,
  adminBuilding,
  dlImage,
  campusLayout,
  graduationImage,
  mainGate2,
  digitalLibHero
];

const marqueeImages = [...heroImages, ...heroImages];

// --- SERVICES DATA ---
const services = [
  {
    title: "Acquisition & Cataloging",
    icon: FileArchive,
    color: "green",
    desc: "We select, purchase, and organize library resources for easy access.",
    points: ["Select and purchase books", "Catalog and classify materials", "Maintain digital catalog system"]
  },
  {
    title: "Circulation Services",
    icon: ClipboardCheck,
    color: "yellow",
    desc: "Handles borrowing, returning, and user support at the front desk.",
    points: ["Book lending & returns", "User registration", "Help desk support"]
  },
  {
    title: "Classification",
    icon: Book,
    color: "green",
    desc: "Organizes resources using standard classification systems.",
    points: ["DDC classification system", "Shelf arrangement", "Easy book location"]
  },
  {
    title: "Binding & Preservation",
    icon: FileText,
    color: "yellow",
    desc: "Protects and repairs books and documents.",
    points: ["Book binding & repair", "Photocopy services", "Document preservation"]
  },
  {
    title: "Bookstore & Distribution",
    icon: BookOpen,
    color: "green",
    desc: "Manages storage and distribution of books.",
    points: ["Store and organize materials", "Distribute to campuses", "Inventory management"]
  },
  {
    title: "Reference Services",
    icon: Users,
    color: "yellow",
    desc: "Supports research and academic inquiries.",
    points: ["Research assistance", "Library orientation", "Reference materials support"]
  },
  {
    title: "Periodicals",
    icon: FileText,
    color: "green",
    desc: "Provides newspapers, journals, and magazines.",
    points: ["Academic journals", "Daily newspapers", "Current awareness services"]
  },
  {
    title: "ICT & Internet",
    icon: Monitor,
    color: "yellow",
    desc: "Offers digital and internet-based services.",
    points: ["Computer access", "Internet services", "Digital learning support"]
  },
  {
    title: "E-Library",
    icon: Globe,
    color: "green",
    desc: "Access to online books and research databases.",
    points: ["E-books & journals", "Online databases", "Remote access support"]
  },
  {
    title: "Administration",
    icon: GraduationCap,
    color: "yellow",
    desc: "Manages overall library operations and planning.",
    points: ["Staff supervision", "Strategic planning", "Reporting & coordination"]
  }
];

const Services = () => {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-sans">
      <Navbar />

      <main className="flex-1">
        {/* ================= HERO (UPDATED: BRIGHT MARQUEE STYLE) ================= */}
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

          {/* Marquee Background */}
          <div className="absolute inset-0 z-0">
            <div className="flex h-full w-max animate-scroll">
              {marqueeImages.map((img, index) => (
                <div key={index} className="h-full w-[600px] flex-shrink-0">
                  <img
                    src={img}
                    alt="Dilla University Library"
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Gradient for Contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent z-10" />

          {/* Glass-morphism Content Container */}
          <div className="relative z-20 text-center px-4 max-w-4xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/90 border border-yellow-600 rounded-full mb-6 shadow-xl">
              <Sparkles className="w-4 h-4 text-yellow-700" />
              <span className="text-yellow-700 text-xs font-extrabold uppercase tracking-widest">
                Comprehensive Support
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]">
              Library Services
            </h1>

            <div className="max-w-2xl mx-auto bg-black/30 backdrop-blur-md p-6 rounded-[32px] border border-white/10 shadow-2xl">
              <p className="text-white text-lg font-medium leading-relaxed">
                Reliable and modern academic services designed to empower your learning, 
                teaching, and research journey at Dilla University.
              </p>
            </div>
          </div>

          {/* Transition Curve to Content Area */}
          <div className="absolute bottom-0 left-0 w-full h-14 bg-slate-50 rounded-t-[50px] z-20" />
        </section>

        {/* ================= SERVICES GRID ================= */}
        <section className="py-20 relative z-30">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => {
                const Icon = service.icon;
                const topBorder =
                  service.color === "green"
                    ? "border-[#1d4e2f]"
                    : "border-yellow-500";

                return (
                  <Card
                    key={index}
                    className={`group border-none border-t-4 ${topBorder} shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 rounded-3xl overflow-hidden`}
                  >
                    <CardHeader className="pb-4">
                      <div className="flex items-center gap-5">
                        <div className="p-4 rounded-2xl bg-slate-50 group-hover:bg-[#1d4e2f] transition-colors duration-300 shadow-sm">
                          <Icon className="w-7 h-7 text-[#1d4e2f] group-hover:text-white transition-colors" />
                        </div>
                        <CardTitle className="text-xl font-extrabold text-[#1d4e2f]">
                          {service.title}
                        </CardTitle>
                      </div>
                    </CardHeader>

                    <CardContent>
                      <p className="text-slate-600 mb-6 font-medium leading-relaxed">
                        {service.desc}
                      </p>

                      <ul className="space-y-3">
                        {service.points.map((point, i) => (
                          <li key={i} className="flex items-start gap-3 text-sm text-slate-700 font-medium">
                            <div className="mt-1 flex-shrink-0 w-5 h-5 bg-green-50 rounded-full flex items-center justify-center">
                              <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
                            </div>
                            {point}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
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

export default Services;