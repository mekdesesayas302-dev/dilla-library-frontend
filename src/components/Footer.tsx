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
    if (!email) {
      toast({
        title: "Error",
        description: "Please enter your email",
        variant: "destructive"
      });
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("https://dilla-library-backend.onrender.com/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email })
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      toast({
        title: "Subscribed!",
        description: "You will receive updates from our library"
      });

      setEmail("");

    } catch (err) {
      toast({
        title: "Error",
        description: err.message || "Subscription failed",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-[#0b1f13] text-white mt-auto relative overflow-hidden">

      {/* Background Glow */}
      <div className="absolute w-[400px] h-[400px] bg-yellow-500/10 blur-[120px] rounded-full top-[-100px] left-[-100px]" />
      <div className="absolute w-[300px] h-[300px] bg-green-400/10 blur-[100px] rounded-full bottom-[-100px] right-[-100px]" />

      <div className="relative container mx-auto px-6 py-16 z-10">

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* BRAND */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src={logo} alt="Dilla University Logo" className="h-12 w-12" />
              <div>
                <h2 className="font-bold text-lg">Dilla University</h2>
                <p className="text-xs text-gray-400">Library Services</p>
              </div>
            </div>

            <p className="text-sm text-gray-300 leading-relaxed">
              Empowering research, learning, and innovation through modern
              digital library systems and academic support.
            </p>

            {/* SOCIAL LINKS */}
            <div className="flex gap-3 mt-4">

              <a href="https://www.facebook.com/du.edu.et" className="p-2 bg-white/10 rounded-full hover:bg-yellow-500 hover:text-black transition">
                <Facebook size={16} />
              </a>

       

              {/* ✅ LINKEDIN FIXED */}
              <a
                href="https://www.linkedin.com/company/dilla-university/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/10 rounded-full hover:bg-yellow-500 hover:text-black transition"
              >
                <Linkedin size={16} />
              </a>

            </div>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h3 className="text-yellow-400 font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="hover:text-yellow-400">About</Link></li>
              <li><Link to="/services" className="hover:text-yellow-400">Services</Link></li>
              <li><Link to="/catalog" className="hover:text-yellow-400">Catalog</Link></li>
              <li><Link to="/news" className="hover:text-yellow-400">News</Link></li>
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h3 className="text-yellow-400 font-semibold mb-4">Contact</h3>

            <div className="space-y-3 text-sm text-gray-300">
              <p className="flex gap-2 items-center">
                <MapPin size={16} /> Dilla University, Ethiopia
              </p>
              <p className="flex gap-2 items-center">
                <Phone size={16} /> +251463312029
              </p>
              <p className="flex gap-2 items-center">
                <Mail size={16} /> library@du.edu.et
              </p>
            </div>
          </div>

          {/* NEWSLETTER */}
          <div>
            <h3 className="text-yellow-400 font-semibold mb-4">Newsletter</h3>

            <p className="text-sm text-gray-300 mb-3">
              Subscribe to get latest updates, news, and library events.
            </p>

            <div className="flex">
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-3 py-2 rounded-l-md text-black outline-none"
              />

              <button
                onClick={handleSubscribe}
                disabled={loading}
                className="bg-yellow-500 px-4 rounded-r-md text-black hover:bg-yellow-600 flex items-center gap-1"
              >
                <Send size={16} />
                {loading ? "..." : "Join"}
              </button>
            </div>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="border-t border-white/10 mt-12 pt-6 flex flex-col md:flex-row justify-between text-sm text-gray-400">
          <p>© {new Date().getFullYear()} Dilla University Library</p>
          <p>Developed by Library ICT Team</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
