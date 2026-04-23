import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

/* IMAGES */
import adminBuilding from "@/assets/dl1.jpg";
import campusLayout from "@/assets/dl2.jpg";
import dlImage from "@/assets/dl2.jpg";
import graduationImage from "@/assets/graduation.jpg";
import mainGate from "@/assets/grad1.jpg";
import digitalLibHero from "@/assets/digital-library.jpg";

const images = [
  mainGate,
  adminBuilding,
  dlImage,
  campusLayout,
  graduationImage,
  digitalLibHero
];

const marqueeImages = [...images, ...images];

const NewsDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [news, setNews] = useState(null);
  const [allNews, setAllNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    const fetchNews = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/news", {
          signal: controller.signal,
        });

        const data = await res.json();

        setAllNews(data);

        const found = data.find((n) => String(n.id) === String(id));
        setNews(found || null);

        setLoading(false);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error(err);
          setLoading(false);
        }
      }
    };

    fetchNews();

    return () => controller.abort();
  }, [id]);

  const formatDate = (date) => {
    if (!date) return "No date";
    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-gray-400 animate-pulse text-lg">Loading news...</p>
      </div>
    );
  }

  if (!news) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-gray-500 text-lg">News not found</p>
      </div>
    );
  }

  const otherNews = allNews
    .filter((n) => String(n.id) !== String(id))
    .slice(0, 5);

  return (
    <div className="bg-white min-h-screen">
      <Navbar />

      {/* ================= HERO ================= */}
      <section className="relative min-h-[500px] flex items-center justify-center overflow-hidden bg-black">

        <style>{`
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-scroll {
            animation: scroll 60s linear infinite;
          }
        `}</style>

        {/* BACKGROUND MARQUEE */}
        <div className="absolute inset-0 opacity-80">
          <div className="flex h-full w-max animate-scroll">
            {marqueeImages.map((img, i) => (
              <img
                key={i}
                src={img}
                className="w-[650px] h-full object-cover"
                alt="marquee"
              />
            ))}
          </div>
        </div>

        {/* DARK OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />

        {/* HERO CONTENT */}
        <div className="relative z-10 text-center px-4 max-w-4xl">

          <div className="inline-block px-4 py-1 bg-yellow-500/90 text-black font-bold text-xs uppercase tracking-widest rounded-full mb-5">
            Library News Update
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight drop-shadow-lg">
            {news.title}
          </h1>

          <p className="mt-5 text-sm text-white/80">
            {formatDate(news.date)} • Dilla University Library
          </p>
        </div>
      </section>

      {/* ================= CONTENT ================= */}
      <div className="max-w-7xl mx-auto px-4 py-14 grid lg:grid-cols-4 gap-10">

        {/* LEFT */}
        <div className="hidden lg:block">
          <div className="sticky top-24 space-y-6">

            <div className="rounded-2xl overflow-hidden shadow-lg border">
              <img
                src={news.image || "/placeholder.jpg"}
                className="w-full h-[260px] object-cover"
                alt="sidebar"
              />
              <div className="p-4 bg-white text-sm text-gray-600">
                📚 Supporting research, innovation, and digital learning.
              </div>
            </div>

            <div className="rounded-2xl bg-gray-50 border p-5 text-sm text-gray-600 leading-relaxed">
              The University Library provides access to digital resources,
              research materials, and academic support services for students and staff.
            </div>

          </div>
        </div>

        {/* CENTER */}
        <div className="lg:col-span-2">
          <div className="bg-white border rounded-3xl shadow-sm overflow-hidden">

            <div className="relative">
              <img
                src={news.image || "/placeholder.jpg"}
                className="w-full max-h-[520px] object-cover"
                alt={news.title}
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                <h2 className="text-white text-xl md:text-2xl font-bold">
                  {news.title}
                </h2>
              </div>
            </div>

            <div className="p-8">
              <p className="text-gray-700 leading-relaxed text-[17px] whitespace-pre-line">
                {news.content}
              </p>
            </div>

          </div>
        </div>

        {/* RIGHT */}
        <div>
          <div className="sticky top-24">

            <h3 className="text-lg font-bold text-gray-800 mb-5 border-b pb-2">
              Related News
            </h3>

            {otherNews.length === 0 ? (
              <p className="text-gray-400 text-sm">No other news available</p>
            ) : (
              <div className="space-y-4">
                {otherNews.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => navigate(`/news/${item.id}`)}
                    className="flex gap-3 p-3 rounded-xl border hover:shadow-md transition cursor-pointer bg-white"
                  >
                    <img
                      src={item.image || "/placeholder.jpg"}
                      className="w-20 h-16 object-cover rounded-lg"
                      alt="thumbnail"
                    />
                    <div>
                      <h4 className="text-sm font-semibold text-gray-800 line-clamp-2 hover:text-[#1d4e2f]">
                        {item.title}
                      </h4>
                      <p className="text-xs text-gray-400 mt-1">
                        {formatDate(item.date)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>
        </div>

      </div>

      <Footer />
    </div>
  );
};

export default NewsDetails;