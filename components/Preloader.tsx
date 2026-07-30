"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [exit, setExit] = useState(false);

  useEffect(() => {
    // Kecepatan loading disesuaikan agar pergerakan angkanya enak dilihat
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.floor(Math.random() * 8) + 2;
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => setExit(true), 600); // Jeda sebentar di 100%
          return 100;
        }
        return next;
      });
    }, 120);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[999] flex flex-col justify-center items-center bg-white text-black overflow-hidden cursor-none"
      initial={{ y: 0 }}
      animate={{ y: exit ? "-100%" : "0%" }}
      transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
      onAnimationComplete={() => {
        if (exit) onComplete();
      }}
    >
      {/* Watermark Kiri Atas */}
      <div className="absolute top-10 left-10 md:top-14 md:left-14 font-manrope text-xl md:text-2xl font-light tracking-tight">
        Zahraas®
      </div>

      {/* Garis Horizontal Tipis di Tengah */}
      <div className="w-[85%] md:w-[90%] h-[2px] bg-zinc-200 absolute top-1/2 -translate-y-1/2 overflow-hidden">
        <motion.div 
          className="h-full bg-black origin-left"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: progress / 100 }}
          transition={{ ease: "easeOut", duration: 0.3 }}
        />
      </div>

      {/* Angka Raksasa Kanan Bawah */}
      <div className="absolute bottom-8 right-10 md:bottom-12 md:right-16 flex items-baseline font-manrope">
        <span className="text-[25vw] md:text-[15vw] leading-none font-light tracking-tighter">
          {progress}
        </span>
        <span className="text-5xl md:text-7xl font-light ml-2 md:ml-4 pb-2 md:pb-6">
          %
        </span>
      </div>
    </motion.div>
  );
}