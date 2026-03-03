import { useEffect, useRef } from "react";
import gsap from "gsap";
import hero1 from "@/assets/hero1.jpg";

const WhyContribute = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const textEls = section.querySelectorAll(".gsap-text");
    const listItems = section.querySelectorAll(".gsap-list-item");

    gsap.set([textEls, listItems], { opacity: 0, y: 40 });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          gsap.to(textEls, {
            opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: "power3.out",
          });
          gsap.to(listItems, {
            opacity: 1, y: 0, duration: 0.5, stagger: 0.1, delay: 0.5, ease: "back.out(1.7)",
          });
          if (imageRef.current) {
            gsap.fromTo(imageRef.current,
              { opacity: 0, x: 80, rotate: 3 },
              { opacity: 1, x: 0, rotate: 0, duration: 1, ease: "power3.out", delay: 0.3 }
            );
          }
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="gsap-text text-secondary font-semibold text-sm uppercase tracking-widest mb-2">
              Why It Matters
            </p>
            <h2 className="gsap-text font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
              The Impact of <span className="text-gradient-gold">Giving This Eid</span>
            </h2>

            <p className="gsap-text text-muted-foreground leading-relaxed mb-6">
              While we prepare for festivities with our families, thousands of orphans and widows wait in hope. Your contribution ensures they aren't left behind.
            </p>

            <h3 className="gsap-text font-display text-xl font-semibold text-foreground mb-4">
              "Tuhfa-e-Eid" Package Includes{" "}
              <span className="text-secondary">(Rs. 5,500)</span>
            </h3>
            <ul className="space-y-2">
              {["Essential Food Items: Flour, sugar, pulses, and cooking oil.", "Eid Specialities: Vermicelli, dates, and sweets.", "New Apparel: Bringing the joy of new clothes.", "A Sense of Belonging: Showing them that the community cares."].map(
                (item) => (
                  <li key={item} className="gsap-list-item flex items-center gap-3 text-foreground">
                    <span className="w-2 h-2 rounded-full bg-secondary shrink-0" />
                    {item}
                  </li>
                )
              )}
            </ul>
          </div>

          <div ref={imageRef} className="relative opacity-0">
            <div className="rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-shadow duration-500 group">
              <img
                src={hero1}
                alt="Al-Khalil Welfare volunteers preparing Iftar boxes"
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-gradient-teal text-primary-foreground px-6 py-3 rounded-xl shadow-teal">
              <p className="text-2xl font-bold">Rs. 5,500</p>
              <p className="text-xs opacity-80">per Eid package</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyContribute;
