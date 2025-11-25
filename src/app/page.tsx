"use client";

import { useEffect } from "react";
import data from "@/data/albums.json";
import Image from "next/image";
import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";


// Fade-in animation component
function FadeIn({ children, delay = 0 }: any) {
  return (
    <div
      style={{ animationDelay: `${delay}ms` }}
      className="opacity-0 animate-fadeUp"
    >
      {children}
    </div>
  );
}

export default function HomePage() {
  const photos: any[] = data.photos;

  // Pick 4–6 featured photos (update with your favorites)
  const featuredPhotos = [
    photos[0],
    photos[1],
    photos[2],
    photos[3],
  ];


  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  // Slides based on featured photos
  const featuredSlides = featuredPhotos.map((p) => ({
    src: p.src,
    width: p.w ?? 1600,
    height: p.h ?? 1066,
    alt: p.alt ?? "Photo",
  }));

  // Parallax hero background
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY * 0.3;
      const hero = document.getElementById("hero-parallax");
      if (hero) hero.style.setProperty("--parallax-offset", `${offset}px`);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
   <main className="pt-1 pb-20">


      {/* --- CINEMATIC HERO --- */}
      <div className="relative h-[70vh] w-full overflow-hidden mb-20">
        {/* Background */}
        <div
          id="hero-parallax"
          className="hero-bg"
          style={{ backgroundImage: "url('/hero.jpg')" }}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/80" />

        {/* Foreground Text */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center">
          <FadeIn>
            <h1 className="text-6xl font-bold text-white drop-shadow-xl">
              Welcome to my portfolio
            </h1>
          </FadeIn>

          <FadeIn delay={200}>
            <p className="text-lg text-zinc-300 mt-6">
               Bay Area Photographer - City • Concerts • Travel
            </p>
          </FadeIn>

          <FadeIn delay={350}>
            <div className="flex gap-4 mt-8">
              <a href="/albums" className="pill">Albums</a>
              <a href="/gallery" className="pill">All Photos</a>
            </div>
          </FadeIn>


        </div>
      </div>

      {/* --- FEATURED PHOTOS SECTION --- */}
      <section className="max-w-[1400px] mx-auto px-4 mt-20 mb-28">
        <h2 className="text-3xl font-bold mb-6 text-center">Featured Photos</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredPhotos.map((p, i) => (
            <div
              key={i}
              onClick={() => { setIndex(i); setOpen(true); }}
              className="group relative overflow-hidden rounded-2xl cursor-pointer"
            >
              <Image
                src={p.src}
                alt={p.alt ?? "Featured photo"}
                width={p.w ?? 1600}
                height={p.h ?? 1066}
                className="object-cover w-full h-72 rounded-2xl border border-[var(--border)]
               transition duration-300 group-hover:brightness-110 group-hover:scale-105"
              />
            </div>

          ))}
        </div>
      </section>

      {/* --- ABOUT ME SECTION --- */}
      <section className="max-w-[900px] mx-auto px-4 mt-10 mb-28 text-center space-y-6">
        <h2 className="text-3xl font-bold tracking-tight">About Me</h2>

        <p className="text-zinc-300 leading-relaxed text-lg">
          I'm a Northern California photographer specializing in
          <span className="font-semibold"> concert, event, and urban photography</span>.
          I’ve captured countless moments across cities, festivals, and campus events —
          always focused on emotion, energy, and storytelling through every frame.
        </p>

        <p className="text-zinc-300 leading-relaxed text-lg">
          I’m currently open for <span className="font-semibold">bookings, collaborations, and media pass opportunities</span>.
          If you need coverage for a concert, event, or creative project, feel free to reach out.
        </p>

        <div className="flex justify-center gap-4 mt-8">
          <a href="/gallery" className="pill">View My Work</a>
          <a href="/contact" className="pill">Contact</a>
        </div>
      </section>

      {open && (
        <Lightbox
          open={open}
          close={() => setOpen(false)}
          index={index}
          slides={featuredSlides}
          styles={{
            container: {
              backgroundColor: "rgba(0,0,0,0.3)",
              backdropFilter: "blur(2px)",
            },
          }}
        />
      )}

    </main>


  );



}

