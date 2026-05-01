"use client";

import { useState } from "react";

type ContentType = "blog" | "social" | "email";

interface FormData {
  contentType: ContentType;
  topic: string;
  industry: string;
  audience: string;
  tone: string;
  goal: string;
}

const TONES = ["Professional", "Casual", "Witty", "Authoritative", "Warm", "Bold"];
const GOALS = ["Brand Awareness", "Lead Generation", "Sales", "Engagement", "Trust Building"];

export default function Home() {
  const [form, setForm] = useState<FormData>({
    contentType: "blog",
    topic: "",
    industry: "",
    audience: "",
    tone: "Professional",
    goal: "Brand Awareness",
  });

  const [output, setOutput] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setOutput("");

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Generation failed. Please try again.");

      const data = await res.json();
      setOutput(data.content);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
  };

  return (
    <main className="min-h-screen bg-gray-950 text-gray-100">
      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 pt-20 pb-12 text-center">
        <h1 className="text-4xl font-bold text-white mb-4">
          Content at the Speed of AI
        </h1>
        <p className="text-gray-400 text-lg max-w-xl mx-auto">
          Generate blog posts, social content, and emails — tailored to your
          audience, tone, and goals. Zero friction. Instant output.
        </p>
      </section>

      {/* Form + Output */}
      <section className="max-w-4xl mx-auto px-6 pb-24">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left: Brief Form */}
          <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
            <h2 className="text-xl font-semibold mb-6 text-white">
              Content Brief
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Content Type */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Content Type
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(["blog", "social", "email"] as ContentType[]).map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setForm({ ...form, contentType: type })}
                      className={`py-2 px-3 rounded-lg text-sm font-medium capitalize transition-all ${
                        form.contentType === type
                          ? "bg-blue-600 text-white"
                          : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Topic */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Topic
                </label>
                <input
                  type="text"
                  placeholder={
                    form.contentType === "blog"
                      ? "e.g. 5 Ways to Boost Productivity"
                      : form.contentType === "social"
                      ? "e.g. Launching our new product"
                      : "e.g. Spring sale announcement"
                  }
                  value={form.topic}
                  onChange={(e) => setForm({ ...form, topic: e.target.value })}
                  required
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Industry */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Industry
                </label>
                <input
                  type="text"
                  placeholder="e.g. SaaS, E-commerce, Healthcare"
                  value={form.industry}
                  onChange={(e) => setForm({ ...form, industry: e.target.value })}
                  required
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Audience */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Target Audience
                </label>
                <input
                  type="text"
                  placeholder="e.g. Startup founders, 25-40, B2B buyers"
                  value={form.audience}
                  onChange={(e) => setForm({ ...form, audience: e.target.value })}
                  required
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Tone */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Tone
                </label>
                <select
                  value={form.tone}
                  onChange={(e) => setForm({ ...form, tone: e.target.value })}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {TONES.map((tone) => (
                    <option key={tone} value={tone}>
                      {tone}
                    </option>
                  ))}
                </select>
              </div>

              {/* Goal */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Goal
                </label>
                <select
                  value={form.goal}
                  onChange={(e) => setForm({ ...form, goal: e.target.value })}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {GOALS.map((goal) => (
                    <option key={goal} value={goal}>
                      {goal}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-xl transition-all mt-2"
              >
                {loading ? "Generating..." : "Generate Content ✨"}
              </button>
            </form>
          </div>

          {/* Right: Output */}
          <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">Generated Content</h2>
              {output && (
                <button
                  onClick={copyToClipboard}
                  className="text-sm text-blue-400 hover:text-blue-300 font-medium"
                >
                  Copy
                </button>
              )}
            </div>

            {loading && (
              <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mb-4" />
                <p className="text-sm">Generating your content...</p>
              </div>
            )}

            {error && (
              <div className="bg-red-900/30 border border-red-800 rounded-lg p-4 text-red-400 text-sm">
                {error}
              </div>
            )}

            {!loading && !error && !output && (
              <div className="flex flex-col items-center justify-center h-64 text-gray-600">
                <svg
                  className="w-12 h-12 mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  />
                </svg>
                <p className="text-sm text-center">
                  Fill the brief and hit Generate to see your content here.
                </p>
              </div>
            )}

            {output && (
              <div className="bg-gray-800 rounded-xl p-4 text-sm text-gray-300 leading-relaxed whitespace-pre-wrap max-h-[500px] overflow-y-auto">
                {output}
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
