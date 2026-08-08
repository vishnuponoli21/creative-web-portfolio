import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import styles from "../sections/css/CTA.module.css";

import { analytics } from "../../firebase/firebase";
import { logEvent } from "firebase/analytics";

gsap.registerPlugin(ScrollTrigger);

export default function Skills() {
  const sectionRef = useRef(null);
  const hasTrackedView = useRef(false);

  // ---------------- TRACK VIEW ----------------
  useEffect(() => {
    if (!hasTrackedView.current && analytics) {
      logEvent(analytics, "skills_section_view", { section: "skills" });
      hasTrackedView.current = true;
    }
  }, []);

  // ---------------- ANIMATION ----------------
  useGSAP(
    () => {
      const cards = gsap.utils.toArray(".skill-card");

      gsap.set(cards, { opacity: 0, y: 50 });

      gsap.to(cards, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
          invalidateOnRefresh: true,
        },
      });

      return () => {
        ScrollTrigger.getAll().forEach((t) => t.kill());
      };
    },
    { scope: sectionRef },
  );

  const trackSkillInteraction = (skill) => {
    if (analytics) {
      logEvent(analytics, "skill_card_interaction", { skill });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full bg-black text-white overflow-hidden flex items-center justify-center py-16 md:py-24"
    >
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] md:w-[900px] h-[500px] md:h-[900px] rounded-full bg-purple-500/10 blur-[200px]" />
      </div>

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6">
        {/* HEADER */}
        <div className="text-center mb-10 md:mb-12">
          <h2
            className={`${styles.head} text-3xl sm:text-4xl lg:text-5xl font-semibold`}
          >
            Skills & Expertise
          </h2>

          <p className="mt-4 md:mt-5 text-white/60 max-w-3xl mx-auto text-sm md:text-base leading-relaxed">
            Combining design, development, branding, visualization and motion to
            create premium digital experiences from concept to final delivery.
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {/* UI/UX */}
          <div
            onClick={() => trackSkillInteraction("UI/UX Design")}
            className="skill-card lg:col-span-2 rounded-[20px] md:rounded-[30px] border border-white/10 bg-white/[0.04] backdrop-blur-xl p-6 md:p-8 relative overflow-hidden group transition-all duration-500 hover:-translate-y-2"
          >
            <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-purple-500/10 blur-3xl opacity-0 group-hover:opacity-100 transition duration-700" />
            <div className="text-white/20 text-4xl md:text-5xl font-bold mb-3 md:mb-4">
              01
            </div>
            <h3 className="text-xl md:text-3xl font-semibold mb-3 md:mb-4">
              UI/UX Design
            </h3>
            <p className="text-white/60 text-sm md:text-base max-w-lg">
              User-centered experiences, wireframing, prototyping, design
              systems and interaction design.
            </p>
          </div>

          {/* Frontend */}
          <div
            onClick={() => trackSkillInteraction("Frontend Development")}
            className="skill-card lg:col-span-2 rounded-[20px] md:rounded-[30px] border border-white/10 bg-white/[0.04] backdrop-blur-xl p-6 md:p-8 relative overflow-hidden group transition-all duration-500 hover:-translate-y-2"
          >
            <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-cyan-500/10 blur-3xl opacity-0 group-hover:opacity-100 transition duration-700" />
            <div className="text-white/20 text-4xl md:text-5xl font-bold mb-3 md:mb-4">
              02
            </div>
            <h3 className="text-xl md:text-3xl font-semibold mb-3 md:mb-4">
              Frontend Development
            </h3>
            <p className="text-white/60 text-sm md:text-base max-w-lg">
              Responsive websites, animations, modern UI systems built with
              React, GSAP and Tailwind CSS.
            </p>
          </div>

          {/* Small Cards */}
          <SkillCard
            number="03"
            title="Brand Identity"
            desc="Logo design, typography systems and visual branding."
            tags={["Logo", "Typography"]}
            onInteract={trackSkillInteraction}
          />
          <SkillCard
            number="04"
            title="Packaging Design"
            desc="Packaging concepts, dielines and print-ready artwork."
            tags={["Dielines", "Print"]}
            onInteract={trackSkillInteraction}
          />
          <SkillCard
            number="05"
            title="Video Editing"
            desc="Product videos, motion graphics and social media content."
            tags={["CapCut", "Motion"]}
            onInteract={trackSkillInteraction}
          />
          <SkillCard
            number="06"
            title="3D Visualization"
            desc="Product rendering, lighting and presentation visuals."
            tags={["Blender", "Rendering"]}
            onInteract={trackSkillInteraction}
          />
        </div>
      </div>
    </section>
  );
}

/* ---------------- SKILL CARD ---------------- */

function SkillCard({ number, title, desc, tags, onInteract }) {
  return (
    <div
      onClick={() => onInteract(title)}
      className="skill-card rounded-[18px] md:rounded-[24px] border border-white/10 bg-white/[0.04] backdrop-blur-xl p-4 md:p-5 relative overflow-hidden group transition-all duration-500 hover:-translate-y-2"
    >
      <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/5 blur-3xl opacity-0 group-hover:opacity-100 transition duration-700" />

      <div className="text-white/20 text-2xl md:text-3xl font-bold mb-2">
        {number}
      </div>

      <h3 className="text-base md:text-lg font-semibold mb-2">{title}</h3>

      <p className="text-white/60 text-xs md:text-sm mb-3">{desc}</p>

      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="px-2 py-1 text-[10px] rounded-full bg-white/5 border border-white/10 text-white/70"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
