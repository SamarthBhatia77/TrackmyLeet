import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { username } = await req.json();

    if (!username) {
      return NextResponse.json(
        { error: "Username required" },
        { status: 400 }
      );
    }

    const res = await fetch(
      `https://alfa-leetcode-api.onrender.com/userProfile/${username}`
    );

    if (!res.ok) {
      return NextResponse.json(
        { error: "Invalid LeetCode username" },
        { status: 404 }
      );
    }

    const data = await res.json();

    return NextResponse.json({
      username,
      ranking: data.ranking,
      realName: data.realName,
      contestRating: data.contestRating,
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
