"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";

const TOTAL_FRAMES = 300; // Adjust based on your /sequence/ folder count

export default function SequenceScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // 1. Preload Images
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      // Assumes files are named 001.jpg, 002.jpg etc.
      const index = i.toString().padStart(3, "0");
      img.src = `/sequence/${index}.jpg`;
      loadedImages.push(img);
    }
    setImages(loadedImages);
  }, []);

  // 2. Canvas Drawing Logic (Object-fit: cover equivalent)
  const drawImage = (index: number) => {
    if (!canvasRef.current || !images[index] || !images[index].complete) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const img = images[index];
    const canvasRatio = canvas.width / canvas.height;
    const imgRatio = img.width / img.height;

    let renderWidth, renderHeight, x = 0, y = 0;

    if (canvasRatio > imgRatio) {
      renderWidth = canvas.width;
      renderHeight = canvas.width / imgRatio;
      y = (canvas.height - renderHeight) / 2;
    } else {
      renderWidth = canvas.height * imgRatio;
      renderHeight = canvas.height;
      x = (canvas.width - renderWidth) / 2;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, x, y, renderWidth, renderHeight);
  };

  // 3. Link Scroll to Frame
  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, TOTAL_FRAMES - 1]);
  
  useMotionValueEvent(frameIndex, "change", (latest) => {
    drawImage(Math.round(latest));
  });

  // Ensure first frame draws on mount
  useEffect(() => {
    if (images.length > 0) {
      images[0].onload = () => drawImage(0);
    }
  }, [images]);

  // Text Overlays mapped to scrollYProgress
  const opacity1 = useTransform(scrollYProgress, [0, 0.05, 0.15], [0, 1, 0]);
  const opacity2 = useTransform(scrollYProgress, [0.25, 0.3, 0.4], [0, 1, 0]);
  const opacity3 = useTransform(scrollYProgress, [0.55, 0.6, 0.7], [0, 1, 0]);
  const opacity4 = useTransform(scrollYProgress, [0.85, 0.9, 1], [0, 1, 1]);

  return (
    <div ref={containerRef} className="relative w-full h-[500vh] bg-black">
      <div className="sticky top-0 w-full h-screen overflow-hidden">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
        
        {/* Overlay 1: 5% */}
        <motion.div style={{ opacity: opacity1 }} className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <h1 className="font-syne text-5xl md:text-8xl font-bold text-center uppercase mix-blend-difference">
            Hello this is Zahraas.<br/>
            <span className="text-3xl md:text-5xl text-zinc-300">Software Engineer</span>
          </h1>
        </motion.div>

        {/* Overlay 2: 30% */}
        <motion.div style={{ opacity: opacity2 }} className="absolute inset-0 flex items-center justify-start pl-[10%] pointer-events-none">
          <p className="font-manrope text-2xl md:text-4xl max-w-lg leading-snug mix-blend-difference">
            I build digital experiences through code, design, and interaction.
          </p>
        </motion.div>

        {/* Overlay 3: 60% */}
        <motion.div style={{ opacity: opacity3 }} className="absolute inset-0 flex items-center justify-end pr-[5%] pointer-events-none">
          <h2 className="font-manrope text-2xl md:text-4xl max-w-lg leading-snug mix-blend-difference">
            Engineering ideas into interactive web experiences.
          </h2>
        </motion.div>

        {/* Overlay 4: 90% */}
        <motion.div style={{ opacity: opacity4 }} className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <h2 className="font-syne text-4xl md:text-5xl text-center uppercase font-bold mix-blend-difference mb-8">
            Lets Make Something Great
          </h2>
        </motion.div>
      </div>
    </div>
  );
}