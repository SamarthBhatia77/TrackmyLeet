"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";

import Image from "next/image";
import { User, LogOut } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();


  return (
    // OUTER FIXED CONTAINER
<div className="fixed top-4 left-0 w-full z-50 flex justify-center pointer-events-none">
  
  {/* NAVBAR ITSELF */}
  <nav
    className="pointer-events-auto w-[95%] h-16 px-6
               rounded-2xl bg-white/5 backdrop-blur-xl
               border border-white/10 shadow-lg
               flex items-center justify-between"
  >
    {/* LEFT: LOGO */}
    <div
      className="flex items-center select-none"
    >
      <Image
        src="/webLogo.png"
        alt="TrackmyLeet Logo"
        width={700}
        height={700}
        className="h-70 w-70 object-contain"
        priority
      />
    </div>

    {/* RIGHT: TODO + USER MENU */}
    <div className="flex items-center gap-3 relative pointer-events-auto">
      
      {/* TODO BUTTON */}
      <button
        onClick={() => router.push("/Todo")}
        className={`px-4 py-2 rounded-full text-sm transition backdrop-blur
          ${
            pathname === "/Todo"
              ? "bg-[#73a5f5]/80 text-[#192d47] border border-[#93b2d9]"
              : "text-[#73a5f5] border border-[#73a5f5]/30 bg-[#73a5f5]/10 hover:bg-[#73a5f5]/20"
          }`}
      >
        Todo
      </button>

      {/* LEETTRACKER BUTTON */}
      <button
        onClick={() => router.push("/addEntries")}
        className={`px-4 py-2 rounded-full text-sm transition backdrop-blur
          ${
            pathname === "/addEntries"
              ? "bg-[#73a5f5]/80 text-[#192d47] border border-[#93b2d9]"
              : "text-[#73a5f5] border border-[#73a5f5]/30 bg-[#73a5f5]/10 hover:bg-[#73a5f5]/20"
          }`}
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
            className="absolute right-0 top-full mt-2 w-40 rounded-xl
                       bg-[#0a162b]/90 backdrop-blur-xl
                       border border-white/10 shadow-xl overflow-hidden"
          >
            <button className="w-full px-4 py-3 text-left text-sm text-white/80 hover:bg-white/10">
              Profile
            </button>

            <button className="w-full px-4 py-3 text-left text-sm text-red-400 hover:bg-white/10 flex items-center gap-2">
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

