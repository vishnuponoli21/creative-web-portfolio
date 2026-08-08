import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faLinkedinIn,
  faInstagram,
  faBehance,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

import videoIdle from "../../assets/footerbg.webm";
import videoSuccess from "../../assets/thumpsupbg.webm";

import styles from "../ui/css/Footer.module.css";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { db, analytics } from "../../firebase/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { logEvent } from "firebase/analytics";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [showBadge, setShowBadge] = useState(false);
  const [loading, setLoading] = useState(false);

  const footerpage = useRef(null);

  const text1 = useRef(null);
  const text2 = useRef(null);
  const text3 = useRef(null);

  const ic1 = useRef(null);
  const ic2 = useRef(null);
  const ic3 = useRef(null);
  const ic4 = useRef(null);
  const ic5 = useRef(null);

  const form = useRef(null);

  const idleRef = useRef(null);
  const successRef = useRef(null);

  const timeoutRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [toast, setToast] = useState({
    show: false,
    email: "",
  });

  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.from(
        [
          text2.current,
          text1.current,
          text3.current,
          ic1.current,
          ic2.current,
          ic3.current,
          ic4.current,
          ic5.current,
        ],
        {
          x: -120,
          opacity: 0,
          duration: 1.2,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerpage.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        },
      );

      gsap.from(form.current, {
        x: 120,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: footerpage.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      });
    }, footerpage);

    return () => ctx.revert();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.message.trim()
    ) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);

    try {
      await addDoc(collection(db, "contactMessages"), {
        name: formData.name.trim(),
        email: formData.email.trim(),
        message: formData.message.trim(),
        createdAt: serverTimestamp(),
        source: "portfolio_footer",
      });

      if (analytics) {
        logEvent(analytics, "contact_form_submit", {
          email_domain: formData.email.split("@")[1] || "unknown",
        });
      }

      setIsSuccess(true);

      // ✅ INSTANT SHOW BOTH
      setShowBadge(true);
      setToast({
        show: true,
        email: formData.email,
      });

      // reset single timer (SYNC EXIT)
      clearTimeout(timeoutRef.current);

      timeoutRef.current = setTimeout(() => {
        setShowBadge(false);
        setToast({ show: false, email: "" });
        setIsSuccess(false);
        idleRef.current?.play();
      }, 3000);

      successRef.current?.play();

      setFormData({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      console.error("Contact form error:", {
        code: error.code,
        message: error.message,
      });

      alert(`Firebase Error: ${error.code || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <footer
      className="relative w-full h-screen overflow-hidden text-white"
      ref={footerpage}
    >
      {/* VIDEO LAYER */}
      <div className="absolute inset-0">
        <video
          ref={idleRef}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
            isSuccess ? "opacity-0" : "opacity-100"
          }`}
          src={videoIdle}
          autoPlay
          loop
          muted
          playsInline
        />

        <video
          ref={successRef}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
            isSuccess ? "opacity-100" : "opacity-0"
          }`}
          src={videoSuccess}
          muted
          playsInline
        />
      </div>

      <div className="absolute inset-0 bg-black/50" />

      {/* CONTENT */}
      <div className="relative z-1 flex items-end justify-center min-h-screen">
        <div className="w-full grid grid-rows-[1fr_auto]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 px-6 md:px-12 pb-20">
            <div className="mt-25">
              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6">
                <h1
                  className={`${styles.text} text-5xl md:text-7xl`}
                  ref={text1}
                >
                  Lets
                </h1>
                <h1
                  className={`${styles.text} text-5xl md:text-7xl`}
                  ref={text2}
                >
                  Build Together
                </h1>
              </div>

              <h6 ref={text3}>
                Interested in discussing new ideas
                <br />
                creative projects, or opportunities to collaborate.
              </h6>

              <div className="mb-14 mt-5">
                <div className="grid grid-cols-6 mt-10">
                  <a
                    ref={ic1}
                    href="https://github.com/vishnuponoli21"
                    target="_blank"
                  >
                    <FontAwesomeIcon icon={faGithub} />
                  </a>
                  <a
                    ref={ic2}
                    href="https://www.linkedin.com/in/vishnu-ponoli"
                    target="_blank"
                  >
                    <FontAwesomeIcon icon={faLinkedinIn} />
                  </a>
                  <a
                    ref={ic3}
                    href="https://www.instagram.com/ponoli._"
                    target="_blank"
                  >
                    <FontAwesomeIcon icon={faInstagram} />
                  </a>
                  <a
                    ref={ic4}
                    href="mailto:vishnuponoli21@gmail.com"
                    target="_blank"
                  >
                    <FontAwesomeIcon icon={faEnvelope} />
                  </a>
                  <a
                    ref={ic5}
                    href="https://www.behance.net/vishnuponoli_creativ"
                    target="_blank"
                  >
                    <FontAwesomeIcon icon={faBehance} />
                  </a>
                </div>
              </div>
            </div>

            <div className="flex justify-center lg:justify-end" ref={form}>
              <form
                onSubmit={handleSubmit}
                className="w-full max-w-md bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 space-y-4"
              >
                <h2 className="text-2xl font-bold">Contact</h2>

                <input
                  required
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-3 bg-black/40 rounded-lg border border-white/10"
                  placeholder="Name"
                />

                <input
                  required
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 bg-black/40 rounded-lg border border-white/10"
                  placeholder="Email"
                />

                <textarea
                  required
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full p-3 bg-black/40 rounded-lg border border-white/10"
                  placeholder="Message"
                />

                <button
                  disabled={loading}
                  className="w-full bg-white text-black py-3 rounded-lg disabled:opacity-50"
                >
                  {loading ? "Sending..." : "Send"}
                </button>
              </form>
            </div>
          </div>

          <div className="flex justify-between px-6 md:px-12 py-4 border-t border-white/10">
            <h5 className="text-sm text-white/70">@ 2026</h5>
            <h5 className="text-xs text-white/70">All rights reserved</h5>
          </div>
        </div>
      </div>

      {/* BADGE + TOAST */}
      <AnimatePresence>
        {(showBadge || toast.show) && (
          <motion.div
            className="
       absolute
  top-[43%]
  left-[60%]
  -translate-x-1/2
  -translate-y-1/2

  md:top-[68%]
  md:left-[55%]

  flex
  items-center
  gap-3
  z-50
      "
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* TOAST (LEFT SIDE) */}
            {toast.show && (
              <motion.div
                initial={{
                  opacity: 0,
                  x: -10,
                  scale: 0.9,
                  filter: "blur(6px)",
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                  scale: 1,
                  filter: "blur(0px)",
                  transition: {
                    duration: 0.4,
                    delay: 0.15, // appears AFTER badge
                    ease: "easeOut",
                  },
                }}
                exit={{
                  opacity: 0,
                  scale: 0.9,
                  filter: "blur(4px)",
                  transition: {
                    duration: 0.2,
                    ease: "easeIn",
                  },
                }}
                className="
            px-4
            py-2
            rounded-xl
            bg-black/70
            backdrop-blur-md
            border
            border-white/10
            text-white
            text-sm
            shadow-lg
          "
              >
                Message from:{" "}
                <span className="text-purple-300 font-medium">
                  {toast.email}
                </span>
              </motion.div>
            )}

            {/* BADGE (RIGHT SIDE) */}
            {showBadge && (
              <motion.div
                initial={{ opacity: 0, scale: 0.3, y: 20 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: 0,
                  transition: {
                    duration: 0.35,
                    ease: "easeOut",
                  },
                }}
                exit={{
                  opacity: 0,
                  scale: 0.85,
                  y: 10,
                  transition: {
                    duration: 0.25,
                    delay: 0.15, // exits last
                  },
                }}
                className={`
            ${styles.purple}
            font-bold
            text-amber-50
            w-10 h-10
            rounded-full
            flex items-center justify-center
            shadow-lg
          `}
              >
                1
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  );
}
