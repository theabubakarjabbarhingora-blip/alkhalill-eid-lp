import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Utensils, Gift, Shirt, Heart } from "lucide-react";
import BannerSlider from "@/components/BannerSlider";

const services = [
  { icon: Utensils, title: "Essential Food Items", desc: "Flour, sugar, pulses, and cooking oil." },
  { icon: Gift, title: "Eid Specialities", desc: "Vermicelli, dates, and sweets." },
  { icon: Shirt, title: "New Apparel", desc: "Bringing the joy of new clothes to those who rarely get them." },
  { icon: Heart, title: "A Sense of Belonging", desc: "Showing them that the community cares." },
];

const ServicesSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const heading = section.querySelectorAll(".gsap-heading");
    const cards = section.querySelectorAll(".gsap-service-card");
    const slider = section.querySelector(".gsap-service-slider");

    gsap.set(heading, { opacity: 0, y: 30 });
    gsap.set(cards, { opacity: 0, y: 50, scale: 0.85 });
    gsap.set(slider, { opacity: 0, y: 40, scale: 0.98 });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const tl = gsap.timeline();
          tl.to(heading, { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power3.out" })
            .to(cards, {
              opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.08,
              ease: "back.out(1.7)",
            }, "-=0.3")
            .to(slider, { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "power3.out" }, "-=0.3");
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="services" className="py-20 bg-background" ref={sectionRef} style={{ scrollMarginTop: 100 }}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="gsap-heading text-gold font-semibold text-sm uppercase tracking-widest mb-2">
            Why it Matters
          </p>
          <h2 className="gsap-heading font-display text-3xl md:text-4xl font-bold text-gold mb-4">
            The <span className="text-gradient-gold">Impact</span>
          </h2>
          <p className="gsap-heading text-muted-foreground max-w-2xl mx-auto">
            While we prepare for festivities with our families, thousands of orphans and widows wait in hope. Your contribution ensures they aren't left behind.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {services.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="gsap-service-card bg-card rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-border group hover:-translate-y-2 cursor-default"
            >
              <div className="w-12 h-12 rounded-xl bg-teal/10 flex items-center justify-center mb-4 group-hover:bg-teal group-hover:text-primary-foreground transition-colors duration-300 group-hover:rotate-6 group-hover:scale-110">
                <Icon className="w-6 h-6 text-teal group-hover:text-primary-foreground transition-colors duration-300" />
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground mb-2">{title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        <div className="gsap-service-slider rounded-2xl overflow-hidden shadow-xl max-w-5xl mx-auto">
          <BannerSlider />
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
