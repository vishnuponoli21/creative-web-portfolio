// import { useEffect, useRef } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import Navbar from "../layout/Navbar";
// import Cursor from "../ui/Cursor";
// import P1 from "../../assets/perfume1.png";
// import P2 from "../../assets/Arab1.jpg";
// import P3 from "../../assets/tesla.jpg";
// import P4 from "../../assets/teal.png";
// import V1 from "../../assets/tealvideo.mp4";
// import V2 from "../../assets/dieline1.mp4";

// gsap.registerPlugin(ScrollTrigger);

// export default function PackagingPage() {
//   const ref = useRef(null);

//   useEffect(() => {
//     const ctx = gsap.context(() => {
//       // ================= HERO =================
//       gsap.from(".hero-title", {
//         opacity: 0,
//         y: 80,
//         duration: 1.2,
//         ease: "power4.out",
//       });

//       gsap.from(".hero-sub", {
//         opacity: 0,
//         y: 30,
//         delay: 0.2,
//         duration: 1,
//         ease: "power3.out",
//       });

//       // ================= REVEALS =================
//       gsap.utils.toArray(".reveal").forEach((el) => {
//         gsap.fromTo(
//           el,
//           { opacity: 0, y: 120, scale: 0.98 },
//           {
//             opacity: 1,
//             y: 0,
//             scale: 1,
//             duration: 1.2,
//             ease: "power4.out",
//             scrollTrigger: {
//               trigger: el,
//               start: "top 85%",
//             },
//           },
//         );
//       });

//       // ================= PARALLAX =================
//       gsap.utils.toArray(".parallax").forEach((img) => {
//         gsap.to(img, {
//           yPercent: -10,
//           ease: "none",
//           scrollTrigger: {
//             trigger: img,
//             start: "top bottom",
//             end: "bottom top",
//             scrub: true,
//           },
//         });
//       });

//       ScrollTrigger.refresh();
//     }, ref);

//     return () => ctx.revert();
//   }, []);

//   return (
//     <>
//       <Cursor />

//       <div ref={ref} className="bg-black text-white min-h-screen">
//         <Navbar />

//         {/* ================= HERO ================= */}
//         <section className="px-10 pt-32 pb-24 text-center">
//           <h1 className="hero-title text-7xl font-light tracking-[0.3em]">
//             PACKAGING DESIGN
//           </h1>
//           <p className="hero-sub text-gray-400 mt-6 max-w-3xl mx-auto">
//             Luxury packaging systems, brand identity, structural engineering,
//             and high-end visual storytelling.
//           </p>
//         </section>

//         {/* ================= BRAND 1 ================= */}
//         <section className="py-40 border-t border-white/10">
//           <div className="max-w-[1600px] mx-auto px-10 grid lg:grid-cols-[420px_1fr] gap-20">
//             {/* LEFT */}
//             <div className="sticky top-32 self-start">
//               <p className="text-sm tracking-[0.3em] text-zinc-500 uppercase">
//                 Fragrance Brand
//               </p>

//               <h2 className="text-6xl font-light mt-4">CORAL PERFUMES</h2>

//               <p className="text-zinc-400 mt-8 leading-relaxed">
//                 Luxury fragrance identity inspired by Transformative Teal,
//                 combining emotional storytelling with structural packaging
//                 design.
//               </p>

//               <div className="mt-10 text-zinc-500 space-y-2 text-sm">
//                 <p>Brand Identity</p>
//                 <p>Logo Design</p>
//                 <p>Packaging Design</p>
//                 <p>Dieline Engineering</p>
//                 <p>3D Visualization</p>
//               </div>
//             </div>

//             {/* RIGHT */}
//             <div className="space-y-10">
//               <img
//                 src={P1}
//                 className="reveal parallax w-full h-[850px] object-cover rounded-[32px]"
//               />

//               <div className="grid md:grid-cols-2 gap-8">
//                 <div className="reveal bg-zinc-900 p-10 rounded-[32px]">
//                   <h3 className="text-2xl font-light mb-4">Logo System</h3>
//                   <p className="text-zinc-400">
//                     Designed for scalability across packaging, retail, and
//                     digital applications.
//                   </p>
//                 </div>

//                 <img
//                   src={P2}
//                   className="reveal h-[500px] object-cover w-full rounded-[32px]"
//                 />
//               </div>

//               <div className="grid md:grid-cols-2 gap-8">
//                 <img
//                   src={P3}
//                   className="reveal h-[600px] object-cover w-full rounded-[32px]"
//                 />

//                 <img
//                   src={P4}
//                   className="reveal h-[600px] object-cover w-full rounded-[32px]"
//                 />
//               </div>

//               <video
//                 className="reveal w-full rounded-[32px]"
//                 autoPlay
//                 muted
//                 loop
//                 playsInline
//                 controls
//               >
//                 <source src={V1} />
//               </video>
//             </div>
//           </div>
//         </section>

//         {/* ================= BRAND 2 ================= */}
//         <section className="py-40 border-t border-white/10">
//           <div className="max-w-[1600px] mx-auto px-10 grid lg:grid-cols-[420px_1fr] gap-20">
//             <div className="sticky top-32 self-start">
//               <p className="text-sm tracking-[0.3em] text-zinc-500 uppercase">
//                 Skincare Brand
//               </p>

//               <h2 className="text-6xl font-light mt-4">NOIR SKINCARE</h2>

//               <p className="text-zinc-400 mt-8 leading-relaxed">
//                 Minimal monochrome skincare identity focused on purity,
//                 contrast, and premium tactile experience.
//               </p>
//             </div>

//             <div className="space-y-10">
//               <img
//                 src={P1}
//                 className="reveal parallax w-full h-[850px] object-cover rounded-[32px]"
//               />

//               <div className="grid md:grid-cols-2 gap-8">
//                 <img
//                   src={P2}
//                   className="reveal h-[600px] object-cover rounded-[32px]"
//                 />

//                 <img
//                   src={P3}
//                   className="reveal h-[600px] object-cover rounded-[32px]"
//                 />
//               </div>

//               <video className="reveal rounded-[32px]" controls>
//                 <source src={V2} />
//               </video>
//             </div>
//           </div>
//         </section>

//         {/* ================= BRAND 3 ================= */}
//         <section className="py-0 border-t border-white/10">
//           <div className="max-w-[1600px] mx-auto px-10 grid lg:grid-cols-[420px_1fr] gap-20">
//             <div className="sticky top-32 self-start">
//               <p className="text-sm tracking-[0.3em] text-zinc-500 uppercase">
//                 Cosmetics Brand
//               </p>

//               <h2 className="text-6xl font-light mt-4">LUMÉ COSMETICS</h2>

//               <p className="text-zinc-400 mt-8 leading-relaxed">
//                 Soft luxury cosmetic identity designed for modern beauty retail
//                 systems.
//               </p>
//             </div>

//             <div className="space-y-10">
//               <img
//                 src={P1}
//                 className="reveal parallax w-full h-[850px] object-cover rounded-[32px]"
//               />

//               <div className="grid md:grid-cols-2 gap-8">
//                 <img
//                   src={P2}
//                   className="reveal h-[600px] object-cover rounded-[32px]"
//                 />

//                 <img
//                   src={P3}
//                   className="reveal h-[600px] object-cover rounded-[32px]"
//                 />
//               </div>

//               <video className="reveal rounded-[32px]" controls>
//                 <source src={V2} />
//               </video>
//             </div>
//           </div>
//         </section>

//         <div className="h-40" />
//       </div>
//     </>
//   );
// }
import React from "react";

function PackagingPage() {
  return <div>PackagingPage</div>;
}

export default PackagingPage;
