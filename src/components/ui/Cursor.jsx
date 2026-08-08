import { useEffect, useState } from "react";

export default function Cursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(pointer: coarse)");

    const checkDevice = () => {
      setIsMobile(mediaQuery.matches);
    };

    checkDevice();
    mediaQuery.addEventListener("change", checkDevice);

    return () => mediaQuery.removeEventListener("change", checkDevice);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const move = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <div
      className="fixed top-0 left-0 pointer-events-none z-[9999]"
      style={{
        transform: `translate(${pos.x}px, ${pos.y}px)`,
      }}
    >
      <div className="w-6 h-6 rounded-full bg-white/30 backdrop-blur-md -translate-x-1/2 -translate-y-1/2" />
    </div>
  );
}
