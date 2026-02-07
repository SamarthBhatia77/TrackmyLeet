import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import User from "@/models/User";
import mongoose from "mongoose";

export async function GET(_, { params }) {
  const { id } = await params;

  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ error: "Invalid user id" }, { status: 400 });
  }

  try {
    await dbConnect();

    const user = await User.findById(id).lean();

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      ...user,
      _id: user._id.toString(),
    });
  } catch (err) {
    console.error("GET /api/users/[id] error", err);
    return NextResponse.json(
      { error: "Failed to fetch user" },
      { status: 500 }
    );
  }
}
