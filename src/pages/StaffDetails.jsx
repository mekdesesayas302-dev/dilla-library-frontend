import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Mail, Phone, Building2 } from "lucide-react";

// Asset imports
import adminBuilding from "@/assets/dl1.jpg";
import campusLayout from "@/assets/dl2.jpg";
import graduationImage from "@/assets/graduation.jpg";
import mainGate from "@/assets/grad1.jpg";
import digitalLibHero from "@/assets/digital-library.jpg";

const heroImages = [mainGate, adminBuilding, campusLayout, graduationImage, digitalLibHero];
const marqueeImages = [...heroImages, ...heroImages];

const StaffDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [staff, setStaff] = useState(null);
  const [allStaff, setAllStaff] = useState([]);
  const [loading, setLoading] = useState(true);

  // Centralized API Configuration
  const API_BASE = "https://dilla-library-backend.onrender.com";

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [singleRes, allRes] = await Promise.all([
          fetch(`${API_BASE}/api/staff/${id}`),
          fetch(`${API_BASE}/api/staff`)
        ]);

        if (!singleRes.ok) throw new Error("Staff not found");

        const singleData = await singleRes.json();
        const allData = await allRes.json();

        setStaff(singleData);
        setAllStaff(Array.isArray(allData) ? allData : []);
      } catch (error) {
        console.error("Data Load Error:", error);
        setStaff(null);
      } finally {
        setLoading(false);
      }
    };

    loadData();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  // --- HELPERS ---
  const normalize = (val) => (val || "").toLowerCase();
  const formatInfo = (val) => (val && val !== "" ? val : "Information not provided");

  /**
   * getImageUrl
   * Handles Cloudinary URLs, local fallbacks, and automatic optimization.
   */
  const getImageUrl = (url, isThumbnail = false) => {
    if (!url || url === "" || url.includes("localhost")) {
      return digitalLibHero; // Fallback for missing or broken local links
    }

    // Optimization: If it's a Cloudinary URL, we can request a smaller size for thumbnails
    if (url.includes("res.cloudinary.com") && isThumbnail) {
      return url.replace("/upload/", "/upload/w_500,c_limit,q_auto,f_auto/");
    }

    return url;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#1d4e2f] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-[#1d4e2f] font-bold animate-pulse">Retrieving Staff Record...</p>
        </div>
      </div>
    );
  }

  if (!staff) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 px-4">
        <h2 className="text-3xl font-black text-gray-800 mb-4">Profile Not Found</h2>
        <p className="text-gray-500 mb-8 text-center">The staff member you are looking for does not exist or has been moved.</p>
        <button
          onClick={() => navigate("/staff")}
          className="bg-[#1d4e2f] text-white px-8 py-3 rounded-full font-bold hover:bg-green-900 transition-all shadow-lg"
        >
          Return to Staff Directory
        </button>
      </div>
    );
  }

  // LOGIC: Filter team members, excluding the current staff and the director
  const director = allStaff.find((s) => normalize(s.position).includes("director")) || null;
  const team = allStaff.filter(
    (s) => Number(s.id) !== Number(staff.id) && Number(s.id) !== Number(director?.id)
  );

  return (
    <div className="bg-white min-h-screen font-sans">
      <Navbar />

      {/* HERO MARQUEE */}
      <section className="relative h-[400px] flex items-center justify-center overflow-hidden bg-black">
        <style>{`
          @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
          .animate-marquee { animation: marquee 50s linear infinite; }
        `}</style>
        <div className="absolute inset-0 flex h-full w-[200%] animate-marquee">
          {marqueeImages.map((img, i) => (
            <img key={i} src={img} className="h-full w-[500px] object-cover opacity-40" alt="campus" />
          ))}
        </div>
        <div className="relative z-10 text-center">
          <h1 className="text-white text-5xl md:text-7xl font-black tracking-tighter drop-shadow-2xl">
            STAFF PROFILE
          </h1>
          <div className="h-1 w-24 bg-yellow-500 mx-auto mt-4 rounded-full" />
        </div>
      </section>

      {/* MAIN PROFILE CARD */}
      <main className="max-w-6xl mx-auto px-4 -mt-20 relative z-20 pb-20">
        <div className="bg-white shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-[40px] overflow-hidden border border-gray-100">
          <div className="grid md:grid-cols-12">
            
            {/* LEFT: PHOTO */}
            <div className="md:col-span-5 bg-slate-50 p-8 flex items-center justify-center">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 to-green-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                <img
                  src={getImageUrl(staff.image)}
                  alt={staff.name}
                  onError={(e) => { e.target.src = digitalLibHero; }} // Prevents broken icons
                  className="relative h-[450px] w-full object-contain rounded-2xl bg-white p-2 shadow-xl"
                />
              </div>
            </div>

            {/* RIGHT: DETAILS */}
            <div className="md:col-span-7 p-8 md:p-16 flex flex-col justify-center">
              <div className="mb-8">
                <span className="text-yellow-600 font-black text-xs uppercase tracking-widest bg-yellow-50 px-3 py-1 rounded-md mb-4 inline-block">
                  {staff.campus || "Main Campus"}
                </span>
                <h2 className="text-4xl md:text-5xl font-black text-[#1d4e2f] leading-tight">
                  {staff.name}
                </h2>
                <p className="text-xl font-bold text-gray-500 mt-2">{staff.position}</p>
              </div>

              <div className="space-y-6">
                <div className="bg-green-50 p-6 rounded-3xl border-l-8 border-[#1d4e2f]">
                  <h4 className="text-[#1d4e2f] font-black text-sm uppercase mb-2">Professional Mission</h4>
                  <p className="text-gray-700 text-lg leading-relaxed italic">
                    "{formatInfo(staff.bio)}"
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl">
                    <Mail className="text-[#1d4e2f]" size={20} />
                    <div>
                      <p className="text-[10px] text-gray-400 font-bold uppercase">Email</p>
                      <p className="text-sm font-bold text-gray-700 truncate max-w-[180px]">{formatInfo(staff.email)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl">
                    <Phone className="text-[#1d4e2f]" size={20} />
                    <div>
                      <p className="text-[10px] text-gray-400 font-bold uppercase">Phone</p>
                      <p className="text-sm font-bold text-gray-700">{formatInfo(staff.phone)}</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 p-4 bg-[#1d4e2f] text-white rounded-2xl">
                  <Building2 size={24} className="text-yellow-400" />
                  <div>
                    <p className="text-[10px] opacity-70 font-bold uppercase">Department</p>
                    <p className="font-bold">{staff.department || "Library Administration"}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* TEAM SECTION */}
      {team.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 pb-32">
          <div className="flex items-center gap-4 mb-12">
            <h3 className="text-3xl font-black text-[#1d4e2f] whitespace-nowrap">Academic Leadership Team</h3>
            <div className="h-px bg-gray-200 w-full"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member) => (
              <div
                key={member.id}
                onClick={() => navigate(`/staff/${member.id}`)}
                className="group cursor-pointer bg-white border border-gray-100 rounded-[32px] p-6 hover:shadow-2xl transition-all duration-500"
              >
                <div className="h-64 bg-slate-50 rounded-2xl mb-6 overflow-hidden">
                  <img
                    src={getImageUrl(member.image, true)} // Uses optimized thumbnail
                    onError={(e) => { e.target.src = digitalLibHero; }}
                    className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-700"
                    alt={member.name}
                  />
                </div>
                <h4 className="text-xl font-black text-[#1d4e2f] group-hover:text-green-700 transition-colors">
                  {member.name}
                </h4>
                <p className="text-yellow-600 font-bold text-sm mt-1">{member.position}</p>
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
