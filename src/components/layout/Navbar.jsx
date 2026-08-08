import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ScrollSmoother } from "gsap/ScrollSmoother";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToSection = async (route, id) => {
    // 1. If not on home → navigate first
    if (location.pathname !== route) {
      await navigate(route);

      // wait for page render
      setTimeout(() => {
        const el = document.querySelector(id);
        const smoother = ScrollSmoother.get();

        if (el && smoother) {
          smoother.scrollTo(el, true, "power3.inOut");
        }
      }, 150);

      return;
    }

    // 2. If already on same page → direct scroll
    const el = document.querySelector(id);
    const smoother = ScrollSmoother.get();

    if (el && smoother) {
      smoother.scrollTo(el, true, "power3.inOut");
    } else if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="fixed top-0 w-full z-50 px-6 py-4">
      <div
        className="max-w-6xl mx-auto flex justify-between items-center
        bg-white/10 backdrop-blur-xl border border-white/10 rounded-xl px-6 py-3"
      >
        <div className="font-bold text-white">
          <button onClick={() => scrollToSection("/", "#hero")}>
            VISHNU PONOLI
          </button>
        </div>

        <div className="flex gap-6 text-white/70">
          <button onClick={() => scrollToSection("/", "#about")}>About</button>

          <button onClick={() => scrollToSection("/", "#projects")}>
            Projects
          </button>

          <button onClick={() => scrollToSection("/", "#footer")}>
            Contact
          </button>
        </div>
      </div>
    </nav>
  );
}
