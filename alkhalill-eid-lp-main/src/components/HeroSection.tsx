import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Heart, ArrowDown } from "lucide-react";
import gsap from "gsap";
import heroBg from "@/assets/hero-bg.jpg";
import FloatingParticles from "@/components/FloatingParticles";

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 });

    // Animate the background with a subtle zoom
    if (sectionRef.current) {
      const bg = sectionRef.current.querySelector(".hero-bg-img") as HTMLElement;
      if (bg) {
        gsap.fromTo(bg, { scale: 1.15 }, { scale: 1, duration: 2.5, ease: "power2.out" });
      }
    }

    // Stagger headline words
    if (headlineRef.current) {
      const words = headlineRef.current.querySelectorAll(".hero-word");
      tl.fromTo(
        words,
        { opacity: 0, y: 50, rotateX: -40 },
        { opacity: 1, y: 0, rotateX: 0, duration: 0.7, stagger: 0.08, ease: "back.out(1.7)" },
        0.4
      );
    }

    // CTA buttons bounce in
    if (ctaRef.current) {
      const buttons = ctaRef.current.querySelectorAll("a");
      tl.fromTo(
        buttons,
        { opacity: 0, scale: 0.5, y: 30 },
        { opacity: 1, scale: 1, y: 0, duration: 0.6, stagger: 0.15, ease: "elastic.out(1, 0.5)" },
        "-=0.3"
      );
    }
  }, []);

  // Parallax on mouse move
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleMouse = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth - 0.5) * 20;
      const y = (clientY / window.innerHeight - 0.5) * 20;
      const bg = section.querySelector(".hero-bg-img") as HTMLElement;
      if (bg) {
        gsap.to(bg, { x, y, duration: 1, ease: "power2.out" });
      }
    };

    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  const headlineText = "This Eid, Give the Gift of a Smile.";
  const subHeadline = "For just Rs. 5,500, you can provide a complete Eid Package to an orphaned child or a widowed mother. Turn your Zakat and Sadaqah into someone’s celebration.";

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ scrollMarginTop: 100 }}
    >
      {/* Background Image with parallax */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt="Ramadan Iftar Scene"
          className="hero-bg-img w-full h-full object-cover will-change-transform"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-hero" />
      </div>

      {/* Floating Particles */}
      <FloatingParticles count={25} color="hsl(38 94% 54% / 0.4)" />
      <FloatingParticles count={15} color="hsl(190 99% 36% / 0.3)" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-24 text-center max-w-4xl">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-primary-foreground font-arabic text-lg md:text-xl mb-4 tracking-wider mt-6 md:mt-10"
        >
          بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِیْمِ
        </motion.p>

        <h1
          ref={headlineRef}
          className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight mb-2"
          style={{ perspective: "800px" }}
        >
          {headlineText.split(" ").map((word, i) => (
            <span key={i} className="hero-word inline-block mr-[0.3em] opacity-0">
              {word}
            </span>
          ))}
          <br />
          <span className="text-gold drop-shadow-[0_3px_6px_rgba(0,0,0,0.6)]">
            {subHeadline.split(" ").map((word, i) => (
              <span key={i} className="hero-word inline-block mr-[0.3em] opacity-0">
                {word}
              </span>
            ))}
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="text-primary-foreground font-semibold text-base md:text-lg max-w-2xl mx-auto mb-8 mt-6 leading-relaxed"
        >
          Join Al-Khalil Welfare in our mission to serve the community. For just{" "}
          <span className="font-semibold text-primary-foreground">Rs. 5,500</span>, you can
          provide a complete Eid Package to someone in need and share in the
          joy of this blessed occasion.
        </motion.p>

        <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#iftarFormSection"
            aria-label="Donate Now"
            className="bg-gradient-gold text-primary-foreground w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-full text-base sm:text-lg font-semibold shadow-gold hover:scale-105 hover:shadow-2xl transition-transform flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-transparent opacity-0"
          >
            <Heart className="w-5 h-5" />
            Donate Now
          </a>
          <a
            href="https://wa.me/923337299566"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat with us on WhatsApp"
            className="border-2 border-primary-foreground/40 text-primary-foreground w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-full text-base sm:text-lg font-medium hover:border-gold hover:text-gold transition-colors focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-transparent opacity-0"
          >
            Chat with us on WhatsApp
          </a>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <ArrowDown className="w-6 h-6 text-primary-foreground/60" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
