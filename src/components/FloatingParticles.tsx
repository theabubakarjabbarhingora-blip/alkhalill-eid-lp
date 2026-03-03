import { useEffect, useRef } from "react";
import gsap from "gsap";

interface Props {
  count?: number;
  color?: string;
  className?: string;
}

const FloatingParticles = ({ count = 20, color = "hsl(38 80% 55%)", className = "" }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const particles: HTMLDivElement[] = [];

    for (let i = 0; i < count; i++) {
      const particle = document.createElement("div");
      const size = Math.random() * 6 + 2;
      particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        background: ${color};
        opacity: 0;
        pointer-events: none;
      `;
      container.appendChild(particle);
      particles.push(particle);

      const animate = () => {
        gsap.set(particle, {
          x: Math.random() * container.offsetWidth,
          y: Math.random() * container.offsetHeight,
          opacity: 0,
          scale: 0,
        });

        gsap.to(particle, {
          y: `-=${Math.random() * 200 + 100}`,
          x: `+=${Math.random() * 100 - 50}`,
          opacity: Math.random() * 0.5 + 0.1,
          scale: 1,
          duration: Math.random() * 4 + 3,
          ease: "none",
          onComplete: () => {
            gsap.to(particle, {
              opacity: 0,
              scale: 0,
              duration: 1,
              onComplete: animate,
            });
          },
        });
      };

      // Stagger the start
      gsap.delayedCall(Math.random() * 3, animate);
    }

    return () => {
      particles.forEach((p) => p.remove());
    };
  }, [count, color]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
    />
  );
};

export default FloatingParticles;
