import { useEffect, useRef } from "react";
import gsap from "gsap";

interface AnimationOptions {
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
  threshold?: number;
  stagger?: number;
  childSelector?: string;
}

export const useGsapScroll = (options: AnimationOptions = {}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const {
      from = { opacity: 0, y: 60 },
      to = { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
      threshold = 0.15,
      stagger = 0.1,
      childSelector,
    } = options;

    const targets = childSelector ? el.querySelectorAll(childSelector) : [el];

    gsap.set(targets, from);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          gsap.to(targets, { ...to, stagger });
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  return ref;
};

export const useGsapParallax = (speed = 0.3) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleScroll = () => {
      const rect = el.getBoundingClientRect();
      const scrolled = rect.top * speed;
      gsap.set(el, { y: scrolled });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [speed]);

  return ref;
};
