// app/lib/api.js
export const BASE =
  process.env.NEXT_PUBLIC_API_BASE?.replace(/\/+$/, "") || "/api";

// Normaliza el DTO del backend -> shape que usa el front
const normalizeProfile = (d = {}) => ({
  id: d.code,                    // usamos el code para las rutas
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
  price: d.price,
  // por si el backend envía el id numérico del host
  entityId: typeof d.id === "number" ? d.id : undefined,
});

export async function fetchHosts({ page = 0, size = 20 } = {}) {
  const res = await fetch(`${BASE}/api/hosts?page=${page}&size=${size}`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Hosts fetch failed");
  const data = await res.json(); // Page<T>
  return (data?.content ?? []).map(normalizeProfile);
}

export async function fetchHostByCode(code) {
  const res = await fetch(`${BASE}/api/hosts/${encodeURIComponent(code)}`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Host fetch failed");
  return normalizeProfile(await res.json());
}

export async function fetchPhotosByEntityId(entityId) {
  const res = await fetch(`${BASE}/api/hosts/${entityId}/photos`, {
    cache: "no-store",
  });
  if (!res.ok) return [];
  return await res.json();
}

// Conveniencia: trae host por code y sus fotos (si tenemos id numérico)
export async function fetchHostWithPhotosByCode(code) {
  const host = await fetchHostByCode(code);
  let photos = [];
  const idCandidates = [host.entityId].filter((v) => typeof v === "number");

  for (const id of idCandidates) {
    try {
      const arr = await fetchPhotosByEntityId(id);
      if (arr?.length) {
        photos = arr;
        break;
      }
    } catch {
      // ignore
    }
  }
  if (!photos.length && host.photo) photos = [host.photo];
  return { ...host, photos };
}
