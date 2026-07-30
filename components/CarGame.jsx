import React from 'react';

export default function CarGame() {
  return (
    // Wadah iframe dengan sudut membulat dan bayangan biar menyatu estetik dengan web kamu
    <div className="w-full h-full bg-zinc-900 md:rounded-2xl overflow-hidden shadow-2xl border border-zinc-800 pointer-events-auto">
      <iframe 
        src="/car/index.html" // Mengarah langsung ke folder car yang kamu buat
        className="w-full h-full border-none"
        title="Escape Road Game"
        scrolling="no"
      />
    </div>
  );
}