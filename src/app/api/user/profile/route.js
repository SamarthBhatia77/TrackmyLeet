import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/db";
import User from "@/models/User";

/* =======================
   GET USER PROFILE
   ======================= */
export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    await dbConnect();

    const user = await User.findOne({ email: session.user.email });

    // If user does not exist yet, return defaults
    if (!user) {
      return NextResponse.json({
        name: session.user.name || "",
        email: session.user.email,
        image: session.user.image || "",
        bio: "",
        city: "",
        college: "",
        skills: [],
        links: {
          github: "",
          linkedin: "",
          twitter: "",
          instagram: "",
          website: "",
          email: session.user.email,
        },
      });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("GET /api/user/profile error:", error);
    return NextResponse.json(
      { error: "Failed to fetch profile" },
      { status: 500 }
    );
  }
}

/* =======================
   UPDATE USER PROFILE
   ======================= */
export async function PUT(req) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const formData = await req.formData();

    const bio = formData.get("bio") || "";
    const city = formData.get("city") || "";
    const college = formData.get("college") || "";

    const skills = JSON.parse(formData.get("skills") || "[]");
    const links = JSON.parse(formData.get("links") || "{}");

    // NOTE:
    // For now we just store image URL (Google image or existing one).
    // Cloudinary upload can be added later.
    const image =
      typeof formData.get("image") === "string"
        ? formData.get("image")
        : session.user.image;

    await dbConnect();

    const updatedUser = await User.findOneAndUpdate(
      { email: session.user.email },
      {
        name: session.user.name,
        email: session.user.email,
        image,
        bio,
        city,
        college,
        skills,
        links,
      },
      {
        new: true,
        upsert: true, // creates user if not exists
      }
    );

    return NextResponse.json({
      success: true,
      user: updatedUser,
    });
  } catch (error) {
    console.error("PUT /api/user/profile error:", error);
    return NextResponse.json(
      { error: "Failed to update profile" },
      { status: 500 }
    );
  }
}
