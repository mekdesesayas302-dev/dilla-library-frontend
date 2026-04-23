import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Mail, Phone, Building2, UserCheck } from "lucide-react";

import adminBuilding from "@/assets/dl1.jpg";
import campusLayout from "@/assets/dl2.jpg";
import graduationImage from "@/assets/graduation.jpg";
import mainGate from "@/assets/grad1.jpg";
import digitalLibHero from "@/assets/digital-library.jpg";

const heroImages = [
  mainGate,
  adminBuilding,
  campusLayout,
  graduationImage,
  digitalLibHero
];

const marqueeImages = [...heroImages, ...heroImages];

const StaffDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [staff, setStaff] = useState(null);
  const [allStaff, setAllStaff] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [s1, s2] = await Promise.all([
          fetch(`http://localhost:5000/api/staff/${id}`),
          fetch("http://localhost:5000/api/staff")
        ]);

        const single = await s1.json();
        const all = await s2.json();

        setStaff(single);
        setAllStaff(Array.isArray(all) ? all : []);
      } catch (e) {
        setStaff(null);
        setAllStaff([]);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id]);

  const normalize = (v) => (v || "").toLowerCase();
  const format = (t) => t || "No information available";

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-[#1d4e2f] bg-slate-50 font-medium">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#1d4e2f] border-t-transparent rounded-full animate-spin"></div>
          Loading professional staff profile...
        </div>
      </div>
    );
  }

  if (!staff) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500 bg-slate-50">
        Staff profile not found
      </div>
    );
  }

  /* ================= DIRECTOR (PROFESSIONAL LOGIC) ================= */
  const director =
    allStaff.find(s => normalize(s.role) === "director") ||
    allStaff.find(s => normalize(s.role).includes("director")) ||
    null;

  const team = allStaff.filter(s => s.id !== staff.id && s.id !== director?.id);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />

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

        {/* MARQUEE LAYER */}
        <div className="absolute inset-0 z-0">
          <div className="flex h-full w-max animate-scroll">
            {marqueeImages.map((img, index) => (
              <div key={index} className="h-full w-[600px] flex-shrink-0">
                <img
                  src={img}
                  alt="Staff Hero"
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* BOTTOM VIGNETTE */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent z-10" />

        {/* CONTENT */}
        <div className="relative z-20 text-center px-4 max-w-4xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/90 border border-yellow-600 rounded-full mb-6 shadow-xl">
            <UserCheck className="w-4 h-4 text-yellow-700" />
            <span className="text-yellow-700 text-xs font-bold uppercase tracking-widest">
              Professional Profile
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]">
            Dilla University Library
          </h1>

          <div className="max-w-2xl mx-auto bg-black/30 backdrop-blur-md p-5 rounded-3xl border border-white/10 shadow-2xl">
            <p className="text-white text-lg font-medium leading-relaxed">
              Academic Information Services & Leadership Structure. 
              Meet the professionals driving our academic mission.
            </p>
          </div>
        </div>
      </section>

      {/* ================= DIRECTOR (PREMIUM CARD) ================= */}
      {director && (
        <section className="max-w-6xl mx-auto px-4 -mt-16 relative z-30">
          <div className="bg-white shadow-2xl rounded-[40px] overflow-hidden grid md:grid-cols-2 border border-gray-100">
            {/* IMAGE SIDE */}
            <div className="bg-gradient-to-br from-[#1d4e2f] to-[#0f2918] p-8 flex items-center justify-center">
              <div className="bg-white/10 p-4 rounded-3xl backdrop-blur-sm border border-white/10 shadow-inner">
                <img
                  src={director.image || digitalLibHero}
                  className="h-[400px] object-contain rounded-2xl drop-shadow-2xl"
                  alt="director"
                />
              </div>
            </div>

            {/* INFO SIDE */}
            <div className="p-10 md:p-14 space-y-6">
              <span className="bg-yellow-500 text-[#1d4e2f] px-5 py-1.5 rounded-full text-xs font-black shadow-sm">
                EXECUTIVE DIRECTOR
              </span>

              <h2 className="text-4xl font-extrabold text-[#1d4e2f] tracking-tight">
                Dr. {director.name}
              </h2>

              <p className="text-yellow-600 font-bold text-lg">
                {director.position}
              </p>

              <div className="relative">
                <div className="absolute -left-4 top-0 bottom-0 w-1 bg-yellow-400 rounded-full" />
                <p className="text-gray-600 leading-relaxed italic text-lg pl-2">
                  "{format(director.bio)}"
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 pt-6 border-t border-gray-100">
                <div className="flex items-center gap-3 text-gray-600">
                  <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center">
                    <Mail size={18} className="text-[#1d4e2f]" />
                  </div>
                  <span className="text-sm font-medium">{director.email || "N/A"}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center">
                    <Phone size={18} className="text-[#1d4e2f]" />
                  </div>
                  <span className="text-sm font-medium">{director.phone || "N/A"}</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ================= STAFF PROFILE ================= */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <div className="grid md:grid-cols-3 gap-10">
          {/* IMAGE */}
          <div className="bg-white shadow-xl rounded-[32px] p-6 border border-gray-100 h-fit sticky top-24">
            <div className="bg-slate-50 rounded-2xl overflow-hidden shadow-inner">
               <img
                src={staff.image || digitalLibHero}
                className="w-full h-[380px] object-contain hover:scale-105 transition-transform duration-500"
                alt={staff.name}
              />
            </div>
          </div>

          {/* INFO */}
          <div className="md:col-span-2 bg-white shadow-xl rounded-[32px] p-10 border border-gray-100">
            <div className="mb-8">
              <h2 className="text-4xl font-extrabold text-[#1d4e2f]">
                {staff.name}
              </h2>
              <div className="flex items-center gap-2 mt-2 text-yellow-600 font-semibold">
                <Building2 size={18} />
                <span>{staff.position}</span>
              </div>
            </div>

            <div className="bg-green-50/50 p-6 rounded-2xl border border-green-100 mb-8">
              <h4 className="text-[#1d4e2f] font-bold mb-3 uppercase tracking-wider text-xs">Professional Bio</h4>
              <p className="text-gray-700 leading-relaxed text-lg">
                {format(staff.bio)}
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 pt-8 border-t border-gray-100">
              <div className="space-y-4">
                <div className="flex items-center gap-4 group">
                   <div className="w-11 h-11 bg-slate-100 rounded-xl flex items-center justify-center group-hover:bg-[#1d4e2f] transition-colors">
                     <Mail size={20} className="text-[#1d4e2f] group-hover:text-white" />
                   </div>
                   <div>
                     <p className="text-[10px] text-gray-400 font-bold uppercase">Email Address</p>
                     <p className="text-gray-700 font-medium">{staff.email || "N/A"}</p>
                   </div>
                </div>
                <div className="flex items-center gap-4 group">
                   <div className="w-11 h-11 bg-slate-100 rounded-xl flex items-center justify-center group-hover:bg-[#1d4e2f] transition-colors">
                     <Phone size={20} className="text-[#1d4e2f] group-hover:text-white" />
                   </div>
                   <div>
                     <p className="text-[10px] text-gray-400 font-bold uppercase">Phone Number</p>
                     <p className="text-gray-700 font-medium">{staff.phone || "N/A"}</p>
                   </div>
                </div>
              </div>

              <div className="bg-slate-50 p-6 rounded-2xl flex flex-col justify-center items-center text-center border border-dashed border-gray-200">
                <Building2 className="text-[#1d4e2f] mb-2" size={32} />
                <p className="text-xs text-gray-400 font-bold uppercase">Department</p>
                <p className="text-[#1d4e2f] font-extrabold">{staff.department || "Library Unit"}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= TEAM SECTION ================= */}
      {team.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 pb-32">
          <div className="flex items-center justify-between mb-10">
            <h3 className="text-2xl font-black text-[#1d4e2f] tracking-tight">
              Other Leadership & Academic Staff
            </h3>
            <div className="h-1 flex-1 mx-6 bg-slate-200 rounded-full hidden sm:block" />
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
            {team.map(member => (
              <div
                key={member.id}
                onClick={() => {
                  navigate(`/staff/${member.id}`);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="group bg-white rounded-3xl shadow-sm border border-gray-100 hover:shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden flex flex-col"
              >
                <div className="h-[260px] bg-slate-50 flex items-center justify-center overflow-hidden">
                  <img
                    src={member.image || digitalLibHero}
                    className="h-full w-full object-contain p-4 group-hover:scale-110 transition-transform duration-700"
                    alt={member.name}
                  />
                </div>

                <div className="p-6 bg-white border-t border-gray-50 flex-1">
                  <h4 className="font-extrabold text-[#1d4e2f] text-lg group-hover:text-green-700 transition-colors">
                    {member.name}
                  </h4>
                  <p className="text-sm font-semibold text-yellow-600 mt-1">
                    {member.position}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default StaffDetails;