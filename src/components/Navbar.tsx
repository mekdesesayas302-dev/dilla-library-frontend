import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Menu, X, Search, Clock, User, Globe, 
  ChevronDown, Users, FileText, MapPin 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import logo from "@/assets/logo.png";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [libraryStatus, setLibraryStatus] = useState({ text: "Open 24/7", isOpen: true });
  const location = useLocation();

  useEffect(() => {
    const checkStatus = () => {
      const now = new Date();
      const month = now.getMonth() + 1; // Months are 0-indexed
      const date = now.getDate();
      const todayKey = `${month}-${date}`; // Format: "MM-DD"

      // --- HOLIDAY CALENDAR ---
      // Add specific dates here when the library should be closed
      const holidays = [
        "1-1",   // New Year's Day
        "1-7",   // Ganna / Genna
        "1-19",  // Timkat
        "3-2",   // Victory at Adwa
        "5-1",   // International Labour Day
        "5-5",   // Patriots' Victory Day
        "9-11",  // Enkutatash (Ethiopian New Year)
        "9-27",  // Meskel
      ];

      const isHoliday = holidays.includes(todayKey);

      if (isHoliday) {
        setLibraryStatus({
          text: "Closed for Holiday",
          isOpen: false
        });
      } else {
        setLibraryStatus({
          text: "Open 24/7 Service",
          isOpen: true
        });
      }
    };

    checkStatus();
    // Check once an hour to see if a holiday has started
    const interval = setInterval(checkStatus, 3600000);

    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  // Navigation config...
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "E-Library", path: "/e-library" },
    { name: "OPAC", path: "/opac" },
    { name: "News & Events", path: "/news" },
    { name: "Contact", path: "/contact" },
  ];

  const mobileLinks = [
    "Home", "About", "Staff Directory", "Library Policies", "Library Branches",
    "Services", "E-Library", "OPAC", "News & Events", "Contact"
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex flex-col font-sans">
      
      {/* --- TOP UTILITY BAR --- */}
      <div className="hidden md:flex justify-between items-center bg-green-900 text-white px-4 py-1.5 text-xs font-medium tracking-wide">
        <div className="container mx-auto flex justify-between">
          <div className="flex items-center space-x-6">
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-yellow-400" />
              <span className="flex items-center gap-1.5">
                <span className={`inline-block w-2 h-2 rounded-full ${libraryStatus.isOpen ? 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]' : 'bg-red-500'}`}></span>
                <span className="font-bold uppercase tracking-tight">
                  {libraryStatus.isOpen ? "Always Open" : "Library Closed"}
                </span>
                <span className="opacity-75 ml-1 border-l border-white/20 pl-2">
                  {libraryStatus.text}
                </span>
              </span>
            </div>
            <a href="https://www.du.edu.et/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 opacity-90 hover:text-yellow-400 transition-colors">
              <Globe className="w-3.5 h-3.5 text-blue-300" />
              <span>Dilla University Main Site</span>
            </a>
          </div>
          <div className="flex items-center space-x-4">
            <a href="https://portal.du.edu.et/" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400 transition-colors font-semibold">
              Student Portal
            </a>
          </div>
        </div>
      </div>

      {/* --- MAIN NAVBAR --- */}
      <nav className={`w-full border-b transition-all duration-300 ${scrolled ? "bg-white/95 backdrop-blur-md shadow-md border-slate-200 py-2" : "bg-white border-transparent py-4"}`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            
            {/* Logo */}
            <Link to="/" className="flex items-center group">
              <div className="relative flex h-12 w-12 items-center justify-center bg-white rounded-full shadow-sm border border-slate-100 mr-3 group-hover:scale-105 transition-transform duration-300">
                <img src={logo} alt="DU Logo" className="h-10 w-10 object-contain" />
              </div>
              <div className="flex flex-col">
                <h1 className="text-xl font-extrabold text-slate-900 tracking-tight leading-none group-hover:text-green-800 transition-colors">DILLA UNIVERSITY</h1>
                <p className="text-xs font-bold text-green-700 tracking-[0.2em] uppercase mt-0.5">Library Services</p>
              </div>
            </Link>

            {/* DESKTOP NAVIGATION */}
            <div className="hidden lg:flex items-center gap-1">
              <NavigationMenu>
                <NavigationMenuList className="gap-1">
                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <Link to="/" className={`px-4 py-2 text-sm font-semibold rounded-full transition-all duration-200 ${location.pathname === "/" ? "bg-green-50 text-green-700" : "text-slate-600 hover:text-green-700 hover:bg-slate-50"}`}>Home</Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="text-slate-600 font-semibold hover:text-green-700">About</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[340px] gap-3 p-4 bg-white rounded-xl shadow-xl border border-slate-100">
                        <li>
                          <NavigationMenuLink asChild>
                            <Link to="/staff" className="flex items-center gap-3 rounded-md p-3 transition-colors hover:bg-slate-50 hover:text-green-700">
                              <Users className="w-4 h-4 text-slate-500" />
                              <div>
                                <div className="text-sm font-bold text-slate-800">Staff Directory</div>
                                <p className="text-xs text-slate-500">Meet our librarians</p>
                              </div>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                        {/* Other sublinks here... */}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  {navLinks.slice(1).map((link) => (
                    <NavigationMenuItem key={link.name}>
                      <NavigationMenuLink asChild>
                        <Link to={link.path} className={`px-4 py-2 text-sm font-semibold rounded-full transition-all duration-200 ${location.pathname === link.path ? "bg-green-50 text-green-700" : "text-slate-600 hover:text-green-700 hover:bg-slate-50"}`}>
                          {link.name}
                        </Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>

              <Link to="/catalog" className="ml-4">
                <Button className="bg-green-700 hover:bg-green-800 text-white rounded-full shadow-lg shadow-green-900/20 px-6">
                  <Search className="mr-2 h-4 w-4" /> Search Catalog
                </Button>
              </Link>
            </div>

            <button className="lg:hidden p-2 text-slate-600" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
