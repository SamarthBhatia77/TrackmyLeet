"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2, StickyNote, X, ArrowUpDown,Check } from "lucide-react";
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
    <div className="min-h-screen bg-[#0a162b] text-white p-8">
        <Navbar/>
      <div className="max-w-7xl mx-auto pt-28">
        {/* PAGE HEADER */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold tracking-tight">
            <span className="text-white">Revisit Important </span>
            <span className="text-[#73a5f5]">Coding Questions 👩🏻‍💻</span>
          </h1>

          <p className="mt-3 text-white/60 text-lg">
            Thought of the day:{" "}
            <span className="italic text-white/80">"{todayQuote}"</span>
          </p>
        </div>

        <div className="flex justify-between items-center mb-10">
          
          <div className="flex items-center gap-4 relative">
            <button
              onClick={() => setSortOpen(!sortOpen)}
              className="flex items-center gap-2 px-5 py-2.5 bg-white/5 border border-white/10 backdrop-blur rounded-full hover:bg-white/10 transition"
            ><ArrowUpDown size={18} />Sort / Filter</button>
            
            {sortOpen && (
              <div className="absolute right-40 top-14 w-72 bg-[#0a162b] border border-white/10 rounded-2xl p-4 shadow-2xl z-50">
                <p className="text-sm text-white/60 mb-2">Sort by</p>

                <button
                  onClick={() => setSortMode("default")}
                  className={`w-full text-left px-3 py-2 rounded-lg hover:bg-white/10 ${
                    sortMode === "default" && "bg-white/10"
                  }`}
                >
                  Default
                </button>

                <button
                  onClick={() => setSortMode("date-asc")}
                  className={`w-full text-left px-3 py-2 rounded-lg hover:bg-white/10 ${
                    sortMode === "date-asc" && "bg-white/10"
                  }`}
                >
                  Date: Latest → Oldest
                </button>

                <button
                  onClick={() => setSortMode("date-desc")}
                  className={`w-full text-left px-3 py-2 rounded-lg hover:bg-white/10`}
                >
                  Date: Oldest → Latest
                </button>

                <div className="mt-4">
                  <p className="text-sm text-white/60 mb-2">Filter by Topics</p>

                  <input
                    placeholder="Search topics"
                    value={topicFilterQuery}
                    onChange={(e) => setTopicFilterQuery(e.target.value)}
                    className="input mb-2"
                  />

                  <div className="flex flex-wrap gap-2 mb-2">
                    {topicFilters.map((t) => (
                      <span
                        key={t}
                        className="px-3 py-1 text-xs rounded-full bg-[#2d4096]/30 border border-[#2d4096]/40 cursor-pointer"
                        onClick={() =>
                          setTopicFilters(
                            topicFilters.filter((x) => x !== t)
                          )
                        }
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {topicFilterQuery && topicFilters.length < 3 && (
                    <div className="max-h-32 overflow-y-auto">
                      {filteredFilterTopics.map((t) => (
                        <div
                          key={t}
                          className="px-3 py-2 rounded-lg hover:bg-white/10 cursor-pointer"
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

          <button
            onClick={openAddModal}
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#2d4096] to-[#3f5bd8] rounded-full shadow-lg hover:scale-[1.02] transition"
          >
            <Plus size={18} /> Add Problem
          </button>
        </div>
        </div>

        {entries.length === 0 ? (
          <div className="text-center text-white/60 py-32 border border-white/10 rounded-2xl bg-white/5 backdrop-blur">
            Add your first problem to start tracking
          </div>
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-white/10 bg-white/5 backdrop-blur shadow-xl">
            <table className="w-full text-center">
              <thead className="bg-white/10 text-white/80">
                <tr>
                  <th className="py-4 pl-4">#</th>
                  <th>Topics</th>
                  <th>Statement</th>
                  <th>Date</th>
                  <th>Pattern</th>
                  <th>Notes</th>
                  <th>Edit</th>
                  <th className="pr-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {displayedEntries.map((e, idx) => (
                  <tr
                    key={idx}
                    className="border-t border-white/10 hover:bg-white/5 transition"
                  >
                    <td className="py-4 pl-4 font-medium">
                      {e.problemLink ? (
                        <a
                          href={e.problemLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#73a5f5] hover:underline"
                        >
                          {e.problemNo}
                        </a>
                      ) : (
                        e.problemNo
                      )}
                    </td>

                    <td className="py-4">
                      <div className="flex justify-center flex-wrap gap-2">
                        {e.topics.map((t) => (
                          <span
                            key={t}
                            className="px-3 py-1 text-xs rounded-full bg-[#2d4096]/30 border border-[#2d4096]/40 backdrop-blur"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td
                      className="py-4 max-w-xs truncate text-white/80"
                      title={e.statement}
                    >
                      {e.statement || "—"}
                    </td>
                    <td className="py-4 text-white/80">{e.date}</td>
                    <td className="py-4 text-white/80">{e.pattern || "—"}</td>
                    <td className="py-4">
                      {e.notes && (
                        <button
                          onClick={() => {
                            setActiveNotes(e.notes);
                            setNotesOpen(true);
                          }}
                          className="hover:scale-110 transition"
                        >
                          <StickyNote />
                        </button>
                      )}
                    </td>
                    <td className="py-4 pr-2">
                      <button
                        onClick={() => openEditModal(idx)}
                        className="hover:scale-110 transition"
                      >
                        <Pencil />
                      </button>
                    </td>
                    {/* STATUS COLUMN */}
                    <td className="py-4">
                      <button
                        onClick={() => {
                          const updated = [...entries];
                          updated[idx] = {
                            ...updated[idx],
                            status: !updated[idx].status,
                          };
                          setEntries(updated);
                        }}
                        className="hover:scale-110 transition"
                      >
                        <Check
                          size={22}
                          strokeWidth={3}
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className={e.status ? "text-green-400" : "text-white/20"}
                        />

                      </button>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {notesOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex justify-center items-center">
          <div className="bg-[#0a162b] border border-white/10 rounded-2xl p-6 w-[600px] max-w-[90%] shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Notes</h3>
              <button onClick={() => setNotesOpen(false)}>
                <X />
              </button>
            </div>
            <p className="text-white/80 whitespace-pre-wrap leading-relaxed">
              {activeNotes}
            </p>
          </div>
        </div>
      )}

      {open && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-lg z-50 flex justify-center items-center">
          <div className="w-[95%] h-[90%] bg-[#0a162b] border border-white/10 rounded-3xl p-8 overflow-y-auto shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">
                {editIndex !== null ? "Edit Entry" : "Add Entry"}
              </h2>
              {editIndex !== null && (
                <button onClick={deleteEntry} className="text-red-400">
                  <Trash2 />
                </button>
              )}
            </div>

            <div className="grid grid-cols-2 gap-6">
              <input
                placeholder="Problem Number*"
                value={form.problemNo}
                onChange={(e) => setForm({ ...form, problemNo: e.target.value })}
                className="input"
              />
              <input
                placeholder="Problem Link (optional)"
                value={form.problemLink}
                onChange={(e) =>
                  setForm({ ...form, problemLink: e.target.value })
                }
                className="input"
                type="url"
              />

              <input
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                className="input"
              />

              <div className="col-span-2">
                <input
                  placeholder="Search topics"
                  value={topicQuery}
                  onChange={(e) => setTopicQuery(e.target.value)}
                  className="input"
                />
                <div className="flex gap-2 flex-wrap mt-3">
                  {form.topics.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1 rounded-full text-xs bg-[#2d4096]/30 border border-[#2d4096]/40 cursor-pointer"
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
                  <div className="bg-black/80 rounded-xl mt-2 overflow-hidden">
                    {filteredTopics.map((t) => (
                      <div
                        key={t}
                        className="px-4 py-2 hover:bg-white/10 cursor-pointer"
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

              <textarea
                placeholder="Problem Statement / Details"
                value={form.statement}
                onChange={(e) => setForm({ ...form, statement: e.target.value })}
                className="input col-span-2"
              />

              <input
                placeholder="Observable Pattern"
                value={form.pattern}
                onChange={(e) => setForm({ ...form, pattern: e.target.value })}
                className="input col-span-2"
              />

              <textarea
                placeholder="Notes"
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                className="input col-span-2"
              />
            </div>

            <div className="flex justify-end gap-4 mt-8">
              <button onClick={() => setOpen(false)} className="px-4 py-2">
                Cancel
              </button>
              <button
                onClick={saveEntry}
                className="px-6 py-2.5 bg-gradient-to-r from-[#2d4096] to-[#3f5bd8] rounded-full shadow-lg"
              >
                Save
              </button>
              
            </div>
            
          </div>
            
        </div>
      )}
      
    </div>
    <Footer/>
    </div>
  );
}
