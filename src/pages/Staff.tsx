import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Mail, Phone, MapPin, Users, Sparkles } from "lucide-react";

/* ================= 1. LIVE API CONFIG ================= */
const API_BASE_URL = "https://dilla-library-backend.onrender.com";

/* IMAGES */
import adminBuilding from "@/assets/dl1.jpg";
import campusLayout from "@/assets/dl2.jpg";
import dlImage from "@/assets/dl2.jpg";
import graduationImage from "@/assets/graduation.jpg";
import mainGate2 from "@/assets/grad1.jpg";
import mainGate from "@/assets/grad1.jpg";
import digitalLibHero from "@/assets/digital-library.jpg";

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

const Staff = () => {
  const navigate = useNavigate();
  const [staffList, setStaffList] = useState([]);
  const [director, setDirector] = useState(null);
  const [loading, setLoading] = useState(true);

  /* ================= 2. FETCH DATA (FIXED) ================= */
  useEffect(() => {
    const fetchStaff = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE_URL}/api/staff`);
        
        if (!res.ok) throw new Error("Failed to fetch staff data");
        
        const data = await res.json();
        
        if (Array.isArray(data)) {
          setStaffList(data);
          // Logic to find the Director (Asnake or designated role)
          const dir = data.find(
            s => s.position?.toLowerCase().includes("director") || 
                 s.name?.toLowerCase().includes("asnake")
          ) || null;
          setDirector(dir);
        }
      } catch (err) {
        console.error("❌ Staff Fetch Error:", err.message);
        setStaffList([]);
      } finally {
        setLoading(false);
      }
    };

    fetchStaff();
  }, []);

  const normalStaff = staffList.filter(s => s.id !== director?.id);

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Navbar />

      {/* ================= HERO (MARQUEE) ================= */}
      <section className="relative min-h-[520px] flex items-center justify-center overflow-hidden bg-[#0f2918]">
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
            {marqueeImages.map((img, i) => (
              <div key={i} className="w-[600px] h-full flex-shrink-0">
                <img
                  src={img}
                  className="w-full h-full object-cover"
                  alt="Dilla University Campus"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10" />

        <div className="relative z-20 text-center px-4 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/90 border border-yellow-600 rounded-full mb-6 shadow-xl">
            <Users className="w-4 h-4 text-yellow-700" />
            <span className="text-yellow-700 text-xs font-black uppercase tracking-widest">
              Our Professional Team
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 drop-shadow-lg">
            Library Staff
          </h1>

          <div className="max-w-2xl mx-auto bg-black/30 backdrop-blur-md p-6 rounded-[32px] border border-white/10 shadow-2xl">
            <p className="text-white text-lg font-medium leading-relaxed">
              Meet the dedicated leadership and professional team committed to 
              transforming Dilla University's academic resources.
            </p>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-14 bg-[#0f2918] rounded-t-[50px] z-20 hidden lg:block" />
      </section>

      {/* ================= DIRECTOR SECTION ================= */}
      {!loading && director && (
        <section className="relative py-24 bg-gradient-to-br from-[#0f2918] via-[#1d4e2f] to-[#0b1f14] text-white">
          <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-14 items-center">
            <div className="flex justify-center">
              <div className="bg-white/5 p-4 rounded-[40px] shadow-2xl w-full max-w-md border border-white/10 relative group">
                <div className="absolute -top-4 -right-4 bg-yellow-500 p-3 rounded-2xl shadow-lg z-30">
                   <Sparkles className="text-[#1d4e2f] w-6 h-6" />
                </div>
                <img
                  src={director.image || digitalLibHero}
                  className="w-full h-[450px] object-cover rounded-[32px] transition-transform duration-500 group-hover:scale-105"
                  alt="Director"
                  onError={(e) => { e.target.src = digitalLibHero; }}
                />
              </div>
            </div>

            <div className="space-y-8">
              <div className="inline-block bg-yellow-500 text-[#1d4e2f] px-6 py-2 rounded-2xl text-sm font-black shadow-lg">
                EXECUTIVE DIRECTOR
              </div>

              <h2 className="text-5xl md:text-6xl font-black tracking-tight leading-tight">
                 {director.name}
              </h2>

              <p className="text-yellow-400 text-2xl font-bold italic tracking-wide">
                {director.position}
              </p>

              <p className="text-white/90 leading-relaxed text-xl border-l-8 border-yellow-500 pl-6 italic font-medium">
                "{director.bio || "Leading academic excellence and digital transformation at Dilla University Library."}"
              </p>

              <div className="grid sm:grid-cols-2 gap-6 pt-4">
                <div className="flex items-center gap-4 bg-white/10 p-5 rounded-2xl border border-white/5 hover:bg-white/20 transition-colors">
                  <Mail className="text-yellow-400" size={20} />
                  <span className="text-sm font-semibold truncate">{director.email || "director@du.edu.et"}</span>
                </div>
                <div className="flex items-center gap-4 bg-white/10 p-5 rounded-2xl border border-white/5 hover:bg-white/20 transition-colors">
                  <Phone className="text-yellow-400" size={20} />
                  <span className="text-sm font-semibold">{director.phone || "Contact via Office"}</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ================= STAFF GRID ================= */}
      <section className="py-28 bg-white relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-black text-[#1d4e2f] mb-6">
              Library Management Team
            </h2>
            <div className="w-24 h-2 bg-yellow-500 mx-auto rounded-full" />
          </div>

          {loading ? (
            <div className="text-center py-20">
               <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1d4e2f] mx-auto mb-4" />
               <p className="text-gray-500 font-bold">Connecting to Staff Records...</p>
            </div>
          ) : staffList.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-400">No staff records found.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
              {normalStaff.map(item => (
                <div
                  key={item.id}
                  onClick={() => navigate(`/staff/${item.id}`)}
                  className="bg-white rounded-[32px] shadow-sm border border-gray-100 hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 cursor-pointer overflow-hidden group"
                >
                  <div className="h-72 bg-slate-50 flex items-center justify-center overflow-hidden">
                    <img
                      src={item.image || digitalLibHero}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      alt={item.name}
                      onError={(e) => { e.target.src = digitalLibHero; }}
                    />
                  </div>

                  <div className="p-8">
                    <h3 className="font-black text-[#1d4e2f] text-xl group-hover:text-green-700 transition-colors mb-2">
                      {item.name}
                    </h3>
                    <p className="text-sm font-extrabold text-yellow-600 mb-5 uppercase tracking-wider">
                      {item.position}
                    </p>

                    <div className="flex items-center gap-3 text-xs text-gray-500 font-bold border-t border-gray-50 pt-5">
                      <div className="p-1.5 bg-green-50 rounded-lg">
                        <MapPin size={14} className="text-green-700" />
                      </div>
                      {item.department || "Library Unit"}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Staff;
