import { useEffect, useState } from "react";

export default function PremiumLoader({ onFinish }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => {
      setVisible(false);
      onFinish?.();
    }, 1700);

    return () => clearTimeout(t);
  }, [onFinish]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[99999] bg-black flex items-center justify-center overflow-hidden">
      <div className="loader-text">
        {"LOADING".split("").map((char, i) => (
          <span key={i} style={{ "--i": i }}>
            {char}
          </span>
        ))}
      </div>

      <div className="absolute bottom-14 text-white/40 text-xs tracking-[0.35em] uppercase">
        Preparing Experience
      </div>
    </div>
  );
}
