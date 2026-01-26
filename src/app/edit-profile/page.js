"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Camera, Plus, X } from "lucide-react";

export default function EditProfilePage() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    bio: "",
    city: "",
    college: "",
    links: {
      github: "",
      linkedin: "",
      twitter: "",
      instagram: "",
      website: "",
      email: "",
    },
    skills: [],
    image: "",
  });

  const [newSkill, setNewSkill] = useState("");
  const [previewImage, setPreviewImage] = useState(null);

  /* ---------------- FETCH EXISTING PROFILE ---------------- */
  useEffect(() => {
    async function fetchProfile() {
      const res = await fetch("/api/user/profile");
      const data = await res.json();
      setForm(data);
      setPreviewImage(data.image);
      setLoading(false);
    }
    fetchProfile();
  }, []);

  /* ---------------- HANDLERS ---------------- */
  const updateField = (key, value) =>
    setForm((f) => ({ ...f, [key]: value }));

  const updateLink = (key, value) =>
    setForm((f) => ({
      ...f,
      links: { ...f.links, [key]: value },
    }));

  const addSkill = () => {
    if (!newSkill.trim()) return;
    if (form.skills.includes(newSkill)) return;
    setForm((f) => ({
      ...f,
      skills: [...f.skills, newSkill],
    }));
    setNewSkill("");
  };

  const removeSkill = (skill) =>
    setForm((f) => ({
      ...f,
      skills: f.skills.filter((s) => s !== skill),
    }));

  const handleImageUpload = (file) => {
    const reader = new FileReader();
    reader.onload = () => setPreviewImage(reader.result);
    reader.readAsDataURL(file);
    setForm((f) => ({ ...f, image: file }));
  };

  const saveProfile = async () => {
    setSaving(true);

    const formData = new FormData();
    Object.entries(form).forEach(([key, val]) => {
      if (key === "links" || key === "skills") {
        formData.append(key, JSON.stringify(val));
      } else {
        formData.append(key, val);
      }
    });

    await fetch("/api/user/profile", {
      method: "PUT",
      body: formData,
    });

    setSaving(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#020617] text-white flex items-center justify-center">
        Loading…
      </div>
    );
  }

  return (
    <div>
      <Navbar />

      <main className="bg-gradient-to-b from-[#162440] to-[#020617] min-h-screen text-white px-6 py-10">
        <div className="pt-20 max-w-4xl mx-auto space-y-10">

          {/* PROFILE IMAGE */}
          <div className="flex justify-center">
            <label className="relative group cursor-pointer">
              <div className="w-40 h-40 rounded-full border border-white/10 overflow-hidden">
                <Image
                  src={previewImage || "/default-avatar.png"}
                  alt="Profile"
                  fill
                  className="object-cover"
                />
              </div>

              {/* HOVER OVERLAY */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100
                              flex items-center justify-center transition">
                <Camera size={28} />
              </div>

              <input
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => handleImageUpload(e.target.files[0])}
              />
            </label>
          </div>

          {/* BASIC INFO */}
          <Section title="Basic Info">
            <Textarea label="Bio / About" value={form.bio} onChange={(v) => updateField("bio", v)} />
            <Input label="City" value={form.city} onChange={(v) => updateField("city", v)} />
            <Input label="College / Institution" value={form.college} onChange={(v) => updateField("college", v)} />
          </Section>

          {/* LINKS */}
          <Section title="Links">
            {Object.entries(form.links).map(([k, v]) => (
              <Input
                key={k}
                label={k.charAt(0).toUpperCase() + k.slice(1)}
                value={v}
                onChange={(val) => updateLink(k, val)}
              />
            ))}
          </Section>

          {/* SKILLS */}
          <Section title="Technical Skills">
            <div className="flex gap-2">
              <input
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                className="flex-1 bg-[#020617] border border-white/10 rounded px-3 py-2"
                placeholder="Add skill"
              />
              <button
                onClick={addSkill}
                className="px-4 rounded bg-blue-600 hover:bg-blue-700"
              >
                <Plus size={16} />
              </button>
            </div>

            <div className="flex flex-wrap gap-2 mt-3">
              {form.skills.map((s) => (
                <span
                  key={s}
                  className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center gap-2"
                >
                  {s}
                  <X size={14} className="cursor-pointer" onClick={() => removeSkill(s)} />
                </span>
              ))}
            </div>
          </Section>

          {/* SAVE */}
          <button
            onClick={saveProfile}
            disabled={saving}
            className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 transition"
          >
            {saving ? "Saving…" : "Save Changes"}
          </button>

        </div>
      </main>

      <Footer />
    </div>
  );
}

/* ---------------- SMALL UI COMPONENTS ---------------- */

function Section({ title, children }) {
  return (
    <section className="bg-[#0F172A] p-6 rounded-xl border border-white/10 space-y-4">
      <h2 className="text-lg font-semibold">{title}</h2>
      {children}
    </section>
  );
}

function Input({ label, value, onChange }) {
  return (
    <div>
      <p className="text-sm text-white/60 mb-1">{label}</p>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-[#020617] border border-white/10 rounded px-3 py-2"
      />
    </div>
  );
}

function Textarea({ label, value, onChange }) {
  return (
    <div>
      <p className="text-sm text-white/60 mb-1">{label}</p>
      <textarea
        rows={3}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-[#020617] border border-white/10 rounded px-3 py-2"
      />
    </div>
  );
}
