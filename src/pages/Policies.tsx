import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FileText, Download, ShieldCheck, Wifi } from "lucide-react";

// --- PDF IMPORTS ---
import borrowingPolicy from "@/files/Borrowing_Policy_Stamped.pdf";
import digitalPolicy from "@/files/Digital_Policy_Stamped.pdf";
import libraryManual from "@/files/Library_Manual.pdf";

// --- IMAGE IMPORTS ---
import adminBuilding from "@/assets/dl1.jpg";
import campusLayout from "@/assets/dl2.jpg";
import dlImage from "@/assets/dl2.jpg";
import graduationImage from "@/assets/graduation.jpg";
import mainGate2 from "@/assets/grad1.jpg";
import mainGate from "@/assets/grad1.jpg";
import digitalLibHero from "@/assets/digital-library.jpg";

// --- HERO IMAGES ---
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

// --- POLICY LIST ---
const policyList = [
  {
    id: 1,
    title: "Borrowing & Circulation Policy",
    description: "Rules for borrowing books, loan duration, renewals, fines, and lost materials.",
    fileName: "Borrowing_Policy_Stamped.pdf",
    fileUrl: borrowingPolicy
  },
  {
    id: 2,
    title: "Digital Library & IT Policy",
    description: "Guidelines for accessing digital resources, internet usage, and e-library services.",
    fileName: "Digital_Policy_Stamped.pdf",
    fileUrl: digitalPolicy
  },
  {
    id: 3,
    title: "Library User Manual",
    description: "Complete guide for using library services, catalogs, and research tools.",
    fileName: "Library_Manual.pdf",
    fileUrl: libraryManual
  }
];

const Policies = () => {
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

          {/* Marquee Background */}
          <div className="absolute inset-0 z-0">
            <div className="flex h-full w-max animate-scroll">
              {marqueeImages.map((img, index) => (
                <div key={index} className="h-full w-[600px] flex-shrink-0">
                  <img
                    src={img}
                    alt="Library Campus"
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Subtle Bottom Vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent z-10" />

          {/* Content Overlay */}
          <div className="relative z-20 text-center px-4 max-w-4xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/90 border border-yellow-600 rounded-full mb-6 shadow-lg">
              <ShieldCheck className="w-4 h-4 text-yellow-700" />
              <span className="text-yellow-700 text-xs font-bold uppercase tracking-widest">
                Rules & Regulations
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]">
              Library Policies
            </h1>

            <div className="max-w-2xl mx-auto bg-black/30 backdrop-blur-md p-5 rounded-2xl border border-white/10 shadow-2xl">
              <p className="text-white text-lg font-medium leading-relaxed">
                Access official library policies and guidelines for using resources,
                services, and facilities at Dilla University.
              </p>
            </div>
          </div>

          {/* Transition Curve */}
          <div className="absolute bottom-0 left-0 w-full h-14 bg-slate-50 rounded-t-[50px] z-20" />
        </section>

        {/* ================= CONTENT ================= */}
        <div className="container mx-auto px-4 py-12 relative z-30">
          
          {/* Intro Card */}
          <div className="bg-white p-10 rounded-[32px] shadow-xl mb-12 text-center max-w-4xl mx-auto border border-gray-100">
            <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
               <FileText className="text-[#1d4e2f] w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-[#1d4e2f] mb-3">Official Documentation</h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Please download and review the following official documents. All
              users are expected to comply with these policies to ensure a 
              productive environment for everyone.
            </p>
          </div>

          {/* Policies Grid */}
          <div className="grid gap-8 max-w-4xl mx-auto">
            {policyList.map((policy) => (
              <div
                key={policy.id}
                className="group bg-white p-8 rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-100 flex flex-col md:flex-row justify-between gap-6 items-center"
              >
                {/* Left Info */}
                <div className="flex gap-6 items-start">
                  <div className="bg-[#1d4e2f] p-5 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <FileText className="text-white w-6 h-6" />
                  </div>

                  <div>
                    <h3 className="font-extrabold text-xl text-[#1d4e2f] mb-1">
                      {policy.title}
                    </h3>
                    <p className="text-gray-500 leading-relaxed max-w-md">
                      {policy.description}
                    </p>
                  </div>
                </div>

                {/* Download Button */}
                <a
                  href={policy.fileUrl}
                  download={policy.fileName}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full md:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-[#1d4e2f] hover:bg-green-800 text-white rounded-2xl font-bold transition-all shadow-lg active:scale-95"
                >
                  <Download className="w-5 h-5" />
                  Download PDF
                </a>
              </div>
            ))}
          </div>

          {/* Footer Note */}
          <div className="bg-yellow-50 border border-yellow-100 rounded-2xl p-6 text-center mt-16 max-w-2xl mx-auto">
            <p className="text-yellow-800 text-sm font-medium">
              <strong>Technical Note:</strong> If the files do not open directly in your browser, 
              please ensure you have a PDF reader installed or check your "Downloads" folder.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Policies;