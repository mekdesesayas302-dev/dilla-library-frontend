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

  const handleSubscribe = async () => {
    // 1. Basic validation to prevent unnecessary server calls
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

      // Using the absolute Render URL to prevent ERR_CONNECTION_REFUSED
      const res = await fetch("https://dilla-library-backend.onrender.com/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email: email.trim() })
      });

      // Safely parse JSON even if server returns an error
      const data = await res.json().catch(() => ({ message: "Server connection failed" }));

      if (!res.ok) {
        throw new Error(data.message || "Subscription failed. You might already be subscribed.");
      }

      toast({
        title: "Success!",
        description: "You have successfully subscribed to our newsletter."
      });
      setEmail("");

    } catch (err: any) {
      // Prevents the index-BoEATFUj.js:288 crash seen in your console
      toast({
        title: "Subscription Error",
        description: err.message || "Could not reach the server. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-[#0b1f13] text-white mt-auto relative overflow-hidden">
      {/* --- DESIGN ELEMENTS (UNTOUCHED) --- */}
      <div className="absolute w-[400px] h-[400px] bg-yellow-500/10 blur-[120px] rounded-full top-[-100px] left-[-100px]" />
      <div className="absolute w-[300px] h-[300px] bg-green-400/10 blur-[100px] rounded-full bottom-[-100px] right-[-100px]" />

      <div className="relative container mx-auto px-6 py-16 z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* BRAND */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src={logo} alt="Dilla University Logo" className="h-12 w-12" />
              <div>
                <h2 className="font-bold text-lg leading-tight">Dilla University</h2>
                <p className="text-xs text-gray-400 font-medium">Library Services</p>
              </div>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed">
              Empowering research, learning, and innovation through modern
              digital library systems and academic support.
            </p>
            <div className="flex gap-3 mt-4">
              <a href="https://www.facebook.com/du.edu.et" target="_blank" rel="noreferrer" className="p-2 bg-white/10 rounded-full hover:bg-yellow-500 hover:text-black transition-colors">
                <Facebook size={16} />
              </a>
              <a href="https://www.linkedin.com/company/dilla-university/" target="_blank" rel="noreferrer" className="p-2 bg-white/10 rounded-full hover:bg-yellow-500 hover:text-black transition-colors">
                <Linkedin size={16} />
              </a>
            </div>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h3 className="text-yellow-400 font-semibold mb-6 uppercase text-xs tracking-widest">Quick Links</h3>
            <ul className="space-y-3 text-sm">
              <li><Link to="/about" className="hover:text-yellow-400 transition-colors">About the Library</Link></li>
              <li><Link to="/services" className="hover:text-yellow-400 transition-colors">Services</Link></li>
              <li><Link to="/catalog" className="hover:text-yellow-400 transition-colors">Catalog (OPAC)</Link></li>
              <li><Link to="/news" className="hover:text-yellow-400 transition-colors">News & Events</Link></li>
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h3 className="text-yellow-400 font-semibold mb-6 uppercase text-xs tracking-widest">Contact</h3>
            <div className="space-y-4 text-sm text-gray-300">
              <p className="flex gap-3 items-start">
                <MapPin size={18} className="text-yellow-500 shrink-0" /> 
                <span>Dilla University, Ethiopia<br/>P.O.Box 419</span>
              </p>
              <p className="flex gap-3 items-center">
                <Phone size={18} className="text-yellow-500 shrink-0" /> 
                <span>+251 463 312 029</span>
              </p>
              <p className="flex gap-3 items-center">
                <Mail size={18} className="text-yellow-500 shrink-0" /> 
                <span className="break-all">library@du.edu.et</span>
              </p>
            </div>
          </div>

          {/* NEWSLETTER */}
          <div>
            <h3 className="text-yellow-400 font-semibold mb-6 uppercase text-xs tracking-widest">Newsletter</h3>
            <p className="text-sm text-gray-300 mb-4">
              Subscribe to stay updated with library news and resources.
            </p>
            <div className="flex shadow-lg group">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-3 py-2 rounded-l-md text-black outline-none border-2 border-transparent focus:border-yellow-500"
              />
              <button
                onClick={handleSubscribe}
                disabled={loading}
                className="bg-yellow-500 px-5 rounded-r-md text-black font-bold hover:bg-yellow-600 disabled:opacity-50 transition-all flex items-center gap-1"
              >
                {loading ? "..." : (
                  <>
                    <Send size={16} />
                    <span>Join</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* BOTTOM SECTION */}
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400 gap-4">
          <p>© {new Date().getFullYear()} Dilla University Library. All Rights Reserved.</p>
          <p className="font-medium">Developed by Library ICT Team</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
