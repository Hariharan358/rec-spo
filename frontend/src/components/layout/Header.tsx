import { useState, useEffect } from "react";
import { Menu, X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import recLogo from "/rec_logo.png";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Sports", href: "#sports" },
  { name: "Events", href: "#events" },
  { name: "Team", href: "#team" },
  { name: "Gallery", href: "#gallery" },
  { name: "Contact", href: "#contact" },
];

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className={`dynamic-island transition-all duration-500 ease-in-out ${isMenuOpen ? "flex flex-col w-[90vw] max-w-md h-auto rounded-[2rem]" : "dynamic-island-expanded"
          }`}
      >
        <div className="flex items-center justify-between px-6 py-2 min-h-[64px]">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("#home");
            }}
            className="flex items-center gap-3 text-primary-foreground group shrink-0"
          >
            <div className="relative">
              <img
                src={recLogo}
                alt="Logo"
                className="h-10 w-auto rec-logo group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              className="hidden sm:block overflow-hidden whitespace-nowrap"
            >
              <span className="font-display text-lg tracking-wider gradient-text">

              </span>
            </motion.div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.href);
                }}
                className="nav-link text-white/90 hover:text-white text-sm font-medium px-3 py-1.5 rounded-full transition-all duration-300"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">


            {/* Mobile Menu Toggle */}
            <button
              className={`lg:hidden text-white p-2 rounded-full hover:bg-white/20 transition-all duration-300 ${isMenuOpen ? "bg-white/20 rotate-180" : ""
                }`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden bg-black/20 backdrop-blur-xl border-t border-white/10"
            >
              <nav className="flex flex-col p-4 gap-2">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.href);
                    }}
                    className="block w-full text-white text-lg font-medium py-3 px-4 rounded-xl hover:bg-white/10 transition-colors text-center"
                  >
                    {link.name}
                  </a>
                ))}
                <Button
                  variant="athletic"
                  className="w-full mt-2 btn-athletic"
                  onClick={() => scrollToSection("#register")}
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Join Club
                </Button>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </div>
  );
};
