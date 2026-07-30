"use client";
import { useEffect, useRef } from "react";
import { motion, useSpring } from "framer-motion";

interface EyeButtonProps {
  text: string;
  onClick?: () => void;
}

// Sub-komponen untuk satu bola mata
const Eye = () => {
  const eyeRef = useRef<HTMLDivElement>(null);
  
  // MENGGUNAKAN USE-SPRING: Ini kunci agar gerakan mulus 60fps tanpa re-render React!
  const pupilX = useSpring(0, { stiffness: 600, damping: 25, mass: 0.1 });
  const pupilY = useSpring(0, { stiffness: 600, damping: 25, mass: 0.1 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!eyeRef.current) return;
      
      const rect = eyeRef.current.getBoundingClientRect();
      const eyeCenterX = rect.left + rect.width / 2;
      const eyeCenterY = rect.top + rect.height / 2;

      const dx = e.clientX - eyeCenterX;
      const dy = e.clientY - eyeCenterY;
      const angle = Math.atan2(dy, dx);
      
      const maxDist = 4; // Batas maksimal titik hitam bergerak
      const actualDist = Math.hypot(dx, dy);
      // Dibagi 20 agar lebih responsif terhadap jarak jauh
      const dist = Math.min(maxDist, actualDist / 20); 

      // Langsung update nilai spring tanpa memicu re-render
      pupilX.set(Math.cos(angle) * dist);
      pupilY.set(Math.sin(angle) * dist);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [pupilX, pupilY]);

  return (
    <div 
      ref={eyeRef} 
      // Ditambahkan border-zinc-200 dan inner shadow agar mata terlihat di atas tombol putih
      className="relative w-6 h-6 bg-white rounded-full flex items-center justify-center overflow-hidden border border-zinc-200 shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)]"
    >
      <motion.div
        className="w-2.5 h-2.5 bg-black rounded-full"
        // Bind langsung ke motion values
        style={{ x: pupilX, y: pupilY }} 
      />
    </div>
  );
};

export default function EyeButton({ text, onClick }: EyeButtonProps) {
  return (
    <button 
      onClick={onClick}
      // Tombol dikembalikan ke hitam pekat (bg-black) dengan teks putih
      className="group flex items-center gap-4 bg-black text-white px-8 py-4 rounded-full font-syne font-bold uppercase hover:scale-105 hover:bg-zinc-900 shadow-lg transition-all duration-300 cursor-none"
    >
      <span>{text}</span>
      <div className="flex gap-1.5">
        <Eye />
        <Eye />
      </div>
    </button>
  );
}