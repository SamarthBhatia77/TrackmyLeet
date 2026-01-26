import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";

import dbConnect from "@/lib/db";
import User from "@/models/User";

export async function GET() {
  try {
    console.log("🚀 /api/leetcode/stats HIT");

    const session = await getServerSession(authOptions);
    console.log("SESSION:", session?.user?.email);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    console.log("✅ DB connected");

    const user = await User.findOne({ email: session.user.email });
    console.log("👤 USER DOC:", user);

    if (!user || !user.leetcodeUsername) {
      console.log("❌ No leetcode username linked");
      return NextResponse.json({ linked: false });
    }

    // 🔥 FORCE sanitize username
    let username = user.leetcodeUsername;
    console.log("RAW USERNAME:", username);

    username = username
      .replace("https://leetcode.com/u/", "")
      .replace("https://leetcode.com/", "")
      .replace(/\//g, "")
      .trim();

    console.log("SANITIZED USERNAME:", username);

    // 🔥 SINGLE ENDPOINT TEST (NO Promise.all)
    const profileRes = await fetch(
      `https://alfa-leetcode-api.onrender.com/userProfile/${username}`
    );

    console.log("PROFILE STATUS:", profileRes.status);

    const profile = await profileRes.json();
    console.log("PROFILE DATA:", profile);

    const contestRes = await fetch(
  `https://alfa-leetcode-api.onrender.com/userContestRankingHistory/${username}`
);
const contestData = contestRes.ok ? await contestRes.json() : [];

  const validContests = contestData.filter(c => c.rating !== null);

const contestStats = {
  rating: validContests.at(-1)?.rating ?? null,
  globalRanking: validContests.at(-1)?.ranking ?? null,
  attended: validContests.length,
  history: validContests.map(c => ({
    contestName: c.contest.title,
    rating: c.rating,
    timestamp: c.contest.startTime,
  })),
};


    return NextResponse.json({
  linked: true,
  profile: {
    ranking: profile.ranking,
    totalSolved: profile.totalSolved,
    easySolved: profile.easySolved,
    mediumSolved: profile.mediumSolved,
    hardSolved: profile.hardSolved,
  },
  heatmap: profile.submissionCalendar,
  recentSubmissions: profile.recentSubmissions?.slice(0, 10) || [],
  contestStats,
});

  } catch (err) {
    console.error("🔥 API CRASH:", err);
    return NextResponse.json(
      { error: "Failed to fetch LeetCode data" },
      { status: 500 }
    );
  }
}
