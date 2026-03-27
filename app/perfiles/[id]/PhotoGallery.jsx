'use client';
import Image from "next/image";
import { useState } from "react";

export default function PhotoGallery({ photos, alt }) {
  const [active, setActive] = useState(0);

  if (!photos?.length) {
    return (
      <div className="space-y-3">
        <div className="aspect-[3/4] overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900" />
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="relative aspect-[3/4] overflow-hidden rounded-3xl border border-zinc-800">
        <Image
          src={photos[active]}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
        />
      </div>

      <div className="grid grid-cols-4 gap-2">
        {photos.map((src, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`relative aspect-[3/4] overflow-hidden rounded-xl border ${
              i === active ? "border-amber-400" : "border-zinc-700"
            }`}
          >
            <Image
              src={src}
              alt={`${alt} ${i + 1}`}
              fill
              sizes="(max-width: 768px) 25vw, 120px"
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
