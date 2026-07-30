"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, ArrowDownRight, Mail } from "lucide-react";
import TextReveal from "@/components/TextReveal";
import FlowingMenu from "@/components/FlowingMenu";
import Scene from "@/components/SnowScene/Scene";

// --- CUSTOM SVG ICONS (Anti-Error) ---
const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
);

const LinkedinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
);

const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
);
// -------------------------------------

export default function About() {

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // 3. Kunci scroll di atas secara paksa
    window.scrollTo(0, 0);
    
    // 4. Tahan game & buku selama 300 milidetik, biar browser tenang dulu
    const timer = setTimeout(() => {
      setIsReady(true); // Setelah 300ms, baru nyalakan komponennya
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  const aboutText = "I'm a Fullstack Web Developer who enjoys turning ideas into interactive and meaningful digital experiences. Most of my projects are built using Laravel, React, JavaScript, PHP, and modern frontend technologies. Along the way, I've also explored UI design, GIS-based web applications, quality assurance, and the fundamentals of cybersecurity to broaden my perspective as a developer. Beyond building websites, I'm genuinely drawn to the vibe of coding itself the process of solving problems, learning new technologies, and continuously improving every project I create.";

  const socialLinks = [
    { name: "Instagram", icon: <InstagramIcon />, href: "https://instagram.com/akunmu" },
    { name: "LinkedIn", icon: <LinkedinIcon />, href: "https://linkedin.com/in/akunmu" },
    { name: "GitHub", icon: <GithubIcon />, href: "https://github.com/akunmu" },
    { name: "Email", icon: <Mail />, href: "mailto:emailmu@gmail.com" },
  ];

  return (
    <main className="bg-white min-h-screen text-black overflow-x-hidden selection:bg-black selection:text-white pb-32">
      
      {/* Navigasi Kembali */}
      <nav className="absolute top-10 left-5 md:top-14 md:left-14 z-50">
        <Link href="/" className="group flex items-center gap-3 font-manrope text-sm uppercase tracking-widest text-zinc-700 hover:text-black transition-colors cursor-none">
          <div className="p-3 bg-zinc-100 rounded-full group-hover:scale-110 transition-transform">
            <ArrowLeft className="w-5 h-5" />
          </div>
        </Link>
      </nav>

      {/* 1. Header & Foto Kecil */}
      <section className="pt-40 px-5 flex flex-col items-center text-center">
        {/* Judul Raksasa */}
        <div className="overflow-hidden mb-12">
          <motion.h1 
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
            // Teks judul diubah jadi hitam
            className="font-syne text-[15vw] md:text-[10vw] leading-none font-bold uppercase tracking-tighter text-black"
          >
            BEHIND THE
          </motion.h1>
          <motion.div 
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1, delay: 0.1, ease: [0.76, 0, 0.24, 1] }}
            className="flex items-center gap-6"
          >
            {/* Outline text (WebkitTextStroke) diubah jadi warna hitam */}
            <h1 className="font-syne text-[15vw] md:text-[10vw] leading-none font-bold uppercase tracking-tighter text-transparent" style={{ WebkitTextStroke: "2px black" }}>
              CODE.
            </h1>
            <ArrowDownRight className="w-20 h-20 md:w-32 md:h-32 text-zinc-400" />
          </motion.div>
        </div>

        {/* Wrapper Utama (Relative) */}
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative mb-10"
        >
          {/* Kontainer Foto (Terpotong Bulat) */}
          <div className="w-40 h-40 md:w-56 md:h-56 rounded-full overflow-hidden bg-zinc-200 border-4 border-white shadow-xl">
            <img 
              src="/about/me.jpg" 
              alt="Zahra" 
              className="w-full h-full object-cover object-top scale-[1.4] transition-all duration-500"
            />
          </div>

          {/* Titik Indikator Aktif Hijau (Di luar overflow-hidden) */}
          <div className="absolute bottom-2 right-2 md:bottom-4 md:right-4 w-6 h-6 md:w-8 md:h-8 bg-emerald-500 border-[3px] border-white rounded-full z-10 shadow-md" />
        </motion.div>

        {/* 2. Tombol CV & WA */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-4 font-manrope"
        >
          <a href="/about/CV.pdf" download className="px-8 py-4 bg-black text-white rounded-full flex items-center gap-2 hover:bg-zinc-800 transition-colors uppercase text-sm font-bold tracking-widest cursor-none">
            Download CV
          </a>
          <a href="https://wa.me/6282311532922" target="_blank" rel="noreferrer" className="px-8 py-4 bg-zinc-100 text-black border border-zinc-200 rounded-full flex items-center gap-2 hover:bg-zinc-200 transition-colors uppercase text-sm font-bold tracking-widest cursor-none">
            Contact WA
          </a>
        </motion.div>
      </section>

      {/* 3. Deskripsi Efek Scroll Reveal */}
      <section className="py-15 px-5 min-h-[80vh] flex items-center">
        <TextReveal text={aboutText} />
      </section>

      {/* 4. Kartu Media Sosial */}
      {/* w-full membuatnya selebar layar, h-[80vh] membuatnya memanjang ke bawah */}
      <section className="w-full h-[80vh] flex flex-col justify-center px-5 mb-20">
        <h2 className="font-syne text-[7vw] md:text-[6vw] font-black text-zinc-200 leading-none whitespace-nowrap tracking-tighter">CONNECT WITH ME</h2>
        
        <div className="w-full h-full py-12">
           <FlowingMenu 
             items={[
               { 
                 link: 'https://www.instagram.com/zahraevk._/?hl=en', 
                 text: 'Instagram', 
                 // Gambar estetis logo Instagram
                 image: 'https://images.unsplash.com/photo-1611944281703-0c11553027b4?q=80&w=400'               },
               { 
                 link: 'https://www.linkedin.com/in/zahra-syifaul-985bb829b/', 
                 text: 'LinkedIn', 
                 // Gambar logo LinkedIn
                 image: 'https://images.unsplash.com/photo-1611944281703-0c11553027b4?q=80&w=400' 
               },
               { 
                 link: 'https://github.com/zahrasyi', 
                 text: 'GitHub', 
                 // Gambar logo GitHub
                 image: 'https://images.unsplash.com/photo-1611944281703-0c11553027b4?q=80&w=400'               },
               { 
                 link: 'mailto:zahrasyifaul7@gmail.com', 
                 text: 'Email', 
                 // Gambar amplop/surat modern
                 image: 'https://images.unsplash.com/photo-1611944281703-0c11553027b4?q=80&w=400'               }
             ]}
             speed={15}
           />
        </div>
      </section>

     
      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        // w-full membuat lebarnya mentok, h-screen membuatnya setinggi layar
        className="w-full h-[80vh] md:h-screen relative"
      >
        {isReady &&<Scene />}
      </motion.div>
      <footer className="bg-white text-center overflow-hidden">
        <motion.h1 
          initial={{ y: "100%" }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
          className="font-syne text-[10vw] leading-none font-bold uppercase tracking-tighter"
          >
          Zahraas
        </motion.h1>
      </footer>         
    </main>
  );
}