/* eslint-disable @next/next/no-img-element */


import Link from "next/link";
import data from "@/data/albums.json";
import type { Album } from "@/types/photos";

export default function AlbumsPage() {
  const albums = data.albums as Album[];

  return (
    <section className="py-10 max-w-[1400px] mx-auto px-4">
      <h1 className="text-4xl font-bold mb-10">Albums</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {albums.map((a) => (
          <Link
            key={a.name}
            href={`/albums/${a.name}`}
            className="block group"
          >
            <div className="overflow-hidden rounded-2xl">
              <img
                src={a.cover}
                alt={a.name}
                className="w-full h-64 object-cover rounded-2xl transition group-hover:scale-105"
              />
            </div>
            <h2 className="mt-4 text-xl font-semibold capitalize">{a.name}</h2>
            <p className="text-sm text-zinc-400">{a.count} photos</p>
          </Link>
        ))}
      </div>
    </section>
  );
}

