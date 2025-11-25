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
      "/photos/travel/01D4380E-167B-4A4E-8D24-32D48E1CE902_1_201_a.jpeg",
      "/photos/travel/4D1D7A48-6A7E-4D12-B857-7E885F1FE546_1_201_a.jpeg",
      "/photos/travel/6F7A4182-0136-4927-B3D4-3C70914C41C0_1_105_c.jpeg",
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

      {/* ✅ HERO */}
      <div className="relative h-[70vh] w-full overflow-hidden mb-24">
        <div
          id="hero-parallax"
          className="hero-bg"
          style={{ backgroundImage: "url('/hero.jpg')" }}
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/90" />

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center">
          <h1 className="text-6xl font-bold text-white drop-shadow-xl">
            Welcome to my portfolio
          </h1>

          <p className="text-lg text-zinc-300 mt-6">
            Bay Area Photographer — City • Events • Travel
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

      {/* ✅ ABOUT ME */}
      <section className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 mb-32">
        <div className="flex justify-center">
          <Image
            src="/photos/events/IMG_9787.JPG"
            alt="About me photo"
            width={600}
            height={800}
            className="rounded-2xl border border-white/10 w-auto h-auto max-w-[75%]"
          />
        </div>

        <div className="flex flex-col justify-center space-y-6 text-center md:text-left">
          <h2 className="text-4xl font-bold">About Me</h2>

          <p className="text-zinc-300 text-lg leading-relaxed">
            I&apos;m a Northern California photographer specializing in
            <span className="font-semibold"> special events and urban photography</span>.
            I&apos;ve captured moments across cities, festivals, and sporting events -
            focused on emotion, energy, and storytelling.
          </p>

          <p className="text-zinc-300 text-lg leading-relaxed">
            I&apos;m currently open for <span className="font-semibold">bookings and collaborations</span>.
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

      {/* ✅ FEATURED — same filtering + same hover */}
      <section className="max-w-[1400px] mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-10">Featured Photos</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featured.map((p, i) => (
            <button
              key={i}
              onClick={() => {
                setIndex(i);
                setOpen(true);
              }}
              className="group block w-full"
            >
              <div className="relative w-full h-[420px] rounded-2xl overflow-hidden border border-white/10 bg-black group hover:shadow-[0_0_35px_#ffffff15]">
                <Image
                  src={p.src}
                  alt={p.alt ?? "Featured photo"}
                  fill
                  className="object-cover transition duration-500 ease-in-out group-hover:scale-[1.06]"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
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
