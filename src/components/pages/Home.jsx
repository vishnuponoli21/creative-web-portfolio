import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

import "../../App.css";

import Navbar from "../layout/Navbar";
import Hero from "../hero/Hero";
import About from "../sections/About";
import Skill from "../sections/Skill";
import Prosection from "../sections/Prosection";
import Packaging from "../sections/Packaging";
import Footer from "../ui/Footer";

import PremiumLoader from "../ui/Loader";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export default function Home() {
  const [loading, setLoading] = useState(true);
  const smootherRef = useRef(null);

  useEffect(() => {
    if (loading) return;

    ScrollSmoother.get()?.kill();

    requestAnimationFrame(() => {
      smootherRef.current = ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: 1.5,
        effects: true,
        normalizeScroll: true,
      });

      ScrollTrigger.refresh();
    });

    return () => {
      smootherRef.current?.kill();
      ScrollTrigger.killAll();
    };
  }, [loading]);

  return (
    <>
      {loading && <PremiumLoader onFinish={() => setLoading(false)} />}

      <div id="smooth-wrapper">
        <div id="smooth-content">
          <section id="hero" className="min-h-screen">
            <Hero />
          </section>

          <section id="about" className="min-h-screen">
            <About />
          </section>

          <section id="skills" className="min-h-screen">
            <Skill />
          </section>

          <section id="projects" className="min-h-screen">
            <Prosection />
          </section>

          <section id="packaging" className="min-h-screen">
            <Packaging />
          </section>

          <section id="footer" className="min-h-screen">
            <Footer />
          </section>
        </div>
      </div>
    </>
  );
}
