import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import User from "@/models/User";

export async function GET() {
  try {
    await dbConnect();

    const users = await User.find(
      {},
      {
        name: 1,
        image: 1,
        city: 1,
        college: 1,
        skills: 1,
        updatedAt: 1,
      }
    )
      .sort({ updatedAt: -1 })
      .lean(); // 👈 important

    // ✅ FIX: ensure _id is a proper string
    const safeUsers = users.map((user) => ({
      ...user,
      _id: user._id.toString(),
    }));

    return NextResponse.json({ users: safeUsers });
  } catch (err) {
    console.error("Failed to fetch users", err);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}
