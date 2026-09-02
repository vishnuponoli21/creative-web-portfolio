import { useState, useRef } from "react";
import gsap from "gsap";

import { analytics } from "../../firebase/firebase";
import { logEvent } from "firebase/analytics";

import p1 from "../../assets/p1.png";
import p2 from "../../assets/p2.png";
import p3 from "../../assets/p3.png";
import p4 from "../../assets/p4.png";
import p5 from "../../assets/p5.png";
import p6 from "../../assets/p6.png";
import p7 from "../../assets/p7.png";
import p8 from "../../assets/p8.png";
import p9 from "../../assets/p9.png";
import p10 from "../../assets/p10.png";
import p11 from "../../assets/P11.png";
import p12 from "../../assets/P12.png";
import p13 from "../../assets/P13.png";
import p14 from "../../assets/P14.png";
import p15 from "../../assets/P15.png";
import p16 from "../../assets/P16.png";

import blenderVideo1 from "../../assets/GREY_MARBLE_GREEN_WALL.webm";
import blenderVideo2 from "../../assets/WARM_WHITE_MARBLE_MOSS_STONE.webm";
import blenderVideo3 from "../../assets/amazon.webm";
import blenderVideo4 from "../../assets/ARCHI_STONE_WHIT_MARBLE.webm";

export default function Prosection() {
  const wrap = useRef();

  const [active, setActive] = useState(0);
  const [videoIndex, setVideoIndex] = useState(0);

  const projects = [
    {
      title: "Product & UX Design",
      tag: "UI / UX",
      desc: "Scalable design systems, user-centered experiences, interaction design, and modern digital products crafted for usability and growth.",
      type: "image",
      images: [
        { src: p1, link: "https://www.behance.net/gallery/232225721/Bus-Hunt" },
        {
          src: p2,
          link: "https://www.behance.net/gallery/230034595/Orvento-Event-Management-UI",
        },
        { src: p3, link: "https://www.behance.net/gallery/234933749/EVOX" },
        {
          src: p8,
          link: "https://www.behance.net/gallery/229832893/Terrapod-Indoor-Plant-Brand-Identity-UI-Design",
        },
        {
          src: p9,
          link: "https://www.behance.net/gallery/232439769/Student-Dashboard-For-Institute",
        },
        { src: p10, link: "https://www.behance.net/gallery/233199689/NIDRA" },
      ],
    },
    {
      title: "Interface Design & UX Systems",
      tag: "user-centered systems",
      desc: "Responsive interfaces built with React, Tailwind CSS, GSAP, and modern frontend technologies focused on performance and accessibility.",
      type: "image",
      images: [
        {
          src: p2,
          link: "https://www.behance.net/gallery/230034595/Orvento-Event-Management-UI",
        },
        { src: p3, link: "https://www.behance.net/gallery/234933749/EVOX" },
        { src: p10, link: "https://www.behance.net/gallery/233199689/NIDRA" },
      ],
    },
    {
      title: "Video Editing & Blender",
      tag: "Motion & 3D",
      desc: "Product visualization, cinematic animations, environment design, rendering workflows, and motion-driven storytelling (demo projects).",
      type: "video",
      videos: [blenderVideo1, blenderVideo2, blenderVideo3, blenderVideo4],
    },
    {
      title: "Graphic Design",
      tag: "Visual Explorations",
      desc: "Brand identity, marketing materials, social creatives, print design, and visual communication systems.",
      type: "image",
      images: [
        {
          src: p7,
          link: "https://www.linkedin.com/posts/vishnu-ponoli_graphicdesign-brandidentity-skincaredesign-activity-7335539526536261632-nTMg",
        },
        {
          src: p4,
          link: "https://www.linkedin.com/posts/vishnu-ponoli_visualdesign-printmeetsdigital-uidesign-activity-7333592234182799361-qqHI",
        },
        {
          src: p6,
          link: "https://www.linkedin.com/posts/vishnu-ponoli_photoshopdesign-brandidentity-businesscarddesign-activity-7332006581238120448-6H-L",
        },
      ],
    },
    {
      title: "Logo Design",
      tag: "Brand identities",
      desc: "A collection of logo concepts focused on typography, symbolism, and scalable brand identity systems designed for digital and print use.",
      type: "image",
      images: [
        { src: p13, link: "https://www.behance.net/gallery/228877529/paybee" },
        {
          src: p11,
          link: "https://www.linkedin.com/posts/vishnu-ponoli_branddesign-visualidentity-packagingdesign-activity-7341002139428605953-AFwj",
        },
        {
          src: p12,
          link: "https://www.behance.net/gallery/229236547/osem-branding-%28demo-project%29",
        },
        {
          src: p14,
          link: "https://www.linkedin.com/posts/vishnu-ponoli_branddesign-stryv-logodesign-activity-7339201705542144000-6JWu",
        },
        {
          src: p15,
          link: "https://www.linkedin.com/posts/vishnu-ponoli_branddesign-logodesign-cyclingbrand-activity-7339748178449035266-Icbz",
        },
        { src: p16, link: "https://www.behance.net/vishnuponoli_creativ" },
      ],
    },
  ];

  const project = projects[active];
  const isVideo = project.type === "video";

  const switchProject = (index) => {
    if (index === active) return;

    const previous = projects[active];
    const next = projects[index];

    gsap.fromTo(
      ".project-fade",
      { opacity: 0, y: 24, scale: 0.98 },
      { opacity: 1, y: 0, scale: 1, duration: 0.65, ease: "power3.out" },
    );

    setActive(index);
    setVideoIndex(0);

    if (analytics) {
      logEvent(analytics, "project_switch", {
        from: previous.title,
        to: next.title,
        type: next.type,
      });
    }
  };

  return (
    <section className="relative w-full min-h-screen bg-black text-white overflow-hidden py-12 md:py-20">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-600/10 blur-[140px]" />
      </div>

      <div
        ref={wrap}
        className="relative z-10 max-w-[1600px] mx-auto px-5 sm:px-8 lg:px-12"
      >
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* LEFT NAV */}
          <div className="lg:w-[260px] shrink-0 w-full">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:flex lg:flex-col gap-3">
              {projects.map((item, index) => (
                <button
                  key={index}
                  onClick={() => switchProject(index)}
                  className={`min-w-0 lg:min-w-[180px] rounded-2xl border p-4 text-left transition-all duration-300 ${
                    active === index
                      ? "border-white/30 bg-white/5"
                      : "border-white/10 text-white/50 hover:text-white hover:border-white/20"
                  }`}
                >
                  <div className="text-[10px] tracking-[0.25em] uppercase text-purple-400">
                    {item.tag}
                  </div>
                  <div className="mt-2 text-sm font-medium">{item.title}</div>
                </button>
              ))}
            </div>
          </div>

          {/* CONTENT */}
          <div className="flex-1">
            {/* HEADER */}
            <div className="project-fade">
              <div className="text-xs tracking-[0.35em] uppercase text-purple-400">
                {project.tag}
              </div>

              <h2 className="mt-4 text-4xl md:text-5xl xl:text-6xl font-semibold leading-tight">
                {project.title}
              </h2>

              <p className="mt-5 max-w-2xl text-sm md:text-lg text-white/60 leading-relaxed">
                {project.desc}
              </p>
            </div>

            {/* MEDIA */}
            <div className="mt-10 md:mt-14 project-fade">
              {/* IMAGE SECTION */}
              {!isVideo && (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                  {project.images.map((item, index) => (
                    <a
                      key={index}
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] h-[260px] md:h-[320px] xl:h-[380px]"
                    >
                      <img
                        src={item.src}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </a>
                  ))}
                </div>
              )}

              {/* VIDEO SECTION (FIXED PERFORMANCE) */}
              {isVideo && (
                <div className="flex flex-col xl:flex-row gap-5">
                  {/* MAIN VIDEO (UNCHANGED SIZE) */}
                  <div className="flex-1">
                    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-neutral-900 h-[280px] md:h-[500px]">
                      <video
                        key={videoIndex}
                        src={project.videos[videoIndex]}
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="auto"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* THUMBNAILS (NO AUTOPLAY → FIX LAG) */}
                  <div className="w-full xl:w-[260px]">
                    <div className="grid grid-cols-2 xl:grid-cols-1 gap-4">
                      {project.videos.map((video, index) => (
                        <button
                          key={index}
                          onClick={() => setVideoIndex(index)}
                          className={`relative overflow-hidden rounded-2xl border transition-all duration-300 ${
                            videoIndex === index
                              ? "border-purple-500"
                              : "border-white/10 hover:border-white/30"
                          }`}
                        >
                          <video
                            src={video}
                            muted
                            playsInline
                            preload="metadata"
                            className="w-full h-[120px] object-cover"
                          />

                          <div
                            className={`absolute inset-0 transition ${
                              videoIndex === index
                                ? "bg-purple-500/10"
                                : "bg-black/20"
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
