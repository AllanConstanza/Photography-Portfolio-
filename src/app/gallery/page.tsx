"use client";

import data from "@/data/albums.json";
import Image from "next/image";
import { useMemo, useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import type { Photo } from "@/types/photos";

export default function GalleryPage() {
  const photos = data.photos as Photo[];

  const albums = useMemo(
    () => Array.from(new Set(photos.map((p) => p.album))),
    [photos]
  );

  const [filter, setFilter] = useState<string>("All");
  const visible = photos.filter((p) => (filter === "All" ? true : p.album === filter));

  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const slides = visible.map((p) => ({
    src: p.src,
    width: p.w ?? 1600,
    height: p.h ?? 1066,
    alt: p.alt ?? `${p.album} photo`,
  }));

  return (
    <section className="py-10">

      {/* HEADER + FILTERS */}
      <div className="max-w-[1400px] mx-auto px-4 mb-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <h1 className="text-3xl font-bold">All Photos</h1>

          <div className="flex flex-wrap gap-2">
            {["All", ...albums].map((a) => (
              <button
                key={a}
                onClick={() => setFilter(a)}
                className={`px-3 py-1.5 rounded-full text-sm transition border ${
                  filter === a
                    ? "bg-white text-black border-white"
                    : "bg-zinc-900 text-zinc-300 border-zinc-700 hover:bg-zinc-800"
                }`}
              >
                {a.charAt(0).toUpperCase() + a.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* PHOTO GRID */}
      <div className="columns-2 sm:columns-3 lg:columns-4 gap-4 [column-fill:_balance] max-w-[1400px] mx-auto px-4">
        {visible.map((p, i) => (
          <figure key={i} className="mb-4 break-inside-avoid">
            <button
              type="button"
              onClick={() => {
                setIndex(i);
                setOpen(true);
              }}
              className="group relative block w-full"
            >
              <Image
                src={p.src}
                alt={p.alt ?? `${p.album} photo`}
                width={p.w ?? 1600}
                height={p.h ?? 1066}
                className="w-full h-auto rounded-2xl shadow-sm transition duration-300 group-hover:brightness-110 group-hover:scale-[1.02]"
              />

              {/* hover enlarge icon */}
              <span className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeWidth="2" d="M4 8V4h4M20 8V4h-4M4 16v4h4M20 16v4h-4" />
                </svg>
              </span>
            </button>
          </figure>
        ))}
      </div>

      {open && (
        <Lightbox
          open={open}
          close={() => setOpen(false)}
          index={index}
          slides={slides}
          styles={{
            container: {
              backgroundColor: "rgba(0, 0, 0, 0.3)",
              backdropFilter: "blur(2px)",
            },
          }}
        />
      )}
    </section>
  );
}


