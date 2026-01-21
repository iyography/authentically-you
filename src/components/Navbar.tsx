"use client";

import { useState, useEffect } from "react";

interface NavbarProps {
  design: number;
  setDesign: (n: number) => void;
}

export default function Navbar({ design, setDesign }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-black/80 backdrop-blur-md py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="font-script text-2xl md:text-3xl text-white hover:opacity-80 transition-all duration-300"
          >
            Recess
          </a>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            <a
              href="#why"
              className="font-sans text-sm text-white/70 hover:text-white transition-colors"
            >
              What Is Recess?
            </a>
            <a
              href="#features"
              className="font-sans text-sm text-white/70 hover:text-white transition-colors"
            >
              Features
            </a>
            <a
              href="#for-you"
              className="font-sans text-sm text-white/70 hover:text-white transition-colors"
            >
              For You
            </a>
          </div>

          {/* Design Toggle & CTA */}
          <div className="flex items-center gap-4">
            {/* Design Toggle */}
            <div className="flex items-center gap-1 bg-white/10 backdrop-blur-sm rounded-full p-1">
              {[1, 2].map((n) => (
                <button
                  key={n}
                  onClick={() => setDesign(n)}
                  className={`w-8 h-8 rounded-full font-mono text-xs font-bold transition-all duration-300 ${
                    design === n
                      ? "bg-[#D4A853] text-black"
                      : "bg-transparent text-white/60 hover:text-white hover:bg-white/10"
                  }`}
                  title={n === 1 ? "Current" : n === 2 ? "Nostalgia" : "Futuristic"}
                >
                  {n}
                </button>
              ))}
            </div>

            {/* CTA */}
            <a
              href="https://www.skool.com/Recess/about"
              className={`font-sans text-xs tracking-widest uppercase px-6 py-2 border transition-all duration-300 ${
                isScrolled
                  ? "border-white/30 text-white hover:bg-white hover:text-black"
                  : "border-white/30 text-white hover:bg-white hover:text-black"
              }`}
            >
              Join Recess
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
