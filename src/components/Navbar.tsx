"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
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
          ? "py-4 bg-[#FFF8F0]/90 backdrop-blur-md shadow-sm"
          : "py-6 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="font-script text-2xl md:text-3xl text-[#3D3D3D] hover:opacity-80 transition-all duration-300"
          >
            Authentically You
          </Link>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            <a
              href="#about"
              className="font-sans text-sm text-[#6B6B6B] hover:text-[#3D3D3D] transition-colors"
            >
              About
            </a>
            <a
              href="#features"
              className="font-sans text-sm text-[#6B6B6B] hover:text-[#3D3D3D] transition-colors"
            >
              What You Get
            </a>
            <a
              href="#for-you"
              className="font-sans text-sm text-[#6B6B6B] hover:text-[#3D3D3D] transition-colors"
            >
              For You
            </a>
            <Link
              href="/quiz"
              className="font-sans text-sm text-[#6B6B6B] hover:text-[#3D3D3D] transition-colors"
            >
              Take the Quiz
            </Link>
          </div>

          {/* CTA Button */}
          <div className="flex items-center gap-3">
            <a
              href="https://www.skool.com/authenticallyou/about"
              className="font-sans text-xs tracking-widest uppercase px-6 py-2 bg-[#C9A86C] text-white hover:bg-[#b8975b] transition-all duration-300 rounded-full"
            >
              Join Free
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
