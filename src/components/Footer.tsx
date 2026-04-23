import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Mail, Phone, MapPin,
  Facebook, Twitter, Instagram, Linkedin, Send
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import logo from "@/assets/logo.png";

const Footer = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  // PRODUCTION API BASE
  const API_BASE = "https://dilla-library-backend.onrender.com";

  const handleSubscribe = async () => {
    // 1. Validation
    if (!email || !email.includes("@")) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive"
      });
      return;
    }

    try {
      setLoading(true);

      // 2. Updated Fetch to Production URL
      const res = await fetch(`${API_BASE}/api/subscribe`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email })
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed to subscribe");

      // 3. Success Feedback
      toast({
        title: "Success!",
        description: "You have been added to our mailing list.",
        variant: "default", // Green/Success style
      });

      setEmail("");

    } catch (err) {
      // 4. Detailed Error Catching
      console.error("Subscription Error:", err);
      toast({
        title: "Subscription Failed",
        description: "Our server is currently busy. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-[#0b1f13] text-white mt-auto relative overflow-hidden">
      
      {/* Visual Enhancements: Background Glows */}
      <div className="absolute w-[400px] h-[400px] bg-yellow-500/10 blur-[120px] rounded-full top-[-100px] left-[-100px] pointer-events-none" />
      <div className="absolute w-[300px] h-[300px] bg-green-400/10 blur-[100px] rounded-full bottom-[-100px] right-[-100px] pointer-events-none" />

      <div className="relative container mx-auto px-6 py-16 z-10">
        
        {/* FOOTER CONTENT GRID */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">

          {/* COLUMN 1: BRANDING */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <img src={logo} alt="Dilla University Logo" className="h-14 w-14 object-contain" />
              <div>
                <h2 className="font-black text-xl tracking-tight">Dilla University</h2>
                <p className="text-xs text-yellow-500 font-bold uppercase tracking-widest">Library Services</p>
              </div>
            </div>

            <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
              Empowering research, learning, and innovation through modern 
              digital systems and dedicated academic support for our community.
            </p>

            <div className="flex gap-4">
              <a href="https://www.facebook.com/du.edu.et" target="_blank" rel="noreferrer" className="p-2.5 bg-white/5 rounded-xl hover:bg-yellow-500 hover:text-black transition-all">
                <Facebook size={18} />
              </a>
              <a href="https://www.linkedin.com/company/dilla-university/" target="_blank" rel="noreferrer" className="p-2.5 bg-white/5 rounded-xl hover:bg-yellow-500 hover:text-black transition-all">
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* COLUMN 2: LINKS */}
          <div className="md:pl-10">
            <h3 className="text-white font-black text-lg mb-6 border-b border-yellow-500/30 pb-2 inline-block">Explore</h3>
            <ul className="space-y-4 text-sm font-medium text-gray-400">
              <li><Link to="/about" className="hover:text-yellow-400 transition-colors flex items-center gap-2">About the Library</Link></li>
              <li><Link to="/services" className="hover:text-yellow-400 transition-colors flex items-center gap-2">Our Services</Link></li>
              <li><Link to="/staff" className="hover:text-yellow-400 transition-colors flex items-center gap-2">Our Staff</Link></li>
              <li><Link to="/news" className="hover:text-yellow-400 transition-colors flex items-center gap-2">Latest News</Link></li>
            </ul>
          </div>

          {/* COLUMN 3: CONTACT INFO */}
          <div>
            <h3 className="text-white font-black text-lg mb-6 border-b border-yellow-500/30 pb-2 inline-block">Get In Touch</h3>
            <div className="space-y-5 text-sm text-gray-400">
              <div className="flex gap-3">
                <MapPin size={18} className="text-yellow-500 shrink-0" />
                <p>Main Campus, Dilla University<br/>Dilla, Ethiopia</p>
              </div>
              <div className="flex gap-3">
                <Phone size={18} className="text-yellow-500 shrink-0" />
                <p>+251 463 312 029</p>
              </div>
              <div className="flex gap-3">
                <Mail size={18} className="text-yellow-500 shrink-0" />
                <p>library@du.edu.et</p>
              </div>
            </div>
          </div>

          {/* COLUMN 4: NEWSLETTER */}
          <div>
            <h3 className="text-white font-black text-lg mb-6 border-b border-yellow-500/30 pb-2 inline-block">Newsletter</h3>
            <p className="text-sm text-gray-400 mb-6">
              Subscribe to receive the latest academic resources and event updates.
            </p>

            <div className="flex flex-col gap-3">
              <div className="flex bg-white/5 p-1 rounded-xl border border-white/10 focus-within:border-yellow-500/50 transition-all">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your Email"
                  className="bg-transparent w-full px-4 py-2 text-sm text-white outline-none"
                />
                <button
                  onClick={handleSubscribe}
                  disabled={loading}
                  className="bg-yellow-500 p-2.5 rounded-lg text-black hover:bg-yellow-600 active:scale-95 transition-all disabled:opacity-50"
                >
                  <Send size={18} />
                </button>
              </div>
              {loading && <p className="text-[10px] text-yellow-500 animate-pulse font-bold uppercase">Processing subscription...</p>}
            </div>
          </div>
        </div>

        {/* COPYRIGHT AREA */}
        <div className="border-t border-white/5 mt-16 pt-8 flex flex-col md:row items-center justify-between gap-4">
          <p className="text-xs text-gray-500 font-medium">
            © {new Date().getFullYear()} <span className="text-gray-300">Dilla University Library</span>. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-[11px] text-gray-500 font-bold uppercase tracking-widest">
            <span className="hover:text-yellow-500 cursor-default transition-colors">Privacy Policy</span>
            <span className="hover:text-yellow-500 cursor-default transition-colors">Terms of Service</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
