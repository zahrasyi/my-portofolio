"use client";
import { useEffect, useRef } from "react";

export default function DotGridBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    // Menyimpan posisi mouse
    const mouse = { x: -1000, y: -1000 };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseout", handleMouseLeave);

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener("resize", handleResize);

    // --- PENGATURAN TITIK (DOTS) ---
    const spacing = 40; // Jarak antar titik
    const baseRadius = 1; // Ukuran titik normal
    const maxRadius = 4; // Ukuran maksimal saat didekati kursor
    const hoverDistance = 150; // Jarak radius respon kursor

    let animationFrameId: number;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      for (let x = 0; x < width; x += spacing) {
        for (let y = 0; y < height; y += spacing) {
          const dx = mouse.x - x;
          const dy = mouse.y - y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          let currentRadius = baseRadius;
          let opacity = 0.2; // Opacity normal (redup)

          // Jika mouse mendekat ke titik ini
          if (distance < hoverDistance) {
            // Semakin dekat mouse, semakin besar nilai 'factor' (0 sampai 1)
            const factor = 1 - distance / hoverDistance;
            currentRadius = baseRadius + (maxRadius - baseRadius) * factor;
            opacity = 0.2 + (0.6 * factor); // Opacity bertambah jadi lebih terang
          }

          ctx.beginPath();
          ctx.arc(x, y, currentRadius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
          ctx.fill();
        }
      }
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseout", handleMouseLeave);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="w-full h-full block pointer-events-none" 
    />
  );
}