"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import data from "@/data/albums.json";

export default function HomePage() {
  const photos = data.photos;

  const featured = photos.filter((p) =>
    [
      "/photos/concerts/IMG_8986 2.jpg",
      "/photos/concerts/IMG_8977 2.jpg",
      "/photos/concerts/IMG_9787.JPG",
    ].includes(p.src)
  );

  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const slides = featured.map((p) => ({
    src: p.src,
    width: p.w ?? 1600,
    height: p.h ?? 1066,
    alt: p.alt ?? "Photo",
  }));

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
    <main className="pb-32">

      {/* HERO */}
      <div className="relative h-[65vh] w-full overflow-hidden mb-20">
        <div
          id="hero-parallax"
          className="hero-bg"
          style={{ backgroundImage: "url('/hero.jpg')" }}
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/90" />

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          <h1 className="text-4xl sm:text-6xl font-bold text-white drop-shadow-xl">
            Welcome to my portfolio
          </h1>

          <p className="text-base sm:text-lg text-zinc-300 mt-4">
            Bay Area Photographer — Concerts • Sports • Moments
          </p>

          <div className="flex gap-4 mt-8">
            <Link href="/albums" className="pill">
              Albums
            </Link>
            <Link href="/gallery" className="pill">
              All Photos
            </Link>
          </div>
        </div>
      </div>

      {/* ABOUT ME */}
      <section className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
        <div className="flex justify-center">
          <Image
            src="/photos/sports/00doval.JPG"
            alt="About me photo"
            width={600}
            height={800}
            className="rounded-2xl border border-white/10 w-full max-w-[350px] h-auto"
          />
        </div>

        <div className="flex flex-col justify-center space-y-6 text-center md:text-left">
          <h2 className="text-3xl sm:text-4xl font-bold">About Me</h2>

          <p className="text-zinc-300 text-base sm:text-lg leading-relaxed">
            I&apos;m a Northern California photographer specializing in
            <span className="font-semibold"> special events and urban photography</span>.
            I&apos;ve captured moments across cities, festivals, and sporting events —
            focused on emotion, energy, and storytelling.
          </p>

          <p className="text-zinc-300 text-base sm:text-lg leading-relaxed">
            I&apos;m currently open for{" "}
            <span className="font-semibold">bookings and collaborations</span>.
            If you need coverage for an upcoming event, let&apos;s connect.
          </p>

          <div className="flex gap-4 justify-center md:justify-start pt-4">
            <Link href="/gallery" className="pill">
              View My Work
            </Link>
            <Link href="/contact" className="pill">
              Contact
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURED */}
      <section className="max-w-[1400px] mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-10">Featured Photos</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {featured.map((p, i) => (
            <button
              key={i}
              onClick={() => {
                setIndex(i);
                setOpen(true);
              }}
              className="group block w-full"
            >
              <div className="w-full rounded-2xl overflow-hidden border border-white/10 bg-black">
                <Image
                  src={p.src}
                  alt={p.alt ?? "Featured photo"}
                  width={p.w}
                  height={p.h}
                  className="w-full h-auto rounded-2xl transition duration-500 ease-in-out group-hover:brightness-110 group-hover:scale-[1.02]"
                />
              </div>
            </button>
          ))}
        </div>
      </section>

      {open && (
        <Lightbox
          open={open}
          close={() => setOpen(false)}
          index={index}
          slides={slides}
          styles={{
            container: {
              backgroundColor: "rgba(0,0,0,0.35)",
              backdropFilter: "blur(2px)",
            },
          }}
        />
      )}
    </main>
  );
}
