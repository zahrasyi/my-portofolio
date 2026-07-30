"use client";
import { motion } from "framer-motion";
import DotGridBackground from "./DotGridBackground";

const menuItems = [
  { label: "About", path: "/about" },     
  { label: "Projects", path: "/project" }, 
];

export default function TypographyMenu() {
  
  // JURUS NUKLIR: Paksa browser pindah halaman secara hard-reload
  const handleNavigation = (e: any, path: string) => {
    e.preventDefault();
    // window.location.href akan membuang memori scroll Next.js 
    // dan memuat halaman dari 0, dijamin pasti di atas!
    window.location.href = path; 
  };

  return (
    <section className="relative z-10 w-full min-h-screen bg-black flex flex-col justify-center items-center overflow-hidden">
      
      {/* Layer Background Dot Grid */}
      <div className="absolute inset-0 z-0 opacity-60">
        <DotGridBackground />
      </div>

      {/* Layer Teks Tipografi */}
      <div className="relative z-10 w-full flex flex-col items-center justify-center py-20">
        {menuItems.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.1, ease: [0.76, 0, 0.24, 1] }}
            className="w-full text-center"
          >
            <a 
              href={item.path}
              onClick={(e) => handleNavigation(e, item.path)}
              className="group font-syne text-[12vw] md:text-[9vw] leading-[0.9] uppercase text-zinc-500 hover:text-white font-normal hover:font-extrabold transition-all duration-500 ease-in-out cursor-none block whitespace-nowrap"
            >
              {item.label}
            </a>
          </motion.div>
        ))}
      </div>
    </section>
  );
}