"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import { LogOut, Settings, User, Menu, X } from "lucide-react";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session } = useSession();

  const [open, setOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  const navButton = (label, path) => (
    <button
      onClick={() => router.push(path)}
      className={`px-4 py-2 rounded-full text-sm transition backdrop-blur
        ${
          pathname === path
            ? "bg-[#73a5f5]/80 text-[#192d47] border border-[#93b2d9]"
            : "text-[#73a5f5] border border-[#73a5f5]/30 bg-[#73a5f5]/10 hover:bg-[#73a5f5]/20"
        }`}
    >
      {label}
    </button>
  );

  return (
    <>
      {/* NAVBAR */}
      <div className="fixed top-4 left-0 w-full z-50 flex justify-center pointer-events-none">
        <nav
          className="pointer-events-auto w-[95%] h-16 px-4 sm:px-6
                     rounded-2xl bg-white/5 backdrop-blur-xl
                     border border-white/10 shadow-lg
                     flex items-center justify-between"
        >
          {/* LEFT: LOGO */}
          <div
            className="flex items-center cursor-pointer select-none"
            onClick={() => router.push("/addEntries")}
          >
            <span className="font-bold text-[23px] text-white">Track</span>
            <span className="font-bold text-[23px] text-[#73a5f5]">my</span>
            <span className="font-bold text-[23px] text-white">Leet</span>
          </div>

          {/* RIGHT SECTION */}
          <div className="flex items-center gap-3">

            {/* DESKTOP NAV (md+) */}
            <div className="hidden md:flex items-center gap-3">
              {navButton("Discover📍", "/all-users")}
              {navButton("Todo", "/Todo")}
              {navButton("LeetTracker", "/addEntries")}
            </div>

            {/* MOBILE HAMBURGER (sm only) */}
            <button
              onClick={() => setMobileMenu(true)}
              className="md:hidden p-2 rounded-full hover:bg-white/10 transition"
            >
              <Menu size={22} className="text-[#73a5f5]" />
            </button>

            {/* USER PROFILE */}
{session && (
  <div className="relative">
    <button
      onClick={() => setOpen((prev) => !prev)}
      className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center
                 hover:bg-white/20 transition overflow-hidden"
    >
      {session.user?.image ? (
        <Image
          src={session.user.image}
          alt="User"
          width={36}
          height={36}
          className="rounded-full object-cover"
        />
      ) : (
        <span className="text-sm font-semibold text-white">
          {session.user?.name?.[0] ?? "U"}
        </span>
      )}
    </button>

    {/* DROPDOWN */}
{open && (
  <div
    className="absolute right-0 top-full pt-2 z-50
               animate-dropdown"
  >
    <div
      className="rounded-xl bg-[#0a162b]/100 backdrop-blur-xl
                 border border-white/10 shadow-xl overflow-hidden"
    >
      <div className="px-4 py-3 border-b border-white/10">
        <p className="text-sm font-medium text-white truncate">
          {session.user.name}
        </p>
        <p className="text-xs text-white/60 truncate">
          {session.user.email}
        </p>
      </div>

      <button
        onClick={() => {
          setOpen(false);
          router.push("/user-profile");
        }}
        className="w-full px-4 py-3 text-left text-sm text-white hover:bg-white/10 flex items-center gap-2"
      >
        <User size={16} /> Profile
      </button>

      <button
        onClick={() => {
          setOpen(false);
          router.push("/settings");
        }}
        className="w-full px-4 py-3 text-left text-sm text-white hover:bg-white/10 flex items-center gap-2"
      >
        <Settings size={16} /> Settings
      </button>

      <button
        onClick={() => {
          setOpen(false);
          signOut({ callbackUrl: "/signIn" });
        }}
        className="w-full px-4 py-3 text-left text-sm text-red-400 hover:bg-white/10 flex items-center gap-2"
      >
        <LogOut size={16} /> Logout
      </button>
    </div>
  </div>
)}

  </div>
)}

          </div>
        </nav>
      </div>

      {/* MOBILE FULLSCREEN MENU */}
      {mobileMenu && (
        <div className="fixed inset-0 z-50 bg-[#0a162b]/95 backdrop-blur-xl flex flex-col">
          <div className="flex justify-end p-4">
            <button
              onClick={() => setMobileMenu(false)}
              className="p-2 rounded-full hover:bg-white/10"
            >
              <X size={26} className="text-white" />
            </button>
          </div>

          <div className="flex flex-col items-center justify-center gap-6 flex-1">
            <button
              onClick={() => {
                setMobileMenu(false);
                router.push("/all-users");
              }}
              className="text-2xl text-[#73a5f5]"
            >
              Discover
            </button>

            <button
              onClick={() => {
                setMobileMenu(false);
                router.push("/Todo");
              }}
              className="text-2xl text-[#73a5f5]"
            >
              Todo
            </button>

            <button
              onClick={() => {
                setMobileMenu(false);
                router.push("/addEntries");
              }}
              className="text-2xl text-[#73a5f5]"
            >
              LeetTracker
            </button>
          </div>
        </div>
      )}
    </>
  );
}
