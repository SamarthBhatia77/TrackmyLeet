"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import Image from "next/image";
import { User, LogOut } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const router = useRouter();


  return (
    // OUTER FIXED CONTAINER
    <div className="fixed top-4 left-0 w-full z-50 flex justify-center pointer-events-none">
      
      {/* NAVBAR ITSELF */}
      <nav
        className="pointer-events-auto w-[95%] px-6 py-4 rounded-2xl
                   bg-white/5 backdrop-blur-xl border border-white/10
                   flex items-center justify-between shadow-lg"
      >
        {/* LEFT: LOGO + BRAND */}
        <div className="flex items-center gap-3 select-none">
          <div className="text-2xl font-semibold tracking-tight cursor-pointer" onClick={() => router.push("/addEntries")}>
            <span className="text-white">Trackmy</span>
            <span className="text-[#73a5f5]">Leet</span>
          </div>

          
        </div>

        {/* RIGHT: TODO + USER MENU */}
<div className="flex items-center gap-3 relative pointer-events-auto">
  
  {/* TODO BUTTON */}
  <button
    onClick={() => router.push("/Todo")}
    className="px-4 py-2 rounded-full text-sm
               text-[#73a5f5] border border-[#73a5f5]/30
               bg-[#73a5f5]/10 backdrop-blur
               hover:bg-[#73a5f5]/20 transition"
  >
    Todo
  </button>
  <button
    onClick={() => router.push("/addEntries")}
    className="px-4 py-2 rounded-full text-sm
               text-[#73a5f5] border border-[#73a5f5]/30
               bg-[#73a5f5]/10 backdrop-blur
               hover:bg-[#73a5f5]/20 transition"
  >
    LeetTracker
  </button>

  {/* USER ICON */}
  <div className="relative">
    <button
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      className="p-2 rounded-full hover:bg-white/10 transition"
    >
      <User className="text-white" />
    </button>

    {open && (
      <div
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        className="absolute right-0 mt-0 w-40 rounded-xl
                   bg-[#0a162b]/90 backdrop-blur-xl
                   border border-white/10 shadow-xl overflow-hidden"
      >
        <button
          className="w-full px-4 py-3 text-left text-sm text-white/80
                     hover:bg-white/10 transition"
        >
          Profile
        </button>

        <button
          className="w-full px-4 py-3 text-left text-sm text-red-400
                     hover:bg-white/10 transition flex items-center gap-2"
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>
    )}
  </div>
</div>

      </nav>
    </div>
  );
}

