
/*
Video Editor Portfolio — Single-file React component
- Usage: paste into a React app (e.g., Create React App / Vite) with Tailwind CSS enabled.
- File: VideoPortfolio.jsx (default export component)

Features included:
- Hero with CTA
- Projects grid with video thumbnails
- Lightbox modal that plays either YouTube/Vimeo if URL contains "youtube"/"vimeo" or native MP4 via <video>
- Search and tag filter
- Project details panel
- Contact / download CV button

How to add your videos:
1) For YouTube/Vimeo: set videoUrl to the full share URL (https://youtu.be/... or https://www.youtube.com/watch?v=... or https://vimeo.com/...).
2) For direct MP4: set videoUrl to the public MP4 URL (host on S3, Cloudflare, or use a streaming host).
3) Replace the `projects` array below with your own entries.

Hosting suggestions:
- For static site: Vercel or Netlify (works with React + Tailwind). Connect your Git repo and deploy.
- For simple GitHub Pages: build and push the production build.

Want me to customize colors, fonts, or create a variant that embeds your YouTube/Vimeo channel automatically? Tell me and I'll update.
*/

import React, { useState, useMemo } from "react";

export default function VideoPortfolio() {
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState("");
  const [selected, setSelected] = useState(null); // selected project

  // === Sample projects: replace these with your real projects ===
  const projects = [
    {
      id: 1,
      title: "Cinematic Short — City Lights",
      year: 2025,
      tags: ["Cinematic", "Color Grading", "Short"],
      thumbnail: "https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=0a0b9f2e8f3b6a5d9f6f8f0e6c9d1a2b",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      duration: "2:34",
      description:
        "A cinematic short focusing on night-time cityscapes and advanced color grading. Graded in DaVinci Resolve; cuts in Premiere Pro.",
    },
    {
      id: 2,
      title: "Product Promo — Smart Bottle",
      year: 2024,
      tags: ["Promo", "Product", "Motion Graphics"],
      thumbnail: "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=5a1b7b6d9d2b7f9a0f1e2a3b4c5d6e7f",
      videoUrl: "https://vimeo.com/76979871",
      duration: "0:45",
      description:
        "A short product promo made for social media: fast cuts, kinetic typography, and subtle 3D product reveals.",
    },
    {
      id: 3,
      title: "Wedding Highlight — Rahim & Sumi",
      year: 2023,
      tags: ["Wedding", "Highlight", "Storytelling"],
      thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=bb12345cde67890f1234567890abcdef",
      videoUrl: "https://example-bucket.s3.amazonaws.com/wedding-highlight.mp4",
      duration: "4:12",
      description:
        "Emotional wedding highlight with cinematic pacing, audio sweetening, and music licensing handled.",
    },
  ];
  // === end sample projects ===

  const tags = useMemo(() => {
    const s = new Set();
    projects.forEach((p) => p.tags.forEach((t) => s.add(t)));
    return ["All", ...Array.from(s)];
  }, [projects]);

  const filtered = projects.filter((p) => {
    const matchesQuery =
      query.trim() === "" ||
      p.title.toLowerCase().includes(query.toLowerCase()) ||
      p.description.toLowerCase().includes(query.toLowerCase());
    const matchesTag = activeTag === "" || activeTag === "All" || p.tags.includes(activeTag);
    return matchesQuery && matchesTag;
  });

  function isYouTube(url) {
    return /youtube|youtu.be/.test(url);
  }
  function isVimeo(url) {
    return /vimeo/.test(url);
  }
  function isMP4(url) {
    return /\.mp4(\?|$)/i.test(url);
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="max-w-6xl mx-auto p-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Your Name — Video Editor</h1>
          <p className="text-sm text-gray-600">Cinematic edits · Color grading · Motion graphics</p>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="#contact"
            className="px-4 py-2 rounded-lg bg-black text-white text-sm hover:opacity-90"
          >
            Hire me
          </a>
          <a
            href="/Your_Resume.pdf"
            download
            className="px-4 py-2 rounded-lg border border-gray-300 text-sm"
          >
            Download CV
          </a>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 pb-20">
        {/* HERO */}
        <section className="grid md:grid-cols-2 gap-8 items-center my-6">
          <div>
            <h2 className="text-4xl font-extrabold leading-tight">I craft stories with motion.
            </h2>
            <p className="mt-4 text-gray-600">
              Professional video editor specialising in storytelling, color grading, and social promos. Scroll down to see selected works.
            </p>

            <div className="mt-6 flex gap-3">
              <a href="#projects" className="px-5 py-3 bg-black text-white rounded-lg">View Projects</a>
              <a href="#contact" className="px-5 py-3 border rounded-lg">Contact</a>
            </div>

            <div className="mt-6">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search projects, e.g., 'wedding' or 'promo'"
                className="w-full md:w-3/4 p-3 rounded-lg border"
              />
            </div>
          </div>

          <div>
            <div className="rounded-xl overflow-hidden shadow-lg">
              <img
                src={projects[0].thumbnail}
                alt="Hero thumbnail"
                className="w-full h-64 object-cover"
              />
            </div>
          </div>
        </section>

        {/* TAG FILTER */}
        <section className="my-4">
          <div className="flex gap-2 flex-wrap">
            {tags.map((t) => (
              <button
                key={t}
                onClick={() => setActiveTag(t === "All" ? "" : t)}
                className={`px-3 py-1 rounded-full border ${activeTag === t || (t === "All" && activeTag === "") ? "bg-black text-white" : "bg-white"}`}
              >
                {t}
              </button>
            ))}
          </div>
        </section>

        {/* PROJECTS GRID */}
        <section id="projects" className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p) => (
            <article key={p.id} className="bg-white rounded-xl shadow p-3">
              <div className="relative cursor-pointer" onClick={() => setSelected(p)}>
                <img src={p.thumbnail} alt={p.title} className="w-full h-48 object-cover rounded-md" />
                <div className="absolute bottom-3 left-3 bg-black bg-opacity-60 text-white px-2 py-1 rounded">{p.duration}</div>
              </div>

              <div className="mt-3">
                <h3 className="font-semibold">{p.title}</h3>
                <p className="text-sm text-gray-500">{p.year} • {p.tags.join(" · ")}</p>
                <p className="mt-2 text-gray-600 text-sm line-clamp-3">{p.description}</p>

                <div className="mt-3 flex items-center gap-2">
                  <button onClick={() => setSelected(p)} className="px-3 py-1 rounded-lg border text-sm">Preview</button>
                  <a
                    href={p.videoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1 rounded-lg border text-sm"
                  >
                    Open Source
                  </a>
                </div>
              </div>
            </article>
          ))}

          {filtered.length === 0 && (
            <div className="col-span-full text-center text-gray-500 py-10">No projects found.</div>
          )}
        </section>

        {/* CONTACT */}
        <section id="contact" className="mt-16 bg-white rounded-xl p-6 shadow">
          <h3 className="text-xl font-semibold">Contact</h3>
          <p className="text-gray-600 mt-2">Interested in hiring or collaboration? Send a message or email me at <a href="mailto:your.email@example.com" className="text-black underline">your.email@example.com</a>.</p>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <input placeholder="Your name" className="p-3 rounded border" />
            <input placeholder="Your email" className="p-3 rounded border" />
            <input placeholder="Project / budget" className="p-3 rounded border md:col-span-2" />
            <textarea placeholder="Message" className="p-3 rounded border md:col-span-2 h-32" />
            <div className="md:col-span-2 flex justify-end">
              <button className="px-5 py-3 bg-black text-white rounded">Send message</button>
            </div>
          </div>
        </section>
      </main>

      {/* MODAL / LIGHTBOX */}
      {selected && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-70 p-6">
          <div className="w-full max-w-4xl bg-white rounded-lg overflow-hidden">
            <div className="flex items-center justify-between p-3 border-b">
              <div>
                <h4 className="font-semibold">{selected.title}</h4>
                <p className="text-sm text-gray-500">{selected.year} • {selected.tags.join(", ")}</p>
              </div>
              <div>
                <button onClick={() => setSelected(null)} className="px-3 py-1 rounded border">Close</button>
              </div>
            </div>

            <div className="p-3">
              {/* Player: YouTube/Vimeo iframe or native video */}
              {isYouTube(selected.videoUrl) && (
                <div className="aspect-w-16 aspect-h-9">
                  <iframe
                    title={selected.title}
                    src={selected.videoUrl.replace("watch?v=", "embed/")}
                    allowFullScreen
                    className="w-full h-96"
                  />
                </div>
              )}

              {isVimeo(selected.videoUrl) && (
                <div className="aspect-w-16 aspect-h-9">
                  <iframe
                    title={selected.title}
                    src={selected.videoUrl.replace(/vimeo.com\/(\d+)/, "player.vimeo.com/video/$1")}
                    allowFullScreen
                    className="w-full h-96"
                  />
                </div>
              )}

              {isMP4(selected.videoUrl) && (
                <video controls className="w-full rounded-md">
                  <source src={selected.videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}

              {!isYouTube(selected.videoUrl) && !isVimeo(selected.videoUrl) && !isMP4(selected.videoUrl) && (
                <p className="text-sm text-gray-600">Preview not available for this link. You can open it in a new tab.</p>
              )}

              <div className="mt-3 text-sm text-gray-700">
                <p>{selected.description}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <footer className="mt-10 py-6 border-t">
        <div className="max-w-6xl mx-auto px-6 text-sm text-gray-500 flex items-center justify-between">
          <div>© {new Date().getFullYear()} Your Name — Video Editor</div>
          <div className="flex items-center gap-3">
            <a href="#">Instagram</a>
            <a href="#">YouTube</a>
            <a href="#">Vimeo</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
