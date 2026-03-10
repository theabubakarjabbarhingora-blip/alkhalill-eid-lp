import { useEffect, useRef } from "react";
import gsap from "gsap";
import { MapPin, Phone, Mail, Facebook, Instagram, Youtube } from "lucide-react";
import whiteLogo from "@/assets/white logo-03.png";

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    const cols = footer.querySelectorAll(".gsap-footer-col");
    gsap.set(cols, { opacity: 0, y: 40 });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          gsap.to(cols, { opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: "power3.out" });
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  return (
    <footer id="contact" className="bg-gradient-teal text-primary-foreground py-16" ref={footerRef} style={{ scrollMarginTop: 100 }}>
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div className="gsap-footer-col">
            <img src={whiteLogo} alt="Al Khalil Welfare" className="h-48 w-auto mb-4" loading="lazy" />
            <p className="text-primary-foreground/75 text-sm leading-relaxed">
              A society where every child is educated, every family has food on their table,
              every home has clean water, and every person has access to healthcare, dignity,
              and opportunity.
            </p>
            <div className="flex items-center gap-3 mt-6">
              <a href="https://www.facebook.com/alkhalilwelfare" target="_blank" rel="noopener noreferrer" className="h-9 w-9 rounded-full bg-white/10 flex items-center justify-center text-primary-foreground/75 hover:bg-white/20 hover:text-gold transition-all">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://twitter.com/alkhalilwelfare" target="_blank" rel="noopener noreferrer" className="h-9 w-9 rounded-full bg-white/10 flex items-center justify-center text-primary-foreground/75 hover:bg-white/20 hover:text-gold transition-all">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true"><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932 6.064-6.932zm-1.294 19.497h2.039L6.486 3.24H4.298l13.309 17.41z"></path></svg>
              </a>
              <a href="https://www.instagram.com/alkhalilwelfare" target="_blank" rel="noopener noreferrer" className="h-9 w-9 rounded-full bg-white/10 flex items-center justify-center text-primary-foreground/75 hover:bg-white/20 hover:text-gold transition-all">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://www.youtube.com/@alkhalilwelfare" target="_blank" rel="noopener noreferrer" className="h-9 w-9 rounded-full bg-white/10 flex items-center justify-center text-primary-foreground/75 hover:bg-white/20 hover:text-gold transition-all">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div className="gsap-footer-col">
            <h3 className="font-display text-lg font-semibold mb-4">Quick Links</h3>
            <nav className="space-y-2">
              {[
                { label: "Home", href: "#home" },
                { label: "About Us", href: "#about" },
                { label: "Our Services", href: "#services" },
                { label: "Donate", href: "#iftarFormSection" },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="block text-primary-foreground/75 hover:text-gold transition-colors text-sm hover:translate-x-1 transform duration-200"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          <div className="gsap-footer-col">
            <h3 className="font-display text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 mt-0.5 text-primary-foreground shrink-0" />
                <div>
                  <a href="tel:+923337299566" className="text-sm hover:text-gold transition-colors">
                    +92 333 7299566
                  </a>
                  <br />
                  <a href="tel:+923342341665" className="text-sm hover:text-gold transition-colors">
                    +92 334 2341665
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-primary-foreground shrink-0" />
                <a href="mailto:info@alkhalilwelfare.org" className="text-sm hover:text-gold transition-colors">
                  info@alkhalilwelfare.org
                </a>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 text-primary-foreground shrink-0" />
                <p className="text-sm text-primary-foreground/75">
                  446-449/3 Bahadurabad, Karachi, Pakistan.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <a href="https://www.alkhalilwelfare.org" target="_blank" rel="noopener noreferrer" className="text-sm hover:text-gold transition-colors ml-7">
                  www.alkhalilwelfare.org
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-6 text-center text-xs text-primary-foreground">
          Copyright © alkhalilwelfare.org {new Date().getFullYear()} All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
