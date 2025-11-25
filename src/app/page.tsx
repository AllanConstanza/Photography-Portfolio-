"use client";

import { useEffect, ReactNode, useState } from "react";
import data from "@/data/albums.json";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import Link from "next/link";
import "yet-another-react-lightbox/styles.css";

type Photo = {
  src: string;
  alt?: string;
  album: string;
  w?: number;
  h?: number;
};

type FadeInProps = {
  children: ReactNode;
  delay?: number;
};

// Fade-in animation component
function FadeIn({ children, delay = 0 }: FadeInProps) {
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
  const photos = data.photos as Photo[];

  const featuredPhotos = photos.slice(0, 4);

  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

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
        <div
          id="hero-parallax"
          className="hero-bg"
          style={{ backgroundImage: "url('/hero.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/80" />

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center">
          <FadeIn>
            <h1 className="text-6xl font-bold text-white drop-shadow-xl">
              Welcome to my portfolio
            </h1>
          </FadeIn>

          <FadeIn delay={200}>
            <p className="text-lg text-zinc-300 mt-6">
              Bay Area Photographer — City • Concerts • Travel
            </p>
          </FadeIn>

          <FadeIn delay={350}>
            <div className="flex gap-4 mt-8">
              <Link href="/albums" className="pill">
                Albums
              </Link>
              <Link href="/gallery" className="pill">
                All Photos
              </Link>
            </div>
          </FadeIn>
        </div>
      </div>

      {/* --- FEATURED PHOTOS --- */}
      <section className="max-w-[1400px] mx-auto px-4 mt-20 mb-28">
        <h2 className="text-3xl font-bold mb-6 text-center">Featured Photos</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredPhotos.map((p, i) => (
            <div
              key={i}
              onClick={() => {
                setIndex(i);
                setOpen(true);
              }}
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

