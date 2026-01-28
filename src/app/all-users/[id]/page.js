import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import dbConnect from "@/lib/db";
import User from "@/models/User";
import mongoose from "mongoose";

export default async function UserPublicProfile({ params: {id} }) {
 

  await dbConnect();
   const objectId = new mongoose.Types.ObjectId(id);
 const user = await User.findById(objectId).lean();


  return (
    <div>
      <Navbar />

      <main className="min-h-screen bg-gradient-to-b from-[#162440] to-[#020617] px-6 py-12 text-white">
        <div className="max-w-5xl mx-auto pt-20 grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* LEFT */}
          <div className="space-y-5">
            <div className="relative w-40 h-40 rounded-full overflow-hidden border border-white/10 mx-auto">
              <Image
                src={user.image || "/default-avatar.png"}
                alt={user.name}
                fill
                className="object-cover"
              />
            </div>

            <div className="text-center">
              <h1 className="text-2xl font-semibold">{user.name}</h1>
              <p className="text-white/60">@{user.email.split("@")[0]}</p>
            </div>

            {(user.city || user.college) && (
              <div className="text-sm text-white/60 text-center">
                {user.city && <p>📍 {user.city}</p>}
                {user.college && <p>🎓 {user.college}</p>}
              </div>
            )}
          </div>

          {/* RIGHT */}
          <div className="md:col-span-2 space-y-6">
            <section className="bg-[#0F172A] p-6 rounded-xl border border-white/10">
              <h2 className="text-lg font-semibold mb-2">About</h2>
              <p className="text-white/70">
                {user.bio || "This user has not added a bio yet."}
              </p>
            </section>

            {user.skills?.length > 0 && (
              <section className="bg-[#0F172A] p-6 rounded-xl border border-white/10">
                <h2 className="text-lg font-semibold mb-3">Skills</h2>
                <div className="flex flex-wrap gap-2">
                  {user.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded bg-white/10 text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
