import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// ✅ FIXED: Hardcoded live URL to prevent localhost connection errors
const API_BASE_URL = "https://dilla-library-backend.onrender.com";

const News = () => {
  const [newsItems, setNewsItems] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [newsRes, eventsRes] = await Promise.all([
          fetch(`${API_BASE_URL}/api/news`),
          fetch(`${API_BASE_URL}/api/events`)
        ]);

        if (!newsRes.ok || !eventsRes.ok) throw new Error("Server error");

        setNewsItems(await newsRes.json());
        setEvents(await eventsRes.json());
      } catch (err) {
        console.error("❌ Data Fetch Failed:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // ... rest of your component rendering code
  return (
    <div>
      <Navbar />
      {/* Content goes here */}
      <Footer />
    </div>
  );
};

export default News;
