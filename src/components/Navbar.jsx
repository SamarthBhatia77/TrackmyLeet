"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import { LogOut } from "lucide-react";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session } = useSession();

  const [open, setOpen] = useState(false);

  return (
    <div className="fixed top-4 left-0 w-full z-50 flex justify-center pointer-events-none">
      <nav
        className="pointer-events-auto w-[95%] h-16 px-6
                   rounded-2xl bg-white/5 backdrop-blur-xl
                   border border-white/10 shadow-lg
                   flex items-center justify-between"
      >
        {/* LEFT: LOGO */}
        <div
          className="flex items-center cursor-pointer select-none"
          onClick={() => router.push("/addEntries")}
        >
          <Image
            src="/webLogo.png"
            alt="TrackmyLeet Logo"
            width={300}
            height={300}
            className="object-contain"
            priority
          />
        </div>

        {/* RIGHT SECTION */}
        <div className="flex items-center gap-3 pointer-events-auto">
          {/* TODO */}
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

          {/* LEETTRACKER */}
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

          {/* USER PROFILE (HOVER SAFE) */}
{session && (
  <div
    className="relative"
    onMouseEnter={() => setOpen(true)}
    onMouseLeave={() => setOpen(false)}
  >
    {/* PROFILE IMAGE */}
    <button className="p-1 rounded-full hover:bg-white/10 transition">
      <Image
        src={session.user.image}
        alt="User"
        width={36}
        height={36}
        className="rounded-full"
      />
    </button>

    {/* DROPDOWN */}
    {open && (
      <div
        className="absolute right-0 top-full w-56
                   pt-2   /* 👈 INVISIBLE BRIDGE */
                   z-50"
      >
        <div
          className="rounded-xl bg-[#0a162b]/95 backdrop-blur-xl
                     border border-white/10 shadow-xl overflow-hidden"
        >
          {/* USER INFO */}
          <div className="px-4 py-3 border-b border-white/10">
            <p className="text-sm font-medium text-white truncate">
              {session.user.name}
            </p>
            <p className="text-xs text-white/60 truncate">
              {session.user.email}
            </p>
          </div>

          {/* ACTIONS */}
          <button
            onClick={() =>
              signOut({
                callbackUrl: "/signIn",
              })
            }
            className="w-full px-4 py-3 text-left text-sm
                      text-red-400 hover:bg-white/10
                      flex items-center gap-2"
            >
            <LogOut size={16} />
            Logout
          </button>

        </div>
      </div>
    )}
  </div>
)}

        </div>
      </nav>
    </div>
  );
}
