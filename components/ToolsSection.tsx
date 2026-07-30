"use client";
import { motion } from "framer-motion";

// Daftar tools disesuaikan dengan teknologi yang kamu kuasai
const tools = [
  "React.js", "Next.js", "Tailwind CSS", "Vite", 
  "Laravel", "Supabase", "OpenCV", "ArcGIS", "QGIS"
];

export default function ToolsSection() {
  return (
    <section className="relative z-10 w-full bg-zinc-950 py-32 px-5 md:px-20">
      <div className="max-w-5xl mx-auto text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-syne text-4xl md:text-6xl font-bold uppercase mb-16 text-white"
        >
          Tech Arsenal
        </motion.h2>
        
        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
          {tools.map((tool, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="px-8 py-4 border border-zinc-800 rounded-full font-manrope text-lg md:text-xl text-zinc-400 hover:text-white hover:border-white hover:bg-zinc-900 transition-all duration-300 cursor-none"
            >
              {tool}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}