import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Building2, MessageCircle, Copy, Check } from "lucide-react";
import FloatingParticles from "@/components/FloatingParticles";

const HowToDonate = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [copied, setCopied] = useState<string | null>(null);

  const copyText = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const heading = section.querySelectorAll(".gsap-donate-heading");
    const cards = section.querySelectorAll(".gsap-donate-card");

    gsap.set(heading, { opacity: 0, y: 30 });
    gsap.set(cards, { opacity: 0, y: 50, rotateY: 15 });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          gsap.to(heading, { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power3.out" });
          gsap.to(cards, {
            opacity: 1, y: 0, rotateY: 0, duration: 0.8, stagger: 0.2,
            ease: "power3.out", delay: 0.3,
          });
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="donate" className="py-20 bg-gradient-teal relative overflow-hidden" ref={sectionRef}>
      <FloatingParticles count={15} color="hsl(38 94% 54% / 0.2)" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <p className="gsap-donate-heading text-primary-foreground font-semibold text-sm uppercase tracking-widest mb-2">
            How to Donate
          </p>
          <h2 className="gsap-donate-heading font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Simple Ways to <span className="text-gradient-gold">Contribute</span>
          </h2>
          <p className="gsap-donate-heading text-primary-foreground/80 max-w-lg mx-auto">
            We have made it simple for you to contribute from anywhere in the world.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto" style={{ perspective: "1000px" }}>
          {/* Bank Transfer */}
          <div className="gsap-donate-card bg-card rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300 hover:-translate-y-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-teal/10 flex items-center justify-center">
                <Building2 className="w-6 h-6 text-teal" />
              </div>
              <div>
                <h3 className="font-display text-xl font-semibold text-foreground">
                  Direct Bank Transfer
                </h3>
                <p className="text-sm text-muted-foreground">Meezan Bank</p>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div className="bg-muted/50 p-3 rounded-lg border border-border/50">
                 <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Eid Package Cost</p>
                 <p className="text-foreground font-bold text-lg">Rs. 5,500</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Account Title</p>
                <p className="text-foreground font-medium text-sm">
                  Maahad ul Khalil Al Islami (Al-Khalil Welfare)
                </p>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Account Number</p>
                  <p className="text-foreground font-mono font-medium">01850112692200</p>
                </div>
                <button
                  onClick={() => copyText("01850112692200", "acc")}
                  className="p-2 hover:bg-muted rounded-lg transition-colors"
                  aria-label="Copy account number"
                >
                  {copied === "acc" ? <Check className="w-4 h-4 text-primary" /> : <Copy className="w-4 h-4 text-muted-foreground" />}
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">IBAN</p>
                  <p className="text-foreground font-mono font-medium text-sm">PK30MEZN0001850112692200</p>
                </div>
                <button
                  onClick={() => copyText("PK30MEZN0001850112692200", "iban")}
                  className="p-2 hover:bg-muted rounded-lg transition-colors"
                  aria-label="Copy IBAN"
                >
                  {copied === "iban" ? <Check className="w-4 h-4 text-primary" /> : <Copy className="w-4 h-4 text-muted-foreground" />}
                </button>
              </div>
            </div>
            
            <div className="pt-6 border-t border-border/10">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">How to Transfer:</p>
              <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside marker:text-teal marker:font-bold">
                <li>Copy the Account Number or IBAN above.</li>
                <li>Open your banking app and select "Send Money".</li>
                <li>Paste the account details and enter amount.</li>
                <li>Confirm the transaction and <strong>save the screenshot</strong>.</li>
              </ol>
            </div>
          </div>

          {/* WhatsApp */}
          <div className="gsap-donate-card bg-card rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300 hover:-translate-y-1 flex flex-col">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-green/10 flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-green" />
              </div>
              <div>
                <h3 className="font-display text-xl font-semibold text-foreground">
                  Upload Payment Proof
                </h3>
                <p className="text-sm text-muted-foreground">Confirm your donation</p>
              </div>
            </div>

            <div className="flex-1 mb-6">
              <p className="text-muted-foreground leading-relaxed mb-4 font-semibold text-foreground">
                Important: Please share a screenshot of your transfer on our WhatsApp for confirmation: 0333-7299566
              </p>
              
              <div className="bg-muted/30 p-4 rounded-xl border border-border/40">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Steps to Upload:</p>
                <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside marker:text-green marker:font-bold">
                  <li>Click the button below to open WhatsApp.</li>
                  <li>Attach the payment screenshot from your gallery.</li>
                  <li>Send your <strong>Name</strong> and <strong>Amount</strong>.</li>
                  <li>Our team will confirm your donation shortly.</li>
                </ol>
              </div>
            </div>

            <a
              href="https://wa.me/923337299566"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#20aa4b] text-primary-foreground px-6 py-3 rounded-full text-center font-semibold hover:scale-105 hover:bg-[#1a8c3e] transition-transform shadow-teal flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-5 h-5" />
              Upload Screenshot via WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowToDonate;
