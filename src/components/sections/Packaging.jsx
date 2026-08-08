import boxvideo from "../../assets/box.webm";
import wilderlogo from "../../assets/wilder_logo.png";
import styles from "../sections/css/CTA.module.css";

import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import { analytics } from "../../firebase/firebase";
import { logEvent } from "firebase/analytics";

gsap.registerPlugin(ScrollTrigger);

export default function Packaging() {
  const sectionRef = useRef(null);
  const hasTrackedView = useRef(false);

  useEffect(() => {
    if (!hasTrackedView.current && analytics) {
      logEvent(analytics, "packaging_section_view", {
        section: "packaging",
      });
      hasTrackedView.current = true;
    }
  }, []);

  const handleExploreClick = () => {
    if (analytics) {
      logEvent(analytics, "packaging_explore_click", {
        source: "cta_button",
      });
    }
  };

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const video = section.querySelector("video");
      const logo = section.querySelector(".cta-logo");

      gsap.to(video, {
        scale: 1.1,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      const textItems = gsap.utils.toArray(
        ".cta-text h1, .cta-text h4, .cta-text p",
      );

      gsap.from(textItems, {
        x: -120,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        stagger: 0.15,
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
        },
      });

      gsap.to(logo, {
        y: -20,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full overflow-hidden bg-black isolate"
    >
      {/* VIDEO */}
      <video
        className="absolute inset-0 w-full h-full object-cover will-change-transform"
        src={boxvideo}
        autoPlay
        loop
        muted
        playsInline
      />

      {/* OVERLAY */}
      <div className="absolute inset-0 z-10 bg-black/60 pointer-events-none" />

      {/* CONTENT */}
      <div className="absolute inset-0 z-20 flex items-center justify-center lg:justify-start px-6 md:px-12 lg:px-16">
        <div className="cta-text w-full md:w-3/4 lg:w-2/4 text-white text-center lg:text-left">
          <h1
            className={`${styles.head} mb-6 md:mb-10 text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight`}
          >
            Packaging Design & <br />
            Brand Identity
          </h1>
          <h4
            className={`${styles.subhead} mb-6 md:mb-10 text-lg sm:text-xl md:text-2xl`}
          >
            From Concept to Shelf-Ready Packaging
          </h4>
          <p
            className={`${styles.ptext} text-sm sm:text-base md:text-lg lg:text-xl opacity-90 max-w-2xl mx-auto lg:mx-0`}
          >
            Brand Strategy • Logo Design • Packaging Design • Dieline
            Development • Print Production • CMYK Prepress • 3D Visualization •
            Product Presentation
          </p>
          {/* BUTTON (FIXED VISIBILITY ONLY) */}{" "}
          {/* <Link
              // to="/packaging"
              // onClick={handleExploreClick}
              className="cta-button mt-8 md:mt-10 mx-auto lg:mx-0 w-52 px-6 py-4 
            rounded-2xl bg-white/10 text-white font-semibold text-sm md:text-lg 
            text-center hover:bg-white/25 transition inline-block relative z-[60]"
            >
              Explore
            </Link> */}
          <a
            href="https://www.behance.net/vishnuponoli_creativ/projects"
            className="cta-button mt-8 md:mt-10 mx-auto lg:mx-0 w-52 px-6 py-4 
            rounded-2xl bg-white/10 text-white font-semibold text-sm md:text-lg 
            text-center hover:bg-white/25 transition inline-block relative z-[60]"
          >
            {" "}
            Explore
          </a>
        </div>
      </div>

      {/* LOGO */}
      <img
        src={wilderlogo}
        alt="Wilder Logo"
        className="cta-logo absolute top-4 right-4 md:top-10 md:right-10 z-30 w-20 md:w-28 lg:w-32"
        loading="lazy"
        decoding="async"
      />
    </section>
  );
}
