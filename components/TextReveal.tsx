"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function TextReveal({ text }: { text: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 50%"] // Mulai animasi saat elemen masuk 80% layar, selesai di tengah layar
  });

  // Memecah kalimat menjadi array kata
  const words = text.split(" ");

  return (
    <div 
      ref={containerRef} 
      className="flex flex-wrap justify-center text-center font-manrope text-3xl md:text-5xl font-medium leading-tight md:leading-snug max-w-5xl mx-auto"
    >
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + (1 / words.length);
        // Mengubah opacity dari 10% menjadi 100% berdasarkan posisi scroll
        const opacity = useTransform(scrollYProgress, [start, end], [0.1, 1]);
        
        return (
          <motion.span key={i} style={{ opacity }} className="mr-2 md:mr-3 mb-2 md:mb-3 text-black">
            {word}
          </motion.span>
        );
      })}
    </div>
  );
}