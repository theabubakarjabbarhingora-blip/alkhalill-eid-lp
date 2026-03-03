import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import whiteLogo from "@/assets/white logo-03.png";
import oldLogo from "@/assets/logo.png";
import { motion, AnimatePresence } from "framer-motion";
const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Donate", href: "#iftarFormSection" },
  { label: "Contact", href: "#contact" },
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (e: any, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const id = href.slice(1);
      const el = document.getElementById(id);
      if (el) {
        if (el.scrollIntoView) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        } else {
          const headerEl = document.querySelector("header") as HTMLElement | null;
          const offset = headerEl ? headerEl.offsetHeight : 0;
          const top = el.getBoundingClientRect().top + window.scrollY - offset - 8;
          window.scrollTo({ top, behavior: "smooth" });
        }
      }
      setMobileOpen(false);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-card/95 backdrop-blur-md shadow-lg py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-2 shrink-0">
          <img
            src={scrolled ? oldLogo : whiteLogo}
            alt="Al Khalil Welfare Logo"
            className={`w-auto object-contain transition-all duration-300 ${
              scrolled ? "h-24 md:h-28" : "h-24 md:h-28"
            }`}
            loading="eager"
          />
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className={`text-sm font-medium tracking-wide transition-colors hover:text-gold ${
                scrolled ? "text-foreground" : "text-primary-foreground"
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden lg:flex items-center gap-4">
          <a
            href="#iftarFormSection"
            onClick={(e) => handleNavClick(e, "#iftarFormSection")}
            className="bg-gradient-gold text-primary-foreground px-6 py-2.5 rounded-full text-sm font-semibold shadow-gold hover:scale-105 transition-transform"
          >
            Donate Now
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className={`lg:hidden p-2 ${scrolled ? "text-foreground" : "text-primary-foreground"}`}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-card/98 backdrop-blur-md border-t border-border overflow-hidden"
          >
            <nav className="container mx-auto px-4 py-4 flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`${scrolled ? "text-black" : "text-primary-foreground"} font-medium py-2 border-b border-border/50`}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#iftarFormSection"
                onClick={(e) => handleNavClick(e, "#iftarFormSection")}
                className="bg-gradient-gold text-primary-foreground px-6 py-3 rounded-full text-center font-semibold shadow-gold mt-2"
              >
                Donate Now
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
