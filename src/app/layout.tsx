import type { Metadata } from "next";
import "./globals.css";
import { Outfit } from "next/font/google";
import { Camera } from "lucide-react";



const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "Allan Constanza — Photography",
  description: "City • Concerts • Travel — curated selections.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} font-sans`}>
<header className="w-full border-b border-white/10 bg-black">
  <nav className="max-w-[1400px] mx-auto px-6 py-4 flex items-center justify-between">
    {/* Left */}
   <a href="/" className="flex items-center gap-2 hover:opacity-80 transition">
  <Camera size={18} className="opacity-80" />
  <span className="text-lg font-semibold tracking-tight">Allan Constanza</span>
</a>




    {/* Right */}
    <div className="flex items-center gap-8 text-sm">
      <a href="/albums" className="hover:opacity-80 transition">Albums</a>
      <a href="/gallery" className="hover:opacity-80 transition">Gallery</a>
      <a href="/contact" className="hover:opacity-80 transition">Contact</a>
    </div>
  </nav>
</header>



        <main className="mx-auto max-w-7xl px-4 py-8">{children}</main>

        <footer className="mx-auto max-w-7xl px-4 py-10 text-sm text-zinc-400">
          © {new Date().getFullYear()} Allan Constanza
        </footer>
      </body>
    </html>
  );
}
