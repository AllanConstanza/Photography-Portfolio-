"use client";

import data from "@/data/albums.json";
import Image from "next/image";
import { useMemo, useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { Maximize2 } from "lucide-react";

type Photo = { src: string; alt?: string; album: string; w?: number; h?: number };

export default function GalleryPage() {
  const photos = (data as any).photos as Photo[];
  const albums = useMemo(() => Array.from(new Set(photos.map((p) => p.album))), [photos]);

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
    <section className="py-4">
      <div className="flex items-center justify-between mb-6 gap-4">
        <h1 className="text-3xl font-semibold">All Photos</h1>
        <div className="flex gap-2 flex-wrap">
          {["All", ...albums].map((a) => (
            <button
              key={a}
              onClick={() => setFilter(a)}
              className={`pill ${filter === a ? "pill--active" : ""}`}
            >
              {a}
            </button>
          ))}
        </div>
      </div>

      <div className="gallery-columns columns-2 sm:columns-3 lg:columns-4 [column-fill:_balance]">
        {visible.map((p, i) => (
          <figure key={`${p.src}-${i}`} className="mb-5 break-inside-avoid">
            <button
              type="button"
              onClick={() => { setIndex(i); setOpen(true); }}
              className="group relative block w-full focus:outline-none"
            >
              <Image
                src={p.src}
                alt={p.alt ?? `${p.album} photo`}
                width={p.w ?? 1600}
                height={p.h ?? 1066}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                quality={90}
                className="w-full h-auto rounded-2xl border border-[var(--border)] shadow-sm transition group-hover:shadow-lg"
              />
              <span className="badge absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition">
                <Maximize2 size={14} />
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
          styles={{ container: { backgroundColor: "rgba(0,0,0,0.3)", backdropFilter: "blur(2px)" } }}
        />
      )}
    </section>
  );
}
