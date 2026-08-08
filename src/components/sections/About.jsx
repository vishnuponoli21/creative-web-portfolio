import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import styles from "../sections/css/CTA.module.css";

import resume from "../../assets/VISHNU_PONOLI_RESUME.pdf";

import img1 from "../../assets/work1.jpg";
import img2 from "../../assets/work2.jpg";
import img3 from "../../assets/work3.jpg";
import img4 from "../../assets/work4.jpg";
import img5 from "../../assets/work5.jpg";
import img6 from "../../assets/work3.jpg";
import img7 from "../../assets/work1.jpg";
import img8 from "../../assets/work2.jpg";

import { analytics } from "../../firebase/firebase";
import { logEvent } from "firebase/analytics";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef();

  const images = [img1, img2, img3, img4, img5, img6, img7, img8];

  const [activeIndex, setActiveIndex] = useState(0);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    if (analytics) {
      logEvent(analytics, "about_section_view", { section: "about" });
    }
  }, []);

  const handleClick = () => {
    setClicked(true);
    setTimeout(() => setClicked(false), 200);

    window.open(resume, "_blank");

    if (analytics) {
      logEvent(analytics, "cv_download_click", {
        file: "VISHNU_PONOLI_RESUME.pdf",
      });
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  useGSAP(
    () => {
      gsap.from(".about-text", {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });

      gsap.from(".about-img", {
        scale: 0.9,
        opacity: 0,
        y: 40,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });
    },
    { scope: sectionRef },
  );

  useEffect(() => {
    gsap.fromTo(
      ".dynamic-image",
      { opacity: 0, scale: 1.08 },
      {
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: "power3.out",
      },
    );
  }, [activeIndex]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full bg-black text-white overflow-hidden flex items-center"
    >
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] md:w-[900px] h-[500px] md:h-[900px] rounded-full bg-cyan-500/10 blur-[200px]" />
      </div>

      <div className="relative z-10 w-full px-6 py-16 md:py-24">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* LEFT */}
          <div className="relative z-20">
            <h2
              className={`${styles.head} about-text text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight`}
            >
              Designer & Developer
              <br />
              Crafting Real-World Impact
            </h2>

            <p className="about-text mt-5 md:mt-6 text-white/60 leading-relaxed max-w-xl text-sm md:text-base">
              I work across UI/UX design, frontend development, branding and
              visual storytelling.
            </p>

            {/* STATS */}
            <div className="about-text mt-8 md:mt-10 grid grid-cols-3 gap-4 md:gap-6 text-center lg:text-left">
              <div>
                <h3 className="text-2xl md:text-3xl font-semibold">50+</h3>
                <p className="text-white/50 text-xs md:text-sm">Projects</p>
              </div>

              <div>
                <h3 className="text-2xl md:text-3xl font-semibold">3+</h3>
                <p className="text-white/50 text-xs md:text-sm">Years</p>
              </div>

              <div>
                <h3 className="text-2xl md:text-3xl font-semibold">20+</h3>
                <p className="text-white/50 text-xs md:text-sm">Clients</p>
              </div>
            </div>

            <button
              onClick={handleClick}
              style={{
                position: "relative",
                zIndex: 9999,
              }}
              className={`mt-8 md:mt-10 px-6 py-3 rounded-full bg-white text-black font-medium transition transform duration-200 ${
                clicked ? "scale-95 opacity-80" : "hover:scale-105"
              }`}
            >
              Download CV
            </button>
          </div>

          {/* RIGHT IMAGE GRID */}
          <div className="grid grid-cols-2 gap-3 md:gap-4">
            {/* BIG IMAGE */}
            <div className="about-img col-span-2 rounded-2xl md:rounded-3xl overflow-hidden h-[200px] sm:h-[240px] md:h-[280px] lg:h-[260px] bg-white/5 border border-white/10">
              <img
                key={`large-${activeIndex}`}
                src={images[activeIndex % images.length]}
                className="dynamic-image w-full h-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>

            {/* SMALL LEFT */}
            <div className="about-img rounded-2xl overflow-hidden h-[140px] sm:h-[160px] md:h-[180px] bg-white/5 border border-white/10">
              <img
                key={`left-${activeIndex}`}
                src={images[(activeIndex + 1) % images.length]}
                className="dynamic-image w-full h-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>

            {/* SMALL RIGHT */}
            <div className="about-img rounded-2xl overflow-hidden h-[140px] sm:h-[160px] md:h-[180px] bg-white/5 border border-white/10">
              <img
                key={`right-${activeIndex}`}
                src={images[(activeIndex + 2) % images.length]}
                className="dynamic-image w-full h-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>

            {/* BOTTOM WIDE */}
            <div className="about-img col-span-2 rounded-2xl md:rounded-3xl overflow-hidden h-[160px] sm:h-[180px] md:h-[200px] bg-white/5 border border-white/10">
              <img
                key={`bottom-${activeIndex}`}
                src={images[(activeIndex + 3) % images.length]}
                className="dynamic-image w-full h-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
