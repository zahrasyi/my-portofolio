"use client";
import { useEffect, useRef } from "react";
import Matter from "matter-js";

// Ganti nama file ini sesuai dengan gambar yang kamu taruh di public/tools/
const toolsLogos = [
  "/tools/react.png",
  "/tools/laravel.png",
  "/tools/qgis.png",
  "/tools/sketchup.png",
  "/tools/python.png",
  "/tools/php.png",
  "/tools/kotlin.png",
  "/tools/javascript.png",
  "/tools/java.png",
  "/tools/html.png",
  "/tools/filmora.png",
  "/tools/figma.png",
  "/tools/css.png",
  "/tools/corel.png",
  "/tools/canva.png",
  "/tools/css.png",
  "/tools/c.png",
  "/tools/blender.png",
];

export default function Bubblepit() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);

  useEffect(() => {
    if (!sceneRef.current) return;

    // 1. Setup Engine & World
    const engine = Matter.Engine.create();
    const world = engine.world;
    engineRef.current = engine;

    // 2. Setup Render (Tampilan Canvas)
    const render = Matter.Render.create({
      element: sceneRef.current,
      engine: engine,
      options: {
        width: sceneRef.current.clientWidth,
        height: 600, // Tinggi area bubblepit
        wireframes: false,
        background: "transparent",
      },
    });

    // 3. Buat Dinding Pembatas (Bawah, Kiri, Kanan)
    const wallOptions = { isStatic: true, render: { visible: false } };
    const ground = Matter.Bodies.rectangle(render.options.width! / 2, render.options.height! + 25, render.options.width!, 50, wallOptions);
    const leftWall = Matter.Bodies.rectangle(-25, render.options.height! / 2, 50, render.options.height!, wallOptions);
    const rightWall = Matter.Bodies.rectangle(render.options.width! + 25, render.options.height! / 2, 50, render.options.height!, wallOptions);

    Matter.World.add(world, [ground, leftWall, rightWall]);

    // 4. Buat Bola-bola Logo (Bubbles)
    const radius = 50; // Jari-jari 50 = Diameter 100 (Pas banget sama gambarmu yang 100x100)
    const bubbles = toolsLogos.map((logo, index) => {
      // Posisi jatuh acak dari atas
      const x = Math.random() * (render.options.width! - 100) + 50;
      const y = -Math.random() * 500 - 100; 

      return Matter.Bodies.circle(x, y, radius, {
        restitution: 0.8, // Bounciness (Seberapa mantul)
        friction: 0.1,
        render: {
          // Kalau gambar tidak ditemukan, akan fallback ke warna lingkaran
          fillStyle: ["#3b82f6", "#ef4444", "#10b981", "#f59e0b", "#8b5cf6"][index % 5],
          sprite: {
            texture: logo,
            xScale: 1, // Sesuaikan skala kalau gambarmu kebesaran/kekecilan
            yScale: 1,
          },
        },
      });
    });

    // Tambahkan bola-bola yang lebih banyak agar ramai (duplikasi)
    const moreBubbles = bubbles.map(b => 
      Matter.Bodies.circle(Math.random() * render.options.width!, -Math.random() * 1000, radius, {
        restitution: 0.8,
        render: b.render
      })
    );

    Matter.World.add(world, [...bubbles, ...moreBubbles]);

    // 5. Tambahkan Kontrol Mouse (Agar bisa ditarik/dilempar)
    const mouse = Matter.Mouse.create(render.canvas);
    const mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: false },
      },
    });
    Matter.World.add(world, mouseConstraint);
    
    // Sinkronisasi pixel ratio mouse untuk layar HD
    render.mouse = mouse;

    // 6. Jalankan Engine & Render
    Matter.Render.run(render);
    const runner = Matter.Runner.create();
    Matter.Runner.run(runner, engine);

    // 7. Handle Resize Layar
    const handleResize = () => {
      if (!sceneRef.current) return;
      render.canvas.width = sceneRef.current.clientWidth;
      Matter.Body.setPosition(ground, { x: render.canvas.width / 2, y: render.options.height! + 25 });
      Matter.Body.setPosition(rightWall, { x: render.canvas.width + 25, y: render.options.height! / 2 });
    };
    window.addEventListener("resize", handleResize);

    // Cleanup saat pindah halaman
    return () => {
      window.removeEventListener("resize", handleResize);
      Matter.Render.stop(render);
      Matter.Runner.stop(runner);
      if (engineRef.current) {
        Matter.Engine.clear(engineRef.current);
      }
      render.canvas.remove();
      render.canvas = null as any;
      render.context = null as any;
      render.textures = {};
    };
  }, []);

  return (
    <section className="relative z-10 w-full bg-white pt-20 overflow-hidden ">
      <div className="absolute top-5 md:top-20 left-0 w-full flex justify-center pointer-events-none select-none overflow-hidden z-0">
        {/* Ukurannya disesuaikan ke 8vw agar muat untuk kata "TOOLS ON HAND" */}
        <h2 className="font-syne text-[10vw] md:text-[7vw] font-black text-zinc-200 leading-none whitespace-nowrap tracking-tighter">
          TOOLS ON HAND
        </h2>
      </div>
      
      {/* Area Canvas Fisika */}
      <div 
        ref={sceneRef} 
        className="w-full h-150 cursor-grab active:cursor-grabbing"
      />
    </section>
  );
}