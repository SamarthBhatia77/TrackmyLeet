import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";

import dbConnect from "@/lib/db";
import User from "@/models/User";

export async function POST(req) {
  console.log("🔥 LeetCode save API hit");
  const session = await getServerSession(authOptions);
  
  
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { username } = await req.json();
  console.log("USERNAME:", username);
  if (!username) {
    return NextResponse.json({ error: "Username required" }, { status: 400 });
  }

  await dbConnect(); // 🔥 THIS triggers DB creation
  console.log("DB CONNECTED");

  await User.findOneAndUpdate(
    { email: session.user.email },
    {
      email: session.user.email,
      name: session.user.name,
      image: session.user.image,
      leetcodeUsername: username,
    },
    { upsert: true }
  );
  console.log("USER UPDATED");

  return NextResponse.json({ success: true });
}
