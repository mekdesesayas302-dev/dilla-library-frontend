import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MapPin, Users, Building2, Library, ArrowRight, Wifi } from "lucide-react";

/* ================= 1. LIVE API CONFIG ================= */
const API_BASE_URL = "https://dilla-library-backend.onrender.com";

const LibraryBranches = () => {
  const [campuses, setCampuses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  /* ================= 2. FETCH DATA (FIXED) ================= */
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Changed from localhost to the live Render URL
        const res = await axios.get(`${API_BASE_URL}/api/campuses-full`);
        setCampuses(res.data);
      } catch (err) {
        console.error("❌ Error fetching campus data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const stats = useMemo(() => {
    const totalLib = campuses.reduce((a, c) => a + (c.libraries?.length || 0), 0);
    const totalCap = campuses.reduce((a, c) => a + (c.libraries?.reduce((s: any, l: any) => s + l.capacity, 0) || 0), 0);
    return { totalLib, totalCap };
  }, [campuses]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1d4e2f]"></div>
          <div className="text-[#1d4e2f] font-bold animate-pulse">Loading Library Network...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative min-h-[400px] flex items-center justify-center overflow-hidden bg-[#0f2918]">
        <div className="relative z-20 text-center px-4 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/90 border border-yellow-600 rounded-full mb-6 shadow-lg">
            <Wifi className="w-3.5 h-3.5 text-yellow-700" />
            <span className="text-yellow-700 text-xs font-bold uppercase tracking-wider">Campus Locations</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 drop-shadow-md">
            Library Network
          </h1>
          <p className="text-white/80 max-w-xl mx-auto">
            Spanning across all Dilla University campuses to provide world-class academic support.
          </p>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="-mt-14 relative z-30 px-4 mb-16">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
          <StatCard icon={<Library />} value={stats.totalLib} label="Total Branches" />
          <StatCard icon={<Users />} value={stats.totalCap.toLocaleString()} label="Reading Capacity" />
          <StatCard icon={<MapPin />} value={campuses.length} label="Unique Campuses" />
        </div>
      </section>

      {/* CAMPUS GRID */}
      <section className="pb-24">
        <div className="max-w-6xl mx-auto px-4 space-y-20">
          {campuses.length === 0 ? (
            <div className="text-center text-gray-500 py-10">
              No campus records found.
            </div>
          ) : (
            campuses.map((campus, i) => (
              <div key={campus.id || i}>
                <div className="mb-8 flex items-start gap-4">
                  <div className="w-1.5 h-12 bg-[#1d4e2f] rounded-full"></div>
                  <div>
                    <h2 className="text-3xl font-bold text-[#1d4e2f]">{campus.name}</h2>
                    <p className="text-gray-500 mt-1 italic">{campus.description}</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {campus.libraries?.map((lib: any) => (
                    <div key={lib.id} className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all border border-gray-100 overflow-hidden">
                      <div className="flex justify-between items-center p-5 bg-gradient-to-r from-green-50 to-white">
                        <div className="p-3 bg-green-100 text-[#1d4e2f] rounded-xl group-hover:bg-[#1d4e2f] group-hover:text-white transition-colors">
                          <Building2 size={24} />
                        </div>
                        {lib.isMain && (
                          <span className="text-xs bg-yellow-400 px-3 py-1 rounded-full font-bold shadow-sm">
                            Main Branch
                          </span>
                        )}
                      </div>
                      <div className="p-6">
                        <h3 className="text-lg font-bold text-gray-800">{lib.name}</h3>
                        <p className="text-sm text-gray-500">{lib.type}</p>
                        <div className="flex justify-between items-center mt-6">
                          <div>
                            <p className="text-xs text-gray-400 font-semibold uppercase tracking-tight">Seating</p>
                            <p className="text-xl font-bold text-[#1d4e2f]">{lib.capacity.toLocaleString()}</p>
                          </div>
                          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 group-hover:bg-[#1d4e2f] group-hover:text-white transition-all duration-300">
                            <ArrowRight size={18} />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

const StatCard = ({ icon, value, label }: any) => (
  <div className="bg-white p-7 rounded-3xl shadow-xl text-center border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
    <div className="text-[#1d4e2f] flex justify-center mb-3">
      {React.cloneElement(icon, { size: 36 })}
    </div>
    <div className="text-4xl font-extrabold text-[#1d4e2f]">{value}</div>
    <div className="text-gray-500 font-semibold text-sm mt-1 uppercase tracking-wider">{label}</div>
  </div>
);

export default LibraryBranches;
