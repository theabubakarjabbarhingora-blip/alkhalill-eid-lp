import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Shield, Heart, Users } from "lucide-react";
import aboutImg from "@/assets/about.jpg";

const values = [
  { icon: Shield, title: "100% Transparency", desc: "Your donations reach the most deserving families in Karachi and surrounding areas." },
  { icon: Heart, title: "Shariah Compliant", desc: "All Zakat and Sadaqat are handled strictly according to Islamic principles." },
  { icon: Users, title: "Proven Track Record", desc: "Managed by Maahad ul Khalil Al Islami, an institution built on trust and service to humanity." },
];

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const img = section.querySelector(".about-img");
    const textEls = section.querySelectorAll(".gsap-about-text");
    const cards = section.querySelectorAll(".gsap-value-card");

    gsap.set([img, textEls, cards], { opacity: 0 });
    gsap.set(img, { x: -80, rotate: -3, scale: 0.9 });
    gsap.set(textEls, { y: 40 });
    gsap.set(cards, { y: 30, scale: 0.8 });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const tl = gsap.timeline();
          tl.to(img, { opacity: 1, x: 0, rotate: 0, scale: 1, duration: 1, ease: "power3.out" })
            .to(textEls, { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power3.out" }, "-=0.5")
            .to(cards, { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.15, ease: "elastic.out(1, 0.5)" }, "-=0.3");
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="py-20 bg-muted" ref={sectionRef} style={{ scrollMarginTop: 100 }}>
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="about-img rounded-2xl overflow-hidden shadow-2xl group">
              <img
                src={aboutImg}
                alt="Al Khalil Welfare community work"
                className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-1000"
                loading="lazy"
              />
            </div>
          </div>

          <div>
            <p className="gsap-about-text text-secondary font-semibold text-sm uppercase tracking-widest mb-2">
              Who Are We
            </p>
            <h2 className="gsap-about-text font-display text-3xl md:text-4xl font-bold text-gold mb-6">
              About <span className="text-gradient-gold">Al-Khalil Welfare</span>
            </h2>
            <p className="gsap-about-text text-muted-foreground leading-relaxed mb-4">
              Al Khalil Welfare is a community-driven organization dedicated to
              serving humanity with compassion. Operated under the supervision of
              Maahad ul Khalil Al Islami, we are committed to Service, Integrity,
              and Humanity.
            </p>
            <p className="gsap-about-text text-muted-foreground leading-relaxed mb-6">
              We empower orphans, widows, and underprivileged families through
              relief, development, and sustainable projects. Based in Bahadurabad,
              Karachi, we work tirelessly to ensure your donations reach the most
              deserving individuals.
            </p>

            <div className="grid grid-cols-3 gap-4">
              {values.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="gsap-value-card text-center p-4 bg-card rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-2 transition-all duration-300">
                  <Icon className="w-8 h-8 text-teal mx-auto mb-2" />
                  <p className="font-semibold text-foreground text-sm">{title}</p>
                  <p className="text-xs text-muted-foreground mt-1">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
