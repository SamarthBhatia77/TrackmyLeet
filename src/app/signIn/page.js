"use client";

import Image from "next/image";
import { signIn } from "next-auth/react";
import { Chrome } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a162b] text-white">
      <div className="w-full max-w-md text-center px-6">

        {/* LOGO */}
        <div className="flex justify-center mb-0">
          <Image
            src="/webLogo.png"
            alt="TrackmyLeet"
            width={1400}
            height={1400}
            className="w-900"
            priority
          />
        </div>

        {/* SIGN IN CARD */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl mb-24">

          <button
            onClick={() => signIn("google", { callbackUrl: "/addEntries" })}
            className="w-full flex items-center justify-center gap-3
                       px-5 py-3 rounded-full
                       bg-white text-black font-medium
                       hover:scale-[1.02] transition shadow-lg"
          >
            <Chrome size={20} className="text-[#73a5f5]" />
            Sign in with Google
          </button>

          <div className="my-6 text-white/40">or</div>

          <button
            onClick={() => router.push("/addEntries")}
            className="w-full px-5 py-3 rounded-full
                       border border-white/20 text-white/80
                       hover:bg-white/10 transition"
          >
            Continue as Guest
          </button>
        </div>
      </div>
    </div>
  );
}
