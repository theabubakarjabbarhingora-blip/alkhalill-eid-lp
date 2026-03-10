import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import gsap from "gsap";

const reviews = [
  {
    name: "Ahmed Khan",
    text: "Al-Khalil Welfare has been a beacon of hope in our community. Their Iftar campaign last Ramadan fed hundreds of families. Truly inspiring work!",
    role: "Community Member",
  },
  {
    name: "Fatima Zahra",
    text: "I donated for 10 Iftar boxes and received updates with photos. The transparency and dedication of this organization is remarkable. May Allah bless them.",
    role: "Regular Donor",
  },
  {
    name: "Muhammad Bilal",
    text: "Their education program changed my nephew's life. From a struggling student to top of his class. Al-Khalil Welfare truly cares about the future of our children.",
    role: "Beneficiary Family",
  },
  {
    name: "Ayesha Siddiqui",
    text: "As a volunteer, I've seen firsthand the impact of every donation. The team works day and night during Ramadan to ensure every box reaches those in need.",
    role: "Volunteer",
  },
];

const ReviewsSlider = () => {
  const [current, setCurrent] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const heading = section.querySelectorAll(".gsap-review-heading");
    gsap.set(heading, { opacity: 0, y: 30 });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          gsap.to(heading, { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: "power3.out" });
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-20 bg-muted" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="gsap-review-heading text-secondary font-semibold text-sm uppercase tracking-widest mb-2">
            Testimonials
          </p>
          <h2 className="gsap-review-heading font-display text-3xl md:text-4xl font-bold text-foreground">
            What People <span className="text-gradient-gold">Say</span>
          </h2>
        </div>

        <div className="relative max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 50, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -50, scale: 0.95 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="bg-card rounded-2xl p-8 md:p-12 shadow-lg text-center hover:shadow-xl transition-shadow duration-300"
            >
              <Quote className="w-10 h-10 text-secondary/30 mx-auto mb-4" />
              <p className="text-foreground text-lg md:text-xl leading-relaxed mb-6 italic">
                "{reviews[current].text}"
              </p>
              <p className="font-semibold text-foreground">{reviews[current].name}</p>
              <p className="text-sm text-muted-foreground">{reviews[current].role}</p>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={() => setCurrent((prev) => (prev - 1 + reviews.length) % reviews.length)}
              className="w-10 h-10 rounded-full bg-card shadow-md flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110"
              aria-label="Previous review"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex gap-2">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    i === current ? "bg-secondary scale-125" : "bg-border hover:bg-muted-foreground"
                  }`}
                  aria-label={`Go to review ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={() => setCurrent((prev) => (prev + 1) % reviews.length)}
              className="w-10 h-10 rounded-full bg-card shadow-md flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110"
              aria-label="Next review"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSlider;
