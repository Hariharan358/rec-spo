import { Trophy, Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin, Linkedin } from "lucide-react";
import recLogo from "/rec_logo.png";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img 
                src={recLogo} 
                alt="Rajalakshmi Engineering College" 
                className="h-16 w-auto logo-glow"
              />
            </div>
            <div className="ml-2">
              <span className="font-display text-xl tracking-wider text-primary-foreground">SPORTS CLUB</span>
              <span className="block text-sm text-primary-foreground/70 -mt-1">
                Excellence in Athletics
              </span>
            </div>
            <p className="text-sm text-primary-foreground/70 leading-relaxed">
              Empowering students through sports, building champions in life and on the field at Rajalakshmi Engineering College.
            </p>
            <div className="flex gap-3">
              {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-secondary transition-colors"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg tracking-wider mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {["About Us", "Sports", "Events", "Gallery", "Contact"].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase().replace(" ", "-")}`}
                    className="text-sm text-primary-foreground/70 hover:text-secondary transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Sports */}
          <div>
            <h4 className="font-display text-lg tracking-wider mb-4">Our Sports</h4>
            <ul className="space-y-2">
              {["Cricket", "Football", "Basketball", "Badminton", "Volleyball", "Table Tennis"].map((sport) => (
                <li key={sport}>
                  <a
                    href="#sports"
                    className="text-sm text-primary-foreground/70 hover:text-secondary transition-colors"
                  >
                    {sport}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-lg tracking-wider mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                <span className="text-sm text-primary-foreground/70">
                  University Campus, Sports Complex, Main Road, City - 123456
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-secondary shrink-0" />
                <span className="text-sm text-primary-foreground/70">+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-secondary shrink-0" />
                <span className="text-sm text-primary-foreground/70">sports@university.edu</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 mt-12 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-col md:flex-row items-center gap-4">
              <p className="text-sm text-primary-foreground/50">
                © {currentYear} REC Sports Club - Rajalakshmi Engineering College. All rights reserved.
              </p>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-primary-foreground/70">Developed by</span>
                <a 
                  href="https://www.linkedin.com/in/hariharan-k-csbs" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-white bg-secondary/20 hover:bg-secondary/30 px-3 py-1.5 rounded-full transition-all duration-300 font-semibold hover:scale-105 border border-secondary/30"
                >
                  <Linkedin className="w-4 h-4 text-secondary" />
                  <span className="text-primary-foreground">Hariharan K - CSBS</span>
                </a>
                <a 
                  href="https://www.linkedin.com/in/hariharan-k-csbs" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-white bg-secondary/20 hover:bg-secondary/30 px-3 py-1.5 rounded-full transition-all duration-300 font-semibold hover:scale-105 border border-secondary/30"
                >
                  <Linkedin className="w-4 h-4 text-secondary" />
                  <span className="text-primary-foreground">BharathiRaja - CSBS</span>
                </a>
              </div>
            </div>
            <div className="flex gap-6">
              <a href="/HeadOffice" className="text-sm text-primary-foreground/50 hover:text-primary-foreground">
                Privacy Policy
              </a>
              <a href="#" className="text-sm text-primary-foreground/50 hover:text-primary-foreground">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
