"use client";

import { useState } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  StickyNote,
  X,
  ArrowUpDown,
  Check,
} from "lucide-react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
const STORAGE_KEY = "trackmyleet-entries";

const TOPICS = [
  "Arrays",
  "Strings",
  "Linked List",
  "Stacks",
  "Queues",
  "Binary Search",
  "Two Pointers",
  "Sliding Window",
  "Recursion",
  "Dynamic Programming",
  "Greedy",
  "Graphs",
  "Trees",
  "Binary Trees",
  "Heaps",
  "Hashing",
  "Bit Manipulation",
  "Math",
  "Hash Table",
];
const MOTIVATIONAL_QUOTES = [
  "Consistency beats intensity.",
  "Small progress every day adds up.",
  "Solve less, understand more.",
  "Patterns matter more than problems.",
  "Clarity comes from repetition.",
  "Future you will thank you.",
  "One problem at a time.",
];

export default function AddEntriesPage() {
  const [entries, setEntries] = useState([]);
  const [open, setOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [notesOpen, setNotesOpen] = useState(false);
  const [activeNotes, setActiveNotes] = useState("");
  const [sortOpen, setSortOpen] = useState(false);
  const [sortMode, setSortMode] = useState("default"); 
  // "default" | "date-asc" | "date-desc"

  const [topicFilterQuery, setTopicFilterQuery] = useState("");
  const [topicFilters, setTopicFilters] = useState([]);

  const emptyForm = {
    problemNo: "",
    problemLink: "",
    topics: [],
    statement: "",
    date: "",
    pattern: "",
    notes: "",
    status: false,
  };

  const [form, setForm] = useState(emptyForm);
  const [topicQuery, setTopicQuery] = useState("");

  const filteredTopics = TOPICS.filter(
    (t) =>
      t.toLowerCase().includes(topicQuery.toLowerCase()) &&
      !form.topics.includes(t)
  );

  const filteredFilterTopics = TOPICS.filter(
    (t) =>
        t.toLowerCase().includes(topicFilterQuery.toLowerCase()) &&
        !topicFilters.includes(t)
    );

    useEffect(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) setEntries(JSON.parse(stored));
        } catch (e) {
            console.error("Failed to load saved entries");
            localStorage.removeItem(STORAGE_KEY);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
    }, [entries]);


  const displayedEntries = [...entries]
    .filter((e) => {
        if (topicFilters.length === 0) return true;
        return e.topics.some((t) => topicFilters.includes(t));
    })
    .sort((a, b) => {
        if (sortMode === "date-asc")
        return new Date(a.date) - new Date(b.date);
        if (sortMode === "date-desc")
        return new Date(b.date) - new Date(a.date);
        return 0;
  });

  const todayQuote =
  MOTIVATIONAL_QUOTES[new Date().getDate() % MOTIVATIONAL_QUOTES.length];

  function openAddModal() {
    setEditIndex(null);
    setForm(emptyForm);
    setOpen(true);
  }

  function openEditModal(idx) {
    setEditIndex(idx);
    setForm(entries[idx]);
    setOpen(true);
  }

  function saveEntry() {
    if (!form.problemNo || !form.date) return;

    if (editIndex !== null) {
      const copy = [...entries];
      copy[editIndex] = form;
      setEntries(copy);
    } else {
      setEntries([...entries, form]);
    }
    setOpen(false);
  }

  function deleteEntry() {
    setEntries(entries.filter((_, i) => i !== editIndex));
    setOpen(false);
  }

  return (
    <div>
      <div className="min-h-screen bg-gradient-to-b from-[#1e3459] via-[#0b1730] to-[#020617] text-white px-4 pb-16">
        <Navbar />
        <div className="mx-auto max-w-7xl pt-28">
          {/* PAGE HEADER */}
          <div className="mb-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70 backdrop-blur">
              <span className="inline-flex h-2 w-2 rounded-full bg-[#60a5fa] shadow-[0_0_16px_rgba(96,165,250,0.8)]" />
              Your personal problem review hub
            </div>

            <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
              <span className="text-white">Revisit Important </span>
              <span className="bg-gradient-to-r from-[#93c5fd] via-[#60a5fa] to-[#3b82f6] bg-clip-text text-transparent">
                Coding Questions
              </span>{" "}
              <span>👩🏻‍💻</span>
            </h1>

            <p className="mt-3 max-w-2xl text-sm text-white/60 sm:text-base">
              Thought of the day:{" "}
              <span className="italic text-white/80">"{todayQuote}"</span>
            </p>
          </div>

          <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div className="relative flex items-center gap-3">
              <button
                onClick={() => setSortOpen(!sortOpen)}
                className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white/85 backdrop-blur transition hover:bg-white/10"
              >
                <ArrowUpDown size={18} />
                Sort / Filter
              </button>

              {sortOpen && (
                <div className="absolute left-0 top-11 z-50 w-80 rounded-2xl border border-white/12 bg-[#020617] p-4 text-sm shadow-[0_18px_60px_rgba(0,0,0,0.75)]">
                  <p className="mb-2 text-xs text-white/60">Sort by</p>

                  <button
                    onClick={() => setSortMode("default")}
                    className={`w-full rounded-lg px-3 py-2 text-left text-xs hover:bg-white/8 ${
                      sortMode === "default" ? "bg-white/10" : ""
                    }`}
                  >
                    Default
                  </button>

                  <button
                    onClick={() => setSortMode("date-asc")}
                    className={`mt-1 w-full rounded-lg px-3 py-2 text-left text-xs hover:bg-white/8 ${
                      sortMode === "date-asc" ? "bg-white/10" : ""
                    }`}
                  >
                    Date: Latest → Oldest
                  </button>

                  <button
                    onClick={() => setSortMode("date-desc")}
                    className="mt-1 w-full rounded-lg px-3 py-2 text-left text-xs hover:bg-white/8"
                  >
                    Date: Oldest → Latest
                  </button>

                  <div className="mt-4">
                    <p className="mb-2 text-xs text-white/60">Filter by topics</p>

                    <input
                      placeholder="Search topics"
                      value={topicFilterQuery}
                      onChange={(e) => setTopicFilterQuery(e.target.value)}
                      className="input mb-2 text-xs"
                    />

                    <div className="mb-2 flex flex-wrap gap-2">
                      {topicFilters.map((t) => (
                        <span
                          key={t}
                          className="inline-flex cursor-pointer items-center rounded-full border border-[#2d4096]/40 bg-[#2d4096]/30 px-3 py-1 text-[11px]"
                          onClick={() =>
                            setTopicFilters(topicFilters.filter((x) => x !== t))
                          }
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {topicFilterQuery && topicFilters.length < 3 && (
                      <div className="max-h-32 overflow-y-auto rounded-xl border border-white/10 bg-black/80">
                        {filteredFilterTopics.map((t) => (
                          <div
                            key={t}
                            className="cursor-pointer px-3 py-2 text-xs hover:bg-white/10"
                            onClick={() => {
                              setTopicFilters([...topicFilters, t]);
                              setTopicFilterQuery("");
                            }}
                          >
                            {t}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={openAddModal}
              className="flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#2d4096] to-[#3f5bd8] px-6 py-2.5 text-sm font-semibold shadow-[0_16px_45px_rgba(15,23,42,0.9)] transition hover:scale-[1.02]"
            >
              <Plus size={18} /> Add Problem
            </button>
          </div>

          {entries.length === 0 ? (
            <div className="rounded-2xl border border-white/10 bg-white/5 py-24 text-center text-sm text-white/65 backdrop-blur">
              Add your first problem to start tracking.
            </div>
          ) : (
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur shadow-[0_24px_70px_rgba(15,23,42,0.9)] text-[0.92rem] sm:text-sm">
              <div className="max-h-[540px] overflow-auto">
                <table className="w-full text-left text-sm">
                  <thead className="sticky top-0 z-10 bg-gradient-to-r from-white/10 via-white/5 to-white/10 text-[0.75rem] uppercase tracking-wide text-white/70 backdrop-blur">
                    <tr>
                      <th className="py-3 pl-5 pr-3 font-medium">#</th>
                      <th className="px-3 font-medium">Topics</th>
                      <th className="px-3 font-medium">Statement</th>
                      <th className="px-3 font-medium">Date</th>
                      <th className="px-3 font-medium">Pattern</th>
                      <th className="px-4 text-right font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {displayedEntries.map((e, idx) => (
                      <tr
                        key={idx}
                        className="border-t border-white/8 bg-white/[0.01] transition hover:bg-white/5"
                      >
                        <td className="py-3 pl-5 pr-3 font-medium">
                          {e.problemLink ? (
                            <a
                              href={e.problemLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[#73a5f5] underline-offset-2 hover:underline"
                            >
                              {e.problemNo}
                            </a>
                          ) : (
                            e.problemNo
                          )}
                        </td>

                        <td className="py-3 px-3 align-top">
                          <div className="flex flex-wrap gap-1.5">
                            {e.topics.map((t) => (
                              <span
                                key={t}
                                className="inline-flex items-center rounded-full border border-[#2d4096]/40 bg-[#2d4096]/30 px-2.5 py-0.5 text-[11px]"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="max-w-xs truncate px-3 py-3 text-white/80" title={e.statement}>
                          {e.statement || "—"}
                        </td>
                        <td className="px-3 py-3 text-white/75">
                          {e.date}
                        </td>
                        <td className="px-3 py-3 text-white/75">
                          {e.pattern || "—"}
                        </td>

                        {/* ACTIONS COLUMN */}
                        <td className="px-4 py-3">
                          <div className="flex items-center justify-end gap-2 text-[0.8rem]">
                            {e.notes && (
                              <button
                                onClick={() => {
                                  setActiveNotes(e.notes);
                                  setNotesOpen(true);
                                }}
                                title="View notes"
                                className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/80 transition hover:scale-105 hover:bg-white/10"
                              >
                                <StickyNote size={15} />
                              </button>
                            )}

                            <button
                              onClick={() => openEditModal(idx)}
                              title="Edit entry"
                              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/80 transition hover:scale-105 hover:bg-white/10"
                            >
                              <Pencil size={15} />
                            </button>

                            <button
                              onClick={() => {
                                const updated = [...entries];
                                updated[idx] = {
                                  ...updated[idx],
                                  status: !updated[idx].status,
                                };
                                setEntries(updated);
                              }}
                              title={e.status ? "Mark as to review" : "Mark as revisited"}
                              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 transition hover:scale-105 hover:bg-white/10"
                            >
                              <Check
                                size={18}
                                strokeWidth={3}
                                className={
                                  e.status ? "text-emerald-400" : "text-white/30"
                                }
                              />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

      {notesOpen && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/70 backdrop-blur-xl">
          <div className="relative w-[600px] max-w-[90%] rounded-3xl border border-white/10 bg-[#050b18] px-6 py-5 shadow-[0_18px_60px_rgba(0,0,0,0.85)]">
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-base font-semibold sm:text-lg">Notes</h3>
              <button
                onClick={() => setNotesOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full text-white/70 transition hover:bg-red-500/10 hover:text-red-400"
              >
                <X size={16} />
              </button>
            </div>
            <p className="mt-4 max-h-80 overflow-y-auto whitespace-pre-wrap text-sm leading-relaxed text-white/80">
              {activeNotes}
            </p>
          </div>
        </div>
      )}

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xl">
          <div className="relative h-[90%] w-[96%] max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-[#050b18] shadow-[0_24px_70px_rgba(0,0,0,0.9)]">
            <div className="relative flex h-full flex-col p-6 sm:p-8">
              <button
                onClick={() => setOpen(false)}
                className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full text-white/70 transition hover:bg-red-500/10 hover:text-red-400"
              >
                <X size={16} />
              </button>

              <div className="mb-6 flex items-center justify-between gap-3 pr-10">
                <div>
                  <h2 className="text-xl font-semibold sm:text-2xl">
                    {editIndex !== null ? "Edit Entry" : "Add Entry"}
                  </h2>
                  <p className="mt-1 text-xs text-white/60 sm:text-sm">
                    Capture what matters: statement, topics, patterns, and notes
                    for future you.
                  </p>
                </div>

                {editIndex !== null && (
                  <button
                    onClick={deleteEntry}
                    className="rounded-full border border-red-500/40 bg-red-500/10 px-4 py-2 text-xs text-red-300 transition hover:bg-red-500/20"
                  >
                    <Trash2 className="mr-1 inline-block h-3.5 w-3.5" />
                    Delete
                  </button>
                )}
              </div>

              <div className="flex-1 overflow-y-auto rounded-2xl border border-white/8 bg-black/20 p-4 sm:p-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-3">
                    <label className="block text-xs font-medium text-white/70">
                      Problem Number*
                    </label>
                    <input
                      placeholder="e.g. 496"
                      value={form.problemNo}
                      onChange={(e) =>
                        setForm({ ...form, problemNo: e.target.value })
                      }
                      className="input text-sm"
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="block text-xs font-medium text-white/70">
                      Problem Link (optional)
                    </label>
                    <input
                      placeholder="Paste Problem URL"
                      value={form.problemLink}
                      onChange={(e) =>
                        setForm({ ...form, problemLink: e.target.value })
                      }
                      className="input text-sm"
                      type="url"
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="block text-xs font-medium text-white/70">
                      Date solved
                    </label>
                    <input
                      type="date"
                      value={form.date}
                      onChange={(e) =>
                        setForm({ ...form, date: e.target.value })
                      }
                      className="input text-sm"
                    />
                  </div>

                  <div className="space-y-3 sm:col-span-1">
                    <label className="block text-xs font-medium text-white/70">
                      Topics
                    </label>
                    <input
                      placeholder="Search topics"
                      value={topicQuery}
                      onChange={(e) => setTopicQuery(e.target.value)}
                      className="input text-sm"
                    />
                    <div className="mt-2 flex flex-wrap gap-2">
                      {form.topics.map((t) => (
                        <span
                          key={t}
                          className="cursor-pointer rounded-full border border-[#2d4096]/40 bg-[#2d4096]/30 px-3 py-1 text-[11px]"
                          onClick={() =>
                            setForm({
                              ...form,
                              topics: form.topics.filter((x) => x !== t),
                            })
                          }
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    {topicQuery && form.topics.length < 5 && (
                      <div className="mt-2 max-h-32 overflow-y-auto rounded-xl bg-black/80">
                        {filteredTopics.map((t) => (
                          <div
                            key={t}
                            className="cursor-pointer px-4 py-2 text-xs hover:bg-white/10"
                            onClick={() => {
                              setForm({ ...form, topics: [...form.topics, t] });
                              setTopicQuery("");
                            }}
                          >
                            {t}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="space-y-3 sm:col-span-2">
                    <label className="block text-xs font-medium text-white/70">
                      Problem Statement / Details
                    </label>
                    <textarea
                      placeholder="Summarize the problem in your own words..."
                      value={form.statement}
                      onChange={(e) =>
                        setForm({ ...form, statement: e.target.value })
                      }
                      className="input min-h-[80px] text-sm"
                    />
                  </div>

                  <div className="space-y-3 sm:col-span-2">
                    <label className="block text-xs font-medium text-white/70">
                      Observable Pattern
                    </label>
                    <input
                      placeholder="e.g. Monotonic stack, Sliding window, Binary search on answer..."
                      value={form.pattern}
                      onChange={(e) =>
                        setForm({ ...form, pattern: e.target.value })
                      }
                      className="input text-sm"
                    />
                  </div>

                  <div className="space-y-3 sm:col-span-2">
                    <label className="block text-xs font-medium text-white/70">
                      Notes
                    </label>
                    <textarea
                      placeholder="Edge cases, mistakes, and what you'd do differently next time."
                      value={form.notes}
                      onChange={(e) =>
                        setForm({ ...form, notes: e.target.value })
                      }
                      className="input min-h-[90px] text-sm"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between gap-4">
                <p className="text-[11px] text-white/55">
                  Tip: Write notes for future you, patterns and pitfalls age well.
                </p>
                <button
                  onClick={saveEntry}
                  className="rounded-full bg-gradient-to-r from-[#2d4096] to-[#3f5bd8] px-6 py-2.5 text-sm font-semibold shadow-[0_16px_45px_rgba(15,23,42,0.9)] transition hover:scale-[1.02]"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      </div>
      <Footer />
    </div>
  );
}
