"use client";
import { useRef, useState } from "react";
import { motion } from "framer-motion";

// Skala nada C Major
const notes = [
  { note: "C4", freq: 261.63 },
  { note: "D4", freq: 293.66 },
  { note: "E4", freq: 329.63 },
  { note: "F4", freq: 349.23 },
  { note: "G4", freq: 392.00 },
  { note: "A4", freq: 440.00 },
  { note: "B4", freq: 493.88 },
  { note: "C5", freq: 523.25 },
  { note: "D5", freq: 587.33 },
  { note: "E5", freq: 659.25 },
  { note: "F5", freq: 698.46 },
];

// Jenis suara synthesizer
const waveforms: OscillatorType[] = ["triangle", "square", "sawtooth", "sine"];

export default function RetroSynth() {
  const audioCtxRef = useRef<AudioContext | null>(null);
  const [activeKey, setActiveKey] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  
  // State untuk interaksi tombol & kenop
  const [waveform, setWaveform] = useState<OscillatorType>("triangle");
  const [knobAngles, setKnobAngles] = useState([0, 0, 0]);

  // Fungsi utama pembuat suara
  const playSound = (freq: number, index: number | null = null, customWave: OscillatorType = waveform, duration: number = 1) => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    const ctx = audioCtxRef.current;
    
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    osc.type = customWave;
    osc.frequency.value = freq;
    
    osc.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    osc.start();
    gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    osc.stop(ctx.currentTime + duration);

    if (index !== null) {
      setActiveKey(index);
    }
    setIsPlaying(true);
    setTimeout(() => {
      if (index !== null) setActiveKey(null);
      setIsPlaying(false);
    }, duration * 200);
  };

  // Interaksi Kenop diputar
  const handleKnobClick = (index: number) => {
    const newAngles = [...knobAngles];
    newAngles[index] += 45; // Muter 45 derajat setiap diklik
    setKnobAngles(newAngles);
    playSound(800 + (index * 200), null, "sine", 0.1); // Suara klik kecil
  };

  return (
    <div className="relative transform scale-75 md:scale-100 p-6 bg-[#d6d3c8] rounded-[2rem] shadow-[inset_0_-8px_15px_rgba(0,0,0,0.15),_0_20px_40px_rgba(0,0,0,0.4)] border border-[#e5e3db] flex gap-6 select-none font-mono">
      
      {/* Kolom Kiri: 4 Tombol Mode Suara (Waveforms) */}
      <div className="flex flex-col justify-between py-1">
        {waveforms.map((wf, i) => (
          <motion.div 
            key={i}
            whileTap={{ scale: 0.9, y: 2 }}
            onClick={() => {
              setWaveform(wf);
              playSound(440, null, wf, 0.5); // Preview suara saat ganti mode
            }}
            // Kalau lagi aktif, tombolnya seolah-olah "masuk" ke dalam
            className={`w-12 h-12 rounded-lg cursor-pointer transition-all ${
              waveform === wf 
                ? 'bg-[#1a1a1a] shadow-[inset_0_4px_8px_rgba(0,0,0,0.8)]' 
                : 'bg-[#2a2a2a] shadow-[0_4px_0_#111,inset_0_2px_4px_rgba(255,255,255,0.1)]'
            }`}
          />
        ))}
      </div>

      {/* Kolom Kanan: Layar, Kenop, dan Tuts Piano */}
      <div className="flex flex-col gap-6">
        
        {/* Baris Atas: LCD & Kontrol */}
        <div className="flex items-center gap-6">
          {/* LCD Screen */}
          <div className="w-56 h-24 bg-[#9db097] rounded-lg shadow-[inset_0_4px_8px_rgba(0,0,0,0.3)] border-2 border-[#b5c2b0] p-3 flex flex-col justify-between text-[#2c3e26]">
            <p className="text-xs uppercase tracking-widest opacity-80">Now playing</p>
            <motion.p 
              animate={{ opacity: isPlaying ? [0.5, 1, 0.5] : 1 }}
              transition={{ repeat: isPlaying ? Infinity : 0, duration: 0.5 }}
              className="text-sm font-bold uppercase"
            >
              {/* Teks LCD berubah dinamis mengikuti mode suara! */}
              {waveform}.WAV
            </motion.p>
          </div>

          {/* 3 Kenop Putar */}
          <div className="flex gap-4">
            {[0, 1, 2].map((i) => (
              <motion.div 
                key={i}
                animate={{ rotate: knobAngles[i] }}
                onClick={() => handleKnobClick(i)}
                className={`relative w-14 h-14 rounded-full shadow-[0_4px_6px_rgba(0,0,0,0.3)] flex items-start justify-center pt-2 cursor-pointer ${
                  i === 1 ? 'bg-[#b5582f] border-[6px] border-[#2a2a2a]' : 'bg-[#2a2a2a] border-2 border-[#1a1a1a]'
                }`}
              >
                {/* Titik indikator kenop */}
                <div className="w-1.5 h-1.5 bg-white/40 rounded-full" />
              </motion.div>
            ))}
          </div>

          {/* Indikator LED & Tombol Kecil */}
          <div className="flex items-center gap-3 ml-4">
            <motion.div 
              animate={{ 
                opacity: isPlaying ? 1 : 0.3,
                scale: isPlaying ? 1.2 : 1 
              }}
              className="w-3 h-3 rounded-full bg-orange-500 shadow-[0_0_10px_#f97316]" 
            />
            <motion.div 
              whileTap={{ scale: 0.9, y: 2 }}
              onClick={() => playSound(150, null, "square", 0.2)} // Suara bit retro
              className="w-10 h-6 bg-[#d6d3c8] border-2 border-[#a3a096] shadow-[0_2px_0_#a3a096] rounded-full cursor-pointer"
            />
          </div>
        </div>

        {/* Baris Bawah: Tuts Piano (11 Tuts) */}
        <div className="flex bg-[#1a1a1a] p-1.5 rounded-xl shadow-[inset_0_4px_10px_rgba(0,0,0,0.8)] h-44 gap-1">
          {notes.map((n, i) => (
            <motion.div
              key={i}
              onMouseDown={() => playSound(n.freq, i)}
              whileTap={{ rotateX: 5, y: 4, transformPerspective: 200 }}
              className={`w-12 h-full bg-[#f4f2eb] rounded-b-md shadow-[0_4px_4px_rgba(0,0,0,0.2),inset_0_-4px_6px_rgba(0,0,0,0.1)] border border-[#e0ddce] cursor-pointer origin-top transition-colors ${
                activeKey === i ? 'bg-[#d1cec1]' : ''
              }`}
            />
          ))}
        </div>
        
      </div>
    </div>
  );
}