
"use client";
import { useRef, useEffect, useState } from "react";
//import { fetchHosts } from "@/app/lib/api";

const BASE = "";

function normalizeProfile(d) {
  return {
    id: d.code,                 // usamos code como id para las rutas /perfiles/[id]
    code: d.code,
    name: d.name,
    role: d.role,
    photo: d.photo ?? d.photoUrl,
    schedule: d.schedule,
    wa: d.whatsapp ?? d.wa,
    languages: d.languages ?? [],
    specialties: d.specialties ?? [],
    tagline: d.tagline ?? "",
    age: d.age,
    nationality: d.nationality,
    countryCode: d.countryCode,
    price: d.price
  };
}

export async function fetchHosts({ page = 0, size = 20 } = {}) {
  const res = await fetch(`${BASE}/api/hosts?page=${page}&size=${size}`, { cache: "no-store" });
  if (!res.ok) throw new Error("Hosts fetch failed");
  const data = await res.json(); // Spring Page<T>
  return (data?.content ?? []).map(normalizeProfile);
}




export default function HomePage() {
  const carouselRef = useRef(null);
  const [items, setItems] = useState([]);
  const [err, setErr] = useState("");

  useEffect(() => {
    let alive = true;
    fetchHosts({ page: 0, size: 20 })
      .then(list => { if (alive) setItems(list); })
      .catch(async () => {
        // Fallback al mock si el backend no responde (opcional)
        try {
          
        } catch (e) {
          setErr("No se pudieron cargar perfiles.");
        }
      });
    return () => { alive = false; };
  }, []);

  const scrollCarousel = (dir) => {
    if (!carouselRef.current) return;
    const amount = 280;
    carouselRef.current.scrollBy({ left: dir === "next" ? amount : -amount, behavior: "smooth" });
  };

  const WABtn = ({ phone = "+50375569960", label = "Reservar por WhatsApp", message }) => {
    const href =
      "https://wa.me/" +
      phone.replace(/\D/g, "") +
      (message ? "?text=" + encodeURIComponent(message) : "");
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-medium shadow hover:shadow-md transition border border-amber-500/20 bg-amber-400/10 text-amber-300 hover:bg-amber-400/20"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mr-2">
          <path d="M20.52 3.48A11.94 11.94 0 0012 0C5.37 0 .02 5.35.02 11.96c0 2.1.56 4.12 1.63 5.9L0 24l6.29-1.64a11.96 11.96 0 005.71 1.46h.01C18.63 23.82 24 18.47 24 11.86c0-3.19-1.24-6.19-3.48-8.38zM12.01 21.6c-1.85 0-3.66-.5-5.24-1.45l-.38-.22-3.73.97.99-3.64-.25-.37a9.66 9.66 0 01-1.52-5.04c0-5.35 4.36-9.7 9.73-9.7 2.6 0 5.04 1.01 6.87 2.84A9.66 9.66 0 0121.7 11.9c0 5.35-4.36 9.7-9.69 9.7zm5.63-7.17c-.31-.16-1.86-.91-2.15-1.02-.29-.11-.5-.16-.71.16-.21.31-.81 1.01-.99 1.22-.18.2-.36.22-.67.08-.31-.16-1.3-.48-2.47-1.53-.91-.81-1.53-1.81-1.7-2.12-.18-.31-.02-.48.13-.64.13-.13.31-.35.45-.53.15-.18.2-.31.31-.52.1-.22.05-.4-.02-.56-.08-.16-.71-1.72-.97-2.36-.26-.63-.52-.55-.71-.55H7.3c-.2 0-.52.07-.79.4-.27.31-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.22 3.08.16.2 2.1 3.2 5.08 4.46.71.31 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.08 1.86-.76 2.12-1.49.26-.73.26-1.35.18-1.49-.08-.13-.29-.2-.49-.29z" />
        </svg>
        {label}
      </a>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black text-zinc-100">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-zinc-900/80 bg-black/70 backdrop-blur supports-[backdrop-filter]:bg-black/40">
        <div className="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-2xl bg-gradient-to-br from-amber-400 to-yellow-600 shadow ring-1 ring-amber-500/30" />
            <div>
              <p className="text-[11px] uppercase tracking-wider text-zinc-400">Casa Privada</p>
              <h1 className="text-lg font-bold">Elite Lounge</h1>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm text-zinc-300">
            <a href="#perfiles" className="hover:text-zinc-100">Perfiles</a>
            <a href="#servicios" className="hover:text-zinc-100">Servicios</a>
            <a href="#ambientes" className="hover:text-zinc-100">Ambientes</a>
            <a href="#reservas" className="hover:text-zinc-100">Reservas</a>
            <a href="#contacto" className="hover:text-zinc-100">Contacto</a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      {/* ... (tu sección Hero intacta) ... */}

      {/* Perfiles */}
      <section id="perfiles" className="mx-auto max-w-7xl px-4 pb-12 md:pb-16 relative">
        <div className="flex items-end justify-between">
          <div>
            <h3 className="text-2xl md:text-3xl font-bold">Perfiles</h3>
            <p className="text-zinc-400 text-sm">Conoce a nuestras anfitrionas. Entra al perfil y reserva por hora.</p>
          </div>
        </div>

        {/* Botones flotantes */}
        <button onClick={() => scrollCarousel("prev")} className="absolute top-1/2 -left-2 z-10 -translate-y-1/2 rounded-full bg-black/70 border border-white/10 p-2 text-white hover:bg-amber-500/80">←</button>
        <button onClick={() => scrollCarousel("next")} className="absolute top-1/2 -right-2 z-10 -translate-y-1/2 rounded-full bg-black/70 border border-white/10 p-2 text-white hover:bg-amber-500/80">→</button>

        <div className="mt-6 overflow-x-auto scroll-smooth snap-x snap-mandatory no-scrollbar" ref={carouselRef}>
          <div className="flex gap-4 md:gap-6">
            {(items.length ? items : Array.from({ length: 8 }).map((_,i)=>({id:`skeleton-${i}`}))).map((p, idx) => (
              <div key={p.id ?? idx}
                className="min-w-[250px] max-w-[250px] flex-shrink-0 snap-start group relative overflow-hidden rounded-3xl bg-zinc-900/60 border border-zinc-800 shadow hover:shadow-xl transition">
                <div className="aspect-[3/4] overflow-hidden">
                  {p.photo ? (
                    <img src={p.photo} alt={"Foto de " + p.name} className="h-full w-full object-cover transition group-hover:scale-105" loading="lazy" />
                  ) : (
                    <div className="h-full w-full animate-pulse bg-zinc-800" />
                  )}
                </div>
                <div className="p-4 md:p-5">
                  {p.name ? (
                    <>
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center rounded-full bg-emerald-500/10 text-emerald-300 text-[11px] px-2 py-1 border border-emerald-500/20">Disponible</span>
                        {p.schedule && <span className="text-[11px] text-zinc-400">{p.schedule}</span>}
                      </div>
                      <h4 className="mt-2 text-lg font-semibold text-zinc-100 flex items-center gap-2">
                        {p.name}
                        {p.countryCode && (
                          <img src={`https://flagcdn.com/w20/${p.countryCode}.png`} alt={p.nationality} className="w-5 h-4 rounded-sm shadow" />
                        )}
                      </h4>
                      <p className="text-sm text-zinc-400">{p.role}</p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        <a href={"/perfiles/" + (p.id ?? p.code)} className="rounded-xl border border-white/10 px-4 py-2 text-sm text-zinc-200 hover:bg-white/5">
                          Ver perfil
                        </a>
                        <WABtn phone={p.wa} label="Reservar"
                          message={`Hola ${p.name}, quiero reservar por horas. ¿Disponibilidad?`} />
                      </div>
                    </>
                  ) : (
                    <div className="space-y-2">
                      <div className="h-5 w-32 bg-zinc-800 rounded animate-pulse" />
                      <div className="h-4 w-24 bg-zinc-800 rounded animate-pulse" />
                      <div className="h-8 w-28 bg-zinc-800 rounded animate-pulse mt-3" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {err && <p className="mt-4 text-sm text-red-400">{err}</p>}
      </section>

      {/* Servicios */}
      <section id="servicios" className="mx-auto max-w-7xl px-4 py-12 md:py-16">
        <h3 className="text-2xl md:text-3xl font-bold">Servicios</h3>
        <p className="mt-2 text-zinc-400 max-w-2xl">
          Enfoque en comodidad, discreción y experiencia premium. *Sin lenguaje explícito.*
        </p>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[{ t: 'Reservaciones por hora', d: 'Agenda tu experiencia por bloques de tiempo con confirmación privada.' },
            { t: 'Salones privados', d: 'Ambientes exclusivos para grupos pequeños o reuniones discretas.' },
            { t: 'Bar & Lounge', d: 'Carta selecta, música ambiental y atención personalizada.' }].map((f, i) => (
            <div key={i} className="rounded-3xl border border-zinc-800 bg-zinc-900/40 p-6">
              <div className="h-10 w-10 rounded-xl bg-amber-400/15 border border-amber-500/20" />
              <h4 className="mt-4 text-lg font-semibold">{f.t}</h4>
              <p className="mt-1 text-zinc-300 text-sm">{f.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Ambientes */}
      <section id="ambientes" className="mx-auto max-w-7xl px-4 pb-12 md:pb-16">
        <div className="flex items-end justify-between">
          <div>
            <h3 className="text-2xl md:text-3xl font-bold">Ambientes</h3>
            <p className="text-zinc-400 text-sm">Un vistazo a nuestros espacios. Más en la galería.</p>
          </div>
          <a href="#reservas" className="text-sm text-amber-300 hover:underline">Reservar un salón</a>
        </div>
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            "https://images.unsplash.com/photo-1541544741938-0af808871cc0?q=80&w=1200&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1504805572947-34fad45aed93?q=80&w=1200&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1526045478516-99145907023c?q=80&w=1200&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?q=80&w=1200&auto=format&fit=crop",
          ].map((src, i) => (
            <div key={i} className="aspect-[4/3] overflow-hidden rounded-2xl border border-zinc-800">
              <img src={src} alt={"Ambiente " + (i + 1)} className="h-full w-full object-cover" loading="lazy" />
            </div>
          ))}
        </div>
      </section>

      {/* Reservas CTA */}
      <section id="reservas" className="mx-auto max-w-7xl px-4 pb-16">
        <div className="rounded-3xl border border-zinc-800 bg-zinc-900/40 p-6 md:p-10 grid md:grid-cols-2 gap-6 items-center">
          <div>
            <h3 className="text-2xl md:text-3xl font-bold">Reservaciones por hora</h3>
            <p className="mt-2 text-zinc-300">
              Coordina tu horario por WhatsApp. Confirmación sujeta a disponibilidad. Zona: San Salvador.
            </p>
            <div className="mt-6 flex gap-3">
              <WABtn />
              <a href="#contacto" className="rounded-2xl border border-white/10 px-5 py-3 text-sm font-medium text-zinc-200 hover:bg-white/5">Ver contacto</a>
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden border border-zinc-800">
            <img
              src="https://images.unsplash.com/photo-1542089363-456b05e72c33?q=80&w=1600&auto=format&fit=crop"
              alt="Salón privado"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Contacto */}
      <section id="contacto" className="mx-auto max-w-7xl px-4 pb-20">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-3xl border border-zinc-800 bg-zinc-900/40 p-6 md:p-8">
            <h3 className="text-xl font-semibold">Contacto</h3>
            <ul className="mt-3 space-y-2 text-zinc-300">
              <li>Tel: <span className="text-zinc-100 font-medium">+503 7556-9960</span></li>
              <li>WhatsApp: <span className="text-zinc-100 font-medium">+503 7556-9960</span></li>
              <li>Dirección: Zona exclusiva, San Salvador</li>
              <li>Horario: Lun–Dom • 6:00 pm – 3:00 am</li>
            </ul>
            <div className="mt-6 flex gap-3">
              <WABtn />
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center rounded-2xl border border-white/10 px-4 py-2 text-sm hover:bg-white/5"
              >
                Ver mapa
              </a>
            </div>
          </div>
          <div className="rounded-3xl overflow-hidden border border-zinc-800">
            <img
              src="https://images.unsplash.com/photo-1544006659-f0b21884ce1d?q=80&w=1600&auto=format&fit=crop"
              alt="Detalle de ambiente"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-900/80">
        <div className="mx-auto max-w-7xl px-4 py-8 text-sm text-zinc-400 flex flex-col md:flex-row items-center justify-between gap-3">
          <p>© {new Date().getFullYear()} Elite Lounge — Privacidad y confidencialidad</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-zinc-200">Términos</a>
            <a href="#" className="hover:text-zinc-200">Privacidad</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
