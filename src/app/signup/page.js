"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { motion } from "framer-motion";
import {
  Users,
  BarChart3,
  CheckSquare,
  ListTodo,
  Sparkles,
} from "lucide-react";
import Footer from "@/components/Footer";

const features = [
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
      "View detailed LeetCode statistics, daily heatmaps, problem difficulty breakdowns, and global rankings — all in one place.",
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

export default function SignupPage() {
  const router = useRouter();

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#020617] text-white">
      {/* ================= DYNAMIC BACKGROUND ================= */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a1a3a] via-[#020617] to-[#020617]" />

        <motion.div
          className="absolute -top-32 -left-32 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
          animate={{ x: [0, 60, 0], y: [0, 40, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl"
          animate={{ x: [0, -50, 0], y: [0, -30, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* ================= CONTENT ================= */}
      <main className="relative z-10 px-6 pt-24 pb-16">
        {/* ================= HERO ================= */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* LOGO */}
          <div className="flex justify-center mb-8">
            <Image
              src="/webLogo.png"
              alt="TrackmyLeet"
              width={400}
              height={400}
              className="w-140"
              priority
            />
          </div>

          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            TrackmyLeet helps you stay consistent, visualize progress, and grow
            with a community of serious problem solvers.
          </p>

          {/* ACTION BUTTONS */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={() =>
                signIn("google", { callbackUrl: "/addEntries" })
              }
              className="px-8 py-4 rounded-xl text-lg font-semibold
                         bg-[#73a5f5] text-[#020617]
                         shadow-[0_0_40px_rgba(115,165,245,0.6)]
                         
                         transition"
            >
              Sign in with Google ➟
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => router.push("/addEntries")}
              className="px-6 py-3 rounded-xl text-sm
                         bg-white/10 border border-white/20
                         hover:bg-white/15 transition"
            >
              Continue as Guest
            </motion.button>
          </div>
        </motion.div>

        {/* ================= FEATURES ================= */}
        <div className="mt-24 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, i) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="group relative rounded-2xl p-6
                           bg-white/5 backdrop-blur-xl
                           border border-white/10
                           hover:border-[#73a5f5]/60
                           transition"
              >
                <div
                  className="absolute inset-0 rounded-2xl opacity-0
                             group-hover:opacity-100 transition
                             shadow-[0_0_60px_rgba(115,165,245,0.35)]"
                />

                <div className="relative z-10 flex gap-4">
                  <div className="w-12 h-12 flex items-center justify-center text-[#73a5f5]">
                    <Icon size={22} />
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-white/70 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ================= CLOSING CTA ================= */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-28 text-center"
        >
          <div className="flex justify-center mb-4 text-[#73a5f5]">
            <Sparkles size={28} />
          </div>
          <h2 className="text-2xl font-semibold mb-3">
            Start building consistency today
          </h2>
          <p className="text-white/70 max-w-xl mx-auto">
            Whether you're preparing for interviews or mastering DSA for the
            long run, TrackmyLeet helps keep everything structured, visible, and
            motivating.
          </p>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
