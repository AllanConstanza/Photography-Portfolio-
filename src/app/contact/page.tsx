"use client";

import { Mail, Instagram, Linkedin } from "lucide-react";

export default function ContactPage() {
  return (
    <main className="max-w-[900px] mx-auto px-6 py-20 text-center">
      <h1 className="text-4xl font-bold mb-6">Contact Me</h1>

      <p className="text-lg text-zinc-300 leading-relaxed mb-10">
        I'm available for bookings, collaborations, and media pass opportunities.  
        Feel free to reach out through any of the platforms below.
      </p>

      <div className="flex flex-col items-center gap-6 text-lg">

        {/* Email */}
        <a
          href="mailto:YOUR_EMAIL_HERE"
          className="flex items-center gap-3 hover:text-white transition"
        >
          <Mail size={22} />
          YOUR_EMAIL_HERE
        </a>

        {/* Instagram */}
        <a
          href="https://instagram.com/YOUR_HANDLE"
          target="_blank"
          className="flex items-center gap-3 hover:text-white transition"
        >
          <Instagram size={22} />
          @YOUR_HANDLE
        </a>

        {/* LinkedIn */}
        <a
          href="https://www.linkedin.com/in/YOUR_LINKEDIN/"
          target="_blank"
          className="flex items-center gap-3 hover:text-white transition"
        >
          <Linkedin size={22} />
          Your Name
        </a>
      </div>

      <p className="text-zinc-500 text-sm mt-16">
        © {new Date().getFullYear()} Allan Constanza — All Rights Reserved
      </p>
    </main>
  );
}
