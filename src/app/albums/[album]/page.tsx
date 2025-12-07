"use client";

import { useParams } from "next/navigation";
import { useMemo, useState } from "react";
import Image from "next/image";
import data from "@/data/albums.json";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import type { Photo } from "@/types/photos";

export default function AlbumPage() {
  const params = useParams();
  const album = params.album as string;

  const photos = data.photos as Photo[];

  const list = useMemo(
    () => photos.filter((p) => p.album === album),
    [photos, album]
  );

  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  if (!list.length) {
    return (
      <section className="py-10 max-w-[1400px] mx-auto px-4">
        <h1 className="text-3xl font-semibold mb-4 capitalize">{album}</h1>
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
    <section className="py-10 max-w-[1400px] mx-auto px-4">
      <h1 className="text-4xl font-bold mb-8 capitalize">{album}</h1>

      <div className="columns-2 sm:columns-3 lg:columns-4 gap-4 [column-fill:_balance]">
        {list.map((p, i) => (
          <figure key={i} className="mb-4 break-inside-avoid">
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
                className="w-full h-auto rounded-2xl shadow-sm transition duration-300 group-hover:scale-[1.02] group-hover:brightness-110"
              />
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
              backgroundColor: "rgba(0,0,0,0.35)",
              backdropFilter: "blur(3px)",
            },
          }}
        />
      )}
    </section>
  );
}
