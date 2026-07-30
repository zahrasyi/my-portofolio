"use client";
import { useState } from "react";
import Preloader from "@/components/Preloader";
import SequenceScroll from "@/components/SequenceScroll";
import TypographyMenu from "@/components/TypographyMenu";
import Projects from "@/components/Projects";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Bubblepit from "@/components/Bubblepit";
import EyeButton from "@/components/EyeButton";
import RetroSynth from "@/components/RetroSynth";
// @ts-ignore
import ScrollReveal from "@/components/ScrollReveal";

export default function Home() {
  const [loading, setLoading] = useState(true);

  return (
    <main className="bg-black min-h-screen">
      {loading ? (
        <Preloader onComplete={() => setLoading(false)} />
      ) : (
        <>
          <SequenceScroll />
          <TypographyMenu />
          <Projects />
          
          {/* --- QUOTE SECTION --- */}
          {/* Diberi padding vertikal (py-32) agar efek scroll trigger dari GSAP punya ruang untuk membaca pergerakan */}
          <section className="py-30 md:py-30 px-50 md:px-40 bg-white text-black flex justify-center items-center min-h-[50vh] overflow-hidden">
            <div className="max-w-5xl mx-auto text-center font-syne">
              <ScrollReveal
                baseOpacity={0.1}
                enableBlur={true}
                baseRotation={3}
                blurStrength={4}
              >
                "Any fool can write code that a computer can understand. Good programmers write code that humans can understand." 
                — Martin Fowler
              </ScrollReveal>
            </div>
          </section>
          {/* --------------------- */}

          {/* Marquee Section */}
          <section className="py-10 bg-black overflow-hidden flex whitespace-nowrap">
            <motion.div 
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 15, ease: "linear", repeat: Infinity }}
              className="flex gap-10 font-syne text-6xl md:text-9xl uppercase font-bold text-transparent"
              // Garis luar jadi warna putih solid setebal 2px
              style={{ WebkitTextStroke: "2px white" }}
            >
              <span>Ui/ux Designer</span> <span>•</span> <span>Fullstack Developer</span> <span>•</span> <span>Gis Entusiast</span> <span>•</span> <span>Creative Web Developer</span> <span>•</span>
              <span>Ui/ux Designer</span> <span>•</span> <span>Fullstack Developer</span> <span>•</span> <span>Gis Entusiast</span> <span>•</span> <span>Creative Web Developer</span> <span>•</span>
            </motion.div>
          </section>
          
          <Bubblepit/>
          
          {/* Contact & Footer Section */}
          <section className="relative z-10 w-full bg-white py-32 px-5 md:px-20">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="font-syne text-5xl md:text-8xl font-bold uppercase mb-8 text-black">
                Got a project in mind?
              </h2>
              <p className="font-manrope text-xl text-zinc-400 mb-12">
                Let's craft something beautiful together.
              </p>
              
              <div className="flex justify-center">
                <EyeButton 
                  text="Get in touch" 
                  onClick={() => window.open("https://wa.me/6282311532922", "_blank")}
                />
              </div>

              {/* Komponen Retro Synth Muncul di Sini */}
              <div className="w-full flex justify-center pt-10 mb-10 z-20 relative cursor-none">
                <RetroSynth />
              </div>
            </div>
          </section>
          
          <footer className="bg-zinc-900 pb-5 pt-10 px-3 text-center overflow-hidden">
            <motion.h1 
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
              className="font-syne text-[10vw] leading-none font-bold uppercase tracking-tighter text-white"
            >
              Zahraas
            </motion.h1>
          </footer>
        </>
      )}
    </main>
  );
}