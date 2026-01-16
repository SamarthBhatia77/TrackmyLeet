"use client";

import { useState } from "react";
import { User, LogOut } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    // OUTER FIXED CONTAINER
    <div className="fixed top-4 left-0 w-full z-50 flex justify-center pointer-events-none">
      
      {/* NAVBAR ITSELF */}
      <nav
        className="pointer-events-auto w-[95%] px-6 py-4 rounded-2xl
                   bg-white/5 backdrop-blur-xl border border-white/10
                   flex items-center justify-between shadow-lg"
      >
        {/* LEFT: LOGO */}
        <div className="text-2xl font-semibold tracking-tight select-none">
          <span className="text-white">Trackmy</span>
          <span className="text-[#73a5f5]">Leet</span>
        </div>

        {/* RIGHT: USER MENU */}
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
      </nav>
    </div>
  );
}
