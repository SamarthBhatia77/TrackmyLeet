"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";

export default function SignInPage() {
  const router = useRouter();

  function handleGoogleSignIn() {
    // 🔐 Hook this to NextAuth / Firebase later
    alert("Google Auth not connected yet");
  }

  function continueAsGuest() {
    router.push("/addEntries");
  }

  return (
    <div className="min-h-screen bg-[#0a162b] flex flex-col items-center justify-center px-6 text-white pb-30">
      
      {/* LOGO */}
      <div className="mb-0">
        <Image
                src="/webLogo.png"
                alt="TrackmyLeet Logo"
                width={1000}
                height={1000}
                className="h-50 w-160 mr-4 object-contain"
                priority
              />
      </div>

      {/* SIGN IN CARD */}
      <div
        className="w-full max-w-md rounded-3xl p-8
                   bg-white/5 backdrop-blur-xl
                   border border-white/10
                   shadow-2xl"
      >
        <h1 className="text-2xl font-semibold text-center mb-6">
          Welcome to <span className="text-[#73a5f5]">TrackmyLeet</span>
        </h1>

        {/* GOOGLE SIGN IN */}
        <button
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center gap-3
                     px-5 py-3 rounded-full
                     bg-white text-black
                     hover:scale-[1.02] transition shadow-lg"
        >
          <FcGoogle size={22} />
          <span className="font-medium">Sign in with Google</span>
        </button>

        {/* DIVIDER */}
        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-white/10" />
          <span className="px-4 text-sm text-white/50">or</span>
          <div className="flex-1 h-px bg-white/10" />
        </div>

        {/* GUEST OPTION */}
        <button
          onClick={continueAsGuest}
          className="w-full py-3 rounded-full
                     border border-[#73a5f5]/30
                     text-[#73a5f5]
                     bg-[#73a5f5]/10 backdrop-blur
                     hover:bg-[#73a5f5]/20
                     transition"
        >
          Continue as Guest
        </button>
      </div>

      {/* FOOT NOTE */}
      <p className="mt-8 text-sm text-white/40 text-center max-w-sm">
        Sign in to sync your progress across devices.<br/><br/>  
        Guest mode stores data locally on this browser.
      </p>
    </div>
  );
}
