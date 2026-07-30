"use client";
import { Syne, Manrope } from "next/font/google";
import { ReactLenis } from "@studio-freight/react-lenis";
import CustomCursor from "@/components/CustomCursor";
import "./globals.css";

const syne = Syne({ subsets: ["latin"], variable: "--font-syne" });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="bg-background text-foreground">
      <body className={`${syne.variable} ${manrope.variable} font-manrope antialiased cursor-none`}>
        <ReactLenis root options={{ lerp: 0.05, smoothWheel: true }}>
          <CustomCursor />
          {children}
        </ReactLenis>
      </body>
    </html>
  );
}