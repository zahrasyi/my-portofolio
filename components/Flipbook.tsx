"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

interface FlipbookProps {
  pages: React.ReactNode[];
  width?: number;
  height?: number;
}

export default function Flipbook({ pages, width = 450, height = 600 }: FlipbookProps) {
  const [flippedCount, setFlippedCount] = useState(0);

  // Memasangkan 2 halaman menjadi 1 lembar (bolak-balik)
  const leafPairs: [React.ReactNode, React.ReactNode][] = [];
  for (let i = 0; i < pages.length; i += 2) {
    leafPairs.push([pages[i], pages[i + 1] || <div className="w-full h-full bg-zinc-100" />]);
  }
  const totalLeaves = leafPairs.length;

  const handleClick = () => {
    if (flippedCount < totalLeaves) {
      setFlippedCount((prev) => prev + 1);
    } else {
      // Jika sudah di halaman terakhir, tutup kembali ke awal
      setFlippedCount(0);
    }
  };

  // Posisi buku: Ke tengah kalau tertutup, geser ke kanan kalau terbuka
  const isBookClosed = flippedCount === 0 || flippedCount === totalLeaves;
  const xOffset = isBookClosed ? 0 : width / 2;

  const faceStyle: React.CSSProperties = {
    position: "absolute",
    inset: 0,
    backfaceVisibility: "hidden",
    WebkitBackfaceVisibility: "hidden",
    backgroundColor: "#fff",
    overflow: "hidden",
    boxShadow: "inset 0 0 20px rgba(0,0,0,0.05)",
  };

  const spineGradient: React.CSSProperties = {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: "10%",
    background: "linear-gradient(to right, rgba(0,0,0,0.15), transparent)",
    pointerEvents: "none",
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        perspective: 2500,
        cursor: "pointer",
      }}
      onClick={handleClick}
    >
      <motion.div
        animate={{ x: xOffset }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        style={{ width, height, position: "relative", transformStyle: "preserve-3d" }}
      >
        {leafPairs.map(([frontNode, backNode], index) => {
          const isFlipped = index < flippedCount;
          const isFlipping = index === flippedCount - 1;
          
          // Z-index & Z-offset logic agar kertas tidak tembus satu sama lain
          const zOffset = isFlipped ? index * 0.5 : (totalLeaves - index) * 0.5;
          const zIndex = isFlipping ? 100 : isFlipped ? index : totalLeaves - index;

          return (
            <motion.div
              key={index}
              initial={false}
              animate={{ rotateY: isFlipped ? -180 : 0 }}
              transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
              style={{
                position: "absolute",
                inset: 0,
                transformOrigin: "left center",
                transformStyle: "preserve-3d",
                zIndex,
                transform: `translateZ(${zOffset}px)`,
              }}
            >
              {/* SISI DEPAN KERTAS (Kanan saat terbuka) */}
              <div style={{ ...faceStyle, borderRadius: "0 12px 12px 0", borderRight: "1px solid rgba(0,0,0,0.1)" }}>
                {frontNode}
                <div style={spineGradient} />
              </div>

              {/* SISI BELAKANG KERTAS (Kiri saat terbuka) */}
              <div
                style={{
                  ...faceStyle,
                  transform: "rotateY(180deg) translateZ(0.1px)",
                  borderRadius: "12px 0 0 12px",
                  borderLeft: "1px solid rgba(0,0,0,0.1)",
                }}
              >
                {backNode}
                <div style={{ ...spineGradient, left: "auto", right: 0, transform: "scaleX(-1)" }} />
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}