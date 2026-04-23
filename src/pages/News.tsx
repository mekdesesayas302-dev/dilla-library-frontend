import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, Wifi } from "lucide-react";
import { Button } from "@/components/ui/button";

/* ================= 1. LIVE API CONFIG ================= */
// Hardcoded to ensure it never defaults to localhost
const API_BASE_URL = "https://dilla-library-backend.onrender.com";

/* ================= HERO IMAGES ================= */
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

const News = () => {
  const [newsItems, setNewsItems] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  /* ================= 2. DATA FETCHING ================= */
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [newsRes, eventsRes] = await Promise.all([
          fetch(`${API_BASE_URL}/api/news`),
          fetch(`${API_BASE_URL}/api/events`)
        ]);

        if (!newsRes.ok || !eventsRes.ok) {
          throw new Error("Server response failed. Check backend logs.");
        }

        const newsData = await newsRes.json();
        const eventsData = await eventsRes.json();

        setNewsItems(newsData);
        setEvents(eventsData);
      } catch (err) {
        console.error("❌ Connection Error:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatDate = (date) => {
    if (!date) return "No date";
    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    });
  };

  return (
    <div className="bg-white min-h-screen">
      <Navbar />

      {/* ================= HERO SECTION ================= */}
      <section className="relative min-h-[500px] flex items-center justify-center overflow-hidden bg-[#0f2918]">
        <style>{`
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-scroll {
            animation: scroll 60s linear infinite;
          }
        `}</style>

        <div className="absolute inset-0">
          <div className="flex h-full w-max animate-scroll">
            {marqueeImages.map((img, index) => (
              <div key={index} className="h-full w-[600px] flex-shrink-0">
                <img
                  src={img}
                  alt="Library Background"
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

        <div className="relative z-10 text-center px-4 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/90 border border-yellow-600 rounded-full mb-6 shadow-lg">
            <Wifi className="w-3.5 h-3.5 text-yellow-700" />
            <span className="text-yellow-700 text-xs font-bold uppercase tracking-widest">
              Dilla University Library Updates
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 drop-shadow-lg">
            Discover Our Latest News
          </h1>

          <div className="max-w-2xl mx-auto bg-black/40 backdrop-blur-md p-4 rounded-2xl border border-white/20">
            <p className="text-white text-lg font-medium leading-relaxed">
              Stay informed with research updates, academic trainings,
              and library announcements.
            </p>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-14 bg-white rounded-t-[50px]" />
      </section>

      {/* ================= NEWS GRID ================= */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-[#1d4e2f] text-center">
            Latest Library News
          </h2>

          {loading ? (
            <div className="text-center py-10">
              <p className="text-gray-500 animate-pulse">Loading updates from server...</p>
            </div>
          ) : newsItems.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-500">No news articles found in the database.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              {newsItems.map((item) => (
                <Card
                  key={item.id}
                  className="group overflow-hidden rounded-3xl bg-white shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                >
                  <div className="relative h-56 bg-green-50 overflow-hidden">
                    <img
                      src={item.image || digitalLibHero}
                      alt={item.title}
                      className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
                      onError={(e) => { e.target.src = digitalLibHero; }} // Fallback if image path is broken
                    />
                    <div className="absolute top-3 left-3">
                      <Badge className="bg-yellow-500 text-[#1d4e2f] font-bold">
                        {item.category || "General"}
                      </Badge>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <h3 className="font-bold text-lg mb-2 text-[#1d4e2f] group-hover:text-green-700 transition line-clamp-2">
                      {item.title}
                    </h3>
                    <div className="text-xs text-gray-400 mb-3 flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5" />
                      {formatDate(item.date)}
                    </div>
                    <p className="text-sm text-gray-600 mb-5 line-clamp-3 leading-relaxed">
                      {item.excerpt || item.content}
                    </p>
                    <Button
                      onClick={() => navigate(`/news/${item.id}`)}
                      className="w-full bg-[#1d4e2f] hover:bg-[#153a23] text-white rounded-xl shadow-md transition-colors"
                    >
                      Read Full Article →
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ================= EVENTS SECTION ================= */}
      <section className="py-20 bg-gradient-to-b from-green-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-[#1d4e2f] text-center">
            Upcoming Academic Events
          </h2>

          {events.length === 0 ? (
            <p className="text-gray-500 text-center">No events scheduled at this time.</p>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              {events.map((event) => (
                <Card
                  key={event.id}
                  className="p-6 rounded-3xl shadow-md hover:shadow-xl transition bg-white border-none"
                >
                  <div className="text-lg font-bold text-[#1d4e2f] mb-2 border-b pb-2">
                    {formatDate(event.event_date)}
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">{event.title}</h3>
                  <p className="text-sm text-gray-500 mb-4 line-clamp-2">{event.description}</p>
                  <div className="space-y-2">
                    <div className="text-sm text-gray-600 flex items-center gap-2">
                      <Clock className="w-4 h-4 text-green-600" />
                      {event.time}
                    </div>
                    <div className="text-sm text-gray-600 flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-green-600" />
                      {event.location}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default News;
