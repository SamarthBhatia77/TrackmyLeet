"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  BarChart3,
  Check,
  Flame,
  ListTodo,
  Sparkles,
  Users,
  Zap,
} from "lucide-react";

const MESSAGES = [
  "Tracking your coding progress…",
  "Building a streak-friendly workflow…",
  "Loading community spaces…",
  "Preparing your daily tasks…",
  "Almost there — finishing touches…",
];

const BRAND_TEXT = "TrackmyLeet";

const PHASES = [
  { icon: BarChart3, label: "Sync progress insights" },
  { icon: Flame, label: "Warm up streak system" },
  { icon: Users, label: "Set up peer community" },
  { icon: ListTodo, label: "Prepare daily task board" },
];

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

function ShimmerLine({ className = "" }) {
  return (
    <motion.div
      aria-hidden="true"
      className={
        "rounded-full bg-[linear-gradient(110deg,rgba(255,255,255,0.06),rgba(255,255,255,0.16),rgba(255,255,255,0.06))] bg-[length:200%_100%] " +
        className
      }
      initial={{ backgroundPosition: "0% 0%" }}
      animate={{ backgroundPosition: ["0% 0%", "200% 0%"] }}
      transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
    />
  );
}

export default function FakeLoadingPage() {
  const router = useRouter();
  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);
  const [typedCount, setTypedCount] = useState(0);

  useEffect(() => {
    const completed = sessionStorage.getItem("fake-loader-complete");
    if (completed) {
      router.replace("/signup");
      return;
    }

    const started = sessionStorage.getItem("fake-loader-started");
    if (!started) {
      sessionStorage.setItem("fake-loader-started", "true");
    }

    let redirectTimeout;

    /* ---------- ROTATING TEXT ---------- */
    const msgInterval = setInterval(() => {
      setMessageIndex((i) => (i + 1) % MESSAGES.length);
    }, 1400);

    /* ---------- TYPING EFFECT ---------- */
    const typingInterval = setInterval(() => {
      setTypedCount((c) => {
        if (c >= BRAND_TEXT.length) return c;
        return c + 1;
      });
    }, 110);

    /* ---------- PROGRESS ---------- */
    const progressInterval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) return 100;

        // Faster early, slower near the end (more "real" feel)
        const slowDown = 1 - p / 110;
        const jitter = Math.random() * 1.6 + 0.6;
        const step = clamp(Math.round(jitter * slowDown * 6), 1, 6);

        const next = clamp(p + step, 0, 100);
        if (next >= 100) {
          clearInterval(progressInterval);
          clearInterval(msgInterval);
          clearInterval(typingInterval);

          sessionStorage.setItem("fake-loader-complete", "true");
          redirectTimeout = setTimeout(() => {
            router.replace("/signup");
          }, 450);
        }
        return next;
      });
    }, 80);

    return () => {
      clearInterval(progressInterval);
      clearInterval(msgInterval);
      clearInterval(typingInterval);
      if (redirectTimeout) clearTimeout(redirectTimeout);
    };
  }, [router]);

  const typedText = BRAND_TEXT.slice(0, typedCount);
  const phaseIndex = clamp(Math.floor(progress / 25), 0, PHASES.length - 1);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#020617] text-white">
      {/* Background (match signup theme) */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#07152f] via-[#020617] to-[#020617]" />

        <motion.div
          className="absolute -top-36 -left-36 h-[28rem] w-[28rem] rounded-full bg-[#3b82f6]/22 blur-3xl"
          animate={{ x: [0, 70, 0], y: [0, 40, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-36 -right-36 h-[28rem] w-[28rem] rounded-full bg-[#60a5fa]/18 blur-3xl"
          animate={{ x: [0, -55, 0], y: [0, -35, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="absolute inset-0 opacity-[0.22] [mask-image:radial-gradient(60%_45%_at_50%_10%,black,transparent)]">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(148,163,184,0.18)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.18)_1px,transparent_1px)] bg-[size:52px_52px]" />
        </div>

        <div className="absolute inset-0 [mask-image:radial-gradient(55%_35%_at_50%_0%,black,transparent)]">
          <div className="absolute -top-40 left-1/2 h-[30rem] w-[60rem] -translate-x-1/2 bg-gradient-to-r from-transparent via-[#3b82f6]/10 to-transparent blur-2xl" />
        </div>
      </div>

      <main className="relative z-10 mx-auto flex min-h-screen max-w-6xl items-center justify-center px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.2, 0.8, 0.2, 1] }}
          className="w-full"
        >
          <div className="grid items-start gap-6 lg:grid-cols-[1.05fr_0.95fr]">
            {/* Left: Loading card */}
            <div className="relative">
              <div className="absolute -inset-1 rounded-[2rem] bg-gradient-to-b from-[#60a5fa]/35 via-transparent to-transparent blur-xl" />
              <div className="relative overflow-hidden rounded-[2rem] border border-white/12 bg-white/5 p-6 backdrop-blur-xl shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_20px_70px_rgba(0,0,0,0.55)] sm:p-8">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    {/* Brand typing */}
                    <div className="flex items-center gap-2">
                      <div className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-[#60a5fa]/25 to-white/5">
                        <Sparkles className="text-[#93c5fd]" size={18} />
                      </div>
                      <div>
                        <div className="text-xs text-white/60">TrackmyLeet</div>
                        <h1 className="text-lg font-semibold leading-tight">
                          Preparing your workspace
                        </h1>
                      </div>
                    </div>

                    <div className="mt-4 h-[2.8rem] text-3xl font-semibold tracking-tight sm:text-4xl">
                      <span className="text-white">
                        {typedText.slice(0, 7)}
                      </span>
                      <span className="bg-gradient-to-r from-[#93c5fd] via-[#60a5fa] to-[#3b82f6] bg-clip-text text-transparent">
                        {typedText.slice(7)}
                      </span>
                      <span className="ml-1 inline-block w-[10px] animate-pulse text-white/70">
                        |
                      </span>
                    </div>
                  </div>

                  <div className="hidden rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70 sm:block">
                    Redirecting to signup
                  </div>
                </div>

                {/* Progress */}
                <div className="mt-8">
                  <div className="flex items-end justify-between">
                    <div className="text-xs font-semibold text-white/80">
                      Loading
                    </div>
                    <div className="text-sm font-semibold text-white/90">
                      <span className="bg-gradient-to-r from-[#93c5fd] via-[#60a5fa] to-[#3b82f6] bg-clip-text text-transparent">
                        {Math.min(progress, 100)}%
                      </span>
                    </div>
                  </div>

                  <div className="mt-3 h-3 w-full rounded-full bg-white/10 p-[2px]">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#93c5fd] via-[#60a5fa] to-[#3b82f6] transition-[width] duration-150"
                      style={{
                        width: `${progress}%`,
                        boxShadow: `0 0 ${12 + progress / 3}px rgba(96,165,250,0.45)`,
                      }}
                    />
                  </div>

                  <div className="mt-4 text-sm text-white/70">
                    {MESSAGES[messageIndex]}
                  </div>
                </div>

                {/* Phases */}
                <div className="mt-7 grid gap-3 sm:grid-cols-2">
                  {PHASES.map((p, idx) => {
                    const Icon = p.icon;
                    const isDone = progress >= (idx + 1) * 25;
                    const isActive = idx === phaseIndex && progress < 100;
                    return (
                      <div
                        key={p.label}
                        className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/20 px-4 py-3"
                      >
                        <div
                          className={[
                            "grid h-9 w-9 place-items-center rounded-2xl",
                            isDone
                              ? "bg-[#60a5fa]/20 text-[#93c5fd]"
                              : isActive
                                ? "bg-white/8 text-white/80"
                                : "bg-white/5 text-white/60",
                          ].join(" ")}
                        >
                          {isDone ? <Check size={16} /> : <Icon size={16} />}
                        </div>
                        <div className="text-xs">
                          <div className="font-semibold text-white/85">
                            {p.label}
                          </div>
                          <div className="mt-0.5 text-[11px] text-white/55">
                            {isDone
                              ? "Complete"
                              : isActive
                                ? "In progress…"
                                : "Queued"}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Micro-copy */}
                <div className="mt-7 rounded-2xl border border-white/10 bg-white/5 p-4 text-xs text-white/65">
                  <div className="flex items-center gap-2">
                    <div className="grid h-8 w-8 place-items-center rounded-2xl bg-[#60a5fa]/15 text-[#93c5fd]">
                      <Zap size={16} />
                    </div>
                    <div>
                      <div className="font-semibold text-white/80">
                        Pro tip: consistency beats intensity
                      </div>
                      <div className="mt-0.5 text-[11px] text-white/55">
                        Small daily wins compound into confidence.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Fancy "dashboard preview" skeleton */}
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl shadow-[0_0_0_1px_rgba(255,255,255,0.05)] sm:p-8">
              <div className="absolute inset-0 opacity-70">
                <div className="absolute -right-24 -top-24 h-56 w-56 rounded-full bg-[#60a5fa]/14 blur-2xl" />
                <div className="absolute -bottom-32 -left-32 h-56 w-56 rounded-full bg-[#3b82f6]/10 blur-2xl" />
              </div>

              <div className="relative">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-semibold text-white/85">
                    Your dashboard (preview)
                  </div>
                  <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-white/60">
                    Live soon
                  </div>
                </div>

                <div className="mt-5 grid gap-3">
                  <div className="rounded-3xl border border-white/10 bg-black/20 p-5">
                    <div className="flex items-center justify-between">
                      <div className="text-xs font-semibold text-white/75">
                        Weekly momentum
                      </div>
                      <div className="text-xs text-[#93c5fd]">+12%</div>
                    </div>
                    <div className="mt-4 space-y-3">
                      <ShimmerLine className="h-2 w-[78%]" />
                      <ShimmerLine className="h-2 w-[64%]" />
                      <ShimmerLine className="h-2 w-[86%]" />
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-3xl border border-white/10 bg-black/20 p-5">
                      <div className="text-xs font-semibold text-white/75">
                        Topic coverage
                      </div>
                      <div className="mt-4 space-y-3">
                        <ShimmerLine className="h-2 w-[70%]" />
                        <ShimmerLine className="h-2 w-[82%]" />
                        <ShimmerLine className="h-2 w-[58%]" />
                      </div>
                    </div>

                    <div className="rounded-3xl border border-white/10 bg-black/20 p-5">
                      <div className="text-xs font-semibold text-white/75">
                        Today’s tasks
                      </div>
                      <div className="mt-4 space-y-3">
                        <ShimmerLine className="h-2 w-[86%]" />
                        <ShimmerLine className="h-2 w-[62%]" />
                        <ShimmerLine className="h-2 w-[74%]" />
                      </div>
                    </div>
                  </div>

                  <div className="rounded-3xl border border-white/10 bg-black/20 p-5">
                    <div className="flex items-center justify-between">
                      <div className="text-xs font-semibold text-white/75">
                        Friends activity
                      </div>
                      <div className="text-xs text-white/55">Loading…</div>
                    </div>
                    <div className="mt-4 space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-2xl bg-white/5" />
                        <div className="flex-1 space-y-2">
                          <ShimmerLine className="h-2 w-[65%]" />
                          <ShimmerLine className="h-2 w-[45%]" />
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-2xl bg-white/5" />
                        <div className="flex-1 space-y-2">
                          <ShimmerLine className="h-2 w-[72%]" />
                          <ShimmerLine className="h-2 w-[40%]" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-5 text-center text-[11px] text-white/55">
                  We’ll redirect you automatically when loading completes.
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
