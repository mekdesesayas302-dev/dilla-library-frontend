import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin, Send, Wifi } from "lucide-react";

// --- IMAGES ---
import adminBuilding from "@/assets/dl1.jpg";
import campusLayout from "@/assets/dl2.jpg";
import dlImage from "@/assets/dl2.jpg";
import graduationImage from "@/assets/graduation.jpg";
import mainGate2 from "@/assets/grad1.jpg";
import mainGate from "@/assets/grad1.jpg";
import digitalLibHero from "@/assets/digital-library.jpg";

/* HERO IMAGES */
const rawImages = [
  mainGate,
  adminBuilding,
  dlImage,
  campusLayout,
  graduationImage,
  mainGate2,
  digitalLibHero
];

const marqueeImages = [...rawImages, ...rawImages];

const Contact = () => {
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const [sending, setSending] = useState(false);

  /* SUBMIT */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Error",
        description: "Please fill all required fields",
        variant: "destructive"
      });
      return;
    }

    try {
      setSending(true);
      const res = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (!res.ok) throw new Error();

      toast({
        title: "Success",
        description: "Message sent successfully!"
      });

      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch {
      toast({
        title: "Error",
        description: "Failed to send message",
        variant: "destructive"
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />

      {/* ================= HERO (UPDATED: NO OVERLAY) ================= */}
      <section className="relative min-h-[450px] flex items-center justify-center overflow-hidden bg-[#0f2918]">
        
        {/* ANIMATION */}
        <style>{`
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            animation: scroll 60s linear infinite;
          }
        `}</style>

        {/* BACKGROUND IMAGES (NORMAL BRIGHTNESS) */}
        <div className="absolute inset-0 z-0">
          <div className="flex h-full w-max animate-marquee">
            {marqueeImages.map((img, index) => (
              <div key={index} className="h-full w-[600px] flex-shrink-0">
                <img
                  src={img}
                  alt={`Contact ${index}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* BOTTOM VIGNETTE (For smooth transition to white) */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent z-10" />

        {/* CONTENT */}
        <div className="relative z-20 text-center px-4 max-w-4xl">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/90 border border-yellow-600 rounded-full mb-6 shadow-lg">
            <Wifi className="w-3.5 h-3.5 text-yellow-700" />
            <span className="text-yellow-700 text-xs font-bold uppercase tracking-widest">
              Get In Touch
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]">
            Contact Our Library
          </h1>

          <div className="max-w-xl mx-auto bg-black/30 backdrop-blur-md p-4 rounded-2xl border border-white/10">
            <p className="text-white text-lg font-medium leading-relaxed">
              Have questions, suggestions, or need support? We're here to help you.
            </p>
          </div>
        </div>
      </section>

      {/* ================= CONTACT INFO ================= */}
      <section className="max-w-6xl mx-auto px-4 -mt-10 grid md:grid-cols-3 gap-6 relative z-30">
        <div className="bg-white shadow-xl rounded-2xl p-6 text-center border border-gray-100 hover:shadow-2xl transition group">
          <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-[#1d4e2f] transition-colors">
            <MapPin className="text-[#1d4e2f] group-hover:text-white" />
          </div>
          <h3 className="font-bold text-lg">Location</h3>
          <p className="text-gray-500 text-sm">
            Dilla University Library <br /> Ethiopia
          </p>
        </div>

        <div className="bg-white shadow-xl rounded-2xl p-6 text-center border border-gray-100 hover:shadow-2xl transition group">
          <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-[#1d4e2f] transition-colors">
            <Phone className="text-[#1d4e2f] group-hover:text-white" />
          </div>
          <h3 className="font-bold text-lg">Phone</h3>
          <p className="text-gray-500 text-sm">+251 46 331 2469</p>
        </div>

        <div className="bg-white shadow-xl rounded-2xl p-6 text-center border border-gray-100 hover:shadow-2xl transition group">
          <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-[#1d4e2f] transition-colors">
            <Mail className="text-[#1d4e2f] group-hover:text-white" />
          </div>
          <h3 className="font-bold text-lg">Email</h3>
          <p className="text-gray-500 text-sm">library@du.edu.et</p>
        </div>
      </section>

      {/* ================= FORM ================= */}
      <section className="max-w-4xl mx-auto py-16 px-4">
        <div className="bg-white shadow-2xl rounded-3xl p-8 md:p-12 border border-gray-100">
          <h2 className="text-3xl font-bold mb-8 text-[#1d4e2f] text-center">
            Send Us a Message
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Full Name</label>
                <Input
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="h-12 rounded-xl focus:ring-[#1d4e2f]"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Email Address</label>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="h-12 rounded-xl focus:ring-[#1d4e2f]"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Subject</label>
              <Input
                placeholder="How can we help?"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="h-12 rounded-xl focus:ring-[#1d4e2f]"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Message</label>
              <Textarea
                placeholder="Write your message here..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="min-h-[150px] rounded-xl focus:ring-[#1d4e2f]"
                required
              />
            </div>

            <Button
              type="submit"
              disabled={sending}
              className="w-full bg-[#1d4e2f] hover:bg-[#153a23] text-white h-14 rounded-xl text-lg font-bold shadow-lg transition-all active:scale-95 flex items-center justify-center gap-3"
            >
              {sending ? (
                "Sending..."
              ) : (
                <>
                  <Send size={20} />
                  Send Message
                </>
              )}
            </Button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;