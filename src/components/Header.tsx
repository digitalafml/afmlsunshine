import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import sunshineLogo from "@/assets/sunshine-logo.png";
import akijFlourMillsLogo from "@/assets/akij-flour-mills-logo.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showSunshineLogo, setShowSunshineLogo] = useState(true);

  // Alternate logos every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setShowSunshineLogo((prev) => !prev);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const navItems = [
    { label: "Home", href: "#home" },
    { label: "Products", href: "#products" },
    { label: "Why Sunshine", href: "#why-sunshine" },
    { label: "About", href: "#about" },
    { label: "Quality", href: "#quality" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-sm shadow-soft">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo with Crossfade Animation */}
          <a href="#home" className="flex items-center gap-2 relative h-10 md:h-14 w-40 md:w-56">
            <AnimatePresence mode="wait">
              {showSunshineLogo ? (
                <motion.img
                  key="sunshine"
                  src={sunshineLogo}
                  alt="Sunshine"
                  className="h-10 md:h-14 w-auto absolute left-0"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                />
              ) : (
                <motion.img
                  key="akij"
                  src={akijFlourMillsLogo}
                  alt="Akij Flour Mills Ltd."
                  className="h-8 md:h-10 w-auto absolute left-0"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                />
              )}
            </AnimatePresence>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-foreground/80 hover:text-primary font-medium transition-colors duration-200"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-foreground"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav 
              className="md:hidden py-4 border-t border-border"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              {navItems.map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="block py-3 text-foreground/80 hover:text-primary font-medium transition-colors"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  {item.label}
                </motion.a>
              ))}
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;
