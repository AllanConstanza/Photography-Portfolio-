"use client";

import { Mail, Instagram, Linkedin } from "lucide-react";
import { useState } from "react";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;

    const res = await fetch("https://formspree.io/f/xblnapqy", {
      method: "POST",
      body: new FormData(form),
      headers: { Accept: "application/json" },
    });

    if (res.ok) {
      setStatus("success");
      form.reset();
    } else {
      setStatus("error");
    }
  }

  return (
    <section className="max-w-[700px] mx-auto px-6 py-28">
      <h1 className="text-5xl font-bold text-center mb-6">Contact</h1>

      <p className="text-lg text-zinc-400 text-center mb-12 leading-relaxed">
        I’m currently open for bookings, collaborations, and media opportunities.
        If you need event coverage or content creation, let’s connect.
      </p>

      {/* CONTACT LINKS */}
      <div className="bg-zinc-900/40 backdrop-blur-md border border-white/10 rounded-2xl p-10 space-y-8 mb-16">
        <a
          href="mailto:allanconstanza2003@gmail.com"
          className="flex items-center gap-4 text-lg hover:text-white transition break-all"
        >
          <Mail size={26} />
          <span className="break-all">allanconstanza2003@gmail.com</span>
        </a>

        <a
          href="https://instagram.com/_allanconstanza_"
          target="_blank"
          className="flex items-center gap-4 text-lg hover:text-white transition"
        >
          <Instagram size={26} />
          <span>@_allanconstanza_</span>
        </a>

        <a
          href="https://www.linkedin.com/in/allan-constanza/"
          target="_blank"
          className="flex items-center gap-4 text-lg hover:text-white transition"
        >
          <Linkedin size={26} />
          <span>View LinkedIn Profile</span>
        </a>
      </div>

      {/* BOOKING FORM */}
      <h2 className="text-3xl font-semibold mb-6 text-center">Booking Request</h2>

      <form
        onSubmit={handleSubmit}
        className="bg-zinc-900/40 backdrop-blur-md border border-white/10 rounded-2xl p-10 space-y-6"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <input
            type="text"
            name="name"
            required
            placeholder="Your Name"
            className="input"
          />

          <input
            type="email"
            name="email"
            required
            placeholder="Your Email"
            className="input break-all"
          />
        </div>

        <select name="shoot_type" className="input">
          <option>Type of Shoot</option>
          <option>Concert</option>
          <option>Sports</option>
          <option>Event</option>
          <option>Portraits</option>
          <option>Other</option>
        </select>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <input type="date" name="date" className="input" />
          <input type="text" name="location" placeholder="Location" className="input" />
        </div>

        <textarea
          name="message"
          rows={4}
          placeholder="Tell me about your project..."
          className="input"
        />

        <button
          type="submit"
          className="w-full py-3 rounded-xl bg-white text-black font-semibold hover:bg-gray-200 transition"
        >
          Submit Request
        </button>

        {status === "success" && (
          <p className="text-green-400 text-center">Message sent! I’ll get back to you soon.</p>
        )}
        {status === "error" && (
          <p className="text-red-400 text-center">Something went wrong. Please try again.</p>
        )}
      </form>
    </section>
  );
}

