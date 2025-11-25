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
    const visible = photos.filter((p) =>
        filter === "All" ? true : p.album === filter
    );

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
            <div className="flex items-center justify-between mb-6 gap-4 max-w-[1400px] mx-auto px-4">
                <h1 className="text-3xl font-semibold">All Photos</h1>

                <div className="flex gap-2 flex-wrap">
                    {["All", ...albums].map((a) => (
                        <button
                            key={a}
                            onClick={() => setFilter(a)}
                            className={`px-3 py-1.5 rounded-full text-sm transition ${filter === a
                                    ? "bg-black text-white border border-black"
                                    : "bg-zinc-800 text-white border border-zinc-700 hover:bg-zinc-700"
                                }`}

                        >
                            {a}
                        </button>
                    ))}
                </div>
            </div>

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
                                className="w-full h-auto rounded-2xl shadow-sm transition group-hover:shadow-lg"
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
                />
            )}
        </section>
    );
}

