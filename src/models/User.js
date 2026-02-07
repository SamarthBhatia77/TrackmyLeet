import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    image: String,
    bio: { type: Object, default: "" },
    city: { type: String, default: "" },
    college: { type: String, default: "" },

    leetcodeUsername: { type: String, default: "" },

    skills: {
      type: [String],
      default: [],
    },

    links: {
      github: { type: String, default: "" },
      linkedin: { type: String, default: "" },
      twitter: { type: String, default: "" },
      instagram: { type: String, default: "" },
      website: { type: String, default: "" },
    },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
