// app/perfiles/[id]/page.js
import Link from "next/link";
import { notFound } from "next/navigation";
import BookingForm from "./BookingForm";
import PhotoGallery from "./PhotoGallery";
import { fetchHostWithPhotosByCode } from "@/app/lib/api";

export const revalidate = 0;

export default async function ProfilePage({ params }) {
  const { id } = await params; // ✅ necesario en Next.js 15

  let item;
  try {
    item = await fetchHostWithPhotosByCode(id);
  } catch {
    notFound();
  }
  if (!item) notFound();


  const photos = (item.photos ?? []).filter(Boolean);
  const languages = item.languages ?? [];
  const specialties = item.specialties ?? [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black text-zinc-100">
      <header className="p-4 border-b border-zinc-900/80">
        <div className="mx-auto max-w-6xl flex items-center justify-between">
          <Link href="/" className="text-sm text-amber-300 hover:underline">
            ← Volver
          </Link>
          <h1 className="font-bold">Elite Lounge</h1>
          <div />
        </div>
      </header>

      <main className="mx-auto max-w-6xl p-4 md:p-8">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Galería */}
          <PhotoGallery photos={photos} alt={`Galería de ${item.name}`} />

          {/* Info + Booking */}
          <div>
            <h2 className="text-3xl font-bold">{item.name}</h2>
            {item.role && <p className="text-zinc-400">{item.role}</p>}
            {item.schedule && (
              <p className="mt-1 text-sm text-zinc-400">{item.schedule}</p>
            )}
            {(item.age || item.nationality) && (
              <p className="mt-1 text-sm text-zinc-300">
                {item.age ? `${item.age} años` : ""}
                {item.age && item.nationality ? " • " : ""}
                {item.nationality ?? ""}
              </p>
            )}
            {item.tagline && <p className="mt-4 text-zinc-300">{item.tagline}</p>}

            <div className="mt-6 grid gap-3">
              {languages.length > 0 && (
                <div>
                  <p className="text-[12px] uppercase tracking-wide text-zinc-400">
                    Idiomas
                  </p>
                  <div className="mt-1 flex flex-wrap gap-2">
                    {languages.map((lng) => (
                      <span
                        key={lng}
                        className="rounded-full border border-white/10 px-3 py-1 text-sm text-zinc-200"
                      >
                        {lng}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {specialties.length > 0 && (
                <div>
                  <p className="text-[12px] uppercase tracking-wide text-zinc-400">
                    Especialidades
                  </p>
                  <ul className="mt-1 list-disc pl-5 text-sm text-zinc-200">
                    {specialties.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <BookingForm
              name={item.name}
              wa={item.wa ?? "+50375569960"}
              code={item.code}
              item={item}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
