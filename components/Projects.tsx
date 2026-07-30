"use client";
import { useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight } from "lucide-react";
import EyeButton from "./EyeButton";
import Link from "next/link";

// Data proyek yang sudah disesuaikan
const projects = [
  { 
    title: "E-Counseling Talent Mapping", 
    category: "Biopsycososial-spiritual based Talent Mapping ", 
    img: "/projects/1.png" 
  },
  { 
    title: "GIS of Waqf Land Darussalam Gontor", 
    category: "Interactive Map Based on waqf data", 
    img: "/projects/2.png" 
  },
  { 
    title: "ChainedByMath", 
    category: "HTML5 game while doing math", 
    img: "projects/3.png" 
  },
  { 
    title: "DMCare", 
    category: "Student Health Information Management System", 
    img: "projects/4.png" 
  },
];

// Komponen untuk masing-masing baris proyek
const ProjectItem = ({ title, category, img }: { title: string, category: string, img: string }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Mengambil koordinat mouse untuk gambar melayang
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Membuat gerakan gambar lebih smooth (tidak kaku)
  const smoothX = useSpring(mouseX, { stiffness: 150, damping: 15, mass: 0.1 });
  const smoothY = useSpring(mouseY, { stiffness: 150, damping: 15, mass: 0.1 });

  const handleMouseMove = (e: React.MouseEvent) => {
    // Menempatkan titik tengah gambar tepat di kursor
    mouseX.set(e.clientX - 200); // 200 adalah setengah dari lebar gambar (400px)
    mouseY.set(e.clientY - 150); // 150 adalah setengah dari tinggi gambar (300px)
  };

  return (
    <div 
      className="relative border-b border-zinc-200 py-12 group cursor-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
    >
      {/* Konten Teks yang akan mantul (bounce) ke kanan saat di hover */}
      <motion.div 
        className="flex justify-between items-center px-5 md:px-10"
        whileHover={{ x: 30 }} // Efek bounce geser ke kanan 30px
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <div>
        <h3 className="text-3xl md:text-5xl max-w-3xl font-syne font-bold text-black leading-tight">{title}</h3>
          <p className="text-xl text-zinc-500 font-manrope mt-4">{category}</p>
        </div>
        
        {/* Ikon panah yang akan berputar sedikit saat di hover */}
        <ArrowRight className="w-12 h-12 text-black transform group-hover:-rotate-45 transition-transform duration-300" />
      </motion.div>

      {/* Gambar Melayang (Floating Image) */}
      <motion.div
        className="fixed top-0 left-0 w-[400px] h-[300px] pointer-events-none z-50 overflow-hidden rounded-xl shadow-2xl"
        style={{ x: smoothX, y: smoothY }}
        initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
        animate={{ 
          opacity: isHovered ? 1 : 0, 
          scale: isHovered ? 1 : 0.8,
          rotate: isHovered ? 0 : -5 
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <img src={img} alt={title} className="w-full h-full object-cover" />
      </motion.div>
    </div>
  );
};

export default function Projects() {
  return (
    <section id="projects" className="relative z-10 w-full bg-white pt-32 pb-20 overflow-hidden">
      {/* Tulisan MY WORKS raksasa di background */}
      <div className="absolute top-0 left-0 w-full flex justify-center pointer-events-none select-none overflow-hidden">
        {/* Ukuran diubah dari 22vw menjadi 14vw untuk mobile dan 11vw untuk desktop */}
        <h2 className="font-syne text-[14vw] md:text-[11vw] font-black text-zinc-200 leading-none whitespace-nowrap tracking-tighter">
          MY WORKS
        </h2>
      </div>
      {/* Daftar Proyek */}
      <div className="relative z-10 max-w-7xl mx-auto mt-20">
        {/* Garis atas daftar */}
        <div className="border-t border-zinc-200" />
        
        {projects.map((project, i) => (
          <ProjectItem 
            key={i} 
            title={project.title} 
            category={project.category} 
            img={project.img} 
          />
        ))}
        {/* Tombol See More dengan efek mata */}
        <div className="w-full flex justify-center border border-b-2 mt-20">
          <Link href="/project">
              <EyeButton text="See All Projects" />
          </Link>
        </div>
        
      </div>
    </section>
  );
}