import { Link } from "react-router-dom";
import { BookOpen, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent">
                <BookOpen className="h-6 w-6 text-accent-foreground" />
              </div>
              <div>
                <h2 className="text-lg font-bold">University Library</h2>
                <p className="text-xs opacity-90">Information Services</p>
              </div>
            </div>
            <p className="text-sm opacity-80">
              Supporting academic excellence through comprehensive resources and services.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="opacity-80 hover:opacity-100 transition-opacity">
                  About Library
                </Link>
              </li>
              <li>
                <Link to="/services" className="opacity-80 hover:opacity-100 transition-opacity">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/e-library" className="opacity-80 hover:opacity-100 transition-opacity">
                  Digital Resources
                </Link>
              </li>
              <li>
                <Link to="/catalog" className="opacity-80 hover:opacity-100 transition-opacity">
                  Search Catalog
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/news" className="opacity-80 hover:opacity-100 transition-opacity">
                  News & Events
                </Link>
              </li>
              <li>
                <Link to="/contact" className="opacity-80 hover:opacity-100 transition-opacity">
                  Contact Us
                </Link>
              </li>
              <li>
                <a href="#" className="opacity-80 hover:opacity-100 transition-opacity">
                  Research Guides
                </a>
              </li>
              <li>
                <a href="#" className="opacity-80 hover:opacity-100 transition-opacity">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 mt-1 flex-shrink-0 opacity-80" />
                <span className="opacity-80">University Campus, Main Building, Room 101</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4 flex-shrink-0 opacity-80" />
                <span className="opacity-80">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4 flex-shrink-0 opacity-80" />
                <span className="opacity-80">library@university.edu</span>
              </li>
            </ul>
            
            <div className="mt-6">
              <h4 className="text-sm font-semibold mb-3">Follow Us</h4>
              <div className="flex space-x-3">
                <a href="#" className="opacity-80 hover:opacity-100 transition-opacity">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="opacity-80 hover:opacity-100 transition-opacity">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="opacity-80 hover:opacity-100 transition-opacity">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="#" className="opacity-80 hover:opacity-100 transition-opacity">
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-sm opacity-80">
          <p>&copy; {new Date().getFullYear()} University Library & Information Services. All rights reserved.</p>
          <p className="mt-2">
            <span className="opacity-60">Opening Hours: </span>
            Monday - Friday: 8:00 AM - 10:00 PM | Saturday - Sunday: 9:00 AM - 6:00 PM
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
