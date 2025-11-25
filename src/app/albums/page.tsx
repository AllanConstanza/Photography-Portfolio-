import Image from "next/image";
import data from "@/data/albums.json";

type Album = { name: string; cover: string; count: number };
const albums = (data as any).albums as Album[];

export default function AlbumsPage() {
  return (
    <section className="py-4">
      <h1 className="text-3xl font-semibold mb-6">Albums</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {albums.map((a) => (
          <a key={a.name} href={`/albums/${a.name}`} className="group relative overflow-hidden card">
            <div className="relative w-full h-64">
              <Image
                src={a.cover}
                alt={a.name}
                fill
                className="object-cover transition duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                priority={false}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
              <div className="absolute bottom-0 p-4 text-white flex items-center justify-between w-full">
                <div className="font-medium capitalize">{a.name}</div>
                <div className="text-sm opacity-80">{a.count}</div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

