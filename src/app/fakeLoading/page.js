"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const MESSAGES = [
  "Track your coding progress",
  "Get better with practice",
  "Revisit important problems",
  "Manage everyday tasks"
];

const BRAND_TEXT = "TrackmyLeet";

export default function FakeLoadingPage() {
  const router = useRouter();
  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);
  const [typedCount, setTypedCount] = useState(0);

  useEffect(() => {
    const completed = sessionStorage.getItem("fake-loader-complete");
    if (completed) {
      router.replace("/signIn");
      return;
    }

    const started = sessionStorage.getItem("fake-loader-started");
    if (!started) {
      sessionStorage.setItem("fake-loader-started", "true");
    }

    /* ---------- PROGRESS ---------- */
    const progressInterval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(progressInterval);
          clearInterval(msgInterval);

          sessionStorage.setItem("fake-loader-complete", "true");

          setTimeout(() => {
            router.replace("/signIn");
          }, 300);

          return 100;
        }
        return p + Math.floor(Math.random() * 2) + 1;
      });
    }, 80);

    /* ---------- ROTATING TEXT ---------- */
    const msgInterval = setInterval(() => {
      setMessageIndex((i) => (i + 1) % MESSAGES.length);
    }, 1500);

    /* ---------- TYPING EFFECT ---------- */
    const typingInterval = setInterval(() => {
      setTypedCount((c) => {
        if (c >= BRAND_TEXT.length) {
          clearInterval(typingInterval);
          return c;
        }
        return c + 1;
      });
    }, 150);

    return () => {};
  }, [router]);

  const typedText = BRAND_TEXT.slice(0, typedCount);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a162b] text-white">
      <div className="w-full max-w-xl px-6 text-center">

        {/* BRAND WITH TYPING */}
        <h1 className="mb-14 text-5xl font-bold tracking-tight h-[3.5rem]">
          <span className="text-white">
            {typedText.slice(0, 7)}
          </span>
          <span className="text-[#73a5f5]">
            {typedText.slice(7)}
          </span>
          <span className="animate-pulse">|</span>
        </h1>

        {/* PERCENTAGE */}
        <div className="mb-4 text-3xl font-semibold">
          {Math.min(progress, 100)}%
        </div>

        {/* PROGRESS BAR WITH GLOW */}
        <div className="h-3 w-full bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full transition-all duration-150"
            style={{
              width: `${progress}%`,
              backgroundColor: "#2d4096",
              boxShadow: `0 0 ${10 + progress / 4}px rgba(147,197,253,0.9)`,

            }}
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
