'use client';
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
        <img
          src={photos[active]}
          alt={alt}
          className="h-full w-full object-cover"
          loading="lazy"
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
            <img
              src={src}
              alt={`${alt} ${i + 1}`}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
