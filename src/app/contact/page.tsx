import { Mail, Instagram, Linkedin } from "lucide-react";

export default function ContactPage() {
  return (
    <section className="max-w-[650px] mx-auto px-6 py-28">
      <h1 className="text-5xl font-bold text-center mb-6">Contact</h1>

      <p className="text-lg text-zinc-300 text-center mb-12">
        I’m currently open for bookings, collaborations, and media passes.
        If you need coverage for a special event, let’s connect.
      </p>

      <div className="bg-zinc-900/40 backdrop-blur-sm border border-white/10 rounded-2xl p-10 space-y-8">

        {/* Email */}
        <a
          href="mailto:allanconstanza2003@gmail.com"
          className="flex items-center gap-4 text-lg hover:text-white transition"
        >
          <Mail size={26} />
          allanconstanza2003@gmail.com
        </a>

        {/* Instagram */}
        <a
          href="https://instagram.com/_allanconstanza_"
          target="_blank"
          className="flex items-center gap-4 text-lg hover:text-white transition"
        >
          <Instagram size={26} />
          @_allanconstanza_
        </a>

        {/* LinkedIn */}
        <a
          href="https://www.linkedin.com/in/allan-constanza/"
          target="_blank"
          className="flex items-center gap-4 text-lg hover:text-white transition"
        >
          <Linkedin size={26} />
          View LinkedIn Profile
        </a>
      </div>
    </section>
  );
}

