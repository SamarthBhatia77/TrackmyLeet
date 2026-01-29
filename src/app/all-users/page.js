"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function AllUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await fetch("/api/users");
        const data = await res.json();
        console.log("users from API:", data.users);   // 👈 check _id here
        setUsers(data.users || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, []);

  if (loading) {
    return <LoadingSpinner text="Loading users..." />;
  }
  const ONLINE_THRESHOLD_MS = 5 * 60 * 1000;

  return (
    <div>
      <Navbar />

      <main className="min-h-screen bg-gradient-to-b from-[#162440] to-[#020617] px-6 py-12 text-white">
        <div className="max-w-7xl mx-auto pt-20">
          <h1 className="text-3xl font-semibold mb-8">All Users</h1>
          <p className="mb-8 text-lg">
            Find like-minded peers, stay engaged, and grow together as a community 🏆
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {users.map((user) => {
              const lastActiveMs =
                Date.now() - new Date(user.updatedAt).getTime();
              const isOnline = lastActiveMs < ONLINE_THRESHOLD_MS;

              return (
                <div
                  key={user._id} // ✅ FIXED KEY WARNING
                  className="bg-[#0F172A] rounded-xl p-5 border border-white/10 hover:border-white/20 transition"
                >
                  {/* CLICKABLE PROFILE AREA */}
                  {/*<Link key={user._id} href={`/all-users/${user._id}`} className="block cursor-pointer">*/}
                    <div>
                      <div className="flex items-center gap-4">
                        <div className="relative w-14 h-14 rounded-full overflow-hidden border border-white/10">
                          <Image
                            src={user.image || "/default-avatar.png"}
                            alt={user.name}
                            fill
                            className="object-cover"
                          />
                        </div>

                        <div className="flex-1">
                          <h2 className="font-semibold">{user.name}</h2>

                          <div className="text-sm text-white/60 flex items-center gap-2">
                            {isOnline ? (
                              <>
                                <span className="w-2 h-2 rounded-full bg-green-400" />
                                <span className="text-green-400">Online</span>
                              </>
                            ) : (
                              <span>Last active {timeAgo(user.updatedAt)}</span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* LOCATION & COLLEGE */}
                        {(user.city || user.college) && (
                          <div className="mt-3 text-sm text-white/60">
                            {user.city && <span>📍 {user.city}</span>}
                            {user.city && user.college && " · "}
                            {user.college && <span>🎓 {user.college}</span>}
                          </div>
                        )}

                        {/* BIO */}
                        {user.bio && (
                          <p className="mt-2 text-sm text-white/70 italic line-clamp-2">
                            “{user.bio}”
                          </p>
                        )}


                      {user.skills?.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {user.skills.slice(0, 4).map((skill, i) => (
                            <span
                              key={i}
                              className="text-xs px-2 py-1 rounded bg-white/10 text-white/80"
                            >
                              {skill}
                            </span>
                          ))}
                          {user.skills.length > 4 && (
                            <span className="text-xs text-white/50">
                              +{user.skills.length - 4} more
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  {/*</Link>*/}

                  {/* ACTION BUTTON */}
                  <button
                    className="mt-4 w-full py-2 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition text-sm"
                    onClick={() => alert("Friend request feature coming soon!")}
                  >
                    Send Friend Request
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

/* ---------------- Helpers ---------------- */

function timeAgo(date) {
  const seconds = Math.floor((Date.now() - new Date(date)) / 1000);

  const intervals = [
    { label: "year", seconds: 31536000 },
    { label: "month", seconds: 2592000 },
    { label: "day", seconds: 86400 },
    { label: "hour", seconds: 3600 },
    { label: "minute", seconds: 60 },
  ];

  for (const i of intervals) {
    const count = Math.floor(seconds / i.seconds);
    if (count >= 1) return `${count} ${i.label}${count > 1 ? "s" : ""} ago`;
  }

  return "just now";
}
