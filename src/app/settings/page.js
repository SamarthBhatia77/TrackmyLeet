"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function SettingsPage() {
  const [theme, setTheme] = useState("dark");
  const [leetcodeInput, setLeetcodeInput] = useState("");
  const [status, setStatus] = useState("");

  function extractLeetCodeUsername(input) {
  if (!input) return "";

  // If full URL
  if (input.includes("leetcode.com")) {
    const parts = input.split("/").filter(Boolean);
    return parts[parts.length - 1];
  }

  return input.trim();
}


  const extractUsername = (input) => {
    // Handles both username and profile URL
    if (input.includes("leetcode.com")) {
      const parts = input.split("/");
      return parts.find((p) => p && !p.includes("leetcode.com"));
    }
    return input.trim();
  };

const saveLeetCodeProfile = async () => {
  try {
    setStatus("Saving...");

    const username = extractLeetCodeUsername(leetcodeInput);

    const res = await fetch("/api/user/leetcode", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username }),
    });

    const data = await res.json(); // 🔥 REQUIRED

    if (!res.ok) {
      setStatus(data.error || "Failed to save");
      return;
    }

    setStatus("Saved successfully ✅");
  } catch (err) {
    console.error(err);
    setStatus("Something went wrong");
  }
};


  return (
    <>
      <Navbar />
      <main className="mt-20 min-h-screen  font-mono  bg-gradient-to-b from-[#0B1220] to-[#020617] text-white px-6 py-10">
        <div className="max-w-3xl mx-auto space-y-8">

          <h1 className="text-3xl font-bold">Settings</h1>

          {/* THEME */}
          <div className="bg-[#0F172A] rounded-xl p-6 border border-white/10">
            <h2 className="text-xl font-semibold mb-4">Appearance</h2>
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="bg-[#020617] border border-white/10 rounded-lg px-5 py-2"
            >
              <option value="dark">Dark (default)</option>
              <option value="light">Light</option>
              <option value="system">System</option>
            </select>
            
          </div>

          {/* LEETCODE */}
          <div className="bg-[#0F172A] rounded-xl p-6 border border-white/10">
            <h2 className="text-xl font-semibold mb-4">
              Link LeetCode Profile
            </h2>

            <input
              type="text"
              placeholder="LeetCode username or profile link"
              value={leetcodeInput}
              onChange={(e) => setLeetcodeInput(e.target.value)}
              className="w-full bg-[#020617] border border-white/10 rounded-lg px-4 py-2"
            />

            <button
              onClick={saveLeetCodeProfile}
              className="mt-4 bg-blue-600 hover:bg-blue-500 px-5 py-2 rounded-lg font-medium"
            >
              Save
            </button>

            {status && (
              <p className="mt-3 text-sm text-white/70">{status}</p>
            )}
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
