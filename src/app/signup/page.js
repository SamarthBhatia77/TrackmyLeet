"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  CalendarDays,
  Check,
  CheckSquare,
  Flame,
  ListTodo,
  MessageCircle,
  Sparkles,
  Target,
  TrendingUp,
  Trophy,
  Users,
  Zap,
} from "lucide-react";
import Footer from "@/components/Footer";

const primaryFeatures = [
  {
    icon: Users,
    title: "Build Your Coding Network",
    description:
      "Discover other developers, send friend requests, stay connected, and grow alongside a motivated problem-solving community.",
  },
  {
    icon: BarChart3,
    title: "Visualize LeetCode Progress",
    description:
      "View detailed LeetCode statistics, daily heatmaps, problem difficulty breakdowns, and global rankings, all in one place.",
  },
  {
    icon: CheckSquare,
    title: "Track Every Problem You Solve",
    description:
      "Maintain a clean, structured log of solved problems with notes, patterns, and topics to reinforce long-term learning.",
  },
  {
    icon: ListTodo,
    title: "Manage Daily Tasks & Consistency",
    description:
      "Plan your daily goals, track consistency streaks, and stay disciplined with an integrated task and productivity system.",
  },
];

const highlightCards = [
  {
    icon: TrendingUp,
    title: "Progress, not vibes",
    description:
      "See what’s actually improving: streaks, topic coverage, difficulty mix, and your weekly momentum.",
  },
  {
    icon: MessageCircle,
    title: "Solve with peers",
    description:
      "Engage with like‑minded builders, share notes, and stay accountable with a community that ships.",
  },
  {
    icon: CalendarDays,
    title: "Daily system built-in",
    description:
      "Turn intent into action with a lightweight task board, reminders, and consistency tools.",
  },
];

const steps = [
  {
    icon: Zap,
    title: "Sign in and connect your routine",
    description:
      "Start in seconds with Google. No friction—just a clean dashboard ready for daily work.",
  },
  {
    icon: BookOpen,
    title: "Log problems with notes & patterns",
    description:
      "Capture what mattered: approach, edge cases, time complexity, and the pattern you want to remember.",
  },
  {
    icon: Target,
    title: "Set goals and stay consistent",
    description:
      "Define daily targets, track streaks, and let your progress view keep you honest and motivated.",
  },
  {
    icon: Trophy,
    title: "Compare, share, and grow",
    description:
      "See rankings & stats, follow friends, and keep pushing with a community that takes practice seriously.",
  },
];

function Section({ children, className = "" }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.65, ease: [0.2, 0.8, 0.2, 1] }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

function GlowDivider() {
  return (
    <div className="relative h-px w-full overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/12 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#60a5fa]/30 to-transparent blur-sm" />
    </div>
  );
}

export default function SignupPage() {
  const router = useRouter();
  const { scrollYProgress } = useScroll();
  const progressX = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    restDelta: 0.001,
  });
  const floatY = useTransform(scrollYProgress, [0, 1], [0, -140]);
  const floatY2 = useTransform(scrollYProgress, [0, 1], [0, 180]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#020617] text-white">
      {/* ================= SCROLL PROGRESS ================= */}
      <motion.div
        style={{ scaleX: progressX }}
        className="fixed left-0 top-0 z-50 h-[2px] w-full origin-left bg-gradient-to-r from-[#60a5fa] via-[#3b82f6] to-[#93c5fd]"
      />

      {/* ================= DYNAMIC BACKGROUND ================= */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#07152f] via-[#020617] to-[#020617]" />

        

        {/* Subtle grid */}
        <div className="absolute inset-0 opacity-[0.22] [mask-image:radial-gradient(60%_45%_at_50%_10%,black,transparent)]">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(148,163,184,0.18)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.18)_1px,transparent_1px)] bg-[size:52px_52px]" />
        </div>

        {/* Top spotlight */}
        <div className="absolute inset-0 [mask-image:radial-gradient(55%_35%_at_50%_0%,black,transparent)]">
          <div className="absolute -top-40 left-1/2 h-[30rem] w-[60rem] -translate-x-1/2 bg-gradient-to-r from-transparent via-[#3b82f6]/10 to-transparent blur-2xl" />
        </div>
      </div>

      {/* ================= CONTENT ================= */}
      <main className="relative z-10 px-6 pt-24 pb-16">
        {/* ================= HERO ================= */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-6xl"
        >
          <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            {/* Left: Copy */}
            <div className="text-center lg:text-left">
              

              <h1 className="text-balance text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
                Track LeetCode progress.
                <span className="block">
                  Stay consistent with{" "}
                  <span className="bg-gradient-to-r from-[#93c5fd] via-[#60a5fa] to-[#3b82f6] bg-clip-text text-transparent">
                    a structured daily system
                  </span>
                  .
                </span>
              </h1>

              <p className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-white/70 sm:text-lg">
                TrackmyLeet helps you{" "}
                <span className="text-white/90">visualize your DSA journey</span>,
                log solutions with notes and patterns, and{" "}
                <span className="text-white/90">engage with like‑minded peers</span>{" "}
                and manage your everyday tasks, all in one place.
              </p>

              <div className="mt-7 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap sm:items-center sm:gap-3">
                {[
                  
                  { icon: BarChart3, label: "Detailed insights" },
                  { icon: Users, label: "Peer accountability" },
                  { icon: ListTodo, label: "Daily task board" },
                ].map((pill, idx) => {
                  const Icon = pill.icon;
                  return (
                    <div
                      key={idx}
                      className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/75 backdrop-blur sm:justify-start"
                    >
                      <Icon className="text-[#60a5fa]" size={16} />
                      <span>{pill.label}</span>
                    </div>
                  );
                })}
              </div>

              
            </div>

            {/* Right: Auth card (handlers unchanged) */}
            <div className="relative">
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-b from-[#60a5fa]/35 via-transparent to-transparent blur-xl" />
              <div className="relative rounded-3xl border border-white/12 bg-white/5 p-6 backdrop-blur-xl shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_20px_70px_rgba(0,0,0,0.55)] sm:p-7">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-[#60a5fa]/25 to-white/5">
                      <Sparkles className="text-[#93c5fd]" size={20} />
                    </div>
                    <div>
                      <div className="text-sm font-semibold">Start your DSA Journey Now!</div>
                      <div className="text-xs text-white/60">
                        Structured progress tracking with notes & patterns.
                      </div>
                    </div>
                  </div>
                  
                </div>

                <div className="mt-6 space-y-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => signIn("google", { callbackUrl: "/addEntries" })}
                    className="group relative flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#93c5fd] via-[#60a5fa] to-[#3b82f6] px-6 py-4 text-base font-semibold text-[#020617] shadow-[0_0_40px_rgba(96,165,250,0.45)] transition"
                  >
                    Sign in with Google
                    <ArrowRight className="transition group-hover:translate-x-0.5" size={18} />
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => router.push("/addEntries")}
                    className="w-full rounded-2xl border border-white/14 bg-white/5 px-6 py-3 text-sm text-white/85 backdrop-blur transition hover:bg-white/10"
                  >
                    Continue as Guest
                  </motion.button>
                </div>

                <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-4">
                  <div className="text-xs font-semibold text-white/80">
                    Sign in with google to
                  </div>
                  <ul className="mt-3 space-y-2 text-xs text-white/70">
                    {[
    
                      "Connect with like-minded folks",
                      "Connect your leetcode account to get detailed insights",
                      "Access Community features to stay motivated with peers.",
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="mt-0.5 inline-flex h-5 w-5 flex-none items-center justify-center rounded-full bg-[#60a5fa]/15 text-[#93c5fd]">
                          <Check size={14} />
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <p className="mt-4 text-center text-[11px] text-white/55">
                  By continuing, you agree to build a better future with us.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="mx-auto mt-14 max-w-6xl">
          <GlowDivider />
        </div>

        {/* ================= HIGHLIGHTS ================= */}
        <Section className="mx-auto mt-14 max-w-6xl">
          <div className="grid gap-4 md:grid-cols-3">
            {highlightCards.map((c, i) => {
              const Icon = c.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.55, delay: i * 0.06 }}
                  className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
                >
                  <div className="absolute inset-0 opacity-0 transition group-hover:opacity-100">
                    <div className="absolute -left-24 -top-24 h-56 w-56 rounded-full bg-[#60a5fa]/18 blur-2xl" />
                    <div className="absolute -bottom-28 -right-28 h-56 w-56 rounded-full bg-[#3b82f6]/14 blur-2xl" />
                  </div>
                  <div className="relative">
                    <div className="flex items-center gap-3">
                      <div className="grid h-11 w-11 place-items-center rounded-2xl bg-[#60a5fa]/15 text-[#93c5fd]">
                        <Icon size={18} />
                      </div>
                      <div className="text-sm font-semibold">{c.title}</div>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-white/70">
                      {c.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </Section>

        {/* ================= CORE FEATURES ================= */}
        <Section className="mx-auto mt-16 max-w-6xl">
          <div className="flex flex-col items-center text-center">
            <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
              Everything you need to stay consistent with your DSA Journey
            </div>
            <h2 className="mt-4 text-2xl font-semibold sm:text-3xl">
              A simple system for daily LeetCode momentum
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/70 sm:text-base">
              TrackmyLeet keeps progress visible, learning structured, and motivation
              high, without clutter. Log problems, learn patterns, manage tasks, and
              connect with peers who are also as passionate about DSA as you are.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
            {primaryFeatures.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, delay: i * 0.06 }}
                  className="group relative rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition hover:border-[#60a5fa]/55"
                >
                  <div className="absolute inset-0 rounded-3xl opacity-0 shadow-[0_0_70px_rgba(96,165,250,0.25)] transition group-hover:opacity-100" />
                  <div className="relative flex gap-4">
                    <div className="grid h-12 w-12 flex-none place-items-center rounded-2xl bg-gradient-to-br from-[#60a5fa]/20 to-white/5 text-[#93c5fd]">
                      <Icon size={20} />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold">{feature.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-white/70">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </Section>

        {/* ================= HOW IT WORKS ================= */}
        {/*<Section className="mx-auto mt-16 max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <div>
              <div className="w-fit rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                How it works
              </div>
              <h2 className="mt-4 text-2xl font-semibold sm:text-3xl">
                From “I should practice” to a real daily workflow
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/70 sm:text-base">
                TrackmyLeet is built for the routine that actually moves the needle:
                solve, reflect, track, repeat—plus community accountability and a task
                system that supports your day.
              </p>

              <div className="mt-7 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
                <div className="flex items-center gap-3">
                  <div className="grid h-11 w-11 place-items-center rounded-2xl bg-[#60a5fa]/15 text-[#93c5fd]">
                    <Flame size={18} />
                  </div>
                  <div>
                    <div className="text-sm font-semibold">Consistency beats intensity</div>
                    <div className="text-xs text-white/60">
                      Small daily wins compound into confidence.
                    </div>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-white/70">
                  Build your streak with a workflow that’s easy to maintain. Track
                  patterns, revisit notes, and keep tasks visible so practice fits
                  into real life—not just “when you have time.”
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {steps.map((s, idx) => {
                const Icon = s.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: 14 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.55, delay: idx * 0.06 }}
                    className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl"
                  >
                    <div className="absolute inset-0 opacity-0 transition hover:opacity-100">
                      <div className="absolute -right-24 -top-24 h-48 w-48 rounded-full bg-[#60a5fa]/16 blur-2xl" />
                    </div>
                    <div className="relative flex gap-4">
                      <div className="grid h-11 w-11 flex-none place-items-center rounded-2xl bg-gradient-to-br from-[#60a5fa]/20 to-white/5 text-[#93c5fd]">
                        <Icon size={18} />
                      </div>
                      <div>
                        <div className="text-sm font-semibold">{s.title}</div>
                        <div className="mt-1 text-sm leading-relaxed text-white/70">
                          {s.description}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </Section>*/}

        
        {/* ================= SOCIAL PROOF ================= */}
        <Section className="mx-auto mt-16 max-w-6xl">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl sm:p-8">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div>
                
                <h2 className="mt-4 text-2xl font-semibold sm:text-3xl">
                  What our users have to say
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/70 sm:text-base">
                  Our users love using TrackmyLeet to stay consistent with their DSA Journey.
                </p>
              </div>

              
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {[
                {
                  name: "Aman Singh",
                  quote:
                    "Less switching tabs. I open TrackmyLeet and the next step is obvious. Grinding DSA has never been easier. Thanks to the entire trackmyleet team for building this amazing tool.",
                },
                {
                  name: "Shivam Singh",
                  quote:
                    "Logging patterns and edge cases made review sessions 10 times more effective.",
                },
                {
                  name: "Rajesh Kumar",
                  quote:
                    "Seeing friends stay consistent pushed me to keep my streak alive :D .",
                },
              ].map((t, idx) => (
                <div
                  key={idx}
                  className="rounded-3xl border border-white/10 bg-black/20 p-5"
                >
                  <div className="flex items-center gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-2xl bg-white/5 text-sm font-semibold text-white/80">
                      {t.name
                        .split(" ")
                        .slice(0, 2)
                        .map((w) => w[0])
                        .join("")}
                    </div>
                    <div className="text-sm font-semibold text-white/85">
                      {t.name}
                    </div>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-white/70">
                    “{t.quote}”
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* ================= CLOSING CTA ================= */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-18 text-center"
        >
          <div className="mx-auto mt-16 max-w-6xl">
            <GlowDivider />
          </div>

          <div className="mt-14 flex justify-center mb-4 text-[#93c5fd]">
            <Sparkles size={28} />
          </div>
          <h2 className="text-2xl font-semibold mb-3 sm:text-3xl">
            Start building consistency today.
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto leading-relaxed">
            Whether you’re preparing for interviews or mastering DSA long‑term,
            TrackmyLeet keeps everything structured, visible, and motivating, so
            you can show up daily and improve with intent.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => signIn("google", { callbackUrl: "/addEntries" })}
              className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-[#020617] shadow-[0_12px_40px_rgba(0,0,0,0.35)] transition hover:bg-white/95"
            >
              Master DSA Today
              <ArrowRight className="transition group-hover:translate-x-0.5" size={16} />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => router.push("/addEntries")}
              className="inline-flex items-center justify-center rounded-2xl border border-white/14 bg-white/5 px-6 py-3 text-sm text-white/85 backdrop-blur transition hover:bg-white/10"
            >
              Explore as guest
            </motion.button>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
