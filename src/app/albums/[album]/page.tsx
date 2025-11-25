"use client";

import { use } from "react";
import Image from "next/image";
import data from "@/data/albums.json";
import { useMemo, useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { Maximize2 } from "lucide-react";

type Photo = { src: string; alt?: string; album: string; w?: number; h?: number };

type Props = {
  params: Promise<{ album: string }>;
};

export default function AlbumPage({ params }: Props) {
  const { album } = use(params); // <-- 🟩 CORRECT WAY TO UNWRAP PARAMS IN NEXT.JS 15


  const photos = (data as any).photos as Photo[];
  const list = useMemo(
    () => photos.filter((p) => p.album === album),
    [photos, album]
  );

  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  if (!list.length) {
    return (
      <section className="py-10">
        <h1 className="text-3xl font-semibold mb-2 capitalize">{album}</h1>
        <p className="text-zinc-400">No photos found.</p>
      </section>
    );
  }

  const slides = list.map((p) => ({
    src: p.src,
    width: p.w ?? 1600,
    height: p.h ?? 1066,
    alt: p.alt ?? `${album} photo`,
  }));

  return (
    <section className="py-4 max-w-[1400px] mx-auto px-4">
      <h1 className="text-3xl font-semibold mb-6 capitalize">{album}</h1>

      <div className="gallery-columns columns-2 sm:columns-3 lg:columns-4 [column-fill:_balance]">
        {list.map((p, i) => (
          <figure key={i} className="mb-5 break-inside-avoid">
            <button
              type="button"
              onClick={() => { setIndex(i); setOpen(true); }}
              className="group relative block w-full focus:outline-none"
            >
              <Image
                src={p.src}
                alt={p.alt ?? `${album} photo`}
                width={p.w ?? 1600}
                height={p.h ?? 1066}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                quality={90}
                className="w-full h-auto rounded-2xl border border-[var(--border)] shadow-sm transition group-hover:shadow-lg group-hover:-translate-y-1 group-hover:brightness-110"
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
          styles={{
            container: {
              backgroundColor: "rgba(0,0,0,0.3)",
              backdropFilter: "blur(2px)",
            },
          }}
        />
      )}
    </section>
  );
}
