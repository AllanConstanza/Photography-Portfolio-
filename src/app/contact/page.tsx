"use client";

import { Mail, Instagram, Linkedin } from "lucide-react";

export default function ContactPage() {
  return (
    <section className="max-w-[650px] mx-auto px-6 py-20">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">Contact</h1>

      <p className="text-lg text-zinc-400 text-center mb-12 leading-relaxed">
        I’m currently open for bookings, collaborations, and media opportunities.
        If you need event coverage or content creation, let’s connect.
      </p>

      <div className="bg-zinc-900/40 backdrop-blur-md border border-white/10 rounded-2xl 
                      p-6 md:p-10 space-y-8">

        {/* Email */}
        <a
          href="mailto:allanconstanza2003@gmail.com"
          className="flex items-center gap-4 text-base md:text-lg hover:text-white transition 
                     break-all"
        >
          <Mail size={24} className="flex-shrink-0" />
          <span className="break-all">allanconstanza2003@gmail.com</span>
        </a>

        {/* Instagram */}
        <a
          href="https://instagram.com/_allanconstanza_"
          target="_blank"
          className="flex items-center gap-4 text-base md:text-lg hover:text-white transition 
                     break-words"
        >
          <Instagram size={24} className="flex-shrink-0" />
          <span>@_allanconstanza_</span>
        </a>

        {/* LinkedIn */}
        <a
          href="https://www.linkedin.com/in/allan-constanza/"
          target="_blank"
          className="flex items-center gap-4 text-base md:text-lg hover:text-white transition"
        >
          <Linkedin size={24} className="flex-shrink-0" />
          <span>View LinkedIn Profile</span>
        </a>
      </div>
    </section>
  );
}
