"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import LoadingSpinner from "@/components/LoadingSpinner";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";

import {
  Github,
  Linkedin,
  Twitter,
  Instagram,
  Link as LinkIcon,
  MapPin,
  GraduationCap,
} from "lucide-react";

export default function UserProfilePage() {
  const router = useRouter();
  const { data: session } = useSession();

  const [leetcodeData, setLeetcodeData] = useState(null);
  const [leetcodeLoading, setLeetcodeLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  /* ---------------- Fetch LeetCode stats (UNCHANGED) ---------------- */
  useEffect(() => {
  async function fetchLeetCode() {
    try {
      const res = await fetch("/api/leetcode/stats");
      const data = await res.json();
      setLeetcodeData(data);
    } catch (err) {
      console.error("Failed to fetch LeetCode stats", err);
    } finally {
      setLeetcodeLoading(false);
    }
  }
  fetchLeetCode();
}, []);


  /* ---------------- Fetch user profile from DB ---------------- */
  useEffect(() => {
    async function fetchProfile() {
      const res = await fetch("/api/user/profile");
      const data = await res.json();
      setProfile(data);
      setLoading(false);
    }
    fetchProfile();
  }, []);

  if (loading || !profile) {
    return <LoadingSpinner text="Loading profile page..." />;
  }





  const linked = leetcodeData?.linked;

  const heatmapData =
    linked && leetcodeData?.heatmap
      ? Object.entries(leetcodeData.heatmap).map(([timestamp, count]) => ({
          date: new Date(Number(timestamp) * 1000),
          count,
        }))
      : [];

  const { bio, city, college, skills = [], links = {} } = profile;

  return (
    <div>
      <Navbar />

      <main className="bg-gradient-to-b from-[#162440] to-[#020617] min-h-screen text-white px-6 py-10">
        <div className="pt-20 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* ================= LEFT SIDEBAR ================= */}
          <div className="md:col-span-1 space-y-6">

            {/* Profile Image */}
            <div className="flex justify-center">
              <div className="relative w-44 h-44 rounded-full border border-white/10 overflow-hidden">
                <Image
                  src={profile.image || "/default-avatar.png"}
                  alt="Profile"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Name */}
            <div className="text-center">
              <h1 className="text-xl font-semibold">{profile.name}</h1>
              <p className="text-sm text-white/60">
                @{profile.email?.split("@")[0]}
              </p>
            </div>

            {/* Edit Profile */}
            <button
              onClick={() => router.push("/edit-profile")}
              className="w-full py-2 rounded-lg border border-white/10
                         bg-white/5 hover:bg-white/10 transition text-sm"
            >
              Edit Profile
            </button>

            {/* Followers (future-ready) */}
            <div className="flex justify-center text-sm text-white/70 gap-3">
              <span><strong className="text-white">0</strong> followers</span>
              <span className="opacity-50">|</span>
              <span><strong className="text-white">0</strong> following</span>
            </div>

            {/* Location & College */}
            <div className="text-sm text-white/60 space-y-2">
              {city && (
                <p className="flex items-center gap-2">
                  <MapPin size={14} /> {city}
                </p>
              )}
              {college && (
                <p className="flex items-center gap-2">
                  <GraduationCap size={14} /> {college}
                </p>
              )}
            </div>

            {/* Social Links */}
            <div className="flex justify-center gap-4 pt-2">
              {links.github && (
                <a href={links.github} target="_blank">
                  <Github className="hover:text-white/80" size={18} />
                </a>
              )}
              {links.linkedin && (
                <a href={links.linkedin} target="_blank">
                  <Linkedin className="hover:text-white/80" size={18} />
                </a>
              )}
              {links.twitter && (
                <a href={links.twitter} target="_blank">
                  <Twitter className="hover:text-white/80" size={18} />
                </a>
              )}
              {links.instagram && (
                <a href={links.instagram} target="_blank">
                  <Instagram className="hover:text-white/80" size={18} />
                </a>
              )}
              {links.website && (
                <a href={links.website} target="_blank">
                  <LinkIcon className="hover:text-white/80" size={18} />
                </a>
              )}
            </div>

            {/* Skills */}
            {skills.length > 0 && (
              <div className="flex flex-wrap gap-2 justify-center">
                {skills.map((skill, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 text-xs rounded-full
                               bg-white/10 border border-white/10"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* ================= RIGHT CONTENT ================= */}
          <div className="md:col-span-3 space-y-8">

            {/* BIO / ABOUT */}
            <section className="bg-[#0F172A] rounded-xl p-6 border border-white/10">
              <h2 className="text-lg font-semibold mb-3">About</h2>
              <p className="text-white/70">
                {bio || "Edit your profile to add a bio."}
              </p>
            </section>

            {/* ================= LEETCODE STATS (UNCHANGED) ================= */}
            <section className="bg-[#0F172A] rounded-xl p-6 border border-white/10">
              <h2 className="text-lg font-semibold mb-6">LeetCode Stats</h2>
            {leetcodeLoading ? (
  <LeetCodeLoader />
) : !leetcodeData?.linked ? (
  <p className="text-white/60 italic">
    Please link your LeetCode profile to display stats.
  </p>
) : (
  <>
    {/* STAT CARDS */}
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
      <StatCard label="Total Solved" value={leetcodeData.profile.totalSolved} />
      <StatCard label="Easy" value={leetcodeData.profile.easySolved} variant="green" />
      <StatCard label="Medium" value={leetcodeData.profile.mediumSolved} variant="yellow" />
      <StatCard label="Hard" value={leetcodeData.profile.hardSolved} variant="red" />
      <StatCard label="Global Rank" value={leetcodeData.profile.ranking} />
    </div>

    {/* HEATMAP */}
    <div className="bg-[#020617] p-6 rounded-xl border border-white/10 mb-8">
      <h3 className="text-lg font-semibold mb-4">
        Daily Solving Activity
      </h3>

      <CalendarHeatmap
        startDate={new Date(new Date().setFullYear(new Date().getFullYear() - 1))}
        endDate={new Date()}
        values={heatmapData}
        classForValue={(value) => {
          if (!value) return "color-empty";
          if (value.count >= 5) return "color-github-4";
          if (value.count >= 3) return "color-github-3";
          if (value.count >= 1) return "color-github-2";
          return "color-github-1";
        }}
      />
    </div>

    {/* RECENT SUBMISSIONS */}
    <div className="bg-[#020617] p-6 rounded-xl border border-white/10">
      <h3 className="text-lg font-semibold mb-4">Recent Submissions</h3>
      <ul className="divide-y divide-white/10">
        {leetcodeData.recentSubmissions.map((s, i) => (
          <li key={i} className="py-2 text-sm flex justify-between">
            <span>{s.title}</span>
            <span
              className={
                s.statusDisplay === "Accepted"
                  ? "text-green-400"
                  : "text-red-400"
              }
            >
              {s.statusDisplay}
            </span>
          </li>
        ))}
      </ul>
    </div>
  </>
)}

            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

/* ================= STAT CARD ================= */
function StatCard({ label, value, variant = "neutral" }) {
  const styles = {
    neutral: "border-white/10 bg-[#020617]",
    green: "border-green-500/30 bg-green-500/10 text-green-400",
    yellow: "border-yellow-500/30 bg-yellow-500/10 text-yellow-400",
    red: "border-red-500/30 bg-red-500/10 text-red-400",
  };

  return (
    <div className={`rounded-lg p-4 border transition ${styles[variant]}`}>
      <p className="text-sm text-white/60">{label}</p>
      <p className="text-2xl font-bold mt-1">{value}</p>
    </div>
  );
}

function LeetCodeLoader() {
  return (
    <div className="flex flex-col items-center justify-center py-12 gap-3">
      <div className="w-10 h-10 border-4 border-[#73a5f5]/30
                      border-t-[#73a5f5]
                      rounded-full animate-spin" />
      <p className="text-sm text-[#73a5f5] font-medium">
        Fetching your LeetCode stats…
      </p>
    </div>
  );
}
