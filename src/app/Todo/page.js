"use client";

import { useEffect, useState } from "react";
import { Plus, Check, X } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const MOTIVATIONAL_QUOTES = [
  "Consistency beats intensity.",
  "Small progress is still progress.",
  "Discipline builds freedom.",
  "One problem at a time.",
  "Future you will thank you.",
  "Show up every day.",
];

export default function TodoPage() {
  const [tasks, setTasks] = useState([]);
  const [open, setOpen] = useState(false);
  const [showCongrats, setShowCongrats] = useState(false);
  const [time, setTime] = useState(new Date());

  const [form, setForm] = useState({
    title: "",
    priority: "mid",
    notes: "",
    done: false,
  });

  const todayQuote =
    MOTIVATIONAL_QUOTES[new Date().getDate() % MOTIVATIONAL_QUOTES.length];

  /* -------- DATE & TIME -------- */
  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  /* -------- PROGRESS -------- */
  const completed = tasks.filter((t) => t.done).length;
  const progress =
    tasks.length === 0 ? 0 : Math.round((completed / tasks.length) * 100);

  useEffect(() => {
    if (tasks.length > 0 && completed === tasks.length) {
      setShowCongrats(true);
      setTimeout(() => setShowCongrats(false), 2000);
    }
  }, [completed, tasks.length]);

  function addTask() {
    if (!form.title) return;
    setTasks([...tasks, form]);
    setForm({ title: "", priority: "mid", notes: "", done: false });
    setOpen(false);
  }

  function toggleTask(idx) {
    const updated = [...tasks];
    updated[idx].done = !updated[idx].done;
    setTasks(updated);
  }

  return (
    <div>
      <Navbar />

      <div className="min-h-screen bg-[#0a162b] text-white p-8 mt-10">
        <div className="max-w-5xl mx-auto pt-20">

          {/* HEADER */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold">Manage your tasks 📚</h1>
              <p className="text-white/60 mt-1">
                Thought of the day: "{todayQuote}"
              </p>
            </div>

            <div className="text-right">
              <p className="text-white/60 text-sm">Current Date & Time</p>
              <p className="text-lg font-mono">
                {time.toLocaleDateString()} — {time.toLocaleTimeString()}
              </p>
            </div>
          </div>

          {/* PROGRESS BAR */}
          <div className="mb-6">
            <div className="flex justify-between text-sm mb-1 text-white/60">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <div className="h-3 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#73a5f5] transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* ADD BUTTON */}
          <button
            onClick={() => setOpen(true)}
            className="flex items-center gap-2 mb-6 px-5 py-2.5
                       bg-[#73a5f5] rounded-full shadow-lg
                       hover:scale-[1.02] transition"
          >
            <Plus size={18} /> Add New Task
          </button>

          {/* TASK TABLE */}
          <div className="rounded-2xl bg-white/5 border border-white/10 backdrop-blur shadow-xl">
            <table className="w-full text-left">
              <thead className="text-white/70">
                <tr>
                  <th className="p-4">Done</th>
                  <th>Task</th>
                  <th>Priority</th>
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((t, idx) => (
                  <tr
                    key={idx}
                    className="border-t border-white/10 hover:bg-white/5 transition"
                  >
                    <td className="p-4">
                      <button onClick={() => toggleTask(idx)}>
                        <Check
                          size={22}
                          strokeWidth={3}
                          className={
                            t.done ? "text-green-400" : "text-white/20"
                          }
                        />
                      </button>
                    </td>

                    <td
                      className={`${
                        t.done ? "line-through text-white/40" : ""
                      }`}
                    >
                      {t.title}
                    </td>

                    <td>
                      <span
                        className={`px-3 py-1 rounded-full text-xs backdrop-blur
                          ${
                            t.priority === "low"
                              ? "bg-green-400/20 text-green-300"
                              : t.priority === "mid"
                              ? "bg-yellow-400/20 text-yellow-300"
                              : "bg-red-400/20 text-red-300"
                          }`}
                      >
                        {t.priority}
                      </span>
                    </td>

                    <td className="text-white/60">{t.notes || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ADD MODAL */}
        {open && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex justify-center items-center">
            <div className="bg-[#0a162b] border border-white/10 rounded-3xl p-6 w-[500px]">
              <div className="flex justify-between mb-4">
                <h2 className="text-xl font-semibold">New Task</h2>
                <button onClick={() => setOpen(false)}>
                  <X />
                </button>
              </div>

              <input
                placeholder="Task name"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="input w-full mb-4"
              />

              <div className="flex gap-3 mb-4">
                <button
                  onClick={() => setForm({ ...form, priority: "low" })}
                  className={`px-4 py-2 rounded-full text-sm backdrop-blur
                    ${
                      form.priority === "low"
                        ? "bg-green-400/20 text-green-300 border border-green-400"
                        : "border border-white/20 text-white/60"
                    }`}
                >
                  Low
                </button>

                <button
                  onClick={() => setForm({ ...form, priority: "mid" })}
                  className={`px-4 py-2 rounded-full text-sm backdrop-blur
                    ${
                      form.priority === "mid"
                        ? "bg-yellow-400/20 text-yellow-300 border border-yellow-400"
                        : "border border-white/20 text-white/60"
                    }`}
                >
                  Mid
                </button>

                <button
                  onClick={() => setForm({ ...form, priority: "high" })}
                  className={`px-4 py-2 rounded-full text-sm backdrop-blur
                    ${
                      form.priority === "high"
                        ? "bg-red-400/20 text-red-300 border border-red-400"
                        : "border border-white/20 text-white/60"
                    }`}
                >
                  High
                </button>
              </div>

              <textarea
                placeholder="Notes (optional)"
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                className="input w-full mb-6"
              />

              <button
                onClick={addTask}
                className="w-full py-2.5 bg-[#73a5f5] rounded-full shadow-lg"
              >
                Add Task
              </button>
            </div>
          </div>
        )}

        {/* CONGRATS POPUP */}
        {showCongrats && (
          <div className="fixed top-6 right-6 z-50 pointer-events-none">
            <div className="px-6 py-4 bg-[#73a5f5]/20 backdrop-blur-xl
                            border border-[#73a5f5]/40 rounded-2xl
                            text-lg font-semibold text-[#73a5f5] shadow-2xl">
              🎉 Great work! All tasks completed.
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
