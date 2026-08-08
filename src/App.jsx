import { useEffect, useRef, useState } from "react";
import { Routes, Route } from "react-router-dom";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

import PremiumLoader from "./components/ui/Loader";
import Cursor from "./components/ui/Cursor";
import Navbar from "./components/layout/Navbar";

import Home from "./components/pages/Home";
import PackagingPage from "./components/pages/PackagingPage";
import NotFound from "./components/ui/NotFound";

import "./App.css";
import "./index.css";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export default function App() {
  const [loading, setLoading] = useState(true);
  const smootherRef = useRef(null);

  // ✅ INIT SCROLLSMOOTHER ONLY ONCE
  useEffect(() => {
    if (loading) return;

    const init = () => {
      ScrollSmoother.get()?.kill();

      smootherRef.current = ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: 1.4,
        effects: true,
        normalizeScroll: true,
      });

      ScrollTrigger.refresh();
    };

    requestAnimationFrame(init);

    return () => {
      smootherRef.current?.kill();
      ScrollTrigger.killAll();
    };
  }, [loading]);

  return (
    <>
      {loading && <PremiumLoader onFinish={() => setLoading(false)} />}

      <Cursor />

      {/* Navbar OUTSIDE smooth content (IMPORTANT FIX) */}
      <Navbar />

      <div id="smooth-wrapper">
        <div id="smooth-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/packaging" element={<PackagingPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </>
  );
}
