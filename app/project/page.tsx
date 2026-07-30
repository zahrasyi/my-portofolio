"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, ArrowDownRight, Mail } from "lucide-react";
// @ts-ignore
import LiquidEther from "@/components/LiquidEther";
import Flipbook from "@/components/Flipbook"; // Pastikan Flipbook sudah di-import!
import CarGame from "@/components/CarGame";

export default function Projects() {
  
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

  // Data array berisi halaman-halaman buku flipbook (Berurutan: Kiri - Kanan)
  const bookPages = [
    // ----------------------------------------------------------------------
    // SAMPUL DEPAN
    // ----------------------------------------------------------------------
    <div key="cover" className="w-full h-full bg-white text-black flex flex-col justify-center items-center p-10 border border-white/10">
      <h1 className="font-syne text-4xl md:text-8xl font-bold uppercase tracking-tighter text-center leading-none">
        CLICK<br/>TO<br/>OPEN.
      </h1>
      {/* <div className="w-16 h-1 bg-white my-6"></div> */}
      {/* <p className="font-manrope text-sm text-zinc-400 uppercase tracking-widest text-center">Zahra's <br/> Portfolio</p> */}
      {/* <p className="absolute bottom-10 font-manrope text-xs text-zinc-500 animate-pulse">Click to open</p> */}
    </div>,

    // ----------------------------------------------------------------------
    // PROYEK 1: Resident Information Management System
    // ----------------------------------------------------------------------
    <img key="img1" src="/projects/wargaku.png" className="w-full h-full object-cover" alt="Resident Information Management System" />,
    <div key="txt1" className="w-full h-full bg-[#FAFAFA] text-black p-6 md:p-10 flex flex-col justify-center">
      {/* <span className="text-xs font-bold font-manrope uppercase tracking-widest text-emerald-600 mb-2">Information System</span> */}
      <h2 className="font-manrope text-xl md:text-4xl font-bold uppercase leading-tight mb-4">Resident Information Management System</h2>
      <div className="flex flex-wrap gap-2 mb-4">
        {["HTML5", "CSS3", "JavaScript", "Xampp", "MySQL", "Bootstrap"].map(tech => (
          <span key={tech} className="px-2 py-1 bg-zinc-200 rounded-md text-[9px] font-bold uppercase tracking-wider">{tech}</span>
        ))}
      </div>
      <p className="font-manrope text-[15px] md:text-xl text-zinc-600 leading-relaxed mb-3">
        Developed a web-based information system to simplify village administrative services by digitizing resident data management. The system enables administrators to manage citizen records, family cards, village profiles, and public service information.
      </p>
      <div>
        <span className="text-[15px] font-bold font-manrope uppercase tracking-wider text-black">Main Features:</span>
        <ul className="list-disc list-inside text-[15px] text-zinc-600 mt-1 columns-2 gap-2">
          <li>Resident data management</li>
          <li>Family card (KK) management</li>
          <li>Village profile management</li>
          <li>Public service info</li>
          <li>Admin dashboard</li>
        </ul>
      </div>
    </div>,

    // ----------------------------------------------------------------------
    // PROYEK 2: Fur u Ture
    // ----------------------------------------------------------------------
    <img key="img2" src="/projects/furuture.png" className="w-full h-full object-cover" alt="Fur u Ture" />,
    <div key="txt2" className="w-full h-full bg-[#FAFAFA] text-black p-6 md:p-10 flex flex-col justify-center">
      {/* <span className="text-xs font-bold font-manrope uppercase tracking-widest text-emerald-600 mb-2">Marketplace Website</span> */}
      <h2 className="font-manrope text-xl md:text-4xl font-bold uppercase leading-tight mb-4">Scandinavian Furniture Marketplace</h2>
      <div className="flex flex-wrap gap-2 mb-4">
        {["HTML5", "CSS3", "JavaScript", "Figma"].map(tech => (
          <span key={tech} className="px-2 py-1 bg-zinc-200 rounded-md text-[9px] font-bold uppercase tracking-wider">{tech}</span>
        ))}
      </div>
      <p className="font-manrope text-[15px] md:text-xl text-zinc-600 leading-relaxed mb-3">
        Designed and developed a responsive furniture marketplace website inspired by Scandinavian aesthetics. The project focuses on creating a clean, minimalistic user experience that highlights furniture collections.
      </p>
      <div>
        <span className="text-[15px] font-bold font-manrope uppercase tracking-wider text-black">Main Features:</span>
        <ul className="list-disc list-inside text-[15px] text-zinc-600 mt-1 columns-2 gap-2">
          <li>Product catalog</li>
          <li>Product detail page</li>
          <li>Responsive design</li>
          <li>Modern UI/UX</li>
          <li>Category browsing</li>
          <li>Search functionality</li>
        </ul>
      </div>
    </div>,

    // ----------------------------------------------------------------------
    // PROYEK 3 & 4 (HANYA FULL GAMBAR TANPA TEKS)
    // ----------------------------------------------------------------------
    <img key="proj3" src="/projects/network.png" className="w-full h-full object-cover" alt="Network Infrastructure Design" />,
    <img key="proj4" src="/projects/pentest.png" className="w-full h-full object-cover" alt="Virtual Penetration Testing Lab" />,

    // ----------------------------------------------------------------------
    // PROYEK 5: DMCare
    // ----------------------------------------------------------------------
    <img key="img5" src="/projects/dmc.png" className="w-full h-full object-cover" alt="DMCare" />,
    <div key="txt5" className="w-full h-full bg-[#FAFAFA] text-black p-6 md:p-10 flex flex-col justify-center">
      {/* <span className="text-xs font-bold font-manrope uppercase tracking-widest text-emerald-600 mb-2">Health Management</span> */}
      <h2 className="font-manrope text-xl md:text-4xl font-bold uppercase leading-tight mb-4">School Health Unit System</h2>
      <div className="flex flex-wrap gap-2 mb-4">
        {["React.js", "Supabase", "Tailwind CSS", "Bootstrap"].map(tech => (
          <span key={tech} className="px-2 py-1 bg-zinc-200 rounded-md text-[9px] font-bold uppercase tracking-wider">{tech}</span>
        ))}
      </div>
      <p className="font-manrope text-[15px] md:text-xl text-zinc-600 leading-relaxed mb-3">
        Developed a web application for managing school health services. The system enables administrators to store patient records, manage medical histories, and monitor clinic activities with real-time synchronization.
      </p>
      <div>
        <span className="text-[15px] font-bold font-manrope uppercase tracking-wider text-black">Main Features:</span>
        <ul className="list-disc list-inside text-[15px] text-zinc-600 mt-1 columns-2 gap-2">
          <li>Patient management</li>
          <li>Medicine management</li>
          <li>Medical records</li>
          <li>Real-time database</li>
          <li>Health service tracking</li>
          <li>Authentication</li>
          <li>Admin Dashboard</li>
        </ul>
      </div>
    </div>,

    // ----------------------------------------------------------------------
    // PROYEK 6: GIS of Waqf Land Darussalam Gontor
    // ----------------------------------------------------------------------
    <img key="img6" src="/projects/gis.png" className="w-full h-full object-cover" alt="GIS Waqf Land" />,
    <div key="txt6" className="w-full h-full bg-[#FAFAFA] text-black p-6 md:p-10 flex flex-col justify-center">
      {/* <span className="text-xs font-bold font-manrope uppercase tracking-widest text-emerald-600 mb-2">WebGIS</span> */}
      <h2 className="font-manrope text-xl md:text-4xl font-bold uppercase leading-tight mb-4">GIS of Waqf Land Darussalam Gontor</h2>
      <div className="flex flex-wrap gap-2 mb-4">
        {["HTML", "Tailwind", "Leaflet.js", "PostGIS", "GeoServer", "QGIS"].map(tech => (
          <span key={tech} className="px-2 py-1 bg-zinc-200 rounded-md text-[9px] font-bold uppercase tracking-wider">{tech}</span>
        ))}
      </div>
      <p className="font-manrope text-[15px] md:text-xl text-zinc-600 leading-relaxed mb-3">
        Developed a WebGIS application for visualizing and managing waqf land assets. The system integrates interactive digital maps with spatial analysis features to support asset management and decision-making.
      </p>
      <div>
        <span className="text-[15px] font-bold font-manrope uppercase tracking-wider text-black">Main Features:</span>
        <ul className="list-disc list-inside text-[15px] text-zinc-600 mt-1 columns-2 gap-2">
          <li>Interactive WebGIS</li>
          <li>Spatial database</li>
          <li>Layer visualization</li>
          <li>Buffer analysis</li>
          <li>Topology validation</li>
          <li>Map filtering</li>
          <li>Legend of Land</li>
        </ul>
      </div>
    </div>,

    // ----------------------------------------------------------------------
    // PROYEK 7: ChainedByMath
    // ----------------------------------------------------------------------
    <img key="img7" src="/projects/chained.png" className="w-full h-full object-cover" alt="ChainedByMath" />,
    <div key="txt7" className="w-full h-full bg-[#FAFAFA] text-black p-6 md:p-10 flex flex-col justify-center">
      {/* <span className="text-xs font-bold font-manrope uppercase tracking-widest text-emerald-600 mb-2">Game Development</span> */}
      <h2 className="font-manrope text-xl md:text-4xl font-bold uppercase leading-tight mb-4">ChainedByMath</h2>
      <div className="flex flex-wrap gap-2 mb-4">
        {["HTML5 Canvas", "JavaScript", "CSS3"].map(tech => (
          <span key={tech} className="px-2 py-1 bg-zinc-200 rounded-md text-[9px] font-bold uppercase tracking-wider">{tech}</span>
        ))}
      </div>
      <p className="font-manrope text-[15px] md:text-xl text-zinc-600 leading-relaxed mb-3">
        Created an educational HTML5 game that combines mathematics quizzes with interactive gameplay. Players solve mathematical challenges while progressing through the game.
      </p>
      <div>
        <span className="text-[15px] font-bold font-manrope uppercase tracking-wider text-black">Main Features:</span>
        <ul className="list-disc list-inside text-[15px] text-zinc-600 mt-1 columns-2 gap-2">
          <li>Multiplayer Interactive gameplay</li>
          <li>Math quizzes</li>
          <li>Score system</li>
          <li>Game progression</li>
          <li>Responsive controls</li>
        </ul>
      </div>
    </div>,

    // ----------------------------------------------------------------------
    // PROYEK 8: Pictples App
    // ----------------------------------------------------------------------
    <img key="img8" src="/projects/pictples.png" className="w-full h-full object-cover" alt="Pictples App" />,
    <div key="txt8" className="w-full h-full bg-[#FAFAFA] text-black p-6 md:p-10 flex flex-col justify-center">
      {/* <span className="text-xs font-bold font-manrope uppercase tracking-widest text-emerald-600 mb-2">Web Application</span> */}
      <h2 className="font-manrope text-xl md:text-4xl font-bold uppercase leading-tight mb-4">Pictples Virtual Photobooth</h2>
      <div className="flex flex-wrap gap-2 mb-4">
        {["HTML5", "CSS3", "JavaScript", "Web Camera API"].map(tech => (
          <span key={tech} className="px-2 py-1 bg-zinc-200 rounded-md text-[9px] font-bold uppercase tracking-wider">{tech}</span>
        ))}
      </div>
      <p className="font-manrope text-[15px] md:text-xl text-zinc-600 leading-relaxed mb-3">
        Developed a lightweight web-based photobooth application that utilizes the device camera directly from the browser without requiring additional software installations.
      </p>
      <div>
        <span className="text-[15px] font-bold font-manrope uppercase tracking-wider text-black">Main Features:</span>
        <ul className="list-disc list-inside text-[15px] text-zinc-600 mt-1 columns-2 gap-2">
          <li>Camera access</li>
          <li>Live preview</li>
          <li>Photo capture</li>
          <li>Editable theme</li>
          <li>Saveable</li>
        </ul>
      </div>
    </div>,

    // ----------------------------------------------------------------------
    // PROYEK 9: HolisticCounseling
    // ----------------------------------------------------------------------
    <img key="img9" src="/projects/konseling.png" className="w-full h-full object-cover" alt="HolisticCounseling" />,
    <div key="txt9" className="w-full h-full bg-[#FAFAFA] text-black p-6 md:p-10 flex flex-col justify-center">
      
      <h2 className="font-manrope text-xl md:text-4xl font-bold uppercase leading-tight mb-4">E-Counseling Talent Mapping</h2>
      <div className="flex flex-wrap gap-2 mb-4">
        {["HTML", "CSS", "Docker", "Laravel", "PHP", "MySQL", "Chart.js", "Bootstrap"].map(tech => (
          <span key={tech} className="px-2 py-1 bg-zinc-200 rounded-md text-[9px] font-bold uppercase tracking-wider">{tech}</span>
        ))}
      </div>
      <p className="font-manrope text-[15px] md:text-xl text-zinc-600 leading-relaxed mb-3">
      Developed a web-based expert system for student talent identification using the Certainty Factor (CF) method. The system supports counselors through a biopsychosocial-spiritual assessment approach, adapting the Multiple Intelligences framework to the Islamic boarding school context by integrating conventional psychological indicators with Islamic values.
      </p>
      <div>
        <span className="text-[15px] font-bold font-manrope uppercase tracking-wider text-black">Main Features:</span>
        <ul className="list-disc list-inside text-[15px] text-zinc-600 mt-1 columns-2 gap-2">
          <li>CF Implementation</li>
          <li>Talent questionnaire</li>
          <li>Biopsychosocial-Spiritual assessment instrument</li>
          <li>Expert knowledge base</li>
          <li>Radar chart analysis</li>
          <li>Portfolio assessment</li>
          <li>UKM recommendations</li>
        </ul>
      </div>
    </div>,

    // ----------------------------------------------------------------------
    // PROYEK 10: QA / Analytics (Placeholder Bawaan)
    // ----------------------------------------------------------------------
    <img key="img10" src="/projects/QA.png" className="w-full h-full object-cover" alt="Data Pipeline" />,
    <div key="txt10" className="w-full h-full bg-[#FAFAFA] text-black p-6 md:p-10 flex flex-col justify-center">
      {/* <span className="text-xs font-bold font-manrope uppercase tracking-widest text-emerald-600 mb-2">Data Science</span> */}
      <h2 className="font-manrope text-4xl md:text-3xl font-bold uppercase leading-tight mb-4">
        Game Quality Assurance Testing <br/>Milki Delivery
      </h2>
      <p className="font-manrope text-xs md:text-sm text-zinc-600 leading-relaxed">
      Performed manual quality assurance testing on Milky Delivery, documenting functional, usability, UI, and performance issues through structured testing methodologies. Designed comprehensive test cases, executed gameplay testing across multiple features, identified reproducible bugs, and produced professional QA documentation including bug reports, test plans, and testing summaries. The project demonstrates practical understanding of software testing workflows and quality assurance practices commonly used in the game industry
      </p>
      <div>
        <span className="text-[15px] font-bold font-manrope uppercase tracking-wider text-black">Main Features:</span>
        <ul className="list-disc list-inside text-[15px] text-zinc-600 mt-1 columns-2 gap-2">
          <li>Test Plan and Test Case</li>
          <li>Excuted fungsional and exploratory testing</li>
          <li>Bugs Reports</li>
          <li>Performed UI/UX consistency testing</li>
          <li>Conducted performance observation during gameplay</li>
          <li>Documenting testing result</li>
        </ul>
      </div>
    </div>,

    // ----------------------------------------------------------------------
    // SAMPUL BELAKANG
    // ----------------------------------------------------------------------
    <div key="back-inside" className="w-full h-full bg-zinc-200"></div>,
    
  ];

  return (
    // 1. PERUBAHAN PENTING: overflow-hidden diganti jadi overflow-x-hidden agar BISA DI-SCROLL KE BAWAH!
    <main className="relative min-h-screen overflow-x-hidden selection:bg-white selection:text-black bg-[#050505]">
      
      {/* --- BACKGROUND ANIMASI FLUID --- */}
      <div className="fixed inset-0 w-screen h-screen z-0 pointer-events-auto">
        <LiquidEther
          colors={[ '#9CA3AF', '#E5E7EB', '#FFFFFF' ]}
          mouseForce={15}
          cursorSize={80} 
          isViscous={false} 
          iterationsPoisson={8} 
          resolution={0.25} 
          isBounce={false}
          autoDemo
          autoSpeed={0.5}
          autoIntensity={2.2}
          takeoverDuration={0.25}
          autoResumeDelay={3000}
          autoRampDuration={0.6}
        />
      </div>

      {/* --- NAVIGASI KEMBALI --- */}
      <nav className="fixed top-10 left-5 md:top-14 md:left-14 z-50">
        <Link href="/" className="group flex items-center gap-3 font-manrope text-sm uppercase tracking-widest text-zinc-500 hover:text-white transition-colors cursor-none">
          <div className="p-3 bg-white/10 backdrop-blur-md shadow-sm border border-white/20 rounded-full group-hover:scale-110 transition-transform">
            <ArrowLeft className="w-5 h-5 text-white" />
          </div>
        </Link>
      </nav>

      {/* ========================================================= */}
      {/* SECTION 1: FLIPBOOK PROYEK */}
      {/* ========================================================= */}
      {/* Tambahkan min-h-screen agar section ini memaksa game basket turun ke layar berikutnya */}
      <section className="pt-40 px-5 max-w-7xl mx-auto relative z-10 pointer-events-none flex flex-col min-h-screen">
        
        {/* Judul */}
        <div className="overflow-hidden mb-12 w-full flex flex-col items-center">
          <motion.h1 
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
            className="font-syne text-[15vw] md:text-[10vw] leading-none font-bold uppercase tracking-tighter text-white"
          >
            SELECTED
          </motion.h1>
          <motion.div 
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1, delay: 0.1, ease: [0.76, 0, 0.24, 1] }}
            className="flex items-center gap-6"
          >
            <h1 className="font-syne text-[15vw] md:text-[10vw] leading-none font-bold uppercase tracking-tighter text-transparent" style={{ WebkitTextStroke: "2px white" }}>
              PROJECTS.
            </h1>
            <ArrowDownRight className="w-20 h-20 md:w-32 md:h-32 text-zinc-100" />
          </motion.div>
        </div>

        {/* Wadah Flipbook */}
        <div className="w-full flex justify-center items-center pointer-events-auto mt-10 min-h-[700px]">
          {isReady && <Flipbook pages={bookPages} width={500} height={650} />}
        </div>
      </section>

      {/* SPASI PEMBATAS AMAN (Agar tidak ada tabrakan) */}
      <div className="w-full h-32 md:h-40 relative z-10"></div>

   
      {/* ========================================================= */}
      {/* SECTION 2: CAR GAME (Pengganti Basket) */}
      {/* ========================================================= */}
      {/* Tinggi dijadikan 90vh dan menggunakan layout flex biasa agar tidak tumpuk-tumpukan */}
      <section className="w-full flex flex-col items-center bg-[#050505] border-t border-zinc-800/50 pt-10 pb-20 px-4 md:px-10">
        
        {/* Teks "Take a Break!" */}
        <div className="text-center pointer-events-none w-full mb-6 mt-4">
          <h2 className="font-syne text-[12vw] md:text-[10vw] leading-none font-bold uppercase tracking-tighter text-white drop-shadow-lg">
            Take a Break!
          </h2>
        </div>
        
        {/* Wadah Game Mobil - TINGGI DITETAPKAN SECARA PASTI (h-[75vh] untuk HP, h-[85vh] untuk Laptop) */}
        <div className="w-full h-[75vh] md:h-[85vh] z-20 pointer-events-auto rounded-2xl shadow-[0_0_30px_rgba(255,255,255,0.05)] overflow-hidden">
          {isReady && <CarGame />}
        </div>
      </section>
      
      {/* ========================================================= */}
      {/* FOOTER */}
      {/* ========================================================= */}
      <footer className="bg-black text-center py-10 relative z-20 w-full border-t border-zinc-900">
        <motion.h1 
          initial={{ y: "100%" }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
          className="font-syne text-[10vw] text-white leading-none font-bold uppercase tracking-tighter"
        >
          Zahraas
        </motion.h1>
      </footer>  
    </main>
  );
}