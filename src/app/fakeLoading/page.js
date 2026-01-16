"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const MESSAGES = [
  "Track your coding progress",
  "Get better with practice",
  "Revisit important problems",
];

export default function FakeLoadingPage() {
  const router = useRouter();
  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    // 🟢 If loader already COMPLETED, go to main page
    const completed = sessionStorage.getItem("fake-loader-complete");
    if (completed) {
      router.replace("/addEntries");
      return;
    }

    // 🟡 If loader already STARTED (Strict Mode remount), continue
    const started = sessionStorage.getItem("fake-loader-started");

    if (!started) {
      sessionStorage.setItem("fake-loader-started", "true");
    }

    const progressInterval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(progressInterval);
          clearInterval(msgInterval);

          // ✅ Mark completion ONLY HERE
          sessionStorage.setItem("fake-loader-complete", "true");

          setTimeout(() => {
            router.replace("/addEntries");
          }, 300);

          return 100;
        }
        return p + Math.floor(Math.random() * 2) + 1;
      });
    }, 80);

    const msgInterval = setInterval(() => {
      setMessageIndex((i) => (i + 1) % MESSAGES.length);
    }, 1500);

    return () => {
      // No cleanup needed; Strict Mode safe
    };
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a162b] text-white">
  <div className="w-full max-w-xl px-6 text-center">
    
    {/* BRAND */}
    <h1 className="mb-14 text-5xl font-bold tracking-tight">
      <span className="text-white">Trackmy</span>
      <span className="text-[#73a5f5]">Leet</span>
    </h1>

    {/* PERCENTAGE */}
    <div className="mb-4 text-3xl font-semibold">
      {Math.min(progress, 100)}%
    </div>

    {/* PROGRESS BAR */}
    <div className="h-3 w-full bg-white/10 rounded-full overflow-hidden">
      <div
        className="h-full bg-[#2d4096] transition-all duration-150"
        style={{ width: `${progress}%` }}
      />
    </div>

    {/* ROTATING TEXT */}
    <div className="mt-6 text-white/70 text-lg">
      {MESSAGES[messageIndex]}
    </div>
  </div>
</div>

  );
}
