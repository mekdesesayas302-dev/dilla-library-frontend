import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, Wifi } from "lucide-react";
import { Button } from "@/components/ui/button";

/* ================= API CONFIG ================= */
// This ensures it uses Render in production and localhost in development
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

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
  const navigate = useNavigate();

  useEffect(() => {
    // ✅ Updated to use dynamic API_BASE_URL
    Promise.all([
      fetch(`${API_BASE_URL}/api/news`),
      fetch(`${API_BASE_URL}/api/events`)
    ])
      .then(async ([n, e]) => {
        if (!n.ok || !e.ok) throw new Error("Server response failed");
        setNewsItems(await n.json());
        setEvents(await e.json());
      })
      .catch(err => {
        console.error("❌ Fetch Error:", err);
        // Optional: set a state to show an error message to the user
      });
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

      {/* ================= HERO ================= */}
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
                  alt="Library"
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        <div className="relative z-10 text-center px-4 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/90 border border-yellow-600 rounded-full mb-6 shadow-lg">
            <Wifi className="w-3.5 h-3.5 text-yellow-700" />
            <span className="text-yellow-700 text-xs font-bold uppercase tracking-widest">
              Library News & Events
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]">
            Discover Library Updates
          </h1>

          <div className="max-w-2xl mx-auto bg-black/30 backdrop-blur-md p-4 rounded-2xl border border-white/10">
            <p className="text-white text-lg font-medium leading-relaxed">
              Stay informed with announcements, research updates, trainings,
              and academic events from Dilla University Library.
            </p>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-14 bg-white rounded-t-[50px]" />
      </section>

      {/* ================= NEWS SECTION ================= */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-[#1d4e2f] text-center">
            Latest News
          </h2>

          {newsItems.length === 0 ? (
            <div className="text-center py-10">
               <p className="text-gray-500">Connecting to server or no news available...</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              {newsItems.map(item => (
                <Card
                  key={item.id}
                  className="group overflow-hidden rounded-3xl bg-white shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                >
                  <div className="relative h-56 bg-green-50 flex items-center justify-center overflow-hidden">
                    <img
                      src={item.image || digitalLibHero}
                      alt={item.title}
                      className="max-h-full max-w-full object-contain transition duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-3 left-3">
                      <Badge className="bg-yellow-500 text-[#1d4e2f]">
                        {item.category || "Library"}
                      </Badge>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <h3 className="font-bold text-lg mb-2 text-[#1d4e2f] group-hover:text-green-700 transition">
                      {item.title}
                    </h3>
                    <div className="text-xs text-gray-400 mb-3 flex items-center gap-2">
                      <Calendar className="w-3 h-3" />
                      {formatDate(item.date)}
                    </div>
                    <p className="text-sm text-gray-600 mb-5 line-clamp-3 leading-relaxed">
                      {item.excerpt || item.content}
                    </p>
                    <Button
                      onClick={() => navigate(`/news/${item.id}`)}
                      className="w-full bg-[#1d4e2f] hover:bg-[#153a23] text-white rounded-lg shadow-md"
                    >
                      Read More →
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
            Upcoming Events
          </h2>

          {events.length === 0 ? (
            <p className="text-gray-500 text-center">No events scheduled currently.</p>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              {events.map(event => (
                <Card
                  key={event.id}
                  className="p-6 rounded-3xl shadow-md hover:shadow-xl transition bg-white hover:-translate-y-1"
                >
                  <div className="text-lg font-bold text-[#1d4e2f] mb-2">
                    {formatDate(event.event_date)}
                  </div>
                  <h3 className="font-semibold mb-2">{event.title}</h3>
                  <p className="text-sm text-gray-500 mb-4">{event.description}</p>
                  <div className="space-y-2">
                    <div className="text-sm text-gray-500 flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {event.time}
                    </div>
                    <div className="text-sm text-gray-500 flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
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
