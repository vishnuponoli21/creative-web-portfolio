import { useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import styles from "../hero/Hero.module.css";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import Scene from "../threed/Scene";
import { analytics } from "../../firebase/firebase";
import { logEvent } from "firebase/analytics";

export default function Hero() {
  const heroRef = useRef();

  const scrollToSection = (id) => {
    const smoother = ScrollSmoother.get();
    const el = document.querySelector(id);
    if (!smoother || !el) return;

    if (analytics) {
      logEvent(analytics, "hero_cta_click", { target: id });
    }

    smoother.scrollTo(el, true, "power3.inOut");
  };

  useEffect(() => {
    if (analytics) {
      logEvent(analytics, "hero_section_view", { section: "hero" });
    }
  }, []);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-kicker", {
        opacity: 0,
        y: 10,
        duration: 0.6,
        ease: "power2.out",
      });

      gsap.from(".hero-title span", {
        opacity: 0,
        y: 30,
        duration: 0.7,
        stagger: 0.05,
        ease: "power2.out",
      });

      gsap.from(".hero-sub", {
        opacity: 0,
        y: 10,
        duration: 0.6,
        delay: 0.1,
      });

      gsap.from(".hero-name", {
        opacity: 0,
        y: 8,
        duration: 0.5,
        delay: 0.1,
      });

      gsap.from(".hero-btn button", {
        opacity: 0,
        y: 10,
        duration: 0.5,
        stagger: 0.08,
        delay: 0.15,
      });

      gsap.from(".hero-right", {
        opacity: 0,
        x: 10,
        duration: 0.6,
        delay: 0.1,
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen w-full overflow-hidden bg-[#050505] text-white flex items-center"
    >
      {/* BACKGROUND */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-[#050505] to-black" />

        <div className="absolute top-1/2 left-1/2 w-[500px] md:w-[900px] h-[500px] md:h-[900px] -translate-x-1/2 -translate-y-1/2 bg-violet-600/20 blur-[160px] rounded-full" />

        <div className="absolute inset-0 opacity-[0.05] bg-[radial-gradient(#ffffff_1px,transparent_1px)] bg-[length:20px_20px]" />
        {/* CENTER */}
        <div className="absolute h-full w-full grid-rows-3">
          <div className="h-full w-full">
            <Scene />
          </div>
          {/* <div className="h-1/4"></div>
          <div className="flex h-[600px] items-center justify-end">
            <Scene />
          </div>
          <div className="h-1/3"></div> */}
        </div>
      </div>

      {/* MAIN */}
      <div className="relative z-30 w-full max-w-[1400px] mx-auto px-6 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 items-center gap-12">
          {/* LEFT */}
          <div className="space-y-6 text-center lg:text-left">
            <p className="hero-kicker text-white/40 tracking-[0.25em] uppercase text-[10px] md:text-[11px]">
              UI / UX • FRONTEND • 3D • GRAPHIC • PACKAGING DESIGN
            </p>

            <h1 className="hero-title text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-semibold leading-[1.05]">
              <span className="block">Crafting</span>
              <span className="block text-white/90">Digital</span>
              <span className="block text-white/90">Experiences</span>
            </h1>

            <p className="hero-name text-white/40 text-xs md:text-sm tracking-[0.25em] uppercase">
              Vishnu Ponoli
            </p>

            <p className="hero-sub text-white/60 max-w-md mx-auto lg:mx-0 text-sm md:text-base leading-relaxed">
              I design refined digital products with focus on clarity, motion,
              and high-end visual storytelling.
            </p>

            {/* CTA */}
            <div className="hero-btn flex flex-col sm:flex-row gap-3 pt-2">
              <button
                className="px-6 py-3 rounded-full bg-white text-black font-medium"
                onClick={() => scrollToSection("#projects")}
              >
                View Work
              </button>

              <button
                className="px-6 py-3 rounded-full border border-white/20 text-white"
                onClick={() => scrollToSection("#footer")}
              >
                Contact
              </button>
            </div>
          </div>

          {/* CENTER */}
          <div className="hidden lg:flex justify-center items-center relative">
            <div className="absolute w-[520px] h-[520px] bg-violet-500/20 blur-[140px] rounded-full" />
          </div>

          {/* RIGHT */}
          <div className="hero-right flex flex-col items-center lg:items-end text-center lg:text-right space-y-6">
            <p className="text-white/50 text-sm leading-relaxed max-w-sm">
              Minimal systems. Maximum clarity. Every interface is designed with
              precision and intention.
            </p>

            <div className="text-white/30 text-xs tracking-widest">
              AVAILABLE FOR WORK
            </div>
          </div>
        </div>
      </div>

      {/* SCROLL INDICATOR */}
      <div className="absolute bottom-6 md:bottom-8 right-6 md:right-8 flex flex-col items-center">
        <div className={styles.mouse}>
          <span className={styles.dot} />
        </div>
        <h2 className={styles.scroll_text}>Scroll down</h2>
      </div>
    </section>
  );
}
