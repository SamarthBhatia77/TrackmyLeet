"use client";

export default function Footer() {
  return (
    <footer className="mt-0">
      {/* Horizontal rule */}
      <div className="h-px w-full bg-white/10" />

      {/* Footer content */}
      <div className="flex items-center justify-between px-8 py-6 text-white/60 bg-[#0a162b]">
        {/* Left */}
        <div className="font-medium tracking-tight">
          <span className="text-white text-md">Track</span>
          <span className="text-[#73a5f5] text-md">my</span>
          <span className="text-white text-md">Leet</span>
          <span className="text-white text-sm font-mono"> | Made by Samarth with ❤️</span>
        </div>

        {/* Right */}
        <div className="text-sm">© 2026 TrackmyLeet. All rights reserved.</div>
      </div>
    </footer>
  );
}
